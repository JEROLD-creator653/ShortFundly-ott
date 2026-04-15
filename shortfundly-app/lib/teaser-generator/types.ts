export type TeaserMood = "epic" | "thriller" | "emotional" | "action" | "mystery";
export type VoiceStyle = "deep-male" | "cinematic-female" | "energetic" | "suspense";
export type TeaserDuration = 15 | 30 | 45 | 60;

export type ScenePhase = "intro" | "rise" | "reveal" | "cta";

export type ScriptLine = {
  phase: ScenePhase;
  line: string;
};

export type TeaserScript = {
  narration: string;
  lines: ScriptLine[];
  overlays: string[];
  cta: string;
};

export type UploadedAsset = {
  localPath: string;
  publicPath: string;
  url: string;
};

export type TeaserAssetBundle = {
  poster?: UploadedAsset;
  images: UploadedAsset[];
  clips: UploadedAsset[];
  music?: UploadedAsset;
  voiceover?: UploadedAsset;
};

export type TeaserCreateInput = {
  title: string;
  genre: string;
  language: string;
  duration: TeaserDuration;
  mood: TeaserMood;
  voiceStyle: VoiceStyle;
  includeSubtitles: boolean;
};

export type TimelineClipPlan = {
  phase: ScenePhase;
  start: number;
  length: number;
  text: string;
};
