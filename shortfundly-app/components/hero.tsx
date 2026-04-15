"use client";

import Link from "next/link";
import type { Film } from "@/lib/types";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  features: Film[];
};

const VISIBLE_PREVIEWS = 5;

export function Hero({ features }: Props) {
  const uniqueFeatures = useMemo(() => {
    const seen = new Set<string>();
    return features.filter((film) => {
      const key = film.slug || film.thumbnail;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [features]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const [isBarHovered, setIsBarHovered] = useState(false);

  const total = uniqueFeatures.length;
  const safeActiveIndex = Math.min(activeIndex, Math.max(0, total - 1));
  const activeFeature = uniqueFeatures[safeActiveIndex];

  useEffect(() => {
    setActiveIndex(0);
    setWindowStart(0);
  }, [total]);

  useEffect(() => {
    if (total < 2 || isBarHovered) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [total, isBarHovered]);

  useEffect(() => {
    if (safeActiveIndex < windowStart) {
      setWindowStart(safeActiveIndex);
      return;
    }

    const end = windowStart + VISIBLE_PREVIEWS;
    if (safeActiveIndex >= end) {
      setWindowStart(safeActiveIndex - VISIBLE_PREVIEWS + 1);
    }
  }, [safeActiveIndex, windowStart]);

  const rawSynopsis = activeFeature?.synopsis?.trim() || "";
  const displayTitle = activeFeature?.title.split("-")[0]?.trim() || "";
  const compactSynopsis = rawSynopsis.slice(0, 80);
  const watchPath = `/watch/${activeFeature.id ?? activeFeature.slug}`;
  const previewItems = useMemo(
    () => uniqueFeatures.slice(windowStart, windowStart + VISIBLE_PREVIEWS),
    [uniqueFeatures, windowStart]
  );

  if (!activeFeature) return null;

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="group/hero-ui relative -mt-20 min-h-[100svh] overflow-hidden border-b border-zinc-900 md:-mt-24 md:min-h-[100svh]">
      <HeroBackgroundVideo
        sourceKey={activeFeature.slug}
        title={activeFeature.title}
        thumbnail={activeFeature.thumbnail}
        videoUrl={activeFeature.videoUrl}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/65" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-end px-4 pb-12 pt-28 md:min-h-[100svh] md:px-8 md:pb-36 md:pt-32">
        <div className="max-w-2xl animate-rise opacity-60 transition-opacity duration-300 group-hover/hero-ui:opacity-100">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">Free Trial</p>
          <h1 className="max-w-[16ch] text-5xl uppercase leading-[0.9] text-white md:text-7xl [font-family:var(--font-heading)]">
            {displayTitle}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-100/90 md:text-2xl">
            <span>{activeFeature.genre}</span>
            <span className="inline-flex items-center gap-1">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current text-amber-400 md:h-5 md:w-5">
                <path d="M10 1.5l2.573 5.213 5.757.836-4.165 4.058.983 5.733L10 14.629l-5.148 2.71.983-5.733L1.67 7.549l5.757-.836L10 1.5z" />
              </svg>
              <span>{activeFeature.rating}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current text-zinc-200 md:h-5 md:w-5">
                <circle cx="12" cy="12" r="8.5" strokeWidth="1.8" />
                <path d="M12 7.5v5l3 2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{activeFeature.duration}</span>
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={watchPath}
              aria-label={`Play ${displayTitle}`}
              className="inline-flex items-center rounded bg-white px-7 py-3 text-base font-bold text-black transition hover:bg-zinc-200"
            >
              Play
            </Link>
            <Link
              href={`${watchPath}#movie-details`}
              aria-label={`More info about ${displayTitle}`}
              className="inline-flex items-center rounded bg-zinc-600/80 px-7 py-3 text-base font-bold text-white backdrop-blur transition hover:bg-zinc-500/90"
            >
              More Info
            </Link>
          </div>
          {activeFeature.festival ? <p className="mt-5 text-sm text-primary">{activeFeature.festival}</p> : null}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 hidden md:block">
        <div
          className="group mx-auto flex w-full max-w-7xl items-center justify-end gap-3 px-8 opacity-50 transition-opacity duration-200 group-hover:opacity-100"
          onMouseEnter={() => setIsBarHovered(true)}
          onMouseLeave={() => setIsBarHovered(false)}
        >
          <button
            type="button"
            aria-label="Show previous movie"
            onClick={goPrev}
            className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-500/80 bg-black/65 text-white shadow-lg shadow-black/40 transition hover:border-white"
          >
            <span className="-mt-0.5 text-lg leading-none">‹</span>
          </button>

          <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-zinc-700/90 bg-black/50 p-3 shadow-2xl shadow-black/30 backdrop-blur">
            {previewItems.map((film, index) => {
              const realIndex = windowStart + index;
              return (
                <button
                  key={film.slug}
                  type="button"
                  aria-label={`Show ${film.title} trailer`}
                  onClick={() => setActiveIndex(realIndex)}
                  className={`relative h-14 w-24 overflow-hidden rounded-md border transition duration-200 hover:z-10 hover:scale-105 ${
                    realIndex === safeActiveIndex
                      ? "border-white ring-1 ring-white/60"
                      : "border-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  {film.thumbnail.endsWith('.svg') ? (
                    <img src={film.thumbnail} alt={film.title} className="h-full w-full object-cover" />
                  ) : (
                    <Image src={film.thumbnail} alt={film.title} fill sizes="96px" unoptimized className="object-cover" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Show next movie"
            onClick={goNext}
            className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-500/80 bg-black/65 text-white shadow-lg shadow-black/40 transition hover:border-white"
          >
            <span className="-mt-0.5 text-lg leading-none">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
