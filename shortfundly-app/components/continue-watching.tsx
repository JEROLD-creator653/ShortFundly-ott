"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = {
  slug: string;
  title: string;
  progress: number;
};

const KEY = "shortfundly:continue";

export function ContinueWatching() {
  const [items, setItems] = useState<Item[]>([]);

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
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/watch/${item.slug}`}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 transition hover:border-primary"
          >
            <p className="font-semibold text-white">{item.title}</p>
            <progress
              className="mt-3 h-2 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-zinc-800 [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary"
              max={100}
              value={Math.min(100, Math.max(0, item.progress))}
            />
            <p className="mt-2 text-xs text-zinc-400">{Math.round(item.progress)}% completed</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
