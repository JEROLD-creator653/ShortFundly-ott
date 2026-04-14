"use client";

import { FormEvent, useState } from "react";

type State = {
  pending: boolean;
  message: string | null;
};

export function SubmitFilmForm() {
  const [state, setState] = useState<State>({ pending: false, message: null });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get("title") || "").trim(),
      genre: String(form.get("genre") || "").trim(),
      creatorName: String(form.get("creatorName") || "").trim(),
      email: String(form.get("email") || "").trim(),
      note: String(form.get("note") || "").trim()
    };

    setState({ pending: true, message: null });

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as {
        ok: boolean;
        message: string;
        submissionId?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Submission failed");
      }

      event.currentTarget.reset();
      setState({
        pending: false,
        message: `Submitted successfully. Reference: ${data.submissionId || "N/A"}`
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : "Submission failed";
      setState({ pending: false, message: text });
    }
  };

  return (
    <form className="mt-8 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6" onSubmit={onSubmit}>
      <label className="block text-sm text-zinc-300">
        Creator name
        <input
          className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-white outline-none focus:border-primary"
          name="creatorName"
          placeholder="Your name"
        />
      </label>
      <label className="block text-sm text-zinc-300">
        Email
        <input
          className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-white outline-none focus:border-primary"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </label>
      <label className="block text-sm text-zinc-300">
        Film title
        <input
          className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-white outline-none focus:border-primary"
          name="title"
          placeholder="Enter your film title"
          required
        />
      </label>
      <label className="block text-sm text-zinc-300">
        Genre
        <input
          className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-white outline-none focus:border-primary"
          name="genre"
          placeholder="Drama, Comedy, Documentary..."
          required
        />
      </label>
      <label className="block text-sm text-zinc-300">
        Festival note
        <textarea
          className="mt-2 min-h-32 w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-white outline-none focus:border-primary"
          name="note"
          placeholder="Tell us why your film matters"
        />
      </label>
      <button
        aria-label="Submit film"
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white disabled:opacity-70"
        disabled={state.pending}
        type="submit"
      >
        {state.pending ? "Submitting..." : "Submit Film"}
      </button>
      {state.message ? <p className="text-sm text-zinc-300">{state.message}</p> : null}
    </form>
  );
}
