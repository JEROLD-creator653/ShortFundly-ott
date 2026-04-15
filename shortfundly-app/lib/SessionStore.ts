import type { WatchSession } from "@/types/watchSession";

const keyFor = (contentId: string, episodeId: string) => `recap:${contentId}:${episodeId}`;

export const SessionStore = {
  save(session: WatchSession) {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      keyFor(session.contentId, session.episodeId),
      JSON.stringify({ ...session, lastWatchedAt: Date.now() })
    );
  },

  get(contentId: string, episodeId: string): WatchSession | null {
    if (typeof window === "undefined") return null;

    try {
      return JSON.parse(localStorage.getItem(keyFor(contentId, episodeId)) ?? "null") as WatchSession | null;
    } catch {
      return null;
    }
  },

  clear(contentId: string, episodeId: string) {
    if (typeof window === "undefined") return;
    localStorage.removeItem(keyFor(contentId, episodeId));
  }
};
