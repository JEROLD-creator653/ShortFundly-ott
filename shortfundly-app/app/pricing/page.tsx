import Link from "next/link";
import { UpgradeButton } from "@/components/upgrade-button";
import { getServerSession } from "@/lib/auth/demo-session";

const planHighlights = [
  {
    title: "Pro Monthly",
    price: "Rs.199/mo",
    badge: "Starter",
    perks: ["Full premium catalog", "Priority playback quality", "Profile insights"]
  },
  {
    title: "Premium Quarterly",
    price: "Rs.499/quarter",
    badge: "Most Popular",
    perks: ["Everything in Pro", "Lower quarterly cost", "Early access drops"]
  },
  {
    title: "Premium Annual",
    price: "Rs.1499/year",
    badge: "Best Value",
    perks: ["Everything in Premium", "Maximum yearly savings", "Festival premieres first"]
  }
];

export default async function PricingPage() {
  const session = await getServerSession();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 md:px-8">
      <section className="rounded-3xl border border-zinc-800 bg-[radial-gradient(circle_at_top,rgba(225,29,72,0.2),rgba(10,10,10,0.95)_55%)] p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">Subscription Plans</p>
        <h1 className="mt-3 text-4xl uppercase leading-none [font-family:var(--font-heading)] md:text-6xl">Choose your premium flow</h1>
        <p className="mt-4 max-w-3xl text-sm text-zinc-300 md:text-base">
          Subscribe to unlock premium films, smoother playback, and exclusive short-film releases. Pick Pro for flexibility, or Premium for better value.
        </p>
      </section>

      <section className="mt-7 grid gap-4 md:grid-cols-3">
        {planHighlights.map((plan) => (
          <article key={plan.title} className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400">{plan.badge}</p>
            <h2 className="mt-2 text-2xl uppercase [font-family:var(--font-heading)]">{plan.title}</h2>
            <p className="mt-2 text-lg font-semibold text-primary">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {plan.perks.map((perk) => (
                <li key={perk}>• {perk}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-7 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 md:p-6">
        {session?.role === "user" ? (
          <>
            <h3 className="text-xl uppercase [font-family:var(--font-heading)]">Secure checkout</h3>
            <p className="mt-2 text-sm text-zinc-300">Choose a plan below and complete payment via Razorpay test checkout.</p>
            <UpgradeButton className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white" />
          </>
        ) : (
          <>
            <h3 className="text-xl uppercase [font-family:var(--font-heading)]">Login required</h3>
            <p className="mt-2 text-sm text-zinc-300">Sign in to continue with secure plan purchase and activate premium access.</p>
            <Link
              href="/login"
              className="mt-5 inline-flex rounded-full border border-primary bg-primary/10 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white"
            >
              Login to continue
            </Link>
          </>
        )}
      </section>
    </main>
  );
}