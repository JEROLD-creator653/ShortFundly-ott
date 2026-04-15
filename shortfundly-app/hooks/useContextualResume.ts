"use client";

import { useEffect, useState } from "react";
import { CONTEXTUAL_RESUME_ENABLED, GAP_THRESHOLD_MS } from "@/constants/config";
import { SessionStore } from "@/lib/SessionStore";
import type { WatchSession } from "@/types/watchSession";

export function useContextualResume(contentId: string, episodeId: string) {
  const [showRecap, setShowRecap] = useState(false);
  const [session, setSession] = useState<WatchSession | null>(null);

  useEffect(() => {
    if (!CONTEXTUAL_RESUME_ENABLED) {
      return;
    }

    const saved = SessionStore.get(contentId, episodeId);
    if (!saved) return;

    setSession(saved);
    if (saved.resumePosition < 5) return;

    const gap = Date.now() - saved.lastWatchedAt;
    if (gap >= GAP_THRESHOLD_MS) {
      setShowRecap(true);
    }
  }, [contentId, episodeId]);

  return {
    showRecap,
    session,
    openRecap: () => setShowRecap(true),
    dismissRecap: () => setShowRecap(false)
  };
}
