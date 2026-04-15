"use client";

import { useEffect, useRef, useState } from "react";

type TeaserJob = {
  _id: string;
  title: string;
  caption?: string;
  format: "shorts" | "reel" | "widescreen";
  status: "queued" | "processing" | "completed" | "failed";
  outputUrl?: string;
  errorMessage?: string;
  createdAt: string;
};

export function TeaserStudio() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [format, setFormat] = useState<"shorts" | "reel" | "widescreen">("shorts");
  const [includeVoiceover, setIncludeVoiceover] = useState(false);
  const [jobs, setJobs] = useState<TeaserJob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const loadJobs = async () => {
    try {
      const response = await fetch("/api/teasers", { cache: "no-store" });
      const payload = (await response.json()) as { jobs?: TeaserJob[] };
      setJobs(payload.jobs || []);
    } catch {
      setJobs([]);
    }
  };

  useEffect(() => {
    void loadJobs();
    const id = window.setInterval(() => {
      void loadJobs();
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const onSubmit = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file || !title.trim()) {
      setError("Title and clip file are required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("title", title.trim());
      formData.set("caption", caption.trim());
      formData.set("format", format);
      formData.set("includeVoiceover", String(includeVoiceover));
      formData.set("clip", file);

      const response = await fetch("/api/teasers", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Unable to queue teaser job");
      }

      setTitle("");
      setCaption("");
      setFormat("shorts");
      setIncludeVoiceover(false);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      await loadJobs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Teaser creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
          <h2 className="text-3xl uppercase [font-family:var(--font-heading)]">AI Teaser Generator</h2>
          <p className="mt-2 text-sm text-zinc-400">Queue 15-second teaser jobs with cinematic captions and optional AI voiceover.</p>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Title</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Shadow of Chennai - Official Teaser"
                className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Caption</span>
              <textarea
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                className="min-h-24 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-primary"
                placeholder="One city. One missing file. One final truth."
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Output format</span>
              <select
                value={format}
                onChange={(event) => setFormat(event.target.value as "shorts" | "reel" | "widescreen")}
                className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none focus:border-primary"
              >
                <option value="shorts">YouTube Shorts (9:16)</option>
                <option value="reel">Instagram Reel (9:16)</option>
                <option value="widescreen">16:9 Teaser</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Trailer or Clip</span>
              <input
                ref={fileRef}
                type="file"
                accept="video/*"
                className="block rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-zinc-200"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={includeVoiceover}
                onChange={(event) => setIncludeVoiceover(event.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
              />
              Add AI voiceover (optional)
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}

          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="mt-6 h-11 rounded-xl bg-primary px-5 text-sm font-semibold uppercase tracking-wider text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Queueing..." : "Generate Teaser"}
          </button>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
          <h3 className="text-xl font-semibold">Processing Pipeline</h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-300">
            <li>1. Upload clip and queue teaser job.</li>
            <li>2. FFmpeg trims first 15 seconds and applies format conversion.</li>
            <li>3. Captions and optional AI voiceover are added.</li>
            <li>4. Rendered MP4 becomes available for download and social posting.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-3xl uppercase [font-family:var(--font-heading)]">Teaser Jobs</h2>
        <div className="space-y-3">
          {jobs.map((job) => (
            <article key={job._id} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-white">{job.title}</h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
                    job.status === "completed"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : job.status === "failed"
                        ? "bg-rose-500/15 text-rose-300"
                        : "bg-amber-500/15 text-amber-300"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">Format: {job.format}</p>

              {job.errorMessage ? <p className="mt-2 text-sm text-rose-400">{job.errorMessage}</p> : null}

              {job.outputUrl ? (
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={job.outputUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-zinc-700 px-3 py-1 text-xs text-zinc-200 hover:border-primary hover:text-white"
                  >
                    Preview
                  </a>
                  <a
                    href={job.outputUrl}
                    download
                    className="rounded-lg border border-zinc-700 px-3 py-1 text-xs text-zinc-200 hover:border-primary hover:text-white"
                  >
                    Download MP4
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
