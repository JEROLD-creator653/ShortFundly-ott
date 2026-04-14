import type { Film } from "@/lib/types";
import { ContentCard } from "@/components/content-card";

type Props = {
  title: string;
  films: Film[];
};

export function ContentRail({ title, films }: Props) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-7 md:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl uppercase tracking-wider text-white [font-family:var(--font-heading)]">
          {title}
        </h2>
        <span className="text-sm text-zinc-400">{films.length} titles</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {films.map((film) => (
          <ContentCard key={film.slug} film={film} />
        ))}
      </div>
    </section>
  );
}
