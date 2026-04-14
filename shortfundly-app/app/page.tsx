import { ContinueWatching } from "@/components/continue-watching";
import { ContentRail } from "@/components/content-rail";
import { Hero } from "@/components/hero";
import { getCatalog } from "@/lib/content-service";

export default async function HomePage() {
  const catalog = await getCatalog();
  const topRated = [...catalog].sort((a, b) => b.rating - a.rating).slice(0, 16);
  const latest = [...catalog].sort((a, b) => b.year - a.year).slice(0, 16);

  if (!catalog.length) {
    return null;
  }

  return (
    <>
      <Hero feature={topRated[0]} />
      <ContinueWatching />
      <ContentRail title="Top Rated" films={topRated} />
      <ContentRail title="Latest Releases" films={latest} />
      <ContentRail title="Award-Winning Shorts" films={catalog.filter((film) => film.festival)} />
    </>
  );
}
