import { CinematicTeaserStudio } from "@/components/admin/cinematic-teaser-studio";

export const dynamic = "force-dynamic";

export default function TeasersAdminPage() {
  return (
    <>
      <header className="mx-auto w-full max-w-7xl px-4 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Admin Studio</p>
        <h1 className="text-5xl uppercase leading-none [font-family:var(--font-heading)]">Cinematic Teaser Studio</h1>
      </header>
      <CinematicTeaserStudio />
    </>
  );
}
