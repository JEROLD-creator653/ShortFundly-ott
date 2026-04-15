from __future__ import annotations

import logging
import os
import time
from dataclasses import dataclass
from typing import Any

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from services.recommender import HybridRecommender

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(level=LOG_LEVEL, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
LOGGER = logging.getLogger("ml-api")


@dataclass(slots=True)
class CacheEntry:
    expires_at: float
    payload: dict[str, Any]


app = FastAPI(title="Shortfundly Recommender API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv("CORS_ALLOW_ORIGINS", "*").split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

recommender = HybridRecommender()
response_cache: dict[str, CacheEntry] = {}
CACHE_TTL_SECONDS = int(os.getenv("RECOMMENDER_CACHE_TTL_SECONDS", "30"))


@app.on_event("startup")
def startup() -> None:
    LOGGER.info("Loading recommender model on startup")
    recommender.load_or_build()
    LOGGER.info("Recommender ready")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/recommendations")
def get_recommendations(
    user_id: str = Query(default="anonymous", min_length=1, max_length=128),
    content_id: str | None = Query(default=None),
    watched_ids: str | None = Query(default=None, description="Comma-separated content IDs or slugs"),
    limit: int = Query(default=16, ge=1, le=40),
) -> dict[str, Any]:
    start = time.perf_counter()

    watched_list = [item.strip() for item in watched_ids.split(",")] if watched_ids else []
    cache_key = f"{user_id}|{content_id or ''}|{','.join(sorted(watched_list))}|{limit}"

    now = time.time()
    cached = response_cache.get(cache_key)
    if cached and cached.expires_at > now:
        return cached.payload

    items = recommender.recommend(
        user_id=user_id,
        content_id=content_id,
        watched_ids=watched_list,
        limit=limit,
    )

    elapsed_ms = (time.perf_counter() - start) * 1000
    payload = {
        "user_id": user_id,
        "content_id": content_id,
        "count": len(items),
        "latency_ms": round(elapsed_ms, 2),
        "items": items,
    }

    response_cache[cache_key] = CacheEntry(expires_at=now + CACHE_TTL_SECONDS, payload=payload)

    if elapsed_ms > 200:
        LOGGER.warning("Slow recommendation response: %.1fms for user=%s", elapsed_ms, user_id)
    else:
        LOGGER.info("Recommendation response in %.1fms for user=%s", elapsed_ms, user_id)

    return payload
