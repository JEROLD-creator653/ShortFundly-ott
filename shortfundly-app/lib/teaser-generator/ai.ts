import OpenAI from "openai";
import type { TeaserCreateInput, TeaserScript, VoiceStyle } from "@/lib/teaser-generator/types";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const VOICE_BY_STYLE: Record<VoiceStyle, string> = {
  "deep-male": "onyx",
  "cinematic-female": "nova",
  energetic: "alloy",
  suspense: "echo"
};

function fallbackScript(input: TeaserCreateInput): TeaserScript {
  return {
    narration: `In a ${input.mood} ${input.genre} journey, ${input.title} redefines suspense and emotion. The stakes rise, truths unfold, and destiny collides in one unforgettable moment.`,
    lines: [
      { phase: "intro", line: `${input.title}. This is where it begins.` },
      { phase: "rise", line: `Every choice pulls them deeper into danger.` },
      { phase: "reveal", line: `The truth changes everything.` },
      { phase: "cta", line: `Witness ${input.title}. Streaming soon.` }
    ],
    overlays: [input.title, `${input.genre.toUpperCase()} | ${input.language.toUpperCase()}`, "A Shortfundly Original"],
    cta: "Streaming Soon"
  };
}

export async function generateTeaserScript(input: TeaserCreateInput): Promise<TeaserScript> {
  if (!openai) {
    return fallbackScript(input);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.TEASER_SCRIPT_MODEL || "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an elite OTT trailer writer. Return only valid JSON with keys: narration (string), lines (array of 4 items with phase intro|rise|reveal|cta and line), overlays (array of max 3 short strings), cta (short string). Keep language cinematic and concise."
        },
        {
          role: "user",
          content: `Create a ${input.duration}s ${input.mood} teaser script for title \"${input.title}\", genre \"${input.genre}\", language \"${input.language}\".`
        }
      ]
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return fallbackScript(input);
    }

    const parsed = JSON.parse(raw) as Partial<TeaserScript>;
    if (!parsed.narration || !Array.isArray(parsed.lines) || parsed.lines.length < 4) {
      return fallbackScript(input);
    }

    return {
      narration: parsed.narration,
      lines: parsed.lines.slice(0, 4).map((line, index) => ({
        phase: (line.phase as TeaserScript["lines"][number]["phase"]) || (["intro", "rise", "reveal", "cta"][index] as "intro" | "rise" | "reveal" | "cta"),
        line: String(line.line || "")
      })),
      overlays: Array.isArray(parsed.overlays) ? parsed.overlays.slice(0, 3).map((item) => String(item)) : [input.title],
      cta: String(parsed.cta || "Streaming Soon")
    };
  } catch {
    return fallbackScript(input);
  }
}

export async function generateVoiceoverAudio(input: {
  narration: string;
  voiceStyle: VoiceStyle;
  outputPath: string;
}): Promise<boolean> {
  if (!openai) return false;

  try {
    const speech = await openai.audio.speech.create({
      model: process.env.VOICEOVER_MODEL || "gpt-4o-mini-tts",
      voice: VOICE_BY_STYLE[input.voiceStyle],
      input: input.narration
    });

    const data = Buffer.from(await speech.arrayBuffer());
    await import("node:fs/promises").then((fs) => fs.writeFile(input.outputPath, data));
    return true;
  } catch {
    return false;
  }
}
