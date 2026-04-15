"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  role: "user" | "admin";
  redirectTo: string;
  title: string;
  subtitle: string;
};

const DEMO_CREDENTIALS = {
  user: [
    { email: "user@shortfundly.com", password: "user123" },
    { email: "cinefan@shortfundly.com", password: "user123" }
  ],
  admin: [{ email: "admin@shortfundly.com", password: "admin123" }]
};

export function LoginPanel({ role, redirectTo, title, subtitle }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_CREDENTIALS[role][0].email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS[role][0].password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Login failed");
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/45">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Demo Access</p>
      <h1 className="mt-2 text-5xl uppercase leading-none [font-family:var(--font-heading)]">{title}</h1>
      <p className="mt-3 text-sm text-zinc-300">{subtitle}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-zinc-400">Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
            type="email"
            required
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-zinc-400">Password</span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
            type="password"
            required
          />
        </label>

        {error ? <p className="rounded-xl border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-300">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Signing In..." : `Sign In as ${role === "admin" ? "Admin" : "User"}`}
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/35 p-4 text-xs text-zinc-400">
        <p className="uppercase tracking-wider text-zinc-500">Demo Credentials</p>
        <ul className="mt-2 space-y-1">
          {DEMO_CREDENTIALS[role].map((item) => (
            <li key={item.email}>
              {item.email} / {item.password}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
