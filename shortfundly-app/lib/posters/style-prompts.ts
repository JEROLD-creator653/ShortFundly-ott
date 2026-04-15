import type { PosterStyle } from "@/lib/models/poster";

const STYLE_PROMPTS: Record<PosterStyle, string> = {
  thriller:
    "realistic cinematic thriller look, tense atmosphere, practical lighting, noir-grade contrast, emotionally grounded scene",
  romantic:
    "realistic cinematic romance look, warm natural light, intimate character emotion, poetic but grounded framing",
  action:
    "realistic cinematic action look, dynamic camera energy, believable motion, dramatic practical lighting, high detail",
  festival:
    "realistic arthouse festival look, expressive framing, authentic texture, human-centered visual storytelling",
  netflix:
    "premium global OTT key-art look, hyper-realistic detail, polished cinematic lighting, high production value"
};

export function buildPosterPrompt(input: {
  title: string;
  genre: string;
  description: string;
  style: PosterStyle;
}) {
  const stylePrompt = STYLE_PROMPTS[input.style];

  return [
    "Create a photorealistic vertical movie poster for OTT release.",
    `Movie title: ${input.title}`,
    `Genre: ${input.genre}`,
    `Mandatory scenario to visualize exactly: ${input.description}`,
    `Visual style: ${stylePrompt}`,
    "Focus on one specific cinematic moment from the scenario, not an abstract background.",
    "Use realistic people/locations/props consistent with the description.",
    "Avoid flat gradients, vector graphics, abstract geometric art, and generic background-only posters.",
    "Keep clean negative space for later title placement.",
    "Do not include any text, logos, watermark, or extra title in image."
  ].join("\n");
}
