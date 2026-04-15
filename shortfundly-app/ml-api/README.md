# ML Recommendation API

Production-oriented FastAPI recommender service extracted from the notebooks.

## Features

- Content-based recommendations with TF-IDF + cosine similarity
- Optional collaborative signal using item co-occurrence if `ratings.csv` exists
- Hybrid ranking with popularity boost and rewatch penalty
- Startup model load and in-memory response caching

## Structure

- `app.py`: FastAPI app and `/recommendations` endpoint
- `services/preprocessing.py`: Catalog normalization and data loading
- `services/recommender.py`: Model build/load and inference pipeline

## Environment Variables

- `CONTENT_API_BASE_URL` (default: `https://sfapi.shortfundly.com`)
- `CONTENT_API_KEY` (server-side only)
- `RATINGS_DATA_PATH` (optional path to ratings CSV)
- `CORS_ALLOW_ORIGINS` (default: `*`)
- `RECOMMENDER_CACHE_TTL_SECONDS` (default: `30`)
- `LOG_LEVEL` (default: `INFO`)

## Run

```bash
cd ml-api
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8001 --reload
```

## Endpoint

`GET /recommendations?user_id=<id>&content_id=<id>&watched_ids=<comma-separated>&limit=16`

Response includes scored movie items with ranking breakdown fields.
