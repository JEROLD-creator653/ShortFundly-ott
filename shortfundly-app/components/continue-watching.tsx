"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Film } from "@/lib/types";

type Item = {
  slug: string;
  title: string;
  progress: number;
};

const KEY = "shortfundly:continue";

type Props = {
  films: Film[];
};

export function ContinueWatching({ films }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const filmBySlug = useMemo(() => {
    const map = new Map<string, Film>();
    for (const film of films) {
      map.set(film.slug, film);
    }
    return map;
  }, [films]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Item[];
      setItems(parsed.slice(0, 3));
    } catch {
      setItems([]);
    }
  }, []);

  if (!items.length) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-7 md:px-8">
      <h2 className="mb-4 text-2xl uppercase tracking-wider [font-family:var(--font-heading)]">
        Continue Watching
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => {
          const film = filmBySlug.get(item.slug);
          const imageSrc = film?.thumbnail || "/images/poster-wings.svg";
          const isSvg = imageSrc.endsWith('.svg');
          return (
            <Link
              key={item.slug}
              href={`/watch/${item.slug}`}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 transition duration-300 hover:-translate-y-1 hover:border-primary"
            >
              <div className="relative aspect-video overflow-hidden">
                {isSvg ? (
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-white">{item.title}</p>
                <progress
                  className="mt-3 h-2 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-zinc-800 [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary"
                  max={100}
                  value={Math.min(100, Math.max(0, item.progress))}
                />
                <p className="mt-2 text-xs text-zinc-400">{Math.round(item.progress)}% completed</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
