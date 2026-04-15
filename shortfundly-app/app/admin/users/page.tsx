import Link from "next/link";
import { AdminUsersConsole } from "@/components/admin-users-console";
import { getServerSession } from "@/lib/auth/demo-session";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getServerSession();

  if (!session || session.role !== "admin") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 md:px-8">
        <h1 className="text-5xl uppercase [font-family:var(--font-heading)]">Admin Access Required</h1>
        <p className="mt-3 text-zinc-300">Sign in with an admin account to access user subscription intelligence.</p>
        <Link
          href="/login?role=admin"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
        >
          Admin Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 md:px-8">
      <h1 className="text-5xl uppercase leading-none [font-family:var(--font-heading)]">User Subscription Intelligence</h1>
      <p className="mt-3 text-sm text-zinc-400">Monitor watch behavior and AI plan recommendations for each user.</p>
      <div className="mt-8">
        <AdminUsersConsole />
      </div>
    </div>
  );
}
