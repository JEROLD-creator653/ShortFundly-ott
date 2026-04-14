import Link from "next/link";
import type { Film } from "@/lib/types";

type Props = {
  feature: Film;
};

export function Hero({ feature }: Props) {

  return (
    <section className="soft-grid relative overflow-hidden border-b border-zinc-900">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-5 md:items-end md:px-8 md:py-20">
        <div className="animate-rise md:col-span-3">
          <p className="mb-3 inline-flex rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
            Indie Cinema, Shortform First
          </p>
          <h1 className="text-5xl uppercase leading-[0.9] text-white md:text-7xl [font-family:var(--font-heading)]">
            Shortfundly
          </h1>
          <p className="mt-4 max-w-xl text-sm text-zinc-300 md:text-base">
            Watch award-winning short films, documentaries, animation, and creator originals.
            Stream free, unlock premium, and discover festival-ready stories every week.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/watch/${feature.slug}`}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-ember"
            >
              Watch Featured Film
            </Link>
            <Link
              href="/festival"
              className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary"
            >
              Film Festival Picks
            </Link>
          </div>
        </div>
        <div className="animate-rise rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 backdrop-blur md:col-span-2 md:ml-auto">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Now Trending</p>
          <p className="mt-2 text-3xl uppercase tracking-wide text-white [font-family:var(--font-heading)]">
            {feature.title}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            {feature.genre} · {feature.duration} · Rating {feature.rating}
          </p>
          <p className="mt-4 text-sm text-zinc-300">{feature.synopsis}</p>
          {feature.festival ? <p className="mt-4 text-xs text-primary">{feature.festival}</p> : null}
        </div>
      </div>
    </section>
  );
}
