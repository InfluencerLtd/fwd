import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Wordmark } from "@/components/wordmark";
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
        {/* The lockup, in a dark pill so the pale blue can appear at all.
            On the off-white it measures 1.27:1 and would be invisible; the
            pill gives it the dark ground the blue is defined for. Same
            treatment as the mark inside the three line menu on the public
            site, so the two match. */}
        <Link href="/clubhouse" aria-label={BRAND.memberArea}>
          <span className="fwd-on-dark inline-block rounded-lg bg-photo-ground px-3 py-2">
            <Wordmark size="small" />
          </span>
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
