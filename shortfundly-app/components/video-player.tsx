"use client";

import { useEffect, useRef } from "react";

type Props = {
  slug: string;
  title: string;
  source: string;
};

type ContinueItem = {
  slug: string;
  title: string;
  progress: number;
};

const KEY = "shortfundly:continue";

export function VideoPlayer({ slug, title, source }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const onProgress = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const progress = (video.currentTime / video.duration) * 100;

      const list = (() => {
        try {
          const raw = localStorage.getItem(KEY);
          return raw ? (JSON.parse(raw) as ContinueItem[]) : [];
        } catch {
          return [];
        }
      })();

      const next = [
        { slug, title, progress },
        ...list.filter((item) => item.slug !== slug)
      ].slice(0, 10);

      localStorage.setItem(KEY, JSON.stringify(next));
    };

    video.addEventListener("timeupdate", onProgress);
    return () => video.removeEventListener("timeupdate", onProgress);
  }, [slug, title]);

  return (
    <video
      ref={ref}
      controls
      playsInline
      className="aspect-video w-full rounded-2xl border border-zinc-800 bg-black"
      src={source}
    >
      <track kind="captions" />
    </video>
  );
}
