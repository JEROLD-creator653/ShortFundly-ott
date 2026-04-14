import { getCatalog } from "@/lib/content-service";

export default async function FestivalPage() {
  const catalog = await getCatalog();
  const picks = catalog.filter((film) => film.festival);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8">
      <h1 className="text-5xl uppercase [font-family:var(--font-heading)]">Festival</h1>
      <p className="mt-3 max-w-3xl text-zinc-300">
        Explore festival submissions, jury picks, and award-winning shorts curated for indie cinema lovers.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {picks.map((film) => (
          <article key={film.slug} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <h2 className="text-2xl uppercase [font-family:var(--font-heading)]">{film.title}</h2>
            <p className="mt-1 text-sm text-zinc-400">{film.festival}</p>
            <p className="mt-3 text-sm text-zinc-300">{film.synopsis}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
