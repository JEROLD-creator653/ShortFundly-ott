"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Film } from "@/lib/types";

type Props = {
  films: Film[];
};

type ContinueItem = {
  slug: string;
  title: string;
  progress: number;
};

const CONTINUE_KEY = "shortfundly:continue";

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

export function RecommendationRail({ films }: Props) {
  const [history, setHistory] = useState<ContinueItem[]>([]);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(CONTINUE_KEY);
        if (!raw) {
          setHistory([]);
          return;
        }
        const parsed = JSON.parse(raw) as ContinueItem[];
        setHistory(parsed.filter((item) => typeof item.slug === "string" && typeof item.title === "string"));
      } catch {
        setHistory([]);
      }
    };

    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const rankedFilms = useMemo(() => {
    if (!films.length) return [];

    const seenBySlug = new Map(history.map((item) => [item.slug, item.progress]));
    const watchedTokens = history.flatMap((item) => tokenize(item.title));
    const tokenFrequency = watchedTokens.reduce((map, token) => {
      map.set(token, (map.get(token) ?? 0) + 1);
      return map;
    }, new Map<string, number>());

    return films
      .map((film, index) => {
        const filmTokens = tokenize(`${film.title} ${film.genre}`);
        const titleAffinity = filmTokens.reduce((sum, token) => sum + (tokenFrequency.get(token) ?? 0), 0);
        const watchedProgress = seenBySlug.get(film.slug) ?? seenBySlug.get(film.id ?? "") ?? 0;

        // Preserve server-side hybrid order while adapting to user watch-history.
        const baseOrderScore = (films.length - index) / films.length;
        const historyScore = titleAffinity * 0.25;
        const rewatchPenalty = watchedProgress > 60 ? -2 : watchedProgress > 0 ? -0.5 : 0;
        const score = baseOrderScore + historyScore + rewatchPenalty;

        return { film, score };
      })
      .sort((a, b) => b.score - a.score)
      .map((item) => item.film);
  }, [films, history]);

  if (!rankedFilms.length) return null;

  return (
    <section className="mt-6">
      <h2 className="mb-4 text-xl uppercase tracking-wider text-white [font-family:var(--font-heading)]">
        You may also like ✨
      </h2>
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-1">
        {rankedFilms.map((film) => (
          <RecommendCard key={film.slug} film={film} />
        ))}
      </div>
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
      className="group relative flex-shrink-0 w-64 overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950/70 transition-all duration-300 hover:border-primary/70 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(251,90,50,0.18)]"
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
        {film.premium && (
          <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
            Premium
          </span>
        )}
      </div>
      <div className="p-4 space-y-1">
        <p className="text-base font-semibold text-white line-clamp-1">{film.title}</p>
        <p className="text-sm text-zinc-400">{film.genre} · {film.year}</p>
      </div>
    </Link>
  );
}
