"use client";

import { useEffect, useMemo, useState } from "react";
import { ProfileChatbot } from "./profile-chatbot";

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
  const [savingProfile, setSavingProfile] = useState(false);
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

  /* Listen for subscription updates from chatbot */
  useEffect(() => {
    const handleSubscriptionUpdate = () => {
      load();
    };

    window.addEventListener("subscription-updated", handleSubscriptionUpdate);
    return () => window.removeEventListener("subscription-updated", handleSubscriptionUpdate);
  }, []);

  const watchHours = useMemo(() => {
    if (!data) return 0;
    return Math.round((data.profile.activity.last30DaysWatchMinutes / 60) * 10) / 10;
  }, [data]);

  const saveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingProfile(true);
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
      setSavingProfile(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/";
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-zinc-800/50" />
            ))}
          </div>
          <div className="h-40 rounded-2xl bg-zinc-800/50" />
          <div className="h-80 rounded-2xl bg-zinc-800/50" />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-20 h-[600px] rounded-3xl bg-zinc-800/50" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-red-900/50 bg-red-950/30 p-8">
        <h3 className="text-lg font-semibold text-red-300">Unable to Load Profile</h3>
        <p className="mt-2 text-sm text-red-200">{message || "There was an error loading your profile data."}</p>
        <button
          onClick={() => load()}
          className="mt-4 rounded-full bg-red-700 px-4 py-2 text-xs font-semibold uppercase text-white hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  const profile = data.profile;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left side: Profile details */}
      <div className="space-y-6 lg:col-span-2">
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
        <h2 className="text-3xl uppercase [font-family:var(--font-heading)]">AI Subscription Insight</h2>
        <p className="mt-3 text-sm text-zinc-300">{profile.subscription.aiSummary}</p>
        <p className="mt-1 text-xs text-zinc-500">Confidence: {profile.subscription.aiSuggestion.confidence}%</p>
        <div className="mt-4 rounded-xl border border-zinc-700/50 bg-black/40 px-4 py-3">
          <p className="text-xs text-zinc-400">
            💡 <span className="text-zinc-300">To manage your subscription, chat with our AI assistant using the chatbot below.</span>
          </p>
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
            <button disabled={savingProfile} className="rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white" type="submit">
              {savingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
        {message ? <p className="mt-4 text-sm text-zinc-300">{message}</p> : null}
      </section>

      <section className="rounded-2xl border border-red-900/40 bg-gradient-to-br from-red-950/30 to-zinc-950/80 p-6">
        <h2 className="text-3xl uppercase [font-family:var(--font-heading)]">Account Actions</h2>
        <p className="mt-3 text-sm text-zinc-300">
          Sign out securely from your current session. You can log back in anytime using your demo credentials.
        </p>
        <div className="mt-5">
          <button
            onClick={handleLogout}
            type="button"
            className="rounded-full border border-red-500/70 bg-red-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-red-500 hover:border-red-400 active:scale-[0.98]"
          >
            Logout
          </button>
        </div>
      </section>
      </div>

      {/* Right side: Chatbot */}
      <div className="lg:col-span-1">
        <div className="sticky top-20 h-[600px]">
          <ProfileChatbot currentProfile={profile} />
        </div>
      </div>
    </div>
  );
}
