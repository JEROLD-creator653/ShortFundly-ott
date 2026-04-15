"use client";

import { useEffect, useRef, useState } from "react";
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
    { email: "cinefan@shortfundly.com", password: "user123" },
    { email: "sarah@shortfundly.com", password: "user123" },
    { email: "emma@shortfundly.com", password: "user123" },
    { email: "lisa@shortfundly.com", password: "user123" }
  ],
  admin: [{ email: "admin@shortfundly.com", password: "admin123" }]
};

export function LoginPanel({ role, redirectTo, title, subtitle }: Props) {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const [selectedCredential, setSelectedCredential] = useState("0");
  const [email, setEmail] = useState(DEMO_CREDENTIALS[role][0].email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS[role][0].password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedCredential("0");
    setEmail(DEMO_CREDENTIALS[role][0].email);
    setPassword(DEMO_CREDENTIALS[role][0].password);
  }, [role]);

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
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/45">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Secure Access</p>
          <h1 className="mt-2 text-4xl uppercase leading-none [font-family:var(--font-heading)]">{title}</h1>
        </div>
        <div className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Demo Login
        </div>
      </div>
      <p className="mt-4 text-sm text-zinc-300">{subtitle}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-zinc-400">Email</span>
          <input
            ref={emailRef}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
            type="email"
            required
            disabled={loading}
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-zinc-400">Password</span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
            type="password"
            required
            disabled={loading}
          />
        </label>

        {error ? (
          <div className="rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3">
            <p className="text-xs text-red-300">{error}</p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/35 p-4 text-xs text-zinc-400">
        <p className="uppercase tracking-wider text-zinc-500 mb-3">Available Demo Accounts</p>
        <label className="block">
          <span className="sr-only">Select demo credential</span>
          <select
            value={selectedCredential}
            onChange={(event) => {
              const index = Number(event.target.value);
              const account = DEMO_CREDENTIALS[role][index] || DEMO_CREDENTIALS[role][0];
              setSelectedCredential(String(index));
              setEmail(account.email);
              setPassword(account.password);
              emailRef.current?.focus();
            }}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-zinc-200 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
            disabled={loading}
          >
            {DEMO_CREDENTIALS[role].map((item, idx) => (
              <option key={item.email} value={idx}>
                {item.email}
              </option>
            ))}
          </select>
        </label>
        <p className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 font-mono text-[11px] text-zinc-400">
          Password: {password}
        </p>
      </div>
    </section>
  );
}
