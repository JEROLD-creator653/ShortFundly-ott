import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { getCatalog } from "@/lib/content-service";

type Props = {
  searchParams?: Promise<{
    q?: string;
    access?: string;
    rating?: string;
    duration?: string;
    genre?: string;
  }>;
};

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

function parseDurationToMinutes(duration: string): number {
  const text = duration.toLowerCase().trim();
  const hourMatch = text.match(/(\d+)\s*h/);
  const minuteMatch = text.match(/(\d+)\s*m/);

  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

  if (hours || minutes) return hours * 60 + minutes;

  const plainNumber = Number(text.replace(/[^\d]/g, ""));
  return Number.isFinite(plainNumber) ? plainNumber : 0;
}

function buildExploreHref(
  params: { q?: string; access?: string; rating?: string; duration?: string; genre?: string },
  updates: Partial<{ q: string; access: string; rating: string; duration: string; genre: string }>
): string {
  const next = new URLSearchParams();
  const merged = {
    q: params.q ?? "",
    access: params.access ?? "all",
    rating: params.rating ?? "0",
    duration: params.duration ?? "any",
    genre: params.genre ?? "all",
    ...updates
  };

  if (merged.q.trim()) next.set("q", merged.q.trim());
  if (merged.access !== "all") next.set("access", merged.access);
  if (merged.rating !== "0") next.set("rating", merged.rating);
  if (merged.duration !== "any") next.set("duration", merged.duration);
  if (merged.genre !== "all") next.set("genre", merged.genre);

  const query = next.toString();
  return query ? `/explore?${query}` : "/explore";
}

function filterPillClass(active: boolean): string {
  return active
    ? "rounded-full border border-primary bg-primary/20 px-3 py-1 text-xs uppercase tracking-widest text-primary"
    : "rounded-full border border-zinc-700 px-3 py-1 text-xs uppercase tracking-widest text-zinc-300 transition hover:border-zinc-500";
}

export default async function ExplorePage({ searchParams }: Props) {
  const catalog = await getCatalog();
  const genres = ["Drama", "Comedy", "Animation", "Documentary", "Thriller", "Romance"];
  const resolved = await searchParams;
  const params = {
    q: resolved?.q ?? "",
    access: resolved?.access ?? "all",
    rating: resolved?.rating ?? "0",
    duration: resolved?.duration ?? "any",
    genre: resolved?.genre ?? "all"
  };

  const query = params.q.trim();
  const access = ["all", "free", "premium"].includes(params.access) ? params.access : "all";
  const minRating = Number(params.rating);
  const safeMinRating = Number.isFinite(minRating) && minRating >= 0 && minRating <= 5 ? minRating : 0;
  const durationLimits: Record<string, number | null> = {
    any: null,
    short: 10,
    medium: 20,
    long: 40
  };
  const durationKey = Object.prototype.hasOwnProperty.call(durationLimits, params.duration)
    ? params.duration
    : "any";
  const maxDuration = durationLimits[durationKey];
  const selectedGenre = genres.find((genre) => genre.toLowerCase() === params.genre.toLowerCase()) ?? "all";

  const filteredCatalog = catalog.filter((film) => {
    const haystack = [film.title, film.genre, film.synopsis, film.festival ?? ""].join(" ");
    const queryMatch = query ? matchesQuery(haystack, query) : true;
    const genreMatch =
      selectedGenre === "all" ? true : matchesQuery(film.genre.toLowerCase(), selectedGenre.toLowerCase());
    const accessMatch = access === "all" ? true : access === "free" ? !film.premium : film.premium;
    const ratingMatch = film.rating >= safeMinRating;
    const durationMatch = maxDuration === null ? true : parseDurationToMinutes(film.duration) <= maxDuration;

    return queryMatch && genreMatch && accessMatch && ratingMatch && durationMatch;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-5xl uppercase leading-none [font-family:var(--font-heading)]">Explore</h1>
          <details className="group relative">
            <summary className="list-none cursor-pointer rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-200 transition hover:border-primary hover:text-primary">
              Filters
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] z-10 w-[320px] rounded-2xl border border-zinc-800 bg-zinc-950/95 p-5 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Access</p>
                <div className="flex flex-wrap gap-2">
                  <Link href={buildExploreHref(params, { access: "all" })} className={filterPillClass(access === "all")}>All</Link>
                  <Link href={buildExploreHref(params, { access: "free" })} className={filterPillClass(access === "free")}>Free</Link>
                  <Link href={buildExploreHref(params, { access: "premium" })} className={filterPillClass(access === "premium")}>Premium</Link>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Minimum Rating</p>
                <div className="flex flex-wrap gap-2">
                  {[0, 3, 4, 4.5].map((value) => (
                    <Link
                      key={value}
                      href={buildExploreHref(params, { rating: String(value) })}
                      className={filterPillClass(safeMinRating === value)}
                    >
                      {value === 0 ? "Any" : `${value}+`}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Duration</p>
                <div className="flex flex-wrap gap-2">
                  <Link href={buildExploreHref(params, { duration: "any" })} className={filterPillClass(durationKey === "any")}>Any</Link>
                  <Link href={buildExploreHref(params, { duration: "short" })} className={filterPillClass(durationKey === "short")}>0-10m</Link>
                  <Link href={buildExploreHref(params, { duration: "medium" })} className={filterPillClass(durationKey === "medium")}>0-20m</Link>
                  <Link href={buildExploreHref(params, { duration: "long" })} className={filterPillClass(durationKey === "long")}>0-40m</Link>
                </div>
              </div>

              <div className="mt-5 border-t border-zinc-800 pt-4">
                <Link href="/explore" className="text-xs uppercase tracking-widest text-sky-300 transition hover:text-primary">
                  Clear all filters
                </Link>
              </div>
            </div>
          </details>
        </div>
        <p className="mt-3 text-zinc-300">
          Browse by genre, discover indie creators, and find your next festival favorite.
        </p>
        {query ? <p className="mt-3 text-sm text-sky-300">Showing results for "{query}"</p> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={buildExploreHref(params, { genre: "all" })} className={filterPillClass(selectedGenre === "all")}>
            All
          </Link>
          {genres.map((genre) => (
            <Link
              key={genre}
              href={buildExploreHref(params, { genre })}
              className={filterPillClass(selectedGenre === genre)}
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl uppercase tracking-wider text-white [font-family:var(--font-heading)]">
            {query ? "Search Results" : "All Titles"}
          </h2>
          <span className="text-sm text-zinc-400">{filteredCatalog.length} titles</span>
        </div>

        {filteredCatalog.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCatalog.map((film) => (
              <ContentCard key={film.slug} film={film} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 text-zinc-300">
            No titles match your current filters.
          </div>
        )}
      </section>
    </div>
  );
}
