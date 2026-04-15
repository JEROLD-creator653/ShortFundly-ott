import { Schema, model, models } from "mongoose";

export type TeaserFormat = "shorts" | "reel" | "widescreen";
export type TeaserStatus = "queued" | "processing" | "completed" | "failed";

export type TeaserJobDocument = {
  title: string;
  caption?: string;
  format: TeaserFormat;
  inputPath: string;
  outputUrl?: string;
  status: TeaserStatus;
  errorMessage?: string;
  includeVoiceover: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const TeaserJobSchema = new Schema<TeaserJobDocument>(
  {
    title: { type: String, required: true },
    caption: { type: String },
    format: { type: String, enum: ["shorts", "reel", "widescreen"], required: true },
    inputPath: { type: String, required: true },
    outputUrl: { type: String },
    status: {
      type: String,
      enum: ["queued", "processing", "completed", "failed"],
      default: "queued",
      index: true
    },
    errorMessage: { type: String },
    includeVoiceover: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const TeaserJob = models.TeaserJob || model<TeaserJobDocument>("TeaserJob", TeaserJobSchema);
