"use client";

import { useEffect, useMemo, useState } from "react";

type ProfilePayload = {
  profile: {
    name: string;
    email: string;
    details: {
      phone: string;
      location: string;
      favoriteGenres: string[];
    };
    activity: {
      totalWatchMinutes: number;
      last30DaysWatchMinutes: number;
      weeklyActiveDays: number;
      avgSessionMinutes: number;
      completionRate: number;
      bingeScore: number;
      likes: number;
      searches: number;
      supportChats: number;
      lastActiveAt: string;
    };
    subscription: {
      plan: "free" | "monthly" | "yearly";
      status: string;
      renewalAt: string;
      aiSummary: string;
      aiSuggestion: {
        suggestedPlan: "free" | "monthly" | "yearly";
        confidence: number;
      };
    };
  };
};

export function ProfileDashboard() {
  const [data, setData] = useState<ProfilePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [genres, setGenres] = useState("");

  const load = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/user/profile", { cache: "no-store" });
      const payload = (await response.json()) as { ok: boolean; message?: string } & ProfilePayload;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Unable to load profile");
      }

      setData(payload);
      setName(payload.profile.name);
      setPhone(payload.profile.details.phone || "");
      setLocation(payload.profile.details.location || "");
      setGenres((payload.profile.details.favoriteGenres || []).join(", "));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const watchHours = useMemo(() => {
    if (!data) return 0;
    return Math.round((data.profile.activity.last30DaysWatchMinutes / 60) * 10) / 10;
  }, [data]);

  const saveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          location,
          favoriteGenres: genres
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        })
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Unable to save profile");
      }

      setMessage("Profile updated successfully.");
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unable to save profile");
    } finally {
      setSaving(false);
    }
  };

  const updatePlan = async (plan: "free" | "monthly" | "yearly") => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/subscription", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan })
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Unable to change plan");
      }

      setMessage(`Subscription switched to ${plan}.`);
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unable to update subscription");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 text-sm text-zinc-300">Loading profile...</div>;
  }

  if (!data) {
    return <div className="rounded-2xl border border-red-900/50 bg-red-950/30 p-6 text-sm text-red-300">{message || "Profile unavailable."}</div>;
  }

  const profile = data.profile;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Current Plan</p>
          <p className="mt-2 text-3xl uppercase [font-family:var(--font-heading)]">{profile.subscription.plan}</p>
          <p className="mt-2 text-xs text-zinc-400">Renews on {new Date(profile.subscription.renewalAt).toLocaleDateString()}</p>
        </article>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Watch Time (30 days)</p>
          <p className="mt-2 text-3xl uppercase [font-family:var(--font-heading)]">{watchHours}h</p>
          <p className="mt-2 text-xs text-zinc-400">Weekly active days: {profile.activity.weeklyActiveDays}</p>
        </article>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Completion Rate</p>
          <p className="mt-2 text-3xl uppercase [font-family:var(--font-heading)]">{profile.activity.completionRate}%</p>
          <p className="mt-2 text-xs text-zinc-400">Avg session: {profile.activity.avgSessionMinutes} min</p>
        </article>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
        <h2 className="text-3xl uppercase [font-family:var(--font-heading)]">AI Subscription Suggestion</h2>
        <p className="mt-3 text-sm text-zinc-300">{profile.subscription.aiSummary}</p>
        <p className="mt-1 text-xs text-zinc-500">Confidence: {profile.subscription.aiSuggestion.confidence}%</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(["free", "monthly", "yearly"] as const).map((plan) => (
            <button
              key={plan}
              disabled={saving}
              onClick={() => updatePlan(plan)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                profile.subscription.plan === plan
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-zinc-700 text-zinc-200 hover:border-primary"
              }`}
              type="button"
            >
              {plan}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
        <h2 className="text-3xl uppercase [font-family:var(--font-heading)]">Profile Details</h2>
        <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={saveProfile}>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Phone</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Location</span>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block md:col-span-2">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Favorite Genres (comma separated)</span>
            <input value={genres} onChange={(e) => setGenres(e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <div className="md:col-span-2">
            <button disabled={saving} className="rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white" type="submit">
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
        {message ? <p className="mt-4 text-sm text-zinc-300">{message}</p> : null}
      </section>
    </div>
  );
}
