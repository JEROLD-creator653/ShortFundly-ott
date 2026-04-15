"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CharacterCard } from "@/components/CharacterCard";
import { lookupCharacter } from "@/lib/lookupCharacter";
import type { CharacterLookupResult, SubtitleChunk } from "@/types/watchSession";

type Props = {
  subtitleChunks: SubtitleChunk[];
  watchedEpisodes: string[];
};

export function SubtitleOverlay({ subtitleChunks, watchedEpisodes }: Props) {
  const [activeCharacter, setActiveCharacter] = useState<CharacterLookupResult | null>(null);
  const [loadingFor, setLoadingFor] = useState<string | null>(null);
  const longPressRef = useRef<number | null>(null);

  const recentLines = useMemo(() => subtitleChunks.slice(-3), [subtitleChunks]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCharacter(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const runLookup = (speaker: string) => {
    const cleanSpeaker = speaker.trim();
    if (!cleanSpeaker) return;

    setLoadingFor(cleanSpeaker);
    lookupCharacter(cleanSpeaker, watchedEpisodes)
      .then((result) => {
        setActiveCharacter(result);
      })
      .finally(() => {
        setLoadingFor(null);
      });
  };

  const onPressStart = (speaker: string) => {
    if (longPressRef.current) {
      window.clearTimeout(longPressRef.current);
    }

    longPressRef.current = window.setTimeout(() => runLookup(speaker), 500);
  };

  const onPressEnd = () => {
    if (longPressRef.current) {
      window.clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  };

  if (!recentLines.length) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 space-y-2">
        {recentLines.map((line) => (
          <button
            key={`${line.start}-${line.end}-${line.text}`}
            type="button"
            className="pointer-events-auto w-full rounded-lg bg-black/70 px-3 py-2 text-left text-sm text-zinc-100 backdrop-blur-sm"
            onPointerDown={() => onPressStart(line.speaker)}
            onPointerUp={onPressEnd}
            onPointerLeave={onPressEnd}
            onPointerCancel={onPressEnd}
          >
            <span className="font-semibold text-primary">{line.speaker}: </span>
            {line.text}
            {loadingFor === line.speaker ? <span className="ml-2 text-xs text-zinc-400">Looking up...</span> : null}
          </button>
        ))}
      </div>
      {activeCharacter ? <CharacterCard character={activeCharacter} onClose={() => setActiveCharacter(null)} /> : null}
    </>
  );
}
