"use client";

import { useEffect, useMemo, useState } from "react";

type TeaserRender = {
  _id: string;
  title: string;
  genre: string;
  language: string;
  duration: 15 | 30 | 45 | 60;
  mood: "epic" | "thriller" | "emotional" | "action" | "mystery";
  voiceStyle: "deep-male" | "cinematic-female" | "energetic" | "suspense";
  includeSubtitles: boolean;
  script: string;
  outputUrl?: string;
  status: "queued" | "rendering" | "completed" | "failed";
  errorMessage?: string;
  createdAt: string;
};

const DURATION_OPTIONS = [15, 30, 45, 60] as const;
const MOOD_OPTIONS = ["epic", "thriller", "emotional", "action", "mystery"] as const;
const VOICE_OPTIONS = ["deep-male", "cinematic-female", "energetic", "suspense"] as const;

function prettyTime(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

async function readApiPayload<T>(response: Response): Promise<{ data?: T; message?: string }> {
  const text = await response.text();
  if (!text) return {};

  try {
    const parsed = JSON.parse(text) as T & { message?: string };
    return { data: parsed, message: parsed.message };
  } catch {
    const snippet = text.replace(/\s+/g, " ").slice(0, 180);
    return { message: snippet || `Request failed with status ${response.status}` };
  }
}

export function CinematicTeaserStudio() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("Tamil");
  const [duration, setDuration] = useState<(typeof DURATION_OPTIONS)[number]>(45);
  const [mood, setMood] = useState<(typeof MOOD_OPTIONS)[number]>("epic");
  const [voiceStyle, setVoiceStyle] = useState<(typeof VOICE_OPTIONS)[number]>("deep-male");
  const [includeSubtitles, setIncludeSubtitles] = useState(true);

  const [poster, setPoster] = useState<File | null>(null);
  const [music, setMusic] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [clips, setClips] = useState<File[]>([]);

  const [renders, setRenders] = useState<TeaserRender[]>([]);
  const [activeRenderId, setActiveRenderId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = useMemo(() => {
    return Boolean(title.trim() && genre.trim() && language.trim()) && !loading;
  }, [title, genre, language, loading]);

  const loadHistory = async () => {
    try {
      const response = await fetch("/api/teasers", { cache: "no-store" });
      const { data } = await readApiPayload<{ jobs?: TeaserRender[] }>(response);
      setRenders(data?.jobs || []);
    } catch {
      setRenders([]);
    }
  };

  useEffect(() => {
    void loadHistory();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadHistory();
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!activeRenderId) return;

    const timer = window.setInterval(async () => {
      const response = await fetch(`/api/teasers/${activeRenderId}`, { cache: "no-store" });
      const { data } = await readApiPayload<{ teaser?: TeaserRender }>(response);
      const teaser = data?.teaser;

      if (!teaser) return;

      if (teaser.status === "queued") {
        setProgress((value) => Math.min(30, Math.max(value, value + 4)));
      } else if (teaser.status === "rendering") {
        setProgress((value) => Math.min(88, Math.max(value, value + 6)));
      } else if (teaser.status === "completed") {
        setProgress(100);
        setLoading(false);
        setActiveRenderId(null);
        await loadHistory();
      } else if (teaser.status === "failed") {
        setLoading(false);
        setActiveRenderId(null);
        setError(teaser.errorMessage || "Teaser generation failed.");
      }
    }, 2400);

    return () => window.clearInterval(timer);
  }, [activeRenderId]);

  const onGenerate = async () => {
    if (!canGenerate) return;

    setError(null);
    setLoading(true);
    setProgress(7);

    try {
      const form = new FormData();
      form.set("title", title.trim());
      form.set("genre", genre.trim());
      form.set("language", language.trim());
      form.set("duration", String(duration));
      form.set("mood", mood);
      form.set("voiceStyle", voiceStyle);
      form.set("includeSubtitles", String(includeSubtitles));

      if (poster) form.set("poster", poster);
      if (music) form.set("music", music);
      images.forEach((file) => form.append("images", file));
      clips.forEach((file) => form.append("clips", file));

      const response = await fetch("/api/teasers", {
        method: "POST",
        body: form
      });

      const { data, message } = await readApiPayload<{ ok: boolean; message?: string; teaser?: TeaserRender }>(response);
      if (!response.ok || !data?.ok || !data.teaser) {
        if (response.status === 413) {
          throw new Error("Upload too large (413). Reduce clip size or increase server body limit.");
        }
        throw new Error(data?.message || message || `Unable to create teaser render (${response.status})`);
      }

      setProgress(22);
      setActiveRenderId(data.teaser._id);

      if (data.teaser.status === "completed") {
        setProgress(100);
        setLoading(false);
        setActiveRenderId(null);
      }

      await loadHistory();
    } catch (err) {
      setLoading(false);
      setActiveRenderId(null);
      setError(err instanceof Error ? err.message : "Teaser generation failed");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-black p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(251,90,50,.22),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(20,184,166,.20),transparent_28%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/75 p-5">
            <h2 className="text-3xl uppercase [font-family:var(--font-heading)]">Cinematic AI Teaser Generator</h2>
            <p className="text-sm text-zinc-400">Craft premium OTT promo teasers with AI scriptwriting, dynamic pacing, dramatic transitions, and narration-ready timelines.</p>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 md:col-span-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Title</span>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary" placeholder="The Last Signal" />
              </label>

              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Genre</span>
                <input value={genre} onChange={(event) => setGenre(event.target.value)} className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary" placeholder="Thriller" />
              </label>

              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Language</span>
                <input value={language} onChange={(event) => setLanguage(event.target.value)} className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary" placeholder="Tamil" />
              </label>

              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Duration</span>
                <select value={duration} onChange={(event) => setDuration(Number(event.target.value) as 15 | 30 | 45 | 60)} className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary">
                  {DURATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}s</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Mood</span>
                <select value={mood} onChange={(event) => setMood(event.target.value as (typeof MOOD_OPTIONS)[number])} className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary">
                  {MOOD_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 md:col-span-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Voice-over Style</span>
                <select value={voiceStyle} onChange={(event) => setVoiceStyle(event.target.value as (typeof VOICE_OPTIONS)[number])} className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary">
                  {VOICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 md:col-span-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Poster (optional)</span>
                <input type="file" accept="image/*" onChange={(event) => setPoster(event.target.files?.[0] || null)} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-zinc-200" />
              </label>

              <label className="grid gap-2 md:col-span-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Images (multi)</span>
                <input type="file" accept="image/*" multiple onChange={(event) => setImages(Array.from(event.target.files || []))} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-zinc-200" />
              </label>

              <label className="grid gap-2 md:col-span-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Clips (multi)</span>
                <input type="file" accept="video/*" multiple onChange={(event) => setClips(Array.from(event.target.files || []))} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-zinc-200" />
              </label>

              <label className="grid gap-2 md:col-span-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Background Music (optional)</span>
                <input type="file" accept="audio/*" onChange={(event) => setMusic(event.target.files?.[0] || null)} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-zinc-200" />
              </label>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={includeSubtitles} onChange={(event) => setIncludeSubtitles(event.target.checked)} className="h-4 w-4 rounded border-zinc-700 bg-zinc-900" />
              Include subtitle captions
            </label>

            {loading ? (
              <div className="space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-teal-400 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Rendering Progress: {progress}%</p>
              </div>
            ) : null}

            {error ? <p className="text-sm text-rose-400">{error}</p> : null}

            <button type="button" onClick={onGenerate} disabled={!canGenerate} className="h-11 rounded-xl bg-primary px-6 text-sm font-semibold uppercase tracking-wider text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Generating..." : "Generate Cinematic Teaser"}
            </button>
          </div>

          <div className="space-y-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/75 p-5">
            <h3 className="text-2xl uppercase [font-family:var(--font-heading)]">Preview</h3>
            {renders[0]?.outputUrl ? (
              <video src={`/api/teasers/${renders[0]._id}/file`} controls className="aspect-video w-full rounded-xl border border-zinc-800 bg-black" />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/70 text-sm text-zinc-500">
                Generated teaser preview will appear here
              </div>
            )}

            {renders[0]?.outputUrl ? (
              <a href={`/api/teasers/${renders[0]._id}/file`} download className="inline-flex rounded-lg border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:border-primary hover:text-white">
                Download MP4
              </a>
            ) : null}

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/65 p-4 text-sm text-zinc-300">
              <p className="font-semibold text-white">Teaser Logic</p>
              <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                <li>Intro hook to rising tension to dramatic reveal to final CTA</li>
                <li>Dynamic pacing + cinematic overlays + transition presets by mood</li>
                <li>Voice-over generation with subtitle toggle and music ducking profile</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
        <h2 className="mb-4 text-3xl uppercase [font-family:var(--font-heading)]">Teaser History</h2>

        <div className="space-y-3">
          {renders.map((item) => (
            <article key={item._id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{item.genre} | {item.language} | {item.duration}s | {item.mood}</p>
                  <p className="mt-1 text-xs text-zinc-500">{prettyTime(item.createdAt)}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
                  item.status === "completed"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : item.status === "failed"
                      ? "bg-rose-500/15 text-rose-300"
                      : "bg-amber-500/15 text-amber-300"
                }`}>
                  {item.status}
                </span>
              </div>

              {item.errorMessage ? <p className="mt-2 text-sm text-rose-400">{item.errorMessage}</p> : null}

              {item.outputUrl ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={`/api/teasers/${item._id}/file`} target="_blank" rel="noreferrer" className="rounded-lg border border-zinc-700 px-3 py-1 text-xs text-zinc-200 hover:border-primary hover:text-white">Preview</a>
                  <a href={`/api/teasers/${item._id}/file`} download className="rounded-lg border border-zinc-700 px-3 py-1 text-xs text-zinc-200 hover:border-primary hover:text-white">Download</a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
