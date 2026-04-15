"use client";

import { useEffect, useState } from "react";

type PlanId = "pro_monthly" | "premium_quarterly" | "premium_annual";

type PlanOption = {
  id: PlanId;
  title: string;
  subtitle: string;
  price: string;
  highlight?: string;
};

const PLAN_OPTIONS: PlanOption[] = [
  {
    id: "pro_monthly",
    title: "Pro Monthly",
    subtitle: "Ad-light streaming + premium unlock",
    price: "Rs.199 / month"
  },
  {
    id: "premium_quarterly",
    title: "Premium Quarterly",
    subtitle: "Best for active binge watchers",
    price: "Rs.499 / quarter",
    highlight: "Most Popular"
  },
  {
    id: "premium_annual",
    title: "Premium Annual",
    subtitle: "Maximum value, full-year premium",
    price: "Rs.1499 / year",
    highlight: "Best Value"
  }
];

type RazorpayCheckoutResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayCheckoutResponse) => void | Promise<void>;
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
  };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

type Props = {
  className?: string;
};

// Global flag to ensure Razorpay script loads only once
let razorpayScriptLoaded = false;
let razorpayScriptPromise: Promise<boolean> | null = null;

function loadRazorpayScriptGlobally(): Promise<boolean> {
  if (razorpayScriptLoaded && typeof window !== "undefined" && window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise<boolean>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is not available"));
      return;
    }

    // Check if already loaded
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing && window.Razorpay) {
      razorpayScriptLoaded = true;
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      razorpayScriptLoaded = true;
      resolve(true);
    };

    script.onerror = () => {
      razorpayScriptLoaded = false;
      razorpayScriptPromise = null;
      reject(new Error("Failed to load Razorpay checkout script"));
    };

    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

export function UpgradeButton({ className }: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("premium_quarterly");
  const [showPlans, setShowPlans] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Load Razorpay script once on component mount
  useEffect(() => {
    loadRazorpayScriptGlobally().catch(() => {
      // Script will be loaded on-demand when user clicks upgrade
    });
  }, []);

  const onUpgrade = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const razorpayReady = await loadRazorpayScriptGlobally();
      if (!razorpayReady || !window.Razorpay) {
        throw new Error("Razorpay SDK failed to load. Please check your internet and try again.");
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selectedPlanId })
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        keyId?: string;
        order?: {
          id: string;
          amount: number;
          currency: string;
        };
        plan?: {
          id: PlanId;
          label: string;
        };
      };

      if (!response.ok || !data.ok || !data.keyId || !data.order?.id || !data.order.amount || !data.order.currency) {
        throw new Error(data.message || "Unable to create checkout session");
      }

      const selectedPlanLabel = data.plan?.label || PLAN_OPTIONS.find((plan) => plan.id === selectedPlanId)?.title || "Premium Plan";

      const razorpay = new window.Razorpay({
        key: data.keyId,
        order_id: data.order.id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Shortfundly OTT",
        description: `${selectedPlanLabel} subscription`,
        prefill: {
          name: "Shortfundly User",
          email: "test@shortfundly.local",
          contact: "9999999999"
        },
        theme: {
          color: "#e11d48"
        },
        modal: {
          ondismiss: () => {
            setMessage("Payment popup closed. You can try again anytime.");
            setLoading(false);
          }
        },
        handler: async (checkoutResponse) => {
          try {
            const verifyResponse = await fetch("/api/checkout", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                planId: selectedPlanId,
                ...checkoutResponse
              })
            });

            const verifyData = (await verifyResponse.json()) as { ok: boolean; message?: string };
            if (!verifyResponse.ok || !verifyData.ok) {
              throw new Error(verifyData.message || "Payment verification failed");
            }

            setMessage("✓ Payment successful. Premium plan activated.");
            setShowPlans(false);
            setLoading(false);
          } catch (error) {
            const text = error instanceof Error ? error.message : "Payment verification failed";
            setMessage(`✗ ${text}`);
            setLoading(false);
          }
        }
      });

      razorpay.open();
    } catch (error) {
      const text = error instanceof Error ? error.message : "Something went wrong";
      setMessage(`✗ ${text}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        aria-label="Upgrade to premium"
        className={className}
        disabled={loading}
        onClick={() => {
          setShowPlans((prev) => !prev);
          setMessage(null);
        }}
        type="button"
      >
        {loading ? "Processing..." : showPlans ? "Hide Plans" : "Upgrade to Premium"}
      </button>

      {showPlans ? (
        <div className="mt-4 space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3">
          {PLAN_OPTIONS.map((plan) => {
            const active = plan.id === selectedPlanId;
            return (
              <button
                key={plan.id}
                className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                  active ? "border-primary bg-primary/10" : "border-zinc-700 hover:border-zinc-500"
                }`}
                disabled={loading}
                onClick={() => setSelectedPlanId(plan.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-zinc-100">{plan.title}</p>
                    <p className="mt-1 text-xs text-zinc-400">{plan.subtitle}</p>
                  </div>
                  <p className="text-xs font-semibold text-primary">{plan.price}</p>
                </div>
                {plan.highlight ? <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">{plan.highlight}</p> : null}
              </button>
            );
          })}

          <button
            className="mt-2 w-full rounded-full bg-primary px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white disabled:opacity-70"
            disabled={loading}
            onClick={onUpgrade}
            type="button"
          >
            {loading ? "Starting Payment..." : "Purchase Selected Plan"}
          </button>
        </div>
      ) : null}

      {message ? <p className="mt-2 text-xs text-zinc-300">{message}</p> : null}
    </div>
  );
}
