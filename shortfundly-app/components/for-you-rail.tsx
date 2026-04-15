"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Film } from "@/lib/types";

type ContinueItem = {
  slug: string;
  title: string;
  progress: number;
};

type RecommendationItem = {
  content_id: string;
  slug: string;
  title: string;
  genre: string;
  language: string;
  year: number;
  rating: number;
  premium: boolean;
  thumbnail: string;
  duration: string;
  synopsis: string;
  festival?: string;
  video_url: string;
  score: number;
};

type RecommendationResponse = {
  user_id: string;
  content_id?: string;
  count: number;
  latency_ms: number;
  items: RecommendationItem[];
};

type Props = {
  fallbackFilms: Film[];
};

const CONTINUE_KEY = "shortfundly:continue";
const USER_KEY = "shortfundly:user-id";

function getOrCreateUserId(): string {
  const existing = localStorage.getItem(USER_KEY);
  if (existing) return existing;

  const generated =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem(USER_KEY, generated);
  return generated;
}

function toFilm(item: RecommendationItem): Film {
  return {
    id: item.content_id,
    slug: item.slug,
    title: item.title,
    genre: item.genre,
    duration: item.duration,
    year: item.year,
    rating: item.rating,
    premium: item.premium,
    thumbnail: item.thumbnail,
    synopsis: item.synopsis,
    language: item.language,
    festival: item.festival,
    videoUrl: item.video_url
  };
}

export function ForYouRail({ fallbackFilms }: Props) {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState<Film[]>([]);

  const fallback = useMemo(() => fallbackFilms.slice(0, 12), [fallbackFilms]);

  useEffect(() => {
    let active = true;

    async function loadRecommendations() {
      setLoading(true);
      try {
        const userId = getOrCreateUserId();
        const raw = localStorage.getItem(CONTINUE_KEY);
        const watched = raw ? (JSON.parse(raw) as ContinueItem[]) : [];

        const watchedIds = watched.map((item) => item.slug).filter(Boolean);
        const contentSeed = watchedIds[0] ?? "";
        const endpointBase = process.env.NEXT_PUBLIC_RECOMMENDER_API_URL || "http://127.0.0.1:8001";

        const query = new URLSearchParams({
          user_id: userId,
          limit: "12"
        });

        if (contentSeed) query.set("content_id", contentSeed);
        if (watchedIds.length) query.set("watched_ids", watchedIds.join(","));

        const response = await fetch(`${endpointBase}/recommendations?${query.toString()}`, {
          method: "GET",
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error(`Recommendations request failed: ${response.status}`);
        }

        const payload = (await response.json()) as RecommendationResponse;
        const next = payload.items.map(toFilm);

        if (active) {
          setFilms(next.length ? next : fallback);
        }
      } catch {
        if (active) {
          setFilms(fallback);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRecommendations();

    return () => {
      active = false;
    };
  }, [fallback]);

  const display = films.length ? films : fallback;
  if (!display.length && !loading) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-7 md:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl uppercase tracking-wider text-white [font-family:var(--font-heading)]">For You</h2>
        <span className="text-sm text-zinc-400">Personalized picks</span>
      </div>

      {loading ? (
        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-1">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={`for-you-skeleton-${idx}`}
              className="w-64 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950/70"
            >
              <div className="aspect-video animate-pulse bg-zinc-800/70" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800/70" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800/60" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-1">
          {display.map((film) => (
            <ForYouCard key={film.id ?? film.slug} film={film} />
          ))}
        </div>
      )}
    </section>
  );
}

function ForYouCard({ film }: { film: Film }) {
  const [imgSrc, setImgSrc] = useState(film.thumbnail);
  const isSvg = imgSrc.endsWith(".svg");

  return (
    <Link
      href={`/watch/${film.id ?? film.slug}`}
      className="group relative w-64 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-[0_8px_24px_rgba(251,90,50,0.18)]"
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-900">
        {isSvg ? (
          <img
            src={imgSrc}
            alt={film.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImgSrc("/images/poster-wings.svg")}
          />
        ) : (
          <Image
            src={imgSrc}
            alt={film.title}
            fill
            sizes="256px"
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImgSrc("/images/poster-wings.svg")}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="space-y-1 p-4">
        <p className="line-clamp-1 text-base font-semibold text-white">{film.title}</p>
        <p className="text-sm text-zinc-400">
          {film.genre} · {film.year}
        </p>
      </div>
    </Link>
  );
}
