import { NextResponse } from "next/server";
import { getCatalog } from "@/lib/content-service";

export async function GET(request: Request) {
  const catalog = await getCatalog();
  const url = new URL(request.url);
  const genre = url.searchParams.get("genre");
  const q = (url.searchParams.get("q") || "").toLowerCase().trim();

  const items = catalog.filter((film) => {
    const genreMatch = genre ? film.genre.toLowerCase() === genre.toLowerCase() : true;
    const queryMatch = q
      ? [film.title, film.genre, film.synopsis, film.festival || ""]
          .join(" ")
          .toLowerCase()
          .includes(q)
      : true;

    return genreMatch && queryMatch;
  });

  return NextResponse.json({ items });
}
