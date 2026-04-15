import { Schema, model, models } from "mongoose";

export type TeaserMood = "epic" | "thriller" | "emotional" | "action" | "mystery";
export type VoiceStyle = "deep-male" | "cinematic-female" | "energetic" | "suspense";

export type TeaserRenderStatus = "queued" | "rendering" | "completed" | "failed";

export type TeaserRenderDocument = {
  title: string;
  genre: string;
  language: string;
  duration: 15 | 30 | 45 | 60;
  mood: TeaserMood;
  voiceStyle: VoiceStyle;
  includeSubtitles: boolean;
  script: string;
  shotstackRenderId?: string;
  outputUrl?: string;
  status: TeaserRenderStatus;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
};

const TeaserRenderSchema = new Schema<TeaserRenderDocument>(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    language: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, enum: [15, 30, 45, 60] },
    mood: { type: String, required: true, enum: ["epic", "thriller", "emotional", "action", "mystery"] },
    voiceStyle: {
      type: String,
      required: true,
      enum: ["deep-male", "cinematic-female", "energetic", "suspense"]
    },
    includeSubtitles: { type: Boolean, default: true },
    script: { type: String, required: true },
    shotstackRenderId: { type: String },
    outputUrl: { type: String },
    status: { type: String, required: true, enum: ["queued", "rendering", "completed", "failed"], default: "queued" },
    errorMessage: { type: String }
  },
  { timestamps: true }
);

export const TeaserRender = models.TeaserRender || model<TeaserRenderDocument>("TeaserRender", TeaserRenderSchema);
