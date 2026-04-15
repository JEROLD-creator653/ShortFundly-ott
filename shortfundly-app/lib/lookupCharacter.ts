import type { CharacterLookupResult } from "@/types/watchSession";

type CharacterLookupResponse = {
  character: CharacterLookupResult;
};

export async function lookupCharacter(
  character: string,
  watchedEpisodes: string[]
): Promise<CharacterLookupResult> {
  const res = await fetch("/api/recap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mode: "character",
      character,
      watchedEpisodes
    })
  });

  if (!res.ok) {
    throw new Error("Failed to lookup character");
  }

  const data = (await res.json()) as CharacterLookupResponse;
  return data.character;
}
