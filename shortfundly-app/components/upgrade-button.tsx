"use client";

import { useState } from "react";

type Props = {
  className?: string;
};

export function UpgradeButton({ className }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onUpgrade = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "monthly", gateway: "razorpay" })
      });

      const data = (await response.json()) as { ok: boolean; message: string; redirectUrl?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to create checkout session");
      }

      setMessage("Checkout started. Redirect integration is ready.");
    } catch (error) {
      const text = error instanceof Error ? error.message : "Something went wrong";
      setMessage(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        aria-label="Upgrade to premium"
        className={className}
        disabled={loading}
        onClick={onUpgrade}
        type="button"
      >
        {loading ? "Starting..." : "Upgrade to Premium"}
      </button>
      {message ? <p className="mt-2 text-xs text-zinc-300">{message}</p> : null}
    </div>
  );
}
