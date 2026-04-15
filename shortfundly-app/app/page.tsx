import { ContinueWatching } from "@/components/continue-watching";
import { ContentRail } from "@/components/content-rail";
import { ForYouRail } from "@/components/for-you-rail";
import { Hero } from "@/components/hero";
import { getCatalog } from "@/lib/content-service";

const HERO_SLUGS = [
  "68692ff4b62d1dca6ac3d513",
  "6347f60f781a9517a4b5feda",
  "679e313b1928718bab9cb3a6",
  "criminal-semen-18-malayalam-ai-dubbing-in-tamil-suspense-short-film",
  "62e550fe384ec449b87eeeb6",
  "62e551a998490d1f609aa9b2"
];

const HERO_IMAGE_OVERRIDES: Record<string, string> = {
  "68692ff4b62d1dca6ac3d513": "/banners/rajgarh.jpg",
  "6347f60f781a9517a4b5feda": "/banners/dundumon.jpg",
  "679e313b1928718bab9cb3a6": "/banners/love-is-not-orphan.jpg",
  "criminal-semen-18-malayalam-ai-dubbing-in-tamil-suspense-short-film": "/banners/criminal-semen.jpg",
  "62e550fe384ec449b87eeeb6": "/banners/captain.jpg",
  "62e551a998490d1f609aa9b2": "/banners/the-heap.jpg"
};

export default async function HomePage() {
  const catalog = await getCatalog();
  const heroMovies = HERO_SLUGS.map((slug) => catalog.find((film) => film.slug === slug || film.id === slug))
    .filter((film): film is NonNullable<typeof film> => Boolean(film))
    .map((film) => ({
      ...film,
      thumbnail: HERO_IMAGE_OVERRIDES[film.slug] ?? film.thumbnail
    }));
  const topRated = [...catalog].sort((a, b) => b.rating - a.rating).slice(0, 16);
  const latest = [...catalog].sort((a, b) => b.year - a.year).slice(0, 16);

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
