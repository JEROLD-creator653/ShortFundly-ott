"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MyListItem = {
  slug: string;
  title: string;
  thumbnail: string;
  genre: string;
  duration: string;
  year: number;
  rating: number;
  premium: boolean;
  addedAt: string;
};

export function MyListGrid() {
  const [items, setItems] = useState<MyListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user/my-list", { cache: "no-store" });
        if (!response.ok) {
          if (active) setItems([]);
          return;
        }

        const data = (await response.json()) as { items?: MyListItem[] };
        if (active) {
          setItems(data.items || []);
        }
      } catch {
        if (active) setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const removeItem = async (slug: string) => {
    const previous = items;
    setItems((current) => current.filter((item) => item.slug !== slug));

    try {
      const response = await fetch(`/api/user/my-list?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        setItems(previous);
      }
    } catch {
      setItems(previous);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 text-center text-zinc-400">
        Loading your list...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 text-center">
        <p className="text-lg text-zinc-300">Your Watch List is empty.</p>
        <p className="mt-2 text-sm text-zinc-500">Add movies from any watch page to build your personal queue.</p>
        <Link
          href="/explore"
          className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
        >
          Explore Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.slug} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70">
          <Link href={`/watch/${item.slug}`} className="block">
            <div className="relative aspect-video overflow-hidden">
              <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              {item.premium ? (
                <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
                  Premium
                </span>
              ) : null}
            </div>
          </Link>
          <div className="space-y-3 p-4">
            <div>
              <Link href={`/watch/${item.slug}`} className="font-semibold text-white hover:text-primary">
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-zinc-400">
                {item.genre} · {item.duration} · {item.year} · Rating {item.rating}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.slug)}
              className="rounded-full border border-rose-500/40 bg-rose-600/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose-200 transition hover:bg-rose-600/25"
            >
              Remove
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
