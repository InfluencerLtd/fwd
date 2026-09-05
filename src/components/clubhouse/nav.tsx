import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Wordmark } from "@/components/wordmark";
import { NAV } from "@/content/clubhouse";
import { signOut } from "@/app/clubhouse/actions";
import { ClubhouseMenu } from "@/components/clubhouse/menu";

/**
 * The bar across the top of the member area. Only shown to signed-in members.
 *
 * IT IS TWO BARS. From the medium breakpoint up, where all seven items fit on
 * one line, it is the row it has always been. Below that they went behind a
 * button, because six links and a sign out do not fit across a phone and what
 * they did instead was wrap into a ragged column 181px tall — a quarter of the
 * screen, on every page, saying nothing. See src/components/clubhouse/menu.tsx.
 */
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
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-7 gap-y-3 px-6 py-4 font-body text-sm md:justify-start"
      >
        {/* No pill any more. It existed only because the bar was light and the
            pale blue needed a dark ground of its own to sit on. The bar is that
            ground now, so the lockup sits straight on it. */}
        <Link href="/clubhouse" aria-label={BRAND.memberArea} className="mr-2">
          <Wordmark size="small" />
        </Link>

        {/* The row, from the medium breakpoint up. */}
        <div className="hidden flex-1 flex-wrap items-center gap-x-6 gap-y-2 md:flex">
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

        <form action={signOut} className="hidden md:block">
          <button type="submit" className={LINK}>
            {NAV.signOut}
          </button>
        </form>

        {/* And the button, below it. `md:hidden` rather than a second copy of
            the bar: the links are passed in from here so there is one list, not
            two that can drift apart. */}
        <div className="md:hidden">
          <ClubhouseMenu links={links} signOutLabel={NAV.signOut} />
        </div>
      </nav>
    </header>
  );
}
