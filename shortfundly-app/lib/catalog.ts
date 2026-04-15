import type { Film } from "@/lib/types";

export const catalog: Film[] = [
  {
    slug: "wings-of-dust",
    title: "Wings of Dust",
    genre: "Drama",
    duration: "18m",
    year: 2025,
    rating: 4.8,
    premium: false,
    thumbnail: "/images/poster-wings.svg",
    synopsis: "A village painter rediscovers purpose while restoring a theater lost to monsoon damage.",
    festival: "Kochi Shorts 2025 - Jury Pick",
    videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  {
    slug: "neon-rickshaw",
    title: "Neon Rickshaw",
    genre: "Comedy",
    duration: "12m",
    year: 2024,
    rating: 4.5,
    premium: false,
    thumbnail: "/images/poster-neon.svg",
    synopsis: "A broke DJ turns his auto-rickshaw into a midnight radio station.",
    videoUrl: "https://test-streams.mux.dev/test_001/stream.m3u8"
  },
  {
    slug: "fifth-platform",
    title: "The Fifth Platform",
    genre: "Thriller",
    duration: "22m",
    year: 2026,
    rating: 4.9,
    premium: true,
    thumbnail: "/images/poster-platform.svg",
    synopsis: "A railway announcer hears tomorrow's train accidents before they happen.",
    festival: "IFFI Discovery - Official Selection",
    videoUrl: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
  },
  {
    slug: "paper-kites-2040",
    title: "Paper Kites 2040",
    genre: "Animation",
    duration: "9m",
    year: 2023,
    rating: 4.4,
    premium: false,
    thumbnail: "/images/poster-kites.svg",
    synopsis: "In a vertical megacity, two siblings race handmade kites between drones.",
    videoUrl: "https://test-streams.mux.dev/bbb-360p/index.m3u8"
  },
  {
    slug: "salt-and-saffron",
    title: "Salt & Saffron",
    genre: "Documentary",
    duration: "16m",
    year: 2024,
    rating: 4.7,
    premium: true,
    thumbnail: "/images/poster-saffron.svg",
    synopsis: "Women-led coastal kitchens preserving recipes that outlived colonial ports.",
    festival: "Mumbai Documentary Week - Winner",
    videoUrl: "https://test-streams.mux.dev/dai-discontinuity-deltatre/manifest.m3u8"
  },
  {
    slug: "last-call-kochi",
    title: "Last Call, Kochi",
    genre: "Romance",
    duration: "14m",
    year: 2025,
    rating: 4.3,
    premium: false,
    thumbnail: "/images/poster-kochi.svg",
    synopsis: "Two strangers miss their ferry and find one dawn to rewrite their plans.",
    videoUrl: "https://test-streams.mux.dev/pts_shift/master.m3u8"
  }
];

export const topRated = [...catalog].sort((a, b) => b.rating - a.rating).slice(0, 4);
export const latest = [...catalog].sort((a, b) => b.year - a.year).slice(0, 4);

export function getFilmBySlug(slug: string) {
  return catalog.find((film) => film.slug === slug);
}
