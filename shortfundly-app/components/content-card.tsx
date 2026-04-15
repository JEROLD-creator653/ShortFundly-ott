import Image from "next/image";
import Link from "next/link";
import type { Film } from "@/lib/types";

type Props = {
  film: Film;
};

export function ContentCard({ film }: Props) {
  const watchPath = `/watch/${film.id ?? film.slug}`;
  const isSvg = film.thumbnail.endsWith('.svg');

  return (
    <Link
      href={watchPath}
      className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 transition duration-300 hover:-translate-y-1 hover:border-primary"
    >
      <div className="relative aspect-video overflow-hidden">
        {isSvg ? (
          <img
            src={film.thumbnail}
            alt={film.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <Image
            src={film.thumbnail}
            alt={film.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        {film.premium ? (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
            Premium
          </span>
        ) : null}
      </div>
      <div className="space-y-1 p-4">
        <p className="font-semibold text-white">{film.title}</p>
        <p className="text-sm text-zinc-400">
          {film.genre} · {film.duration} · {film.year}
        </p>
      </div>
    </Link>
  );
}
