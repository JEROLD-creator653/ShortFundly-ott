import { SubmitFilmForm } from "@/components/submit-film-form";

export default function SubmitPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-12 md:px-8">
      <h1 className="text-5xl uppercase [font-family:var(--font-heading)]">Submit Your Film</h1>
      <p className="mt-3 text-zinc-300">
        Share your short film with global audiences, festival curators, and indie cinema fans.
      </p>
      <SubmitFilmForm />
    </div>
  );
}
