import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongo";
import { TeaserJob } from "@/lib/models/teaser-job";
import { enqueueTeaserJob } from "@/lib/teasers/queue";
import { createTeaserJob, hasMongoConnection, listTeaserJobs } from "@/lib/persistence/local-store";

export const runtime = "nodejs";

export async function GET() {
  const jobs = hasMongoConnection()
    ? await (async () => {
        await connectMongo();
        return TeaserJob.find({}).sort({ createdAt: -1 }).limit(120).lean();
      })()
    : await listTeaserJobs();

  return NextResponse.json({ ok: true, jobs });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = String(formData.get("title") || "").trim();
    const format = String(formData.get("format") || "shorts").trim() as "shorts" | "reel" | "widescreen";
    const caption = String(formData.get("caption") || "").trim();
    const includeVoiceover = String(formData.get("includeVoiceover") || "false") === "true";
    const clip = formData.get("clip");

    if (!title || !clip || !(clip instanceof File)) {
      return NextResponse.json(
        {
          ok: false,
          message: "title and clip file are required"
        },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "storage", "uploads", "teasers");
    await fs.mkdir(uploadsDir, { recursive: true });
    const ext = path.extname(clip.name) || ".mp4";
    const localName = `${randomUUID()}${ext}`;
    const inputPath = path.join(uploadsDir, localName);
    const arrayBuffer = await clip.arrayBuffer();
    await fs.writeFile(inputPath, Buffer.from(arrayBuffer));

    const job = hasMongoConnection()
      ? await (async () => {
          await connectMongo();
          return TeaserJob.create({
            title,
            caption,
            format,
            inputPath,
            status: "queued",
            includeVoiceover
          });
        })()
      : await createTeaserJob({
          title,
          caption,
          format,
          inputPath,
          status: "queued",
          includeVoiceover
        });

    enqueueTeaserJob(job._id.toString());

    return NextResponse.json({ ok: true, job });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to queue teaser";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
