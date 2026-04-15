"use client";

import { useEffect, useState } from "react";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  subscription: {
    plan: string;
    renewalAt: string;
  };
  activity: {
    last30DaysWatchMinutes: number;
    weeklyActiveDays: number;
    completionRate: number;
  };
  aiSuggestion: {
    suggestedPlan: string;
    confidence: number;
  };
};

export function AdminUsersConsole() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/admin/users", { cache: "no-store" });
        const payload = (await response.json()) as { ok: boolean; message?: string; users?: AdminUser[] };

        if (!response.ok || !payload.ok) {
          throw new Error(payload.message || "Unable to load users");
        }

        setUsers(payload.users || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 text-sm text-zinc-300">Loading users...</div>;
  }

  if (error) {
    return <div className="rounded-2xl border border-red-900/60 bg-red-950/30 p-5 text-sm text-red-300">{error}</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-900/80 text-xs uppercase tracking-[0.16em] text-zinc-500">
          <tr>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Current Plan</th>
            <th className="px-4 py-3">Watch (30d)</th>
            <th className="px-4 py-3">Completion</th>
            <th className="px-4 py-3">AI Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-zinc-800 text-zinc-200">
              <td className="px-4 py-3">
                <p>{user.name}</p>
                <p className="text-xs text-zinc-500">{user.email}</p>
              </td>
              <td className="px-4 py-3 uppercase">{user.subscription.plan}</td>
              <td className="px-4 py-3">{Math.round((user.activity.last30DaysWatchMinutes / 60) * 10) / 10}h</td>
              <td className="px-4 py-3">{user.activity.completionRate}%</td>
              <td className="px-4 py-3">
                <span className="rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-xs uppercase text-primary">
                  {user.aiSuggestion.suggestedPlan} ({user.aiSuggestion.confidence}%)
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
