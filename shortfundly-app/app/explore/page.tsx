import { ContentRail } from "@/components/content-rail";
import { getCatalog } from "@/lib/content-service";

export default async function ExplorePage() {
  const catalog = await getCatalog();
  const genres = ["Drama", "Comedy", "Animation", "Documentary", "Thriller", "Romance"];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
        <h1 className="text-5xl uppercase leading-none [font-family:var(--font-heading)]">Explore</h1>
        <p className="mt-3 text-zinc-300">
          Browse by genre, discover indie creators, and find your next festival favorite.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-zinc-700 px-3 py-1 text-xs uppercase tracking-widest text-zinc-300"
            >
              {genre}
            </span>
          ))}
        </div>
      </section>
      <ContentRail title="All Titles" films={catalog} />
    </div>
  );
}
