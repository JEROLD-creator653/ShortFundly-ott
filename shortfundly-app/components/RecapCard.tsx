"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { generateRecap } from "@/lib/generateRecap";
import type { WatchSession } from "@/types/watchSession";

type Props = {
  session: WatchSession;
  onResume: () => void;
  onStartOver: () => void;
};

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return { mins, secs };
}

export function RecapCard({ session, onResume, onStartOver }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const time = useMemo(() => formatTime(session.resumePosition), [session.resumePosition]);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    generateRecap(session)
      .then((recap) => {
        if (!cancelled) {
          setText(recap);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setText("Last time: You paused at a key moment. Resume from where you left off.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [session]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const focusable = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity ${
        visible ? "opacity-100 duration-200 ease-out" : "opacity-0 duration-150 ease-in"
      }`}
    >
      <div
        ref={containerRef}
        className={`w-full max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl transition-all ${
          visible ? "translate-y-0 opacity-100 duration-200 ease-out" : "translate-y-2 opacity-0 duration-150 ease-in"
        }`}
      >
        <header className="mb-5">
          <h2 className="text-2xl uppercase text-white [font-family:var(--font-heading)]">Movie Recap</h2>
          <p className="text-sm text-zinc-400">
            {session.episodeTitle} · You&apos;re {time.mins}m {time.secs}s in
          </p>
        </header>

        <div className="min-h-24 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm leading-6 text-zinc-200">
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-800" />
            </div>
          ) : (
            <p>{text}</p>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onResume}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Resume from {time.mins}m {time.secs}s
          </button>
          <button type="button" onClick={onStartOver} className="text-sm text-zinc-400 underline hover:text-zinc-200">
            Start from beginning
          </button>
        </div>
      </div>
    </div>
  );
}
