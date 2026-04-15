"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Film } from "@/lib/types";

type Props = {
  films: Film[];
  currentContentId?: string;
};

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
};

type RecommendationResponse = {
  items: RecommendationItem[];
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

export function RecommendationRail({ films, currentContentId }: Props) {
  const [loading, setLoading] = useState(true);
  const [recommendedFilms, setRecommendedFilms] = useState<Film[]>([]);
  const fallback = useMemo(() => films.slice(0, 12), [films]);
  const recommenderBase = process.env.NEXT_PUBLIC_RECOMMENDER_API_URL?.trim();

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        if (!recommenderBase) {
          if (active) {
            setRecommendedFilms(fallback);
            setLoading(false);
          }
          return;
        }

        const userId = getOrCreateUserId();
        const raw = localStorage.getItem(CONTINUE_KEY);
        const parsed = raw ? (JSON.parse(raw) as ContinueItem[]) : [];
        const watchedIds = parsed.map((item) => item.slug).filter(Boolean);
        const query = new URLSearchParams({
          user_id: userId,
          limit: "12"
        });

        if (currentContentId) {
          query.set("content_id", currentContentId);
        }
        if (watchedIds.length) {
          query.set("watched_ids", watchedIds.join(","));
        }

        const response = await fetch(`${recommenderBase}/recommendations?${query.toString()}`, {
          method: "GET",
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error(`Recommendations request failed: ${response.status}`);
        }

        const payload = (await response.json()) as RecommendationResponse;
        const seen = new Set<string>();
        const next = payload.items
          .map(toFilm)
          .filter((film) => (film.id ?? film.slug) !== currentContentId)
          .filter((film) => {
            const key = `${film.id ?? ""}:${film.slug}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          })
          .slice(0, 12);

        if (active) {
          setRecommendedFilms(next.length ? next : fallback);
        }
      } catch {
        if (active) {
          setRecommendedFilms(fallback);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, [currentContentId, fallback, recommenderBase]);

  const rankedFilms = useMemo(() => {
    if (recommendedFilms.length) return recommendedFilms;
    return fallback;
  }, [recommendedFilms, fallback]);

  if (!rankedFilms.length) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-5 text-2xl uppercase tracking-wider text-white [font-family:var(--font-heading)] md:text-3xl">
        You may also like ✨
      </h2>
      {loading ? (
        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-1">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={`you-may-like-skeleton-${idx}`}
              className="w-72 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950/70"
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
          {rankedFilms.map((film, idx) => (
            <RecommendCard key={`${film.id ?? "no-id"}:${film.slug}:${idx}`} film={film} />
          ))}
        </div>
      )}
    </section>
  );
}

function RecommendCard({ film }: { film: Film }) {
  const watchPath = `/watch/${film.id ?? film.slug}`;
  const [imgSrc, setImgSrc] = useState(film.thumbnail);
  const isSvg = imgSrc.endsWith(".svg");

  return (
    <Link
      href={watchPath}
      className="group relative w-72 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-[0_8px_24px_rgba(251,90,50,0.18)]"
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
            sizes="288px"
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImgSrc("/images/poster-wings.svg")}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {film.premium && (
          <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
            Premium
          </span>
        )}
      </div>
      <div className="space-y-1 p-5">
        <p className="line-clamp-1 text-lg font-semibold text-white">{film.title}</p>
        <p className="text-sm text-zinc-400">{film.genre} · {film.year}</p>
      </div>
    </Link>
  );
}
