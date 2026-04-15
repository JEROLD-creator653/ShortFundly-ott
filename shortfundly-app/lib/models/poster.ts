import { Schema, model, models } from "mongoose";

export type PosterStyle = "thriller" | "romantic" | "action" | "festival" | "netflix";

export type PosterDocument = {
  title: string;
  genre: string;
  description: string;
  style: PosterStyle;
  prompt: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

const PosterSchema = new Schema<PosterDocument>(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    style: {
      type: String,
      enum: ["thriller", "romantic", "action", "festival", "netflix"],
      required: true
    },
    prompt: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Poster = models.Poster || model<PosterDocument>("Poster", PosterSchema);
