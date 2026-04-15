import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongo";
import { Poster } from "@/lib/models/poster";
import { generatePosterImage } from "@/lib/posters/generator";
import { addPoster, hasMongoConnection, listPosters } from "@/lib/persistence/local-store";

export const runtime = "nodejs";

type CreatePosterBody = {
  title?: string;
  genre?: string;
  description?: string;
  style?: "thriller" | "romantic" | "action" | "festival" | "netflix";
};

export async function GET() {
  const posters = hasMongoConnection()
    ? await (async () => {
        await connectMongo();
        return Poster.find({}).sort({ createdAt: -1 }).limit(120).lean();
      })()
    : await listPosters();

  return NextResponse.json({ ok: true, posters });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CreatePosterBody;

  const title = body.title?.trim();
  const genre = body.genre?.trim();
  const description = body.description?.trim();
  const style = body.style;

  if (!title || !genre || !description || !style) {
    return NextResponse.json(
      {
        ok: false,
        message: "title, genre, description, and style are required"
      },
      { status: 400 }
    );
  }

  try {
    const generated = await generatePosterImage({ title, genre, description, style });
    const saved = hasMongoConnection()
      ? await (async () => {
          await connectMongo();
          return Poster.create({
            title,
            genre,
            description,
            style,
            prompt: generated.prompt,
            imageUrl: generated.imageUrl
          });
        })()
      : await addPoster({
          title,
          genre,
          description,
          style,
          prompt: generated.prompt,
          imageUrl: generated.imageUrl
        });

    return NextResponse.json({ ok: true, poster: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Poster generation failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
