import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import OpenAI from "openai";
import type { TeaserFormat } from "@/lib/models/teaser-job";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

function getScale(format: TeaserFormat) {
  if (format === "widescreen") {
    return "1920:1080";
  }

  return "1080:1920";
}

function escapeDrawText(value: string) {
  return value.replace(/[:'\\]/g, (token) => `\\${token}`);
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function maybeCreateVoiceover(caption: string, outputDir: string) {
  if (!openai || !caption.trim()) {
    return null;
  }

  const speech = await openai.audio.speech.create({
    model: process.env.VOICEOVER_MODEL || "gpt-4o-mini-tts",
    voice: process.env.VOICEOVER_NAME || "alloy",
    input: caption
  });

  const audioPath = path.join(outputDir, `voice-${randomUUID()}.mp3`);
  const audioBuffer = Buffer.from(await speech.arrayBuffer());
  await fs.writeFile(audioPath, audioBuffer);
  return audioPath;
}

async function runFfmpeg(args: string[]) {
  await new Promise<void>((resolve, reject) => {
    const command = process.env.FFMPEG_BIN || "ffmpeg";
    const proc = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });

    let stderr = "";
    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    proc.on("error", (error) => {
      reject(new Error(`FFmpeg start error: ${error.message}`));
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(stderr || `FFmpeg exited with code ${code}`));
    });
  });
}

export async function generateTeaser(params: {
  inputPath: string;
  title: string;
  format: TeaserFormat;
  caption?: string;
  includeVoiceover: boolean;
}) {
  const outDir = path.join(process.cwd(), "public", "generated", "teasers");
  await fs.mkdir(outDir, { recursive: true });

  const teaserId = randomUUID();
  const outputPath = path.join(outDir, `${teaserId}.mp4`);
  const scale = getScale(params.format);
  const escapedCaption = escapeDrawText(params.caption || params.title);

  const videoFilter = [
    `scale=${scale}:force_original_aspect_ratio=decrease`,
    `pad=${scale}:(ow-iw)/2:(oh-ih)/2:black`,
    `drawtext=text='${escapedCaption}':fontcolor=white:fontsize=52:box=1:boxcolor=black@0.55:boxborderw=14:x=(w-text_w)/2:y=h-(text_h*2.8)`
  ].join(",");

  const bgmPath = process.env.TEASER_BACKGROUND_MUSIC_PATH || "";
  const hasBgm = bgmPath ? await fileExists(bgmPath) : false;

  let voiceoverPath: string | null = null;
  if (params.includeVoiceover) {
    voiceoverPath = await maybeCreateVoiceover(params.caption || params.title, outDir);
  }

  const args = ["-y", "-i", params.inputPath];

  if (hasBgm) {
    args.push("-stream_loop", "-1", "-i", bgmPath);
  }

  if (voiceoverPath) {
    args.push("-i", voiceoverPath);
  }

  args.push("-t", "15", "-vf", videoFilter);

  if (hasBgm && voiceoverPath) {
    args.push(
      "-filter_complex",
      "[1:a]volume=0.18[bg];[2:a]volume=1.00[vo];[bg][vo]amix=inputs=2:duration=shortest[aout]",
      "-map",
      "0:v:0",
      "-map",
      "[aout]"
    );
  } else if (hasBgm) {
    args.push("-map", "0:v:0", "-map", "1:a:0");
  } else if (voiceoverPath) {
    args.push("-map", "0:v:0", "-map", "1:a:0");
  } else {
    args.push("-map", "0:v:0", "-map", "0:a?");
  }

  args.push("-shortest", "-c:v", "libx264", "-preset", "medium", "-c:a", "aac", "-b:a", "192k", outputPath);

  await runFfmpeg(args);

  if (voiceoverPath) {
    await fs.unlink(voiceoverPath).catch(() => undefined);
  }

  return {
    outputPath,
    outputUrl: `/generated/teasers/${teaserId}.mp4`
  };
}
