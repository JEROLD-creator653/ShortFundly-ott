import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai/gemini";
import type { CharacterLookupResult, RecapDepth, WatchSession } from "@/types/watchSession";

export const runtime = "nodejs";

type RecapRequest = {
  mode: "recap";
  depth: RecapDepth;
  session: WatchSession;
};

type CharacterRequest = {
  mode: "character";
  character: string;
  watchedEpisodes: string[];
};

type RequestBody = RecapRequest | CharacterRequest;

function limitWords(text: string, maxWords: number) {
  const words = text.trim().split(/\s+/);
  return words.length <= maxWords ? text.trim() : `${words.slice(0, maxWords).join(" ").trim()}`;
}

function buildRecapPrompt(session: WatchSession, depth: RecapDepth) {
  const x = Math.floor(session.resumePosition / 60);
  const y = Math.floor(session.resumePosition % 60);
  const characters = [...new Set(session.sceneMetadata.flatMap((scene) => scene.characters))];
  const descriptionBlock = session.contentSynopsis?.trim() || "No catalog description available.";
  const detailsBlock = session.contentDetails?.trim() || "No catalog details available.";

  const sceneBlock = session.sceneMetadata
    .map((s) => `[${s.timestamp}s] ${s.description} — characters: ${s.characters.join(", ")}`)
    .join("\n");

  const dialogueBlock = session.subtitleChunks
    .slice(-20)
    .map((c) => `${c.speaker}: "${c.text}"`)
    .join("\n");

  return [
    "You are a personalised TV recap assistant.",
    `The user is returning to watch "${session.episodeTitle}".`,
    `They are ${session.resumePosition}s into it (${x}m ${y}s).`,
    "",
    "CATALOG DESCRIPTION (DATABASE SOURCE OF TRUTH):",
    descriptionBlock,
    "",
    "CATALOG DETAILS:",
    detailsBlock,
    "",
    "SCENES THEY HAVE WATCHED:",
    sceneBlock || "No scene metadata available yet.",
    "",
    "LAST DIALOGUE LINES:",
    dialogueBlock || "No dialogue snippets available yet.",
    "",
    "CHARACTERS THEY HAVE SEEN SO FAR:",
    characters.join(", ") || "No named characters provided.",
    "",
    depth === "brief"
      ? [
          "Write a small recap in exactly 2 short sentences, max 45 words.",
          'Start with "Last time:" and include one key detail from the catalog description when available.',
          "No spoilers beyond what is listed."
        ].join("\n")
      : [
          "Write a 150-word narrated recap.",
          "Paragraph 1: key events that happened using catalog description + watched context.",
          "Paragraph 2: exactly where they left off.",
          `End with the precise timestamp reminder: "You're ${x}m ${y}s into ${session.episodeTitle}."`
        ].join("\n"),
    "",
    "RULE: Use catalog description/details as primary context, then blend watched data.",
    "Only reference characters and events from the data above.",
    "Never invent plot details, never extrapolate forward."
  ].join("\n");
}

function buildSmallRecapFallback(session: WatchSession) {
  const x = Math.floor(session.resumePosition / 60);
  const y = Math.floor(session.resumePosition % 60);
  const synopsis = session.contentSynopsis?.trim();
  const details = session.contentDetails?.trim();

  const base = synopsis
    ? `Last time: ${limitWords(synopsis, 24)}`
    : `Last time: You were watching "${session.episodeTitle}".`;

  const addon = details ? `(${details})` : "";
  return `${base} ${addon} You are at ${x}m ${y}s, so you can continue right where you left off.`.trim();
}

async function callGemini(prompt: string, maxTokens: number) {
  const model = getGeminiModel();
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      maxOutputTokens: maxTokens
    }
  });

  const text = result.response.text().trim();
  if (!text) {
    throw new Error("No response returned");
  }

  return text;
}

function parseCharacterResponse(raw: string, fallbackName: string): CharacterLookupResult {
  try {
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      return JSON.parse(raw.slice(jsonStart, jsonEnd + 1)) as CharacterLookupResult;
    }
  } catch {
    // Ignore and use fallback.
  }

  return {
    name: fallbackName,
    role: "Character in watched episodes",
    firstSeen: "Earlier watched episode",
    summary: limitWords(raw, 45)
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;

    if (body.mode === "recap") {
      const prompt = buildRecapPrompt(body.session, body.depth);
      let recap: string;
      try {
        const output = await callGemini(prompt, body.depth === "brief" ? 120 : 400);
        recap = body.depth === "brief" ? limitWords(output, 45) : limitWords(output, 150);
      } catch {
        recap = buildSmallRecapFallback(body.session);
      }
      return NextResponse.json({ recap });
    }

    if (body.mode === "character") {
      const characterName = body.character.trim();
      if (!characterName) {
        return NextResponse.json({ message: "character is required" }, { status: 400 });
      }

      const prompt = [
        `Who is ${characterName}?`,
        "Answer ONLY using events from these episodes the user has already watched:",
        body.watchedEpisodes.join(", "),
        "Maximum 3 sentences. No future spoilers under any circumstances.",
        "",
        "Return JSON with keys: name, role, firstSeen, summary."
      ].join("\n");

      const output = await callGemini(prompt, 220);
      const character = parseCharacterResponse(output, characterName);
      return NextResponse.json({ character });
    }

    return NextResponse.json({ message: "Invalid mode" }, { status: 400 });
  } catch (error) {
    console.error("Recap route error:", error);
    return NextResponse.json({ message: "Unable to generate response", error: String(error) }, { status: 500 });
  }
}
