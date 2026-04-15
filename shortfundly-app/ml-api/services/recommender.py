from __future__ import annotations

import logging
import math
import pickle
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

try:
    # Package import path (e.g. when loaded as services.recommender).
    from .preprocessing import catalog_fingerprint, load_catalog, load_ratings, save_model_metadata
except ImportError:
    # Script execution fallback (e.g. python recommender.py from this folder).
    from preprocessing import catalog_fingerprint, load_catalog, load_ratings, save_model_metadata

LOGGER = logging.getLogger(__name__)


@dataclass(slots=True)
class RecommendationItem:
    content_id: str
    slug: str
    title: str
    genre: str
    language: str
    year: int
    rating: float
    premium: bool
    thumbnail: str
    duration: str
    synopsis: str
    festival: str
    video_url: str
    score: float
    ml_score: float
    popularity_boost: float
    rewatch_penalty: float

    def to_dict(self) -> dict[str, Any]:
        return {
            "content_id": self.content_id,
            "slug": self.slug,
            "title": self.title,
            "genre": self.genre,
            "language": self.language,
            "year": self.year,
            "rating": round(float(self.rating), 4),
            "premium": bool(self.premium),
            "thumbnail": self.thumbnail,
            "duration": self.duration,
            "synopsis": self.synopsis,
            "festival": self.festival,
            "video_url": self.video_url,
            "score": round(float(self.score), 6),
            "ml_score": round(float(self.ml_score), 6),
            "popularity_boost": round(float(self.popularity_boost), 6),
            "rewatch_penalty": round(float(self.rewatch_penalty), 6),
        }


class HybridRecommender:
    def __init__(self, model_dir: Path | None = None) -> None:
        self.model_dir = model_dir or Path(__file__).resolve().parents[1] / "models"
        self.model_dir.mkdir(parents=True, exist_ok=True)
        self.model_path = self.model_dir / "recommender.pkl"
        self.metadata_path = self.model_dir / "recommender.metadata.json"

        self.catalog: pd.DataFrame = pd.DataFrame()
        self.vectorizer: TfidfVectorizer | None = None
        self.tfidf_matrix: Any = None
        self.slug_to_idx: dict[str, int] = {}
        self.content_id_to_idx: dict[str, int] = {}
        self.popularity_scores: dict[str, float] = {}
        self.cf_scores: dict[str, dict[str, float]] = {}
        self.is_ready: bool = False

    def load_or_build(self, force_rebuild: bool = False) -> None:
        start = time.perf_counter()
        catalog = load_catalog()
        fingerprint = catalog_fingerprint(catalog)

        if not force_rebuild and self.model_path.exists() and self.metadata_path.exists():
            try:
                metadata = self._load_metadata()
                if metadata.get("catalog_fingerprint") == fingerprint:
                    self._load_model()
                    self.catalog = catalog
                    self._reindex()
                    self.is_ready = True
                    LOGGER.info("Loaded recommender model from disk in %.1fms", (time.perf_counter() - start) * 1000)
                    return
            except Exception as exc:  # noqa: BLE001
                LOGGER.warning("Failed to load cached model, rebuilding: %s", exc)

        self.catalog = catalog
        self._build_model()
        self._save_model({"catalog_fingerprint": fingerprint, "built_at": int(time.time())})
        self.is_ready = True
        LOGGER.info("Built recommender model in %.1fms", (time.perf_counter() - start) * 1000)

    def recommend(
        self,
        user_id: str | None,
        content_id: str | None,
        watched_ids: list[str] | None = None,
        limit: int = 16,
    ) -> list[dict[str, Any]]:
        if not self.is_ready:
            self.load_or_build()

        if self.catalog.empty:
            return []

        watched_ids = [item.strip() for item in (watched_ids or []) if item and item.strip()]
        watched_set = set(watched_ids)

        seed_index = self._resolve_index(content_id) if content_id else None
        watched_indexes = [self._resolve_index(item) for item in watched_ids]
        watched_indexes = [idx for idx in watched_indexes if idx is not None]

        ml_score = self._compute_ml_scores(seed_index, watched_indexes)
        popularity = self._vector_from_dict(self.popularity_scores)
        cf = self._compute_cf_scores(watched_ids)

        # Final rank: ML (primary) + popularity (secondary) + collaborative boost + rewatch penalty.
        combined = (ml_score * 0.72) + (popularity * 0.18) + (cf * 0.10)

        recs: list[RecommendationItem] = []
        for idx, row in self.catalog.iterrows():
            row_id = str(row["content_id"])
            row_slug = str(row["slug"])

            rewatch_penalty = -0.30 if (row_id in watched_set or row_slug in watched_set) else 0.0
            if content_id and (row_id == content_id or row_slug == content_id):
                rewatch_penalty = -1.0

            score = float(combined[idx] + rewatch_penalty)
            recs.append(
                RecommendationItem(
                    content_id=row_id,
                    slug=row_slug,
                    title=str(row["title"]),
                    genre=str(row["genres"]),
                    language=str(row["language"]),
                    year=int(row["year"]),
                    rating=float(row["rating"]),
                    premium=bool(row["premium"]),
                    thumbnail=str(row["thumbnail"]),
                    duration=str(row["duration"]),
                    synopsis=str(row["synopsis"]),
                    festival=str(row["festival"]),
                    video_url=str(row["video_url"]),
                    score=score,
                    ml_score=float(ml_score[idx]),
                    popularity_boost=float(popularity[idx]),
                    rewatch_penalty=rewatch_penalty,
                )
            )

        recs.sort(key=lambda item: item.score, reverse=True)

        # Cold-start fallback when no user signals are available.
        if not watched_ids and not content_id:
            LOGGER.debug("Cold-start fallback triggered for user=%s", user_id)

        return [item.to_dict() for item in recs[: max(1, min(limit, 40))]]

    def _build_model(self) -> None:
        if self.catalog.empty:
            raise RuntimeError("Catalog is empty; cannot build recommender model")

        corpus = (
            self.catalog["title"].fillna("")
            + " "
            + self.catalog["genres"].fillna("")
            + " "
            + self.catalog["language"].fillna("")
            + " "
            + self.catalog["festival"].fillna("")
            + " "
            + self.catalog["synopsis"].fillna("")
        )

        self.vectorizer = TfidfVectorizer(
            analyzer="word",
            ngram_range=(1, 2),
            min_df=1,
            max_features=12000,
            stop_words="english",
        )
        self.tfidf_matrix = self.vectorizer.fit_transform(corpus)

        self._reindex()
        self.popularity_scores = self._build_popularity_scores(self.catalog)
        self.cf_scores = self._build_cf_scores(self.catalog)

    def _reindex(self) -> None:
        self.slug_to_idx = {str(row.slug): int(i) for i, row in self.catalog.reset_index(drop=True).iterrows()}
        self.content_id_to_idx = {str(row.content_id): int(i) for i, row in self.catalog.reset_index(drop=True).iterrows()}

    def _load_model(self) -> None:
        with self.model_path.open("rb") as handle:
            payload = pickle.load(handle)

        self.vectorizer = payload["vectorizer"]
        self.tfidf_matrix = payload["tfidf_matrix"]
        self.popularity_scores = payload.get("popularity_scores", {})
        self.cf_scores = payload.get("cf_scores", {})

    def _save_model(self, metadata: dict[str, Any]) -> None:
        payload = {
            "vectorizer": self.vectorizer,
            "tfidf_matrix": self.tfidf_matrix,
            "popularity_scores": self.popularity_scores,
            "cf_scores": self.cf_scores,
        }
        with self.model_path.open("wb") as handle:
            pickle.dump(payload, handle)
        save_model_metadata(self.metadata_path, metadata)

    def _load_metadata(self) -> dict[str, Any]:
        if not self.metadata_path.exists():
            return {}
        import json

        return json.loads(self.metadata_path.read_text(encoding="utf-8"))

    def _resolve_index(self, content_key: str | None) -> int | None:
        if not content_key:
            return None
        if content_key in self.content_id_to_idx:
            return self.content_id_to_idx[content_key]
        if content_key in self.slug_to_idx:
            return self.slug_to_idx[content_key]
        return None

    def _compute_ml_scores(self, seed_index: int | None, watched_indexes: list[int]) -> np.ndarray:
        size = len(self.catalog)
        if size == 0:
            return np.array([])

        score = np.zeros(size, dtype=np.float64)

        if seed_index is not None and self.tfidf_matrix is not None:
            seed_vec = self.tfidf_matrix[seed_index : seed_index + 1]
            content_sim = linear_kernel(seed_vec, self.tfidf_matrix).flatten()
            score += content_sim

        if watched_indexes and self.tfidf_matrix is not None:
            watched_vec = self.tfidf_matrix[watched_indexes]
            # Mean similarity from watched items yields a preference vector approximation.
            watched_sim = linear_kernel(watched_vec, self.tfidf_matrix).mean(axis=0)
            if hasattr(watched_sim, "A1"):
                watched_sim = watched_sim.A1
            score += np.asarray(watched_sim).reshape(-1)

        if np.max(score) <= 0:
            # fallback to normalized rating when there is no signal
            rating = self.catalog["rating"].to_numpy(dtype=np.float64)
            rating = rating - np.min(rating)
            den = np.max(rating)
            return rating / den if den > 0 else np.zeros_like(rating)

        min_score = np.min(score)
        max_score = np.max(score)
        return (score - min_score) / (max_score - min_score + 1e-12)

    def _build_popularity_scores(self, catalog: pd.DataFrame) -> dict[str, float]:
        rating = catalog["rating"].astype(float).to_numpy()
        year = catalog["year"].astype(float).to_numpy()
        premium = catalog["premium"].astype(int).to_numpy()

        r_norm = self._normalize_array(rating)
        y_norm = self._normalize_array(year)

        # Popularity proxy: rating + recency + small non-premium accessibility boost.
        p = (r_norm * 0.65) + (y_norm * 0.25) + ((1 - premium) * 0.10)

        keys = catalog["content_id"].astype(str).tolist()
        return {key: float(p[idx]) for idx, key in enumerate(keys)}

    def _build_cf_scores(self, catalog: pd.DataFrame) -> dict[str, dict[str, float]]:
        ratings = load_ratings()
        if ratings.empty or not {"userId", "movieId", "rating"}.issubset(set(ratings.columns)):
            return {}

        # Optional collaborative signal via simple item co-occurrence counts.
        movie_id_set = set(catalog["content_id"].astype(str).tolist())
        ratings = ratings.copy()
        ratings["movieId"] = ratings["movieId"].astype(str)
        ratings = ratings[ratings["movieId"].isin(movie_id_set)]
        if ratings.empty:
            return {}

        by_user = ratings.groupby("userId")["movieId"].apply(lambda series: sorted(set(series.tolist())))

        co_counts: dict[str, dict[str, int]] = {}
        for movies in by_user:
            for i, left in enumerate(movies):
                left_map = co_counts.setdefault(left, {})
                for right in movies[i + 1 :]:
                    left_map[right] = left_map.get(right, 0) + 1
                    right_map = co_counts.setdefault(right, {})
                    right_map[left] = right_map.get(left, 0) + 1

        # Normalize neighbor strengths.
        output: dict[str, dict[str, float]] = {}
        for item, neighbors in co_counts.items():
            if not neighbors:
                continue
            values = np.array(list(neighbors.values()), dtype=np.float64)
            den = float(np.max(values)) if np.max(values) > 0 else 1.0
            output[item] = {neighbor: float(val / den) for neighbor, val in neighbors.items()}

        return output

    def _compute_cf_scores(self, watched_ids: list[str]) -> np.ndarray:
        scores = np.zeros(len(self.catalog), dtype=np.float64)
        if not watched_ids or not self.cf_scores:
            return scores

        id_set = {item for item in watched_ids if item}

        aggregate: dict[str, float] = {}
        for source in id_set:
            if source in self.cf_scores:
                for target, weight in self.cf_scores[source].items():
                    aggregate[target] = aggregate.get(target, 0.0) + weight

        if not aggregate:
            return scores

        max_value = max(aggregate.values()) if aggregate else 1.0
        if max_value <= 0:
            return scores

        for idx, row in self.catalog.iterrows():
            content_id = str(row["content_id"])
            slug = str(row["slug"])
            raw = aggregate.get(content_id, aggregate.get(slug, 0.0))
            scores[idx] = raw / max_value

        return scores

    def _vector_from_dict(self, score_map: dict[str, float]) -> np.ndarray:
        out = np.zeros(len(self.catalog), dtype=np.float64)
        for idx, row in self.catalog.iterrows():
            key = str(row["content_id"])
            out[idx] = float(score_map.get(key, 0.0))
        return out

    @staticmethod
    def _normalize_array(values: np.ndarray) -> np.ndarray:
        if values.size == 0:
            return values
        min_v = float(np.min(values))
        max_v = float(np.max(values))
        if math.isclose(min_v, max_v):
            return np.ones_like(values, dtype=np.float64)
        return (values - min_v) / (max_v - min_v)
