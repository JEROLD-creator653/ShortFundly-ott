import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongo";
import { TeaserRender } from "@/lib/models/teaser-render";
import { getShotstackRender } from "@/lib/teaser-generator/shotstack";
import { hasMongoConnection, listTeaserRenders, updateTeaserRender } from "@/lib/persistence/local-store";

export const runtime = "nodejs";

function normalizeStatus(status: string) {
  const value = status.toLowerCase();
  if (value === "done") return "completed";
  if (value === "failed") return "failed";
  if (value === "rendering") return "rendering";
  return "queued";
}

export async function GET(_: Request, context: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await context.params;

  let record: any = null;
  if (hasMongoConnection()) {
    await connectMongo();
    record = await TeaserRender.findById(jobId).lean();
  } else {
    record = (await listTeaserRenders(1000)).find((item) => item._id === jobId) || null;
  }

  if (!record) {
    return NextResponse.json({ ok: false, message: "Teaser render not found" }, { status: 404 });
  }

  if (record.shotstackRenderId && record.status !== "completed" && record.status !== "failed") {
    try {
      const remote = await getShotstackRender(record.shotstackRenderId);
      const status = normalizeStatus(remote.status);

      if (hasMongoConnection()) {
        await connectMongo();
        await TeaserRender.findByIdAndUpdate(jobId, {
          status,
          ...(status === "failed" && remote.error ? { errorMessage: remote.error } : {}),
          ...(remote.url ? { outputUrl: remote.url } : {})
        });
        record = await TeaserRender.findById(jobId).lean();
      } else {
        record = await updateTeaserRender(jobId, {
          status,
          ...(status === "failed" && remote.error ? { errorMessage: remote.error } : {}),
          ...(remote.url ? { outputUrl: remote.url } : {})
        });
      }
    } catch {
      // Keep existing status when polling fails.
    }
  }

  return NextResponse.json({ ok: true, teaser: record });
}
