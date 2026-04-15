"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

type SearchResult = {
  id?: string;
  slug: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  thumbnail: string;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/festival", label: "Festival" },
  { href: "/submit", label: "Submit" }
];

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialQuery = searchParams.get("q") ?? "";
  const [searchValue, setSearchValue] = useState(initialQuery);
  const [searchOpen, setSearchOpen] = useState(Boolean(initialQuery));
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authState, setAuthState] = useState<{
    authenticated: boolean;
    user: {
      name: string;
      role: "user" | "admin";
      subscription?: { plan?: string };
    } | null;
  }>({ authenticated: false, user: null });
  const searchRootRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    setSearchValue(initialQuery);
    setSearchOpen(Boolean(initialQuery));
  }, [initialQuery]);

  useEffect(() => {
    if (!searchOpen) {
      setSuggestions([]);
      return;
    }

    searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });
        const payload = (await response.json()) as {
          authenticated?: boolean;
          user?: {
            name: string;
            role: "user" | "admin";
            subscription?: { plan?: string };
          };
        };

        setAuthState({
          authenticated: Boolean(payload.authenticated),
          user: payload.user || null
        });
      } catch {
        setAuthState({ authenticated: false, user: null });
      } finally {
        setAuthLoading(false);
      }
    };

    loadSession();
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!searchRootRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const term = searchValue.trim();

    if (!searchOpen || term.length < 2) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }

    const controller = new AbortController();
    setLoadingSuggestions(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/catalog?q=${encodeURIComponent(term)}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error("Search request failed");

        const payload = (await response.json()) as { items?: SearchResult[] };
        setSuggestions((payload.items ?? []).slice(0, 5));
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingSuggestions(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [searchOpen, searchValue]);

  const solidNavbar = !isHome || scrolled;

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = searchValue.trim();

    if (term) {
      void fetch("/api/user/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searched: true })
      }).catch(() => null);
    }

    if (!term) {
      router.push("/explore");
      return;
    }

    router.push(`/explore?q=${encodeURIComponent(term)}`);
    setSearchOpen(false);
  };

  const openSearch = () => {
    setSearchOpen(true);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    setAuthState({ authenticated: false, user: null });
    router.push("/");
    router.refresh();
  };

  const planLabel = authState.user?.subscription?.plan
    ? `${authState.user.subscription.plan.toUpperCase()} Plan`
    : "Free Plan";

  const getWatchHref = (item: SearchResult) => `/watch/${item.id ?? item.slug}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solidNavbar
          ? "border-b border-zinc-800/90 bg-black/80 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link href="/" className="text-3xl uppercase leading-none text-white [font-family:var(--font-heading)]">
          Shortfundly
        </Link>
        <nav aria-label="Main navigation" className="hidden gap-6 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-widest text-zinc-300 transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div ref={searchRootRef} className="relative hidden md:block">
            <form onSubmit={submitSearch} className="relative">
              <label className="sr-only" htmlFor="site-search">
                Search films
              </label>

              <div
                className={`flex items-center overflow-hidden rounded-full border border-zinc-700/80 text-sm text-zinc-200 shadow-xl shadow-black/25 backdrop-blur-lg transition-all duration-300 ease-out focus-within:border-primary ${
                  solidNavbar ? "bg-black/40" : "bg-black/20"
                } ${searchOpen ? "h-10 w-64 px-3" : "h-10 w-10 px-0"}
                }`}
              >
                <button
                  type="button"
                  aria-label={searchOpen ? "Search" : "Open search"}
                  onClick={searchOpen ? undefined : openSearch}
                  className={`inline-flex h-10 w-10 flex-none items-center justify-center text-zinc-200 transition ${
                    searchOpen ? "cursor-default text-zinc-400" : "hover:text-primary"
                  }`}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      fill="currentColor"
                      d="M10.5 4a6.5 6.5 0 104.16 11.53l4.4 4.4 1.41-1.42-4.4-4.4A6.5 6.5 0 0010.5 4zm0 2a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"
                    />
                  </svg>
                </button>

                <input
                  ref={searchInputRef}
                  id="site-search"
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search movies"
                  autoComplete="off"
                  className={`min-w-0 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 ease-out ${
                    searchOpen ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </div>

              {searchOpen && searchValue.trim().length >= 2 ? (
                <div className="absolute right-0 top-[calc(100%+0.6rem)] w-[22rem] overflow-hidden rounded-2xl border border-zinc-800 bg-black/95 shadow-2xl shadow-black/50 backdrop-blur-md animate-[fadeScale_0.2s_ease-out]">
                  <div className="border-b border-zinc-800 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {loadingSuggestions ? "Searching" : "Suggestions"}
                  </div>
                  <div className="max-h-72 overflow-auto p-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {suggestions.length ? (
                      suggestions.map((item) => (
                        <Link
                          key={item.id ?? item.slug}
                          href={getWatchHref(item)}
                          onClick={() => setSearchOpen(false)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-white/5"
                        >
                          <div className="h-12 w-20 flex-none overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
                            <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                            <p className="truncate text-xs text-zinc-400">
                              {item.genre} · {item.duration} · Rating {item.rating}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-3 py-8 text-center text-sm text-zinc-500">
                        {loadingSuggestions ? "Loading matches..." : "No suggestions found"}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center border-t border-zinc-800 px-4 py-3 text-sm font-semibold text-sky-300 transition hover:bg-white/5"
                  >
                    View all results
                  </button>
                </div>
              ) : null}
            </form>
          </div>
          {authLoading ? (
            <span className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Loading...
            </span>
          ) : authState.authenticated && authState.user ? (
            <>
              <Link
                href={authState.user.role === "admin" ? "/admin" : "/profile"}
                aria-label="Open account"
                className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-primary hover:text-primary"
              >
                {authState.user.role === "admin" ? "Admin" : planLabel}
              </Link>
              <button
                aria-label="Sign out"
                onClick={handleLogout}
                className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-primary hover:text-primary"
                type="button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login?role=user"
                aria-label="User login"
                className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-primary hover:text-primary"
              >
                User Login
              </Link>
              <Link
                href="/login?role=admin"
                aria-label="Admin login"
                className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-primary hover:text-primary"
              >
                Admin
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
