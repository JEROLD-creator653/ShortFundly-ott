import { catalog } from "@/lib/catalog";
import type { Film } from "@/lib/types";

const base = (process.env.NEXT_PUBLIC_CONTENT_API_BASE_URL || "https://sfapi.shortfundly.com/").replace(/\/$/, "");
const apiKey = process.env.NEXT_PUBLIC_CONTENT_API_KEY || "web-X-Shortfundly-x-api-key";
const PAGE_LIMIT = 50;
const MAX_PAGES = 30;

type UnknownRecord = Record<string, unknown>;
type ApiImage = {
  src?: string;
  width?: number;
  type?: string;
};

type ApiPagedPayload = {
  docs?: unknown;
  totalPages?: number;
  page?: number;
  hasNextPage?: boolean;
};

type ApiBannerPayload = {
  payload?: unknown;
};

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function normalizeImage(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (value === "null") return undefined;

  const candidate = value.startsWith("//")
    ? `https:${value}`
    : value.startsWith("/")
      ? `https://web.shortfundly.com${value}`
      : value;


  try {
    const url = new URL(candidate);
    const width = url.searchParams.get("width");
    const height = url.searchParams.get("height");

    if (width === "undefined" || width === "null" || width === "") {
      url.searchParams.delete("width");
    }

    if (height === "undefined" || height === "null" || height === "") {
      url.searchParams.delete("height");
    }

    return url.toString();
  } catch {
    return candidate.replace(/[?&](width|height)=undefined/gi, "").replace(/[?&](width|height)=null/gi, "");
  }
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function pickImageFromList(images: unknown): string | undefined {
  const candidates = asArray(images)
    .filter((image): image is ApiImage => Boolean(image && typeof image === "object"))
    .filter((image) => {
      const type = asString(image.type)?.toLowerCase();
      const src = asString(image.src);
      return !!src && (!type || type.startsWith("image/"));
    })
    .sort((a, b) => (asNumber(b.width) || 0) - (asNumber(a.width) || 0));

  return normalizeImage(asString(candidates[0]?.src));
}

function parseDuration(value: unknown): string {
  const raw = asString(value);
  if (!raw) return "15m";

  const hhmmss = raw.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
  if (hhmmss) {
    const hours = Number(hhmmss[1]);
    const minutes = Number(hhmmss[2]);
    const totalMinutes = hours * 60 + minutes;
    return `${Math.max(1, totalMinutes)}m`;
  }

  const numeric = asNumber(raw);
  if (numeric && numeric > 0) {
    const minutes = numeric > 200 ? Math.round(numeric / 60) : Math.round(numeric);
    return `${Math.max(1, minutes)}m`;
  }

  return "15m";
}

function parseYear(value: unknown): number {
  const text = asString(value);
  if (text) {
    const maybeYear = Number(text.slice(0, 4));
    if (Number.isFinite(maybeYear) && maybeYear > 1900) return maybeYear;
  }

  return asNumber(value) ?? new Date().getFullYear();
}

function parsePremium(item: UnknownRecord): boolean {
  const mode = asString(item.release_mode)?.toLowerCase();
  const price = asNumber(item.release_pay) ?? asNumber(item.ticket_price) ?? 0;
  return mode === "paid" || price > 0;
}

function parseRating(item: UnknownRecord): number {
  const direct = asNumber(item.rating) ?? asNumber(item.mediaVoteCount);
  if (direct && direct > 0 && direct <= 5) return Number(direct.toFixed(1));

  const liked = asNumber(item.liked) ?? 0;
  const disliked = asNumber(item.disliked) ?? 0;
  const total = liked + disliked;
  if (total > 0) {
    return Number(((liked / total) * 5).toFixed(1));
  }

  return 4.5;
}

function parseLanguage(item: UnknownRecord): string | undefined {
  const knownLanguages = ["Hindi", "English", "Tamil", "Telugu", "Malayalam", "Kannada", "Marathi", "Bengali", "Gujarati", "Punjabi"];
  const haystack = [
    asString(item.tags),
    asString(item.title) ?? asString(item.name),
    asString(item.description) ?? asString(item.synopsis)
  ]
    .join(" ")
    .toLowerCase();

  for (const lang of knownLanguages) {
    if (haystack.includes(lang.toLowerCase())) {
      return lang;
    }
  }
  return undefined;
}

function normalizeFilm(item: UnknownRecord): Film | undefined {
  const title = asString(item.title) ?? asString(item.name);
  if (!title) return undefined;

  const id = asString(item._id) ?? asString(item.id);

  const slug =
    asString(item.slug) ??
    id ??
    asString(item.permalink) ??
    asString(item.mediaId) ??
    toSlug(title);

  const thumbnail =
    pickImageFromList(item.images) ??
    normalizeImage(asString(item.thumb)) ??
    normalizeImage(asString(item.thumbnail)) ??
    normalizeImage(asString(item.poster)) ??
    normalizeImage(asString(item.posterUrl)) ??
    normalizeImage(asString(item.image)) ??
    normalizeImage(asString(item.imageUrl)) ??
    "/images/poster-wings.svg";

  const year =
    parseYear(item.pubdate) ??
    parseYear(item.createdAt) ??
    parseYear(item.year) ??
    parseYear(item.releaseYear) ??
    parseYear(item.release_year);

  const rating = parseRating(item);

  const premium =
    parsePremium(item) ||
    item.premium === true ||
    item.isPremium === true ||
    asString(item.access)?.toLowerCase() === "premium";

  const mediaId = asString(item.mediaId);
  const source = asString(item.source);
  const stream = asString(item.streamUrl) ?? asString(item.videoUrl) ?? asString(item.video);

  return {
    id,
    slug,
    title,
    genre:
      asString((item.category as UnknownRecord | undefined)?.name) ??
      asString(item.genre) ??
      asString(item.category) ??
      "Drama",
    duration: parseDuration(item.duration),
    year,
    rating,
    premium,
    thumbnail,
    synopsis: asString(item.synopsis) ?? asString(item.description) ?? asString(item.certify) ?? "",
    language: asString(item.language) ?? asString((item.language as UnknownRecord)?.name) ?? parseLanguage(item) ?? "Hindi",
    festival: asString(item.festival),
    videoUrl:
      source ??
      stream ??
      (mediaId ? `https://cdn.jwplayer.com/manifests/${mediaId}.m3u8` : undefined) ??
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  };
}

function normalizeCatalog(items: unknown): Film[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => (item && typeof item === "object" ? normalizeFilm(item as UnknownRecord) : undefined))
    .filter((item): item is Film => Boolean(item));
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "x-api-key": apiKey
    },
    next: { revalidate: 300 }
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

function dedupeBySlug(items: Film[]): Film[] {
  const map = new Map<string, Film>();
  for (const film of items) {
    if (!map.has(film.slug)) {
      map.set(film.slug, film);
    }
  }
  return [...map.values()];
}

function tokenizeFilm(film: Film): string[] {
  const source = [
    film.title,
    film.genre,
    film.language ?? "",
    film.festival ?? "",
    film.synopsis
  ]
    .join(" ")
    .toLowerCase();

  return source
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function buildTfidfVectors(films: Film[]): Map<string, Map<string, number>> {
  const docs = films.map((film) => ({
    key: film.id ?? film.slug,
    tokens: tokenizeFilm(film)
  }));

  const docFreq = new Map<string, number>();
  for (const doc of docs) {
    const uniq = new Set(doc.tokens);
    for (const token of uniq) {
      docFreq.set(token, (docFreq.get(token) ?? 0) + 1);
    }
  }

  const totalDocs = Math.max(1, docs.length);
  const vectors = new Map<string, Map<string, number>>();

  for (const doc of docs) {
    const tf = new Map<string, number>();
    for (const token of doc.tokens) {
      tf.set(token, (tf.get(token) ?? 0) + 1);
    }

    const vector = new Map<string, number>();
    const tokenCount = Math.max(1, doc.tokens.length);
    for (const [token, count] of tf.entries()) {
      const normalizedTf = count / tokenCount;
      const idf = Math.log((totalDocs + 1) / ((docFreq.get(token) ?? 0) + 1)) + 1;
      vector.set(token, normalizedTf * idf);
    }

    vectors.set(doc.key, vector);
  }

  return vectors;
}

function cosineSimilarity(a: Map<string, number> | undefined, b: Map<string, number> | undefined): number {
  if (!a || !b || !a.size || !b.size) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const value of a.values()) normA += value * value;
  for (const value of b.values()) normB += value * value;

  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const [token, value] of small.entries()) {
    dot += value * (large.get(token) ?? 0);
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom > 0 ? dot / denom : 0;
}

function normalize(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return 0;
  if (max <= min) return 1;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

async function fetchAllMovies(): Promise<Film[]> {
  const allDocs: unknown[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= MAX_PAGES) {
    const payload = await fetchJson<ApiPagedPayload>(
      `${base}/film?sort=popular&page=${page}&limit=${PAGE_LIMIT}`
    );

    const docs = asArray(payload.docs);
    allDocs.push(...docs);

    totalPages = asNumber(payload.totalPages) ?? 1;
    if (payload.hasNextPage === false) break;
    page += 1;
  }

  return normalizeCatalog(allDocs);
}

async function fetchBannerMovies(): Promise<Film[]> {
  const payload = await fetchJson<ApiBannerPayload>(`${base}/film/banner/films`);
  return normalizeCatalog(payload.payload);
}

export async function getCatalog(): Promise<Film[]> {
  try {
    const [movies, banners] = await Promise.all([fetchAllMovies(), fetchBannerMovies()]);

    // Keep banner items first so card images match live site hero/banner art.
    const merged = dedupeBySlug([...banners, ...movies]);
    return merged.length ? merged : catalog;
  } catch {
    return catalog;
  }
}

export async function getFilm(slug: string): Promise<Film | undefined> {
  const local = catalog.find((film) => film.slug === slug || film.id === slug);

  try {
    const catalogData = await getCatalog();
    const matched = catalogData.find((film) => film.slug === slug || film.id === slug);
    if (matched) return matched;

    const bySlug = await fetchJson<{ docs?: unknown; payload?: unknown }>(`${base}/film/slug/${slug}`);
    const fromSlug = normalizeCatalog(bySlug.docs ?? bySlug.payload)[0];
    return fromSlug ?? local;
  } catch {
    return local;
  }
}

export async function getRelatedFilms(film: Film, limit = 12): Promise<Film[]> {
  const all = await getCatalog();
  const currentKey = film.id ?? film.slug;
  const candidates = all.filter((f) => (f.id ?? f.slug) !== currentKey);
  if (!candidates.length) return [];

  // Hybrid ranking inspired by the attached notebooks:
  // 1) Content score via TF-IDF cosine similarity.
  // 2) Collaborative proxy via audience/popularity signals.
  const vectors = buildTfidfVectors(all);
  const currentVector = vectors.get(currentKey);

  const ratings = candidates.map((item) => item.rating);
  const years = candidates.map((item) => item.year);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const scored = candidates
    .map((candidate) => {
      const candidateKey = candidate.id ?? candidate.slug;
      const contentScore = cosineSimilarity(currentVector, vectors.get(candidateKey));

      const ratingScore = normalize(candidate.rating, minRating, maxRating);
      const recencyScore = normalize(candidate.year, minYear, maxYear);
      const languageBoost =
        film.language && candidate.language && film.language.toLowerCase() === candidate.language.toLowerCase() ? 1 : 0;
      const genreBoost = candidate.genre.toLowerCase() === film.genre.toLowerCase() ? 1 : 0;

      // Approximate collaborative affinity from what broad audience tends to prefer.
      const collaborativeScore =
        ratingScore * 0.55 +
        recencyScore * 0.15 +
        languageBoost * 0.15 +
        genreBoost * 0.15;

      const hybridScore = contentScore * 0.7 + collaborativeScore * 0.3;

      return {
        film: candidate,
        score: hybridScore,
        contentScore,
        collaborativeScore
      };
    })
    .sort((a, b) => b.score - a.score || b.contentScore - a.contentScore || b.collaborativeScore - a.collaborativeScore);

  return scored.slice(0, limit).map((item) => item.film);
}
