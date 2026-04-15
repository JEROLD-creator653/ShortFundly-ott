import Link from "next/link";
import { getServerSession } from "@/lib/auth/demo-session";
import { ProfileDashboard } from "@/components/profile-dashboard";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session || session.role !== "user") {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-16 md:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8">
          <h1 className="text-5xl uppercase leading-none [font-family:var(--font-heading)]">Profile Access</h1>
          <p className="mt-3 text-zinc-300">Please sign in as a user to open your profile dashboard.</p>
          <Link
            href="/login?role=user"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            User Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 md:px-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">User System</p>
        <h1 className="text-6xl uppercase leading-none [font-family:var(--font-heading)]">Profile & Subscription AI</h1>
      </header>
      <ProfileDashboard />
    </div>
  );
}
