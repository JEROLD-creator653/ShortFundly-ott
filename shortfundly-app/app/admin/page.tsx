import Link from "next/link";
import { getServerSession } from "@/lib/auth/demo-session";

export const dynamic = "force-dynamic";

const modules = [
  {
    href: "/admin/users",
    title: "User Intelligence",
    description: "Review user-level subscriptions, activity signals, and AI plan recommendations."
  },
  {
    href: "/admin/support-chats",
    title: "Gemini Support",
    description: "Inspect AI support conversations and escalations."
  },
  {
    href: "/admin/posters",
    title: "Poster Generator",
    description: "Generate and download release-grade OTT posters."
  },
  {
    href: "/admin/teasers",
    title: "Cinematic Teaser AI",
    description: "Generate premium OTT promo teasers with Shotstack renders, AI script, and voice-over."
  }
];

export default async function AdminHomePage() {
  const session = await getServerSession();

  if (!session || session.role !== "admin") {
    return (
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-14 md:px-8">
        <h1 className="text-6xl uppercase leading-none [font-family:var(--font-heading)]">Admin Login Required</h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          Access the admin studio by signing in with an admin demo account.
        </p>
        <Link
          href="/login?role=admin"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
        >
          Go to Admin Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-8">
      <h1 className="text-6xl uppercase leading-none [font-family:var(--font-heading)]">AI Admin Studio</h1>
      <p className="mt-3 max-w-2xl text-sm text-zinc-400">
        Manage support operations, poster creation, and cinematic teaser rendering from one production dashboard.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="group rounded-3xl border border-zinc-800 bg-zinc-950/65 p-5 transition hover:border-primary"
          >
            <h2 className="text-2xl uppercase [font-family:var(--font-heading)] group-hover:text-primary">{module.title}</h2>
            <p className="mt-2 text-sm text-zinc-300">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
