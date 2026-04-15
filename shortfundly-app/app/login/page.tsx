import Image from "next/image";
import { LoginPanel } from "@/components/login-panel";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ access?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  // Hidden admin access: only accessible via secret parameter
  // URL pattern: /login?access=sf_admin_2026
  const hasSecretAccess = params.access === "sf_admin_2026";
  const role = hasSecretAccess ? "admin" : "user";

  return (
    <main className="relative -mt-20 min-h-[calc(100vh+5rem)] overflow-hidden bg-[radial-gradient(circle_at_8%_12%,rgba(251,90,50,0.2),transparent_34%),radial-gradient(circle_at_88%_86%,rgba(14,165,233,0.12),transparent_34%),linear-gradient(140deg,#040404_0%,#080808_44%,#060606_100%)] px-4 pb-10 pt-8 md:-mt-24 md:min-h-[calc(100vh+6rem)] md:px-8 md:pb-12 md:pt-10">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1.06fr_0.94fr]">
        <section className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <LoginPanel
            role={role}
            redirectTo={role === "admin" ? "/admin" : "/profile"}
            title={role === "admin" ? "Admin Access" : "Account Access"}
            subtitle={
              role === "admin"
                ? "Administrative platform access"
                : "Sign in to your personalized streaming experience"
            }
          />
        </section>

        <section className="order-2 relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8 lg:order-1">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),transparent_30%,transparent_70%,rgba(255,255,255,0.04))]" />
          <div className="relative z-10 flex min-h-[680px] flex-col justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Shortfundly OTT Demo</p>
              <h2 className="mt-3 text-3xl uppercase leading-[0.98] text-white md:text-5xl [font-family:var(--font-heading)]">
                Watch, subscribe, and manage smarter.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-300 md:text-[15px]">
                A polished demo experience with role-based login, AI subscription guidance, and behavioral insights that adapt as you watch.
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-[560px] items-end justify-center">
              <div className="absolute inset-x-10 bottom-10 h-32 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d10] p-5 shadow-2xl shadow-black/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,90,50,0.18),transparent_38%),linear-gradient(180deg,transparent,rgba(0,0,0,0.75))]" />
                <div className="relative mx-auto max-w-[420px]">
                  <Image
                    src="/login-bg.png"
                    alt="Cinematic OTT illustration"
                    width={1024}
                    height={1536}
                    className="mx-auto h-auto w-full object-contain"
                    priority
                  />
                </div>

                <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-primary/30 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur-md">
                  Demo Experience
                </div>

                <div className="pointer-events-none absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Session Ready</p>
                  <p className="mt-1 text-xs text-zinc-200">User and admin flows stay isolated.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-primary/40">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Smart AI</p>
                <p className="mt-2 text-sm text-zinc-200">Behavior-aware subscription suggestions.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-primary/40">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Live Signals</p>
                <p className="mt-2 text-sm text-zinc-200">Watch time, completion, searches, and chat activity.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-primary/40">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Instant Actions</p>
                <p className="mt-2 text-sm text-zinc-200">Chatbot-controlled upgrades and downgrades.</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
