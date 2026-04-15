import Link from "next/link";
import { MyListGrid } from "@/components/my-list-grid";
import { getServerSession } from "@/lib/auth/demo-session";

export const dynamic = "force-dynamic";

export default async function MyListPage() {
  const session = await getServerSession();

  if (!session || session.role !== "user") {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-16 md:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8">
          <h1 className="text-5xl uppercase leading-none [font-family:var(--font-heading)]">Watch List Access</h1>
          <p className="mt-3 text-zinc-300">Please sign in as a user to view and manage your personal list.</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Personal Queue</p>
        <h1 className="text-6xl uppercase leading-none [font-family:var(--font-heading)]">Watch List</h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Every title you add is attached to your user session and ready to watch whenever you come back.
        </p>
      </header>
      <MyListGrid />
    </div>
  );
}
