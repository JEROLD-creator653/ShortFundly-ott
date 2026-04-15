import type { PosterStyle } from "@/lib/models/poster";

const STYLE_PROMPTS: Record<PosterStyle, string> = {
  thriller:
    "dark cinematic lighting, moody contrast, suspenseful framing, smoke textures, premium OTT poster design",
  romantic:
    "warm cinematic tones, emotional storytelling mood, soft bokeh lights, elegant movie poster composition",
  action:
    "high energy action composition, dramatic lighting, motion blur, epic blockbuster OTT poster style",
  festival:
    "arthouse festival cinema aesthetic, rich film grain texture, auteur visual tone, premium indie film poster",
  netflix:
    "high-end OTT key art style, bold center subject, clean premium typography space, global streaming quality"
};

export function buildPosterPrompt(input: {
  title: string;
  genre: string;
  description: string;
  style: PosterStyle;
}) {
  const stylePrompt = STYLE_PROMPTS[input.style];

  return [
    "Create a professional vertical movie poster for OTT release.",
    `Movie title: ${input.title}`,
    `Genre: ${input.genre}`,
    `Story hook: ${input.description}`,
    `Visual style: ${stylePrompt}`,
    "Do not include any text, logos, watermark, or extra title in image."
  ].join("\n");
}
