import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import OpenAI from "openai";
import sharp from "sharp";
import type { PosterStyle } from "@/lib/models/poster";
import { buildPosterPrompt } from "@/lib/posters/style-prompts";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

function titleOverlaySvg(title: string, genre: string) {
  return `
  <svg width="1024" height="1536" viewBox="0 0 1024 1536" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0.72)"/>
      </linearGradient>
    </defs>
    <rect x="0" y="930" width="1024" height="606" fill="url(#fade)" />
    <text x="80" y="1330" fill="#ffffff" font-size="88" font-weight="800" font-family="Arial, sans-serif" letter-spacing="2">
      ${title.toUpperCase().replace(/&/g, "&amp;")}
    </text>
    <text x="82" y="1400" fill="#f59e0b" font-size="34" font-weight="700" font-family="Arial, sans-serif" letter-spacing="4">
      ${genre.toUpperCase().replace(/&/g, "&amp;")}
    </text>
  </svg>`;
}

export async function generatePosterImage(input: {
  title: string;
  genre: string;
  description: string;
  style: PosterStyle;
}) {
  if (!openai) {
    throw new Error("OPENAI_API_KEY is required for poster generation");
  }

  const prompt = buildPosterPrompt(input);

  const image = await openai.images.generate({
    model: process.env.POSTER_IMAGE_MODEL || "gpt-image-1",
    prompt,
    size: "1024x1536"
  });

  const base64 = image.data?.[0]?.b64_json;
  if (!base64) {
    throw new Error("Image generation did not return image data");
  }

  const rawBuffer = Buffer.from(base64, "base64");
  const composed = await sharp(rawBuffer)
    .composite([
      {
        input: Buffer.from(titleOverlaySvg(input.title, input.genre)),
        top: 0,
        left: 0
      }
    ])
    .png({ quality: 92 })
    .toBuffer();

  const posterId = randomUUID();
  const outDir = path.join(process.cwd(), "public", "generated", "posters");
  await fs.mkdir(outDir, { recursive: true });
  const filePath = path.join(outDir, `${posterId}.png`);
  await fs.writeFile(filePath, composed);

  return {
    prompt,
    imageUrl: `/generated/posters/${posterId}.png`
  };
}
