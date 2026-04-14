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
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("/")) return `https://web.shortfundly.com${value}`;
  return value;
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

function normalizeFilm(item: UnknownRecord): Film | undefined {
  const title = asString(item.title) ?? asString(item.name);
  if (!title) return undefined;

  const slug =
    asString(item.slug) ??
    asString(item._id) ??
    asString(item.permalink) ??
    asString(item.mediaId) ??
    asString(item.id) ??
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
  const local = catalog.find((film) => film.slug === slug);

  try {
    const catalogData = await getCatalog();
    const matched = catalogData.find((film) => film.slug === slug);
    if (matched) return matched;

    const bySlug = await fetchJson<{ docs?: unknown; payload?: unknown }>(`${base}/film/slug/${slug}`);
    const fromSlug = normalizeCatalog(bySlug.docs ?? bySlug.payload)[0];
    return fromSlug ?? local;
  } catch {
    return local;
  }
}
