import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongo";
import { TeaserRender } from "@/lib/models/teaser-render";
import { hasMongoConnection, listTeaserRenders } from "@/lib/persistence/local-store";

export const runtime = "nodejs";

function resolveOutputFile(outputUrl: string) {
  if (outputUrl.startsWith("/")) {
    const relative = outputUrl.replace(/^\/+/, "").replace(/^public\//, "");
    return path.join(process.cwd(), "public", relative);
  }

  const fileName = path.basename(outputUrl);
  return path.join(process.cwd(), "public", "generated", "teasers", fileName);
}

export async function GET(_: Request, context: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await context.params;

  let outputUrl: string | undefined;

  if (hasMongoConnection()) {
    await connectMongo();
    const mongoJob = (await TeaserRender.findById(jobId).lean()) as { outputUrl?: string } | null;
    outputUrl = mongoJob?.outputUrl;
  } else {
    const localJob = (await listTeaserRenders(1000)).find((item) => item._id === jobId);
    outputUrl = localJob?.outputUrl;
  }

  if (!outputUrl) {
    return NextResponse.json({ ok: false, message: "Teaser output not found" }, { status: 404 });
  }

  if (/^https?:\/\//i.test(outputUrl)) {
    return NextResponse.redirect(outputUrl);
  }

  const outputPath = resolveOutputFile(outputUrl);

  try {
    const stat = await fs.stat(outputPath);
    if (!stat.isFile()) {
      return NextResponse.json({ ok: false, message: "Teaser file not found" }, { status: 404 });
    }

    const video = await fs.readFile(outputPath);
    return new NextResponse(video, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": String(stat.size),
        "Content-Disposition": `inline; filename=\"${path.basename(outputPath)}\"`
      }
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Teaser file not found" }, { status: 404 });
  }
}
