export interface SceneMeta {
  timestamp: number;
  description: string;
  characters: string[];
  tags: string[];
}

export interface SubtitleChunk {
  start: number;
  end: number;
  speaker: string;
  text: string;
}

export interface WatchSession {
  contentId: string;
  episodeId: string;
  episodeTitle: string;
  contentSynopsis?: string;
  contentDetails?: string;
  seasonNumber: number;
  episodeNumber: number;
  resumePosition: number;
  totalDuration: number;
  lastWatchedAt: number;
  watchedEpisodes: string[];
  sceneMetadata: SceneMeta[];
  subtitleChunks: SubtitleChunk[];
}

export type RecapDepth = "brief" | "full";

export interface CharacterLookupResult {
  name: string;
  role: string;
  firstSeen: string;
  summary: string;
}
