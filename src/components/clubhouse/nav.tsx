import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Wordmark } from "@/components/wordmark";
import { NAV } from "@/content/clubhouse";
import { signOut } from "@/app/clubhouse/actions";

/** The bar across the top of the member area. Only shown to signed-in members. */
/*
 * The padding is the tap target, and the negative margin takes it back out of
 * the layout so the bar does not grow.
 *
 * A 14px line of text is 22px tall, and 24 is the smallest a thing should be to
 * hit with a thumb. Every link up here was two under. The bar is the only way
 * around The House on a phone, so these are the last targets on the site that
 * should be awkward.
 */
const LINK =
  "fwd-underline -my-1 inline-block py-1 text-photo-ink/75 hover:text-photo-ink";

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
    /* The bar is the near-black photo ground, not the raised off-white it used
       to be. fwd-on-dark switches the focus ring to the pale blue, because the
       brand dark blue measures 2.69:1 on this ground and a keyboard user would
       lose track of where they are. */
    <header className="fwd-on-dark border-b border-photo-ink/15 bg-photo-ground">
      <nav
        aria-label={BRAND.memberArea}
        className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-7 gap-y-3 px-6 py-4 font-body text-sm"
      >
        {/* No pill any more. It existed only because the bar was light and the
            pale blue needed a dark ground of its own to sit on. The bar is that
            ground now, so the lockup sits straight on it. */}
        <Link href="/clubhouse" aria-label={BRAND.memberArea} className="mr-2">
          <Wordmark size="small" />
        </Link>

        <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={LINK}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className={LINK}
          >
            {NAV.signOut}
          </button>
        </form>
      </nav>
    </header>
  );
}
