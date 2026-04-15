from __future__ import annotations

import hashlib
import json
import logging
import os
import re
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

import pandas as pd
import requests

LOGGER = logging.getLogger(__name__)
DEFAULT_BASE_URL = "https://sfapi.shortfundly.com"
DEFAULT_API_KEY = "web-X-Shortfundly-x-api-key"


@dataclass(slots=True)
class ContentItem:
    content_id: str
    slug: str
    title: str
    genres: str
    language: str
    year: int
    rating: float
    premium: bool
    synopsis: str
    thumbnail: str
    duration: str
    festival: str
    video_url: str

    def to_record(self) -> dict[str, Any]:
        return asdict(self)


def _as_str(value: Any, default: str = "") -> str:
    if isinstance(value, str):
        clean = value.strip()
        if clean:
            return clean
    return default


def _as_float(value: Any, default: float = 0.0) -> float:
    if isinstance(value, (float, int)):
        return float(value)
    if isinstance(value, str):
        try:
            return float(value)
        except ValueError:
            return default
    return default


def _as_int(value: Any, default: int) -> int:
    if isinstance(value, int):
        return value
    if isinstance(value, float):
        return int(value)
    if isinstance(value, str):
        digits = re.findall(r"\d+", value)
        if digits:
            return int(digits[0])
    return default


def _normalize_image(value: str) -> str:
    if not value:
        return "/images/poster-wings.svg"
    if value.startswith("//"):
        return f"https:{value}"
    if value.startswith("/"):
        return f"https://web.shortfundly.com{value}"
    return value


def _extract_image(payload: dict[str, Any]) -> str:
    images = payload.get("images")
    if isinstance(images, list):
        best_src = ""
        best_width = -1
        for image in images:
            if not isinstance(image, dict):
                continue
            src = _as_str(image.get("src"))
            image_type = _as_str(image.get("type")).lower()
            width = _as_int(image.get("width"), 0)
            if not src:
                continue
            if image_type and not image_type.startswith("image/"):
                continue
            if width > best_width:
                best_width = width
                best_src = src
        if best_src:
            return _normalize_image(best_src)

    fallback = (
        _as_str(payload.get("thumbnail"))
        or _as_str(payload.get("thumb"))
        or _as_str(payload.get("poster"))
        or _as_str(payload.get("image"))
    )
    return _normalize_image(fallback)


def _parse_genre(payload: dict[str, Any]) -> str:
    category = payload.get("category")
    if isinstance(category, dict):
        return _as_str(category.get("name"), "Drama")
    return _as_str(payload.get("genre") or category, "Drama")


def _parse_language(payload: dict[str, Any]) -> str:
    direct = payload.get("language")
    if isinstance(direct, dict):
        return _as_str(direct.get("name"), "Hindi")
    if isinstance(direct, str):
        return _as_str(direct, "Hindi")

    search_blob = " ".join(
        [
            _as_str(payload.get("tags")),
            _as_str(payload.get("title")),
            _as_str(payload.get("name")),
            _as_str(payload.get("synopsis")),
            _as_str(payload.get("description")),
        ]
    ).lower()

    for language in [
        "Hindi",
        "English",
        "Tamil",
        "Telugu",
        "Malayalam",
        "Kannada",
        "Marathi",
        "Bengali",
        "Gujarati",
        "Punjabi",
    ]:
        if language.lower() in search_blob:
            return language

    return "Hindi"


def _parse_duration(payload: dict[str, Any]) -> str:
    raw = _as_str(payload.get("duration"), "")
    if not raw:
        return "15m"

    hhmmss = re.match(r"^(\d{1,2}):(\d{2}):(\d{2})$", raw)
    if hhmmss:
        hours = int(hhmmss.group(1))
        minutes = int(hhmmss.group(2))
        total_minutes = max(1, hours * 60 + minutes)
        return f"{total_minutes}m"

    numeric = _as_float(raw, 0.0)
    if numeric > 0:
        minutes = int(round(numeric / 60 if numeric > 200 else numeric))
        return f"{max(1, minutes)}m"

    return "15m"


def _parse_year(payload: dict[str, Any]) -> int:
    now_year = pd.Timestamp.utcnow().year
    for key in ["pubdate", "createdAt", "year", "releaseYear", "release_year"]:
        value = payload.get(key)
        if isinstance(value, str) and len(value) >= 4:
            maybe = _as_int(value[:4], 0)
            if maybe > 1900:
                return maybe
        maybe = _as_int(value, 0)
        if maybe > 1900:
            return maybe
    return now_year


def _parse_rating(payload: dict[str, Any]) -> float:
    direct = _as_float(payload.get("rating"), 0.0) or _as_float(payload.get("mediaVoteCount"), 0.0)
    if 0 < direct <= 5:
        return round(direct, 2)

    liked = _as_float(payload.get("liked"), 0.0)
    disliked = _as_float(payload.get("disliked"), 0.0)
    total = liked + disliked
    if total > 0:
        return round((liked / total) * 5, 2)
    return 4.2


def _parse_premium(payload: dict[str, Any]) -> bool:
    release_mode = _as_str(payload.get("release_mode")).lower()
    release_pay = _as_float(payload.get("release_pay"), 0.0)
    ticket_price = _as_float(payload.get("ticket_price"), 0.0)
    access = _as_str(payload.get("access")).lower()
    return (
        release_mode == "paid"
        or release_pay > 0
        or ticket_price > 0
        or bool(payload.get("premium"))
        or bool(payload.get("isPremium"))
        or access == "premium"
    )


def _to_slug(value: str) -> str:
    return re.sub(r"\s+", "-", re.sub(r"[^a-z0-9\s-]", "", value.lower()).strip())


def normalize_item(payload: dict[str, Any]) -> ContentItem | None:
    title = _as_str(payload.get("title") or payload.get("name"))
    if not title:
        return None

    content_id = _as_str(payload.get("_id") or payload.get("id"))
    slug = (
        _as_str(payload.get("slug"))
        or content_id
        or _as_str(payload.get("permalink"))
        or _as_str(payload.get("mediaId"))
        or _to_slug(title)
    )

    media_id = _as_str(payload.get("mediaId"))
    source = _as_str(payload.get("source") or payload.get("streamUrl") or payload.get("videoUrl") or payload.get("video"))
    video_url = source or (f"https://cdn.jwplayer.com/manifests/{media_id}.m3u8" if media_id else "")
    if not video_url:
        video_url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"

    return ContentItem(
        content_id=content_id or slug,
        slug=slug,
        title=title,
        genres=_parse_genre(payload),
        language=_parse_language(payload),
        year=_parse_year(payload),
        rating=_parse_rating(payload),
        premium=_parse_premium(payload),
        synopsis=_as_str(payload.get("synopsis") or payload.get("description") or payload.get("certify")),
        thumbnail=_extract_image(payload),
        duration=_parse_duration(payload),
        festival=_as_str(payload.get("festival")),
        video_url=video_url,
    )


def normalize_catalog(raw_items: list[dict[str, Any]]) -> pd.DataFrame:
    records: list[dict[str, Any]] = []
    seen: set[str] = set()

    for raw in raw_items:
        item = normalize_item(raw)
        if not item:
            continue
        if item.slug in seen:
            continue
        seen.add(item.slug)
        records.append(item.to_record())

    frame = pd.DataFrame.from_records(records)
    if frame.empty:
        return pd.DataFrame(
            columns=[
                "content_id",
                "slug",
                "title",
                "genres",
                "language",
                "year",
                "rating",
                "premium",
                "synopsis",
                "thumbnail",
                "duration",
                "festival",
                "video_url",
            ]
        )

    return frame


def _fetch_json(url: str, api_key: str, timeout: float = 5.0) -> dict[str, Any]:
    response = requests.get(url, headers={"x-api-key": api_key}, timeout=timeout)
    response.raise_for_status()
    return response.json()


def fetch_remote_catalog() -> pd.DataFrame:
    base = os.getenv("CONTENT_API_BASE_URL", DEFAULT_BASE_URL).rstrip("/")
    api_key = os.getenv("CONTENT_API_KEY", DEFAULT_API_KEY)
    page_limit = int(os.getenv("CONTENT_API_PAGE_LIMIT", "50"))
    max_pages = int(os.getenv("CONTENT_API_MAX_PAGES", "20"))

    docs: list[dict[str, Any]] = []
    page = 1
    total_pages = 1

    while page <= total_pages and page <= max_pages:
        payload = _fetch_json(f"{base}/film?sort=popular&page={page}&limit={page_limit}", api_key)
        page_docs = payload.get("docs")
        if isinstance(page_docs, list):
            docs.extend([item for item in page_docs if isinstance(item, dict)])

        total_pages = _as_int(payload.get("totalPages"), 1)
        if payload.get("hasNextPage") is False:
            break
        page += 1

    banner_payload = _fetch_json(f"{base}/film/banner/films", api_key)
    banner_docs = banner_payload.get("payload")
    if isinstance(banner_docs, list):
        docs = [item for item in banner_docs if isinstance(item, dict)] + docs

    frame = normalize_catalog(docs)
    LOGGER.info("Fetched %s catalog items from content API", len(frame))
    return frame


def load_catalog(cache_path: Path | None = None) -> pd.DataFrame:
    cache_path = cache_path or Path(__file__).resolve().parents[1] / "data" / "catalog_cache.json"
    cache_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        frame = fetch_remote_catalog()
        if not frame.empty:
            frame.to_json(cache_path, orient="records", force_ascii=True)
            return frame
    except Exception as exc:  # noqa: BLE001
        LOGGER.warning("Remote catalog load failed, falling back to local cache: %s", exc)

    if cache_path.exists():
        cached = pd.read_json(cache_path)
        LOGGER.info("Loaded %s catalog items from local cache", len(cached))
        return cached

    raise RuntimeError("Unable to load catalog from remote API or local cache")


def catalog_fingerprint(frame: pd.DataFrame) -> str:
    payload = frame[["slug", "title", "genres", "language", "year", "rating"]].to_json(orient="records", force_ascii=True)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def load_ratings(optional_path: Path | None = None) -> pd.DataFrame:
    if optional_path and optional_path.exists():
        return pd.read_csv(optional_path)

    env_path = os.getenv("RATINGS_DATA_PATH", "")
    if env_path:
        path = Path(env_path)
        if path.exists():
            return pd.read_csv(path)

    default = Path(__file__).resolve().parents[1] / "data" / "ratings.csv"
    if default.exists():
        return pd.read_csv(default)

    return pd.DataFrame(columns=["userId", "movieId", "rating", "timestamp"])


def save_model_metadata(path: Path, metadata: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(metadata, indent=2), encoding="utf-8")
