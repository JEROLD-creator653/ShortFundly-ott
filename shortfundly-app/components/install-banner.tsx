"use client";

import Link from "next/link";
import { useState } from "react";

export function InstallBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[51] border-b border-primary/30 bg-primary/95 px-3 py-2 text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 text-xs md:px-8 md:text-sm">
        <p>
          Get the app on iOS and Android for offline downloads and personalized alerts.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="https://apps.apple.com/app/id1200168569"
            target="_blank"
            className="underline decoration-white/60 underline-offset-4"
          >
            App Store
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.shortfundly"
            target="_blank"
            className="underline decoration-white/60 underline-offset-4"
          >
            Play Store
          </Link>
          <button
            aria-label="Dismiss app install banner"
            onClick={() => setDismissed(true)}
            className="rounded-full border border-white/40 px-2 py-1 text-[10px] uppercase tracking-widest"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
