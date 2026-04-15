import { connectMongo } from "@/lib/db/mongo";
import { TeaserJob } from "@/lib/models/teaser-job";
import { generateTeaser } from "@/lib/teasers/ffmpeg";
import { hasMongoConnection, listTeaserJobs, updateTeaserJob } from "@/lib/persistence/local-store";

const state = {
  running: false,
  queue: [] as string[]
};

async function processNext() {
  if (state.running) return;

  const nextJobId = state.queue.shift();
  if (!nextJobId) return;

  state.running = true;

  try {
    if (!hasMongoConnection()) {
      const jobs = await listTeaserJobs(1000);
      const job = jobs.find((item) => item._id === nextJobId);

      if (!job) {
        return;
      }

      await updateTeaserJob(nextJobId, { status: "processing" });

      const output = await generateTeaser({
        inputPath: job.inputPath,
        title: job.title,
        format: job.format,
        caption: job.caption,
        includeVoiceover: job.includeVoiceover
      });

      await updateTeaserJob(nextJobId, { status: "completed", outputUrl: output.outputUrl, errorMessage: undefined });
      return;
    }

    await connectMongo();
    const job = await TeaserJob.findById(nextJobId);

    if (!job) {
      return;
    }

    job.status = "processing";
    await job.save();

    const output = await generateTeaser({
      inputPath: job.inputPath,
      title: job.title,
      format: job.format,
      caption: job.caption,
      includeVoiceover: job.includeVoiceover
    });

    job.status = "completed";
    job.outputUrl = output.outputUrl;
    job.errorMessage = undefined;
    await job.save();
  } catch (error) {
    if (hasMongoConnection()) {
      await connectMongo();
      const failed = await TeaserJob.findById(nextJobId);
      if (failed) {
        failed.status = "failed";
        failed.errorMessage = error instanceof Error ? error.message : "Teaser processing failed";
        await failed.save();
      }
    } else {
      await updateTeaserJob(nextJobId, {
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Teaser processing failed"
      });
    }
  } finally {
    state.running = false;
    void processNext();
  }
}

export function enqueueTeaserJob(jobId: string) {
  state.queue.push(jobId);
  void processNext();
}
