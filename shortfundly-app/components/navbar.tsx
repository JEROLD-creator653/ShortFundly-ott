import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/festival", label: "Festival" },
  { href: "/submit", label: "Submit" }
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900 bg-black/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
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
        <button
          aria-label="Open profile and subscription"
          className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-primary hover:text-primary"
        >
          Free Plan
        </button>
      </div>
    </header>
  );
}
