import Link from "next/link";
import { notFound } from "next/navigation";
import { MyListButton } from "@/components/my-list-button";
import { UpgradeButton } from "@/components/upgrade-button";
import { VideoPlayer } from "@/components/video-player";
import { RecommendationRail } from "@/components/recommendation-rail";
import { getFilm, getRelatedFilms } from "@/lib/content-service";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

export default async function WatchPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;
  const film = await getFilm(slug);

  if (!film) {
    notFound();
  }

  const related = await getRelatedFilms(film);

  const shareText = encodeURIComponent(`Watching ${film.title} on Shortfundly`);
  const shareUrl = encodeURIComponent(`https://web.shortfundly.com/watch/${film.slug}`);

  return (
    <div className="mx-auto grid w-full max-w-[1760px] gap-8 px-4 pb-12 md:px-8 lg:grid-cols-12">
      <section className="space-y-6 lg:col-span-9">
        <VideoPlayer
          slug={film.slug}
          title={film.title}
          source={film.videoUrl}
          synopsis={film.synopsis}
          details={`${film.genre} · ${film.duration} · ${film.year} · Rating ${film.rating}`}
          openedFromContinue={query.from === "continue"}
        />
        <div id="movie-details" className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-7 lg:min-h-[250px]">
          <h1 className="text-4xl uppercase leading-none [font-family:var(--font-heading)] md:text-5xl">{film.title}</h1>
          <p className="mt-3 text-base text-zinc-400">
            {film.genre} · {film.duration} · {film.year} · Rating {film.rating}
          </p>
          <div className="mt-5">
            <MyListButton film={film} />
          </div>
          <p className="mt-5 text-lg leading-relaxed text-zinc-300">{film.synopsis}</p>
          {film.festival ? <p className="mt-4 text-sm text-primary">{film.festival}</p> : null}
        </div>
        <RecommendationRail films={related} currentContentId={film.id ?? film.slug} />
      </section>
      <aside className="space-y-4 lg:col-span-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <h2 className="text-2xl uppercase [font-family:var(--font-heading)]">Share</h2>
          <div className="mt-4 grid gap-2">
            <Link
              href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
              target="_blank"
              className="rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:border-primary"
            >
              Share on WhatsApp
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              className="rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:border-primary"
            >
              Share on Facebook
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
              target="_blank"
              className="rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:border-primary"
            >
              Share on X
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <h2 className="text-2xl uppercase [font-family:var(--font-heading)]">Subscription</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Free users can watch selected titles with ads. Upgrade to premium for full catalog access.
          </p>
          <UpgradeButton className="mt-4 w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white" />
        </div>
      </aside>
    </div>
  );
}
