"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Film } from "@/lib/types";

type Props = {
  film: Film;
};

type MyListItem = {
  slug: string;
};

export function MyListButton({ film }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [added, setAdded] = useState(false);

  const payload = useMemo(
    () => ({
      slug: film.slug,
      title: film.title,
      thumbnail: film.thumbnail,
      genre: film.genre,
      duration: film.duration,
      year: film.year,
      rating: film.rating,
      premium: film.premium
    }),
    [film]
  );

  useEffect(() => {
    let active = true;

    const loadStatus = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user/my-list", { cache: "no-store" });
        if (response.status === 401) {
          if (active) setAdded(false);
          return;
        }

        const data = (await response.json()) as { items?: MyListItem[] };
        if (!active) return;
        setAdded(Boolean(data.items?.some((item) => item.slug === film.slug)));
      } catch {
        if (active) setAdded(false);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadStatus();

    return () => {
      active = false;
    };
  }, [film.slug]);

  const toggle = async () => {
    if (saving || loading) return;

    setSaving(true);
    try {
      const response = added
        ? await fetch(`/api/user/my-list?slug=${encodeURIComponent(film.slug)}`, { method: "DELETE" })
        : await fetch("/api/user/my-list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

      if (response.status === 401) {
        router.push("/login?role=user");
        return;
      }

      if (!response.ok) {
        return;
      }

      setAdded(!added);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading || saving}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${
        added
          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25"
          : "border-zinc-700 bg-zinc-900/70 text-zinc-200 hover:border-primary hover:text-primary"
      } disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {loading || saving ? (
        <span className="h-4 w-4 flex-none border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : added ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-none">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-none">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      )}
      <span>{loading ? "Checking..." : saving ? "Updating..." : added ? "Added to Watch List" : "Add to Watch List"}</span>
    </button>
  );
}
