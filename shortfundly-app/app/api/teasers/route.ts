import fs from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongo";
import { TeaserRender } from "@/lib/models/teaser-render";
import type { TeaserCreateInput, TeaserAssetBundle } from "@/lib/teaser-generator/types";
import { getShotstackRender } from "@/lib/teaser-generator/shotstack";
import { createTeaserRender, hasMongoConnection, listTeaserRenders, updateTeaserRender } from "@/lib/persistence/local-store";

export const runtime = "nodejs";

function toPublicAssetUrl(publicPath: string) {
  const baseUrl = process.env.PUBLIC_ASSET_BASE_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim() || "";
  if (!baseUrl) return publicPath;
  return `${baseUrl.replace(/\/$/, "")}${publicPath}`;
}

function hasReachablePublicAssetBaseUrl() {
  const baseUrl = process.env.PUBLIC_ASSET_BASE_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim() || "";
  if (!baseUrl) return false;

  try {
    const parsed = new URL(baseUrl);
    if (!/^https?:$/.test(parsed.protocol)) return false;

    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host === "::1") return false;

    return true;
  } catch {
    return false;
  }
}

function normalizeStatus(status: string) {
  const value = status.toLowerCase();
  if (value === "done") return "completed";
  if (value === "failed") return "failed";
  if (value === "rendering") return "rendering";
  return "queued";
}

function absolutePathToPublicPath(absolutePath: string) {
  const relativePath = path.relative(process.cwd(), absolutePath).replace(/\\/g, "/");
  const withoutPublicPrefix = relativePath.replace(/^public\//, "");
  return `/${withoutPublicPrefix}`;
}

function resolveTeaserEnvFile() {
  return process.env.TEASER_ENV_FILE?.trim() || path.resolve(process.cwd(), "..", ".env.teaser");
}

function resolveTeaserPythonBinary() {
  return process.env.TEASER_PYTHON_BIN?.trim() || path.resolve(process.cwd(), "..", ".venv", "Scripts", "python.exe");
}

function resolveTeaserCliScript() {
  return path.resolve(process.cwd(), "..", "generate_teaser_cli.py");
}

function compactLogTail(text: string, maxChars = 1400) {
  const normalized = text.replace(/\r/g, "").trim();
  if (!normalized) return "";

  const tailWindow = normalized.slice(-maxChars * 4);
  const tailLines = tailWindow
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .slice(-18)
    .join(" ");

  const compact = tailLines.replace(/\s+/g, " ").trim();
  if (compact.length <= maxChars) return compact;
  return compact.slice(-maxChars);
}

async function persistTeaserUpdate(
  jobId: string,
  updates: Partial<Pick<Awaited<ReturnType<typeof createTeaserRender>>, "status" | "outputUrl" | "errorMessage" | "script">>
) {
  if (hasMongoConnection()) {
    await connectMongo();
    await TeaserRender.findByIdAndUpdate(jobId, updates);
    return TeaserRender.findById(jobId).lean();
  }

  return updateTeaserRender(jobId, updates);
}

async function runGodLevelTeaserGeneration(input: {
  jobId: string;
  title: string;
  genre: string;
  language: string;
  duration: number;
  mood: string;
  voiceStyle: string;
  clips: Array<{ localPath: string }>;
  music?: { localPath: string };
  poster?: { url: string };
}) {
  const outputDir = path.join(process.cwd(), "public", "generated", "teasers", input.jobId);
  const outputPath = path.join(outputDir, "final_teaser.mp4");
  const metadataPath = path.join(outputDir, "metadata.json");
  const pythonBinary = resolveTeaserPythonBinary();
  const cliScript = resolveTeaserCliScript();
  const envFile = resolveTeaserEnvFile();

  await fs.mkdir(outputDir, { recursive: true });
  await persistTeaserUpdate(input.jobId, { status: "rendering", errorMessage: undefined });

  const args = [
    cliScript,
    "--title",
    input.title,
    "--genre",
    input.genre,
    "--language",
    input.language,
    "--duration",
    String(input.duration),
    "--mood",
    input.mood,
    "--voice-style",
    input.voiceStyle,
    "--clips",
    ...input.clips.map((clip) => clip.localPath),
    "--output",
    outputPath
  ];

  if (input.music?.localPath) {
    args.push("--music", input.music.localPath);
  }

  if (input.poster?.url) {
    args.push("--poster", input.poster.url);
  }

  const stdout: string[] = [];
  const stderr: string[] = [];
  const workerLogPath = path.join(outputDir, "worker.log");

  await new Promise<void>((resolve) => {
    const child = spawn(pythonBinary, args, {
      cwd: path.resolve(process.cwd(), ".."),
      env: {
        ...process.env,
        TEASER_ENV_FILE: envFile,
        PYTHONUNBUFFERED: "1",
        PYTHONIOENCODING: "utf-8"
      },
      windowsHide: true
    });

    child.stdout.on("data", (chunk) => stdout.push(String(chunk)));
    child.stderr.on("data", (chunk) => stderr.push(String(chunk)));

    child.on("error", async (error) => {
      await persistTeaserUpdate(input.jobId, {
        status: "failed",
        errorMessage: `Teaser worker failed to start: ${error.message}`
      });
      resolve();
    });

    child.on("close", async (code) => {
      const stdoutText = stdout.join("");
      const stderrText = stderr.join("");
      const mergedLogs = [stderrText, stdoutText].filter(Boolean).join("\n\n--- STDOUT ---\n\n");

      try {
        await fs.writeFile(workerLogPath, mergedLogs || `Worker exited with code ${code ?? "unknown"}`, "utf8");
      } catch {
        // Best-effort log persistence only.
      }

      if (code !== 0) {
        const snippet =
          compactLogTail(stderrText) || compactLogTail(stdoutText) || compactLogTail(mergedLogs) || `Worker exited with code ${code}`;
        await persistTeaserUpdate(input.jobId, {
          status: "failed",
          errorMessage: snippet
            ? `Teaser generation failed: ${snippet} (full log: ${absolutePathToPublicPath(workerLogPath)})`
            : `Teaser generation failed with exit code ${code}`
        });
        resolve();
        return;
      }

      try {
        const rawMetadata = await fs.readFile(metadataPath, "utf8");
        const metadata = JSON.parse(rawMetadata) as { script?: { narration?: string } };
        const scriptText = metadata.script?.narration || `${input.title} teaser generated successfully.`;

        await persistTeaserUpdate(input.jobId, {
          status: "completed",
          outputUrl: absolutePathToPublicPath(outputPath),
          script: scriptText,
          errorMessage: undefined
        });
      } catch (error) {
        await persistTeaserUpdate(input.jobId, {
          status: "completed",
          outputUrl: absolutePathToPublicPath(outputPath),
          script: `${input.title} teaser generated successfully.`,
          errorMessage: error instanceof Error ? error.message : undefined
        });
      }

      resolve();
    });
  });
}

async function saveUploadFile(input: { file: File; targetDir: string; prefix: string }) {
  await fs.mkdir(input.targetDir, { recursive: true });
  const ext = path.extname(input.file.name || "") || ".bin";
  const name = `${input.prefix}-${randomUUID()}${ext}`;
  const absolutePath = path.join(input.targetDir, name);
  const publicPath = absolutePathToPublicPath(absolutePath);
  const data = Buffer.from(await input.file.arrayBuffer());
  await fs.writeFile(absolutePath, data);

  return {
    localPath: absolutePath,
    publicPath,
    url: toPublicAssetUrl(publicPath)
  };
}

async function syncRecordStatus(record: {
  _id: string;
  status: string;
  shotstackRenderId?: string;
}) {
  if (!record.shotstackRenderId || record.status === "completed" || record.status === "failed") {
    return null;
  }

  try {
    const remote = await getShotstackRender(record.shotstackRenderId);
    const nextStatus = normalizeStatus(remote.status);

    if (hasMongoConnection()) {
      await connectMongo();
      await TeaserRender.findByIdAndUpdate(record._id, {
        status: nextStatus,
        ...(nextStatus === "failed" && remote.error ? { errorMessage: remote.error } : {}),
        ...(remote.url ? { outputUrl: remote.url } : {})
      });
    } else {
      await updateTeaserRender(record._id, {
        status: nextStatus,
        ...(nextStatus === "failed" && remote.error ? { errorMessage: remote.error } : {}),
        ...(remote.url ? { outputUrl: remote.url } : {})
      });
    }

    return { status: nextStatus, outputUrl: remote.url, error: remote.error };
  } catch {
    return null;
  }
}

export async function GET() {
  const jobs = hasMongoConnection()
    ? await (async () => {
        await connectMongo();
        return TeaserRender.find({}).sort({ createdAt: -1 }).limit(120).lean();
      })()
    : await listTeaserRenders();

  await Promise.all(
    jobs
      .slice(0, 16)
      .map((job) => syncRecordStatus({ _id: String(job._id), status: String(job.status || "queued"), shotstackRenderId: job.shotstackRenderId }))
  );

  const refreshed = hasMongoConnection()
    ? await (async () => {
        await connectMongo();
        return TeaserRender.find({}).sort({ createdAt: -1 }).limit(120).lean();
      })()
    : await listTeaserRenders();

  return NextResponse.json({ ok: true, jobs: refreshed });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = String(formData.get("title") || "").trim();
    const genre = String(formData.get("genre") || "").trim();
    const language = String(formData.get("language") || "").trim();
    const duration = Number(formData.get("duration") || 30) as 15 | 30 | 45 | 60;
    const mood = String(formData.get("mood") || "epic").trim() as TeaserCreateInput["mood"];
    const voiceStyle = String(formData.get("voiceStyle") || "deep-male").trim() as TeaserCreateInput["voiceStyle"];
    const includeSubtitles = String(formData.get("includeSubtitles") || "true") === "true";

    const poster = formData.get("poster");
    const music = formData.get("music");
    const imageFiles = formData.getAll("images").filter((file): file is File => file instanceof File && file.size > 0);
    const clipFiles = formData.getAll("clips").filter((file): file is File => file instanceof File && file.size > 0);

    if (!title || !genre || !language || ![15, 30, 45, 60].includes(duration) || !["epic", "thriller", "emotional", "action", "mystery"].includes(mood)) {
      return NextResponse.json(
        {
          ok: false,
          message: "title, genre, language, duration, and mood are required"
        },
        { status: 400 }
      );
    }

    const input: TeaserCreateInput = {
      title,
      genre,
      language,
      duration,
      mood,
      voiceStyle,
      includeSubtitles
    };

    if (!clipFiles.length) {
      return NextResponse.json({ ok: false, message: "At least one clip is required" }, { status: 400 });
    }

    const jobId = randomUUID();
    const rootAssetDir = path.join(process.cwd(), "public", "uploads", "teasers", jobId);
    const imageDir = path.join(rootAssetDir, "images");
    const clipDir = path.join(rootAssetDir, "clips");
    const audioDir = path.join(rootAssetDir, "audio");

    const assets: TeaserAssetBundle = {
      images: [],
      clips: []
    };

    if (poster instanceof File && poster.size > 0) {
      assets.poster = await saveUploadFile({ file: poster, targetDir: imageDir, prefix: "poster" });
    }

    for (const image of imageFiles) {
      assets.images.push(await saveUploadFile({ file: image, targetDir: imageDir, prefix: "image" }));
    }

    for (const clip of clipFiles) {
      assets.clips.push(await saveUploadFile({ file: clip, targetDir: clipDir, prefix: "clip" }));
    }

    if (music instanceof File && music.size > 0) {
      assets.music = await saveUploadFile({ file: music, targetDir: audioDir, prefix: "music" });
    }

    const recordPayload = {
      title,
      genre,
      language,
      duration,
      mood,
      voiceStyle,
      includeSubtitles,
      script: "Teaser generation queued.",
      outputUrl: undefined,
      status: "queued" as const,
      errorMessage: undefined
    };

    const job = hasMongoConnection()
      ? await (async () => {
          await connectMongo();
          return TeaserRender.create(recordPayload);
        })()
      : await createTeaserRender(recordPayload);

    void runGodLevelTeaserGeneration({
      jobId: String(job._id),
      title,
      genre,
      language,
      duration,
      mood,
      voiceStyle,
      clips: assets.clips,
      music: assets.music,
      poster: assets.poster
    });

    const latest = hasMongoConnection()
      ? await (async () => {
          await connectMongo();
          return TeaserRender.findById(job._id).lean();
        })()
      : await listTeaserRenders(1).then((items) => items.find((item) => item._id === String(job._id)) || job);

    return NextResponse.json({ ok: true, teaser: latest || job });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to queue teaser";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
