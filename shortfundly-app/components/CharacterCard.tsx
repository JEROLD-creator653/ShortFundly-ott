"use client";

import type { CharacterLookupResult } from "@/types/watchSession";

type Props = {
  character: CharacterLookupResult;
  onClose: () => void;
};

export function CharacterCard({ character, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 p-4 md:items-center" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-950 p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{character.name}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            Close
          </button>
        </div>
        <p className="text-sm text-zinc-300">
          <span className="text-zinc-400">Role:</span> {character.role}
        </p>
        <p className="mt-1 text-sm text-zinc-300">
          <span className="text-zinc-400">First seen:</span> {character.firstSeen}
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-200">{character.summary}</p>
      </div>
    </div>
  );
}
