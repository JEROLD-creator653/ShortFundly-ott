"use client";

import { useEffect, useMemo, useState } from "react";

type PosterStyle = "thriller" | "romantic" | "action" | "festival" | "netflix";

type PosterItem = {
  _id: string;
  title: string;
  genre: string;
  style: PosterStyle;
  imageUrl: string;
  createdAt: string;
};

const STYLE_OPTIONS: Array<{ label: string; value: PosterStyle }> = [
  { label: "Thriller", value: "thriller" },
  { label: "Romantic", value: "romantic" },
  { label: "Action", value: "action" },
  { label: "Festival style", value: "festival" },
  { label: "Netflix style", value: "netflix" }
];

export function PosterStudio() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState<PosterStyle>("thriller");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posters, setPosters] = useState<PosterItem[]>([]);

  const canSubmit = useMemo(
    () => !!title.trim() && !!genre.trim() && !!description.trim() && !loading,
    [title, genre, description, loading]
  );

  const loadPosters = async () => {
    try {
      const response = await fetch("/api/posters", { cache: "no-store" });
      const payload = (await response.json()) as { posters?: PosterItem[] };
      setPosters(payload.posters || []);
    } catch {
      setPosters([]);
    }
  };

  useEffect(() => {
    void loadPosters();
  }, []);

  const onGenerate = async () => {
    if (!canSubmit) return;

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/posters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, genre, description, style })
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Unable to generate poster");
      }

      setTitle("");
      setGenre("");
      setDescription("");
      await loadPosters();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Poster generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
          <h2 className="text-3xl uppercase [font-family:var(--font-heading)]">AI Poster Generator</h2>
          <p className="mt-2 text-sm text-zinc-400">Generate release-ready OTT poster variants with style-specific prompts.</p>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Movie Title</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary"
                placeholder="Shadow of Chennai"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Genre</span>
              <input
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary"
                placeholder="Thriller"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Short Description</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-24 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-primary"
                placeholder="A suspended cop uncovers a missing evidence chain tied to a political murder."
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Poster Style</span>
              <select
                value={style}
                onChange={(event) => setStyle(event.target.value as PosterStyle)}
                className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary"
              >
                {STYLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}

          <button
            type="button"
            onClick={onGenerate}
            disabled={!canSubmit}
            className="mt-6 h-11 rounded-xl bg-primary px-5 text-sm font-semibold uppercase tracking-wider text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Poster"}
          </button>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
          <h3 className="text-xl font-semibold">Quick Export Notes</h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-300">
            <li>Generated image size: 1024x1536, optimized for OTT poster slots.</li>
            <li>Title and genre overlays are auto-composited for immediate publishing.</li>
            <li>Use Download to share with social and internal campaign teams.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl uppercase [font-family:var(--font-heading)]">Poster Gallery</h2>
          <button
            type="button"
            onClick={() => void loadPosters()}
            className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:border-primary hover:text-white"
          >
            Refresh
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posters.map((poster) => (
            <article key={poster._id} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70">
              <img src={poster.imageUrl} alt={poster.title} className="aspect-[2/3] w-full object-cover" />
              <div className="space-y-2 p-3">
                <h3 className="text-sm font-semibold text-white">{poster.title}</h3>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{poster.style}</p>
                <a
                  href={poster.imageUrl}
                  download
                  className="inline-flex rounded-lg border border-zinc-700 px-3 py-1 text-xs text-zinc-300 transition hover:border-primary hover:text-white"
                >
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
