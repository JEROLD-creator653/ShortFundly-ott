import type { WatchSession } from "@/types/watchSession";

type RecapResponse = {
  recap: string;
};

export async function generateRecap(session: WatchSession): Promise<string> {
  const res = await fetch("/api/recap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mode: "recap",
      depth: "brief",
      session
    })
  });

  if (!res.ok) {
    throw new Error("Failed to generate recap");
  }

  const data = (await res.json()) as RecapResponse;
  return data.recap;
}
