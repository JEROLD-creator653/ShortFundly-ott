import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongo";
import { TeaserRender } from "@/lib/models/teaser-render";
import { generateTeaserScript, generateVoiceoverAudio } from "@/lib/teaser-generator/ai";
import { buildShotstackEdit } from "@/lib/teaser-generator/timeline";
import { createShotstackRender, getShotstackRender } from "@/lib/teaser-generator/shotstack";
import type { TeaserCreateInput, TeaserAssetBundle } from "@/lib/teaser-generator/types";
import { createTeaserJob, hasMongoConnection, listTeaserJobs, updateTeaserJob } from "@/lib/persistence/local-store";

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
      await updateTeaserJob(record._id, {
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
    : await listTeaserJobs();

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
    : await listTeaserJobs();

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

    const script = await generateTeaserScript(input);

    const rootAssetDir = path.join(process.cwd(), "public", "uploads", "teasers", randomUUID());
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

    const voiceoverPath = path.join(audioDir, `voiceover-${randomUUID()}.mp3`);
    const voiceOk = await generateVoiceoverAudio({
      narration: script.narration,
      voiceStyle,
      outputPath: voiceoverPath
    });

    if (voiceOk) {
      const publicPath = absolutePathToPublicPath(voiceoverPath);
      assets.voiceover = {
        localPath: voiceoverPath,
        publicPath,
        url: toPublicAssetUrl(publicPath)
      };
    }

    const hasShotstack = Boolean(process.env.SHOTSTACK_API_KEY?.trim());
    const canUseShotstack = hasShotstack && hasReachablePublicAssetBaseUrl();
    let renderId: string | undefined;
    let status: "queued" | "rendering" | "completed" | "failed" = "queued";
    let outputUrl: string | undefined;
    let errorMessage: string | undefined;

    if (canUseShotstack) {
      const edit = buildShotstackEdit({
        assets,
        script,
        config: input
      });

      const hasAbsoluteAssets = [
        ...(assets.poster ? [assets.poster.url] : []),
        ...assets.images.map((item) => item.url),
        ...assets.clips.map((item) => item.url),
        ...(assets.music ? [assets.music.url] : []),
        ...(assets.voiceover ? [assets.voiceover.url] : [])
      ].every((url) => /^https?:\/\//i.test(url));

      if (!hasAbsoluteAssets) {
        throw new Error("Shotstack requires publicly accessible asset URLs. Set PUBLIC_ASSET_BASE_URL.");
      }

      const created = await createShotstackRender(edit);
      renderId = created.renderId;
      status = normalizeStatus(created.status) as "queued" | "rendering" | "completed" | "failed";
    } else {
      outputUrl = assets.clips[0]?.publicPath || assets.images[0]?.publicPath || assets.poster?.publicPath;
      status = outputUrl ? "completed" : "failed";
      if (!outputUrl) {
        errorMessage = "No visual assets were uploaded to build teaser preview";
      } else if (hasShotstack && !canUseShotstack) {
        errorMessage = "Shotstack skipped because PUBLIC_ASSET_BASE_URL is missing or not publicly reachable. Using local preview output.";
      }
    }

    const recordPayload = {
      title,
      genre,
      language,
      duration,
      mood,
      voiceStyle,
      includeSubtitles,
      script: script.narration,
      shotstackRenderId: renderId,
      outputUrl,
      status,
      errorMessage
    };

    const job = hasMongoConnection()
      ? await (async () => {
          await connectMongo();
          return TeaserRender.create(recordPayload);
        })()
      : await createTeaserJob(recordPayload);

    if (job.shotstackRenderId) {
      await syncRecordStatus({ _id: String(job._id), status: String(job.status), shotstackRenderId: job.shotstackRenderId });
    }

    const latest = hasMongoConnection()
      ? await (async () => {
          await connectMongo();
          return TeaserRender.findById(job._id).lean();
        })()
      : await listTeaserJobs(1).then((items) => items.find((item) => item._id === String(job._id)) || job);

    return NextResponse.json({ ok: true, teaser: latest || job });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to queue teaser";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
