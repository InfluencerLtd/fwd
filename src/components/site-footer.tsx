import Link from "next/link";
import { CONTACT } from "@/lib/brand";
import { FOOTER, NAV } from "@/content/site";
import { Mark } from "@/components/mark";

/**
 * The footer.
 *
 * IT USED TO BE A DARK BAND. A slab of near-black with a pale blue lockup on
 * it, which made it the loudest thing on the page: every page ended by
 * announcing itself. A footer is the quietest part of a site. It is where
 * somebody goes when they did not find what they wanted above, and it should
 * feel like the page continuing rather than a second design arriving.
 *
 * So it sits on the warm sand instead: the same ground the meeting of minds
 * band above it uses, so the home page runs into its footer rather than
 * stopping at it. Still quiet, still the page's own palette.
 *
 * There is no rule across the top. It was there to keep the join legible on
 * the pages where the section above is the off-white rather than the sand, and
 * it did — a little too well. A footer that is meant to read as the page
 * carrying on should not be announced by a line drawn under everything else.
 *
 * The address sits beside the mark rather than in a column of its own, so the
 * footer is a single row: the mark and the address holding the left, the two
 * lists of links against the right, all starting on the same line.
 *
 * The columns carry no visible headings. There are eight words in this whole
 * footer and a heading over each pair would be more furniture than content;
 * the labels live on the nav elements instead, where a screen reader still gets
 * the structure and the eye is not given anything else to read.
 *
 * THE MARK IS HERE, THE WORD IS NOT, and there is still no year. "fwd." is
 * already at the top of every page, and a footer that sets it again is a site
 * signing its name twice on the same letter — which is why the lockup came out
 * of here in the first place. The glyph on its own is a different thing: it
 * closes the page without repeating anything, the way a small mark at the end
 * of an article does. It is not a link, because everything it could lead to is
 * in the column directly beneath it.
 */

const PLACES = [
  { href: "/", label: NAV.home },
  { href: "/membership", label: NAV.membership },
  { href: "/clubhouse", label: FOOTER.signIn },
] as const;

const LEGAL = [
  { href: "/privacy", label: FOOTER.privacy },
  { href: "/cookies", label: FOOTER.cookies },
] as const;

/*
 * The padding is the tap target, and the negative margin takes it back out of
 * the layout so the lists stay tight. A 15px line of text is about 21px tall,
 * which is a small thing to hit with a thumb.
 */
const LINK = "fwd-underline -my-1 inline-block py-1 font-body text-[15px]";

export function SiteFooter({
  /**
   * The ground the footer sits on.
   *
   * The warm sand by default, because on the home page the section directly
   * above it is the sand too, so the page runs into its footer. The membership
   * page ends on the off-white instead, and a band of sand under it would be a
   * colour change with nothing behind it, so that page passes its own.
   */
  background = "bg-surface-warm",
}: {
  background?: string;
} = {}) {
  return (
    <footer className={`mt-auto ${background}`}>
      <div className="mx-auto max-w-5xl px-6 py-14">
        {/* One row, all starting on the same line: the mark and the address
            holding the left, the two lists of links against the right.

            `items-start` is what holds that line. Without it the columns
            stretch to match each other and the shorter one centres itself
            against the taller, so the legal pair would float half a line below
            everything else.

            On a phone it is all one column and everything stacks, which is the
            only thing that fits. */}
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* The mark and the address, centred on each other rather than sat
              on the same baseline, because the mark has no baseline of its own
              to sit on.

              The mark is the near-black rather than the brand blue: down here
              it is the quietest thing on the page rather than the identity
              announcing itself, and a blue would have been the loudest thing in
              the footer. `ink` is the same colour as the links, so it turns
              near-white in dark mode along with them — 15.4:1 on the warm sand,
              17.5:1 on the off-white.

              The address is a link, not a line of text: it is the way of
              reaching us from this page, so it should be one press rather than
              a select and a copy. It keeps the site's usual hover underline
              rather than the permanent one the sign-in link needed — an email
              address already reads as something you can write to, and if
              somebody misses that it is clickable they can still read it and
              copy it. */}
          <div className="flex items-center gap-4">
            <Mark className="h-6 text-ink" />
            <a href={`mailto:${CONTACT.email}`} className={`${LINK} text-ink`}>
              {CONTACT.email}
            </a>
          </div>

          {/* The two lists travel together and sit against the right edge of
              the page rather than in thirds of it. `justify-between` on the row
              above is what puts them there: the mark and the address hold the
              left, and this pair takes the other end. */}
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
            <nav aria-label={FOOTER.navHeading}>
              <ul className="space-y-2">
                {PLACES.map((place) => (
                  <li key={place.href}>
                    <Link href={place.href} className={`${LINK} text-ink`}>
                      {place.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={FOOTER.legalHeading}>
              <ul className="space-y-2">
                {LEGAL.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className={`${LINK} text-ink-muted`}>
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
