import type { TeaserAssetBundle, TeaserCreateInput, TeaserScript, TimelineClipPlan } from "@/lib/teaser-generator/types";

function transitionByMood(mood: TeaserCreateInput["mood"], phase: TimelineClipPlan["phase"]) {
  // Keep transition conservative for broad Shotstack compatibility.
  return "fade";
}

export function buildTimelinePlan(duration: number, script: TeaserScript): TimelineClipPlan[] {
  const intro = Math.max(3, Math.round(duration * 0.2));
  const rise = Math.max(4, Math.round(duration * 0.3));
  const reveal = Math.max(4, Math.round(duration * 0.3));
  const cta = Math.max(3, duration - intro - rise - reveal);

  return [
    { phase: "intro", start: 0, length: intro, text: script.lines[0]?.line || "" },
    { phase: "rise", start: intro, length: rise, text: script.lines[1]?.line || "" },
    { phase: "reveal", start: intro + rise, length: reveal, text: script.lines[2]?.line || "" },
    { phase: "cta", start: intro + rise + reveal, length: cta, text: script.lines[3]?.line || script.cta }
  ];
}

export function buildShotstackEdit(input: {
  assets: TeaserAssetBundle;
  script: TeaserScript;
  config: TeaserCreateInput;
}) {
  const plan = buildTimelinePlan(input.config.duration, input.script);

  const visualSources = [
    ...input.assets.clips.map((asset) => ({ type: "video" as const, src: asset.url })),
    ...input.assets.images.map((asset) => ({ type: "image" as const, src: asset.url })),
    ...(input.assets.poster ? [{ type: "image" as const, src: input.assets.poster.url }] : [])
  ];

  const fallbackVisual = { type: "image" as const, src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80" };

  const visualClips = plan.map((segment, index) => {
    const media = visualSources[index % Math.max(1, visualSources.length)] || fallbackVisual;

    return {
      asset:
        media.type === "video"
          ? { type: "video", src: media.src, volume: 0 }
          : { type: "image", src: media.src },
      start: segment.start,
      length: segment.length,
      fit: "cover",
      transition: {
        in: index === 0 ? "fade" : transitionByMood(input.config.mood, segment.phase),
        out: transitionByMood(input.config.mood, segment.phase)
      }
    };
  });

  const cinematicTextClips = plan.map((segment) => ({
    asset: {
      type: "title",
      text: segment.text,
      style: "minimal"
    },
    start: segment.start + Math.min(0.8, segment.length * 0.2),
    length: Math.max(1.5, segment.length - 1),
    transition: { in: "fade", out: "fade" }
  }));

  const endTitleStart = Math.max(0, input.config.duration - 3.2);
  cinematicTextClips.push({
    asset: {
      type: "title",
      text: input.script.overlays[0] || input.config.title,
      style: "minimal"
    },
    start: endTitleStart,
    length: 3,
    transition: { in: "fade", out: "fade" }
  });

  const audioClips: Array<Record<string, unknown>> = [];

  if (input.assets.music?.url) {
    audioClips.push({
      asset: { type: "audio", src: input.assets.music.url, effect: "fadeInFadeOut" },
      start: 0,
      length: input.config.duration,
      volume: 0.28
    });
  }

  if (input.assets.voiceover?.url) {
    audioClips.push({
      asset: { type: "audio", src: input.assets.voiceover.url, effect: "fadeInFadeOut" },
      start: 0.4,
      length: input.config.duration - 0.4,
      volume: 1
    });
  }

  return {
    timeline: {
      background: "#040406",
      ...(input.assets.music?.url
        ? {
            soundtrack: {
              src: input.assets.music.url,
              effect: "fadeInFadeOut",
              volume: input.assets.voiceover ? 0.24 : 0.35
            }
          }
        : {}),
      tracks: [
        { clips: visualClips },
        { clips: cinematicTextClips },
        ...(audioClips.length ? [{ clips: audioClips }] : [])
      ]
    },
    output: {
      format: "mp4",
      fps: 30,
      quality: "high",
      resolution: "hd",
      aspectRatio: "16:9"
    }
  };
}
