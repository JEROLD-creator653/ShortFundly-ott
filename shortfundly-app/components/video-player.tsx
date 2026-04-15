"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";
import { RecapCard } from "@/components/RecapCard";
import { SubtitleOverlay } from "@/components/SubtitleOverlay";
import { useContextualResume } from "@/hooks/useContextualResume";
import { SessionStore } from "@/lib/SessionStore";
import type { SceneMeta, SubtitleChunk, WatchSession } from "@/types/watchSession";

type Props = {
  slug: string;
  title: string;
  source: string;
  synopsis?: string;
  details?: string;
  openedFromContinue?: boolean;
};

type ContinueItem = {
  slug: string;
  title: string;
  progress: number;
};

const KEY = "shortfundly:continue";
const MIN_RESUME_SECONDS = 10;
const END_BUFFER_SECONDS = 15;

function readContinueList(): ContinueItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ContinueItem[]) : [];
  } catch {
    return [];
  }
}

function writeContinueList(items: ContinueItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 10)));
}

export function VideoPlayer({ slug, title, source, synopsis, details, openedFromContinue = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const lastPersistRef = useRef(0);
  const lastActivitySyncRef = useRef(0);
  const [subtitleChunks, setSubtitleChunks] = useState<SubtitleChunk[]>([]);
  const [sceneMetadata, setSceneMetadata] = useState<SceneMeta[]>([]);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const episodeId = useMemo(() => "S01E01", []);
  const { session, dismissRecap } = useContextualResume(slug, episodeId);

  useEffect(() => {
    const video = ref.current;
    if (!video || !source) {
      setPlaybackError("Playback source is missing for this title.");
      return;
    }

    setPlaybackError(null);

    const isHlsSource = /\.m3u8($|\?)/i.test(source);
    let hls: Hls | null = null;

    const onError = () => {
      const mediaError = video.error;
      if (mediaError?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        setPlaybackError("This video format is not supported in your browser.");
        return;
      }
      setPlaybackError("Could not play this movie right now. Please try another title.");
    };

    video.addEventListener("error", onError);

    if (isHlsSource) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = source;
      } else if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true
        });
        hls.loadSource(source);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data?.fatal) {
            setPlaybackError("Stream failed to load for this movie.");
          }
        });
      } else {
        setPlaybackError("HLS playback is not supported in this browser.");
      }
    } else {
      video.src = source;
    }

    video.load();

    return () => {
      video.removeEventListener("error", onError);
      if (hls) hls.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [source]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const pushSubtitleFromCue = () => {
      const track = video.textTracks?.[0];
      if (!track?.activeCues?.length) return;

      const cue = track.activeCues[0] as VTTCue;
      if (!cue?.text) return;
      const [maybeSpeaker, ...rest] = cue.text.split(":");
      const speaker = rest.length ? maybeSpeaker.trim() : "Speaker";
      const text = rest.length ? rest.join(":").trim() : cue.text.trim();

      setSubtitleChunks((prev) => {
        const next: SubtitleChunk = {
          start: cue.startTime ?? Math.max(0, video.currentTime - 2),
          end: cue.endTime ?? video.currentTime,
          speaker,
          text
        };

        if (prev.length && prev[prev.length - 1]?.text === next.text && prev[prev.length - 1]?.speaker === next.speaker) {
          return prev;
        }
        return [...prev, next].slice(-40);
      });
    };

    const saveContextualSession = () => {
      const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
      const currentTime = Math.max(0, video.currentTime || 0);
      const watchedEpisodeList = [episodeId];

      const builtSession: WatchSession = {
        contentId: slug,
        episodeId,
        episodeTitle: title,
        contentSynopsis: synopsis,
        contentDetails: details,
        seasonNumber: 1,
        episodeNumber: 1,
        resumePosition: currentTime,
        totalDuration: duration,
        lastWatchedAt: Date.now(),
        watchedEpisodes: watchedEpisodeList,
        sceneMetadata,
        subtitleChunks
      };

      SessionStore.save(builtSession);
    };

    const onProgress = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const progress = (video.currentTime / video.duration) * 100;

      const list = readContinueList();
      if (progress >= 98) {
        writeContinueList(list.filter((item) => item.slug !== slug));
      } else {
        writeContinueList([{ slug, title, progress }, ...list.filter((item) => item.slug !== slug)]);
      }
      pushSubtitleFromCue();

      if (video.currentTime - lastPersistRef.current >= 5) {
        saveContextualSession();
        lastPersistRef.current = video.currentTime;
      }

      if (video.currentTime - lastActivitySyncRef.current >= 30) {
        lastActivitySyncRef.current = video.currentTime;
        void fetch("/api/user/activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ watchMinutes: 0.5 })
        }).catch(() => null);
      }

      setSceneMetadata((prev) => {
        const marker = Math.floor(video.currentTime / 60) * 60;
        if (marker < 0) return prev;
        if (prev.some((scene) => scene.timestamp === marker)) return prev;

        const scene: SceneMeta = {
          timestamp: marker,
          description: `Playback reached ${Math.floor(marker / 60)}m in ${title}.`,
          characters: [...new Set(subtitleChunks.slice(-8).map((chunk) => chunk.speaker).filter(Boolean))],
          tags: ["playback"]
        };
        return [...prev, scene].slice(-25);
      });
    };

    const onPause = () => {
      saveContextualSession();

      if (video.currentTime > 0) {
        void fetch("/api/user/activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ watchMinutes: 0.2 })
        }).catch(() => null);
      }
    };

    const onEnded = () => {
      void fetch("/api/user/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watchMinutes: 1, completed: true })
      }).catch(() => null);
    };

    const onBeforeUnload = () => {
      saveContextualSession();
    };

    video.addEventListener("timeupdate", onProgress);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      video.removeEventListener("timeupdate", onProgress);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [details, episodeId, sceneMetadata, slug, subtitleChunks, synopsis, title]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !showResumePrompt) return;

    video.pause();
  }, [showResumePrompt]);

  useEffect(() => {
    if (!openedFromContinue) return;
    if (!session || session.resumePosition < MIN_RESUME_SECONDS) return;

    const hasDuration = Number.isFinite(session.totalDuration) && session.totalDuration > 0;
    if (hasDuration) {
      const remaining = session.totalDuration - session.resumePosition;
      const watchedRatio = session.resumePosition / session.totalDuration;
      if (remaining <= END_BUFFER_SECONDS || watchedRatio >= 0.98) {
        return;
      }
    }

    setShowResumePrompt(true);
  }, [openedFromContinue, session]);

  const playVideo = () => {
    dismissRecap();
    setShowResumePrompt(false);
    ref.current?.play().catch(() => {
      // Browser autoplay restrictions may prevent this.
    });
  };

  const resumePlayback = () => {
    const video = ref.current;
    if (!video || !session) {
      playVideo();
      return;
    }

    const resumeAt = Math.max(0, Math.min(session.resumePosition, Math.max(0, (video.duration || session.totalDuration) - 1)));
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = resumeAt;
      playVideo();
      return;
    }

    const onLoaded = () => {
      video.currentTime = resumeAt;
      playVideo();
      video.removeEventListener("loadedmetadata", onLoaded);
    };
    video.addEventListener("loadedmetadata", onLoaded);
    video.load();
  };

  const startFromBeginning = () => {
    const video = ref.current;
    if (video) {
      video.currentTime = 0;
    }
    SessionStore.clear(slug, episodeId);
    writeContinueList(readContinueList().filter((item) => item.slug !== slug));
    lastPersistRef.current = 0;
    playVideo();
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        controls={!showResumePrompt}
        playsInline
        className="aspect-video w-full rounded-2xl border border-zinc-800 bg-black"
      >
        <track kind="captions" />
      </video>
      {playbackError ? (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-amber-500/40 bg-black/80 px-4 py-3 text-sm text-amber-200">
          {playbackError}
        </div>
      ) : null}
      <SubtitleOverlay subtitleChunks={subtitleChunks} watchedEpisodes={session?.watchedEpisodes ?? [episodeId]} />
      {showResumePrompt && session ? (
        <RecapCard session={session} onResume={resumePlayback} onStartOver={startFromBeginning} />
      ) : null}
    </div>
  );
}
