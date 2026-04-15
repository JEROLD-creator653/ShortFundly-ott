import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { getGeminiModel } from "@/lib/ai/gemini";
import type { PosterStyle } from "@/lib/models/poster";
import { buildPosterPrompt } from "@/lib/posters/style-prompts";

const GEMINI_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview";
const RUNWARE_MODEL = process.env.RUNWARE_MODEL || "runware:100@1";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

type PosterDirection = {
  imagePrompt: string;
  typography: {
    anchorX: number;
    anchorY: number;
    maxWidth: number;
    align: "left" | "center" | "right";
    titleSize: number;
    genreSize: number;
    titleColor: string;
    genreColor: string;
  };
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function safeHexColor(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  return /^#[0-9A-Fa-f]{6}$/i.test(value) ? value : fallback;
}

function defaultDirection(basePrompt: string): PosterDirection {
  return {
    imagePrompt: basePrompt,
    typography: {
      anchorX: 84,
      anchorY: 1280,
      maxWidth: 860,
      align: "left",
      titleSize: 92,
      genreSize: 36,
      titleColor: "#FFFFFF",
      genreColor: "#F59E0B"
    }
  };
}

function parseGeminiJson(input: string) {
  const trimmed = input.trim();
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const jsonText = fenceMatch ? fenceMatch[1].trim() : trimmed;
  return JSON.parse(jsonText) as Record<string, unknown>;
}

function normalizeBase64Image(imageData: string) {
  return imageData.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
}

function parseDataUriImage(dataUri: string) {
  const match = dataUri.match(/^data:image\/[A-Za-z0-9.+-]+;base64,(.+)$/);
  if (!match) return null;
  return Buffer.from(normalizeBase64Image(match[1]), "base64");
}

function getRunwareImageField(payload: unknown) {
  const candidates: Array<Record<string, unknown>> = [];

  if (Array.isArray(payload)) {
    for (const item of payload) {
      if (item && typeof item === "object") candidates.push(item as Record<string, unknown>);
    }
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const data = record.data;
    if (Array.isArray(data)) {
      for (const item of data) {
        if (item && typeof item === "object") candidates.push(item as Record<string, unknown>);
      }
    }

    const output = record.output;
    if (Array.isArray(output)) {
      for (const item of output) {
        if (item && typeof item === "object") candidates.push(item as Record<string, unknown>);
      }
    }
  }

  for (const item of candidates) {
    const imageUrl = item.imageURL || item.imageUrl || item.url;
    if (typeof imageUrl === "string" && /^https?:\/\//i.test(imageUrl)) {
      return { imageUrl } as const;
    }

    const imageBase64 = item.imageBase64 || item.imageData || item.b64_json;
    if (typeof imageBase64 === "string" && imageBase64.trim()) {
      return { imageBase64 } as const;
    }

    const dataUri = item.imageDataURI || item.dataUri;
    if (typeof dataUri === "string" && dataUri.startsWith("data:image/")) {
      return { dataUri } as const;
    }
  }

  return null;
}

async function getGeminiPosterDirection(input: {
  title: string;
  genre: string;
  description: string;
  style: PosterStyle;
  basePrompt: string;
}): Promise<PosterDirection> {
  const model = getGeminiModel();
  const instruction = [
    "You are a senior movie poster creative director.",
    "Return ONLY valid JSON without markdown.",
    "Goal: produce a highly realistic OTT poster direction from the given scenario.",
    "Provide JSON shape exactly:",
    '{"imagePrompt":"string","typography":{"anchorX":number,"anchorY":number,"maxWidth":number,"align":"left|center|right","titleSize":number,"genreSize":number,"titleColor":"#RRGGBB","genreColor":"#RRGGBB"}}',
    "Rules:",
    "- imagePrompt must preserve the exact scenario details and mood.",
    "- imagePrompt must demand photorealistic cinema quality.",
    "- imagePrompt must avoid generic gradients/vector look.",
    "- Place typography where there is safe negative space.",
    "- Canvas size is 1024x1536.",
    `Title: ${input.title}`,
    `Genre: ${input.genre}`,
    `Style: ${input.style}`,
    `Scenario: ${input.description}`,
    "Base prompt:",
    input.basePrompt
  ].join("\n");

  const result = await model.generateContent(instruction);
  const text = result.response.text();
  const parsed = parseGeminiJson(text);

  const typographyRaw = (parsed.typography || {}) as Record<string, unknown>;
  const alignRaw = String(typographyRaw.align || "left").toLowerCase();
  const align = alignRaw === "center" || alignRaw === "right" ? alignRaw : "left";

  return {
    imagePrompt: typeof parsed.imagePrompt === "string" && parsed.imagePrompt.trim() ? parsed.imagePrompt : input.basePrompt,
    typography: {
      anchorX: clamp(Number(typographyRaw.anchorX) || 84, 40, 980),
      anchorY: clamp(Number(typographyRaw.anchorY) || 1280, 160, 1480),
      maxWidth: clamp(Number(typographyRaw.maxWidth) || 860, 300, 940),
      align,
      titleSize: clamp(Number(typographyRaw.titleSize) || 92, 56, 128),
      genreSize: clamp(Number(typographyRaw.genreSize) || 36, 24, 56),
      titleColor: safeHexColor(typeof typographyRaw.titleColor === "string" ? typographyRaw.titleColor : undefined, "#FFFFFF"),
      genreColor: safeHexColor(typeof typographyRaw.genreColor === "string" ? typographyRaw.genreColor : undefined, "#F59E0B")
    }
  };
}

async function generateGeminiPosterImage(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is required for poster generation");
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_IMAGE_MODEL}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: "2:3",
          imageSize: "2K"
        }
      }
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Gemini image request failed: ${response.status} ${body}`.trim());
  }

  const payload = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          inlineData?: { data?: string; mimeType?: string };
          inline_data?: { data?: string; mime_type?: string };
          text?: string;
        }>;
      };
    }>;
  };

  const parts = payload.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    const inline = part.inlineData || part.inline_data;
    const data = inline?.data;
    if (data) {
      return Buffer.from(normalizeBase64Image(data), "base64");
    }
  }

  throw new Error("Gemini image generation did not return image data");
}

async function generateRunwarePosterImage(prompt: string) {
  const apiKey = process.env.RUNWARE_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RUNWARE_API_KEY is required for Runware poster generation");
  }

  const taskUUID = randomUUID();
  const endpoint = "https://api.runware.ai/v1";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify([
      {
        taskType: "imageInference",
        taskUUID,
        positivePrompt: prompt,
        model: RUNWARE_MODEL,
        width: 1024,
        height: 1536,
        numberResults: 1,
        outputType: "URL"
      }
    ])
  });

  const rawBody = await response.text();
  let payload: unknown = null;
  try {
    payload = rawBody ? JSON.parse(rawBody) : null;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const snippet = rawBody.replace(/\s+/g, " ").slice(0, 220);
    throw new Error(`Runware image request failed: ${response.status} ${snippet}`.trim());
  }

  const imageField = getRunwareImageField(payload);
  if (!imageField) {
    const snippet = rawBody.replace(/\s+/g, " ").slice(0, 220);
    throw new Error(`Runware image response missing image output: ${snippet}`.trim());
  }

  if ("imageUrl" in imageField) {
    const imageUrl = imageField.imageUrl;
    if (typeof imageUrl !== "string" || !imageUrl) {
      throw new Error("Runware image URL output was empty");
    }

    const imageResponse = await fetch(imageUrl, { cache: "no-store" });
    if (!imageResponse.ok) {
      throw new Error(`Runware output download failed: ${imageResponse.status}`);
    }
    return Buffer.from(await imageResponse.arrayBuffer());
  }

  if ("imageBase64" in imageField) {
    const imageBase64 = imageField.imageBase64;
    if (typeof imageBase64 !== "string" || !imageBase64.trim()) {
      throw new Error("Runware base64 output was empty");
    }

    return Buffer.from(normalizeBase64Image(imageBase64), "base64");
  }

  if ("dataUri" in imageField) {
    const dataUri = imageField.dataUri;
    if (typeof dataUri !== "string" || !dataUri.startsWith("data:image/")) {
      throw new Error("Runware data URI output was invalid");
    }

    const parsed = parseDataUriImage(dataUri);
    if (parsed) return parsed;
  }

  throw new Error("Runware image response did not include usable image data");
}

function titleOverlaySvg(title: string, genre: string, direction: PosterDirection["typography"]) {
  const safeTitle = escapeXml(title.toUpperCase());
  const safeGenre = escapeXml(genre.toUpperCase());
  const textAnchor = direction.align === "center" ? "middle" : direction.align === "right" ? "end" : "start";
  const titleX = direction.anchorX;
  const titleY = direction.anchorY;
  const genreY = titleY + Math.round(direction.titleSize * 0.85);

  return `
  <svg width="1024" height="1536" viewBox="0 0 1024 1536" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.65)"/>
      </filter>
    </defs>
    <text
      x="${titleX}"
      y="${titleY}"
      fill="${direction.titleColor}"
      text-anchor="${textAnchor}"
      filter="url(#shadow)"
      font-size="${direction.titleSize}"
      font-weight="800"
      font-family="Arial, sans-serif"
      letter-spacing="2"
      textLength="${direction.maxWidth}"
      lengthAdjust="spacingAndGlyphs"
    >
      ${safeTitle}
    </text>
    <text
      x="${titleX}"
      y="${genreY}"
      fill="${direction.genreColor}"
      text-anchor="${textAnchor}"
      filter="url(#shadow)"
      font-size="${direction.genreSize}"
      font-weight="700"
      font-family="Arial, sans-serif"
      letter-spacing="4"
    >
      ${safeGenre}
    </text>
  </svg>`;
}

async function writePosterToDisk(buffer: Buffer) {
  const posterId = randomUUID();
  const outDir = path.join(process.cwd(), "public", "generated", "posters");
  await fs.mkdir(outDir, { recursive: true });
  const filePath = path.join(outDir, `${posterId}.png`);
  await fs.writeFile(filePath, buffer);

  return {
    imageUrl: `/generated/posters/${posterId}.png`
  };
}

export async function generatePosterImage(input: {
  title: string;
  genre: string;
  description: string;
  style: PosterStyle;
}) {
  const basePrompt = buildPosterPrompt(input);
  let direction = defaultDirection(basePrompt);

  if (process.env.GEMINI_API_KEY?.trim()) {
    try {
      direction = await getGeminiPosterDirection({ ...input, basePrompt });
    } catch {
      direction = defaultDirection(basePrompt);
    }
  }

  const finalPrompt = direction.imagePrompt;

  try {
    const hasRunware = Boolean(process.env.RUNWARE_API_KEY?.trim());
    const hasGemini = Boolean(process.env.GEMINI_API_KEY?.trim());

    let rawBuffer: Buffer;
    if (hasRunware) {
      try {
        rawBuffer = await generateRunwarePosterImage(finalPrompt);
      } catch (runwareError) {
        const runwareReason = runwareError instanceof Error ? runwareError.message : "unknown Runware error";
        if (!hasGemini) {
          throw runwareError;
        }
        try {
          rawBuffer = await generateGeminiPosterImage(finalPrompt);
        } catch (geminiError) {
          const geminiReason = geminiError instanceof Error ? geminiError.message : "unknown Gemini error";
          throw new Error(`Runware failed (${runwareReason}); Gemini fallback failed (${geminiReason})`);
        }
      }
    } else {
      rawBuffer = await generateGeminiPosterImage(finalPrompt);
    }

    const composed = await sharp(rawBuffer)
      .composite([
        {
          input: Buffer.from(titleOverlaySvg(input.title, input.genre, direction.typography)),
          top: 0,
          left: 0
        }
      ])
      .png({ quality: 92 })
      .toBuffer();

    const saved = await writePosterToDisk(composed);
    return {
      prompt: finalPrompt,
      imageUrl: saved.imageUrl
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown poster generation error";
    throw new Error(`Poster generation failed: ${reason}`);
  }
}
