import { PosterStudio } from "@/components/admin/poster-studio";

export const dynamic = "force-dynamic";

export default function PostersAdminPage() {
  return (
    <>
      <header className="mx-auto w-full max-w-7xl px-4 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Admin Studio</p>
        <h1 className="text-5xl uppercase leading-none [font-family:var(--font-heading)]">Release Poster Lab</h1>
      </header>
      <PosterStudio />
    </>
  );
}
