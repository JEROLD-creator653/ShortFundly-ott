import { ContinueWatching } from "@/components/continue-watching";
import { ContentRail } from "@/components/content-rail";
import { ForYouRail } from "@/components/for-you-rail";
import { Hero } from "@/components/hero";
import { getCatalog } from "@/lib/content-service";

export default async function HomePage() {
  const catalog = await getCatalog();
  const topRated = [...catalog].sort((a, b) => b.rating - a.rating).slice(0, 16);
  const latest = [...catalog].sort((a, b) => b.year - a.year).slice(0, 16);
  const freeMovies = catalog.filter((film) => !film.premium);
  const freeWithVideo = freeMovies.filter((film) => Boolean(film.videoUrl));
  const heroMovies = (freeWithVideo.length ? freeWithVideo : freeMovies)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  if (!catalog.length || !heroMovies.length) {
    return null;
  }

  return (
    <>
      <Hero features={heroMovies} />
      <ContinueWatching films={catalog} />
      <ForYouRail fallbackFilms={topRated} />
      <ContentRail title="Top Rated" films={topRated} />
      <ContentRail title="Latest Releases" films={latest} />
      <ContentRail title="Award-Winning Shorts" films={catalog.filter((film) => film.festival)} />
    </>
  );
}
