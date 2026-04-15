import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { getCatalog } from "@/lib/content-service";
import { FilterCloser } from "@/components/filter-closer";

type Props = {
  searchParams?: Promise<{
    q?: string;
    access?: string;
    rating?: string;
    duration?: string;
    genre?: string;
    language?: string;
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
  params: { q?: string; access?: string; rating?: string; duration?: string; genre?: string; language?: string },
  updates: Partial<{ q: string; access: string; rating: string; duration: string; genre: string; language: string }>
): string {
  const next = new URLSearchParams();
  const merged = {
    q: params.q ?? "",
    access: params.access ?? "all",
    rating: params.rating ?? "0",
    duration: params.duration ?? "any",
    genre: params.genre ?? "all",
    language: params.language ?? "all",
    ...updates
  };

  if (merged.q.trim()) next.set("q", merged.q.trim());
  if (merged.access !== "all") next.set("access", merged.access);
  if (merged.rating !== "0") next.set("rating", merged.rating);
  if (merged.duration !== "any") next.set("duration", merged.duration);
  if (merged.genre !== "all") next.set("genre", merged.genre);
  if (merged.language !== "all") next.set("language", merged.language);

  const query = next.toString();
  return query ? `/explore?${query}` : "/explore";
}

function filterPillClass(active: boolean): string {
  const base = "inline-flex shrink-0 snap-start items-center justify-center rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:scale-105 active:scale-95 shadow-sm";
  return active
    ? `${base} border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(251,90,50,0.2)] brightness-110`
    : `${base} border-zinc-700 bg-zinc-900/40 text-zinc-300 hover:border-zinc-500 hover:text-white hover:bg-zinc-800/80`;
}

export default async function ExplorePage({ searchParams }: Props) {
  const catalog = await getCatalog();
  const genres = ["Drama", "Comedy", "Animation", "Documentary", "Thriller", "Romance"];
  const languages = ["Hindi", "English", "Tamil", "Telugu", "Malayalam", "Kannada", "Marathi", "Bengali"];
  const resolved = await searchParams;
  const params = {
    q: resolved?.q ?? "",
    access: resolved?.access ?? "all",
    rating: resolved?.rating ?? "0",
    duration: resolved?.duration ?? "any",
    genre: resolved?.genre ?? "all",
    language: resolved?.language ?? "all"
  };

  const query = params.q.trim();
  const access = ["all", "free", "premium"].includes(params.access) ? params.access : "all";
  const minRating = Number(params.rating);
  const safeMinRating = Number.isFinite(minRating) && minRating >= 0 && minRating <= 5 ? minRating : 0;
  const durationLimits: Record<string, { min: number; max: number | null }> = {
    any: { min: 0, max: null },
    short: { min: 0, max: 10 },
    medium: { min: 10, max: 20 },
    long: { min: 20, max: null }
  };
  const durationKey = Object.prototype.hasOwnProperty.call(durationLimits, params.duration)
    ? params.duration
    : "any";
  const { min: minDuration, max: maxDuration } = durationLimits[durationKey];
  const selectedGenre = genres.find((genre) => genre.toLowerCase() === params.genre.toLowerCase()) ?? "all";
  const selectedLanguage = languages.find((lang) => lang.toLowerCase() === params.language.toLowerCase()) ?? "all";

  const filteredCatalog = catalog.filter((film) => {
    const haystack = [film.title, film.genre, film.synopsis, film.festival ?? ""].join(" ");
    const queryMatch = query ? matchesQuery(haystack, query) : true;
    const genreMatch =
      selectedGenre === "all" ? true : matchesQuery(film.genre.toLowerCase(), selectedGenre.toLowerCase());
    const languageMatch =
      selectedLanguage === "all" ? true : (film.language || "").toLowerCase() === selectedLanguage.toLowerCase();
    const accessMatch = access === "all" ? true : access === "free" ? !film.premium : film.premium;
    const ratingMatch = film.rating >= safeMinRating;
    const filmDuration = parseDurationToMinutes(film.duration);
    const durationMatch =
      maxDuration === null
        ? filmDuration >= minDuration
        : filmDuration > minDuration && filmDuration <= maxDuration;

    return queryMatch && genreMatch && languageMatch && accessMatch && ratingMatch && durationMatch;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8">
      <FilterCloser />
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-5xl uppercase leading-none [font-family:var(--font-heading)]">Explore</h1>
          <details className="group relative">
            <summary className="list-none cursor-pointer rounded-full border border-zinc-700 bg-zinc-900/50 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-zinc-200 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:scale-105 hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(251,90,50,0.3)] active:scale-95">
              Filters
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] z-10 w-[320px] origin-top-right animate-pop rounded-2xl border border-zinc-800 bg-zinc-950/95 p-5 shadow-2xl shadow-black/40 backdrop-blur">
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
                  <Link href={buildExploreHref(params, { duration: "medium" })} className={filterPillClass(durationKey === "medium")}>10-20m</Link>
                  <Link href={buildExploreHref(params, { duration: "long" })} className={filterPillClass(durationKey === "long")}>20m+</Link>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Language</p>
                <div className="flex flex-wrap gap-2">
                  <Link href={buildExploreHref(params, { language: "all" })} className={filterPillClass(selectedLanguage === "all")}>All</Link>
                  {languages.map((lang) => (
                    <Link key={lang} href={buildExploreHref(params, { language: lang })} className={filterPillClass(selectedLanguage === lang)}>
                      {lang}
                    </Link>
                  ))}
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
        <div className="mt-8 flex w-full snap-x gap-3 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
