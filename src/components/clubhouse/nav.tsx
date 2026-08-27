import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { NAV } from "@/content/clubhouse";
import { signOut } from "@/app/clubhouse/actions";

/** The bar across the top of the member area. Only shown to signed-in members. */
export function ClubhouseNav() {
  const links = [
    { href: "/clubhouse/directory", label: NAV.directory },
    { href: "/clubhouse/events", label: NAV.events },
    { href: "/clubhouse/library", label: NAV.library },
    { href: "/clubhouse/merch", label: NAV.merch },
    { href: "/clubhouse/newsletter", label: NAV.newsletter },
    { href: "/clubhouse/profile", label: NAV.profile },
  ] as const;

  return (
    <header className="border-b border-border bg-surface-raised">
      <nav
        aria-label={BRAND.memberArea}
        className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-7 gap-y-3 px-6 py-4 font-body text-sm"
      >
        <Link href="/clubhouse" className="font-display text-2xl text-ink">
          {BRAND.markShort}
        </Link>

        <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="fwd-underline text-ink-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="fwd-underline text-ink-muted hover:text-ink"
          >
            {NAV.signOut}
          </button>
        </form>
      </nav>
    </header>
  );
}
