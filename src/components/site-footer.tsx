import Link from "next/link";
import { CONTACT } from "@/lib/brand";
import { FOOTER, NAV } from "@/content/site";

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
 * stopping at it. Still quiet, still the page's own palette, and a hairline
 * keeps the join legible on the pages where the section above is the off-white
 * rather than the sand.
 *
 * The columns carry no visible headings. There are eight words in this whole
 * footer and a heading over each pair would be more furniture than content;
 * the labels live on the nav elements instead, where a screen reader still gets
 * the structure and the eye is not given anything else to read.
 *
 * There is no lockup down here any more, and no year. The mark is at the top of
 * every page already, and a footer that repeats it is a site signing its name
 * twice on the same letter.
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

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-warm">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
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

          <div>
            {/* A link, not a line of text. It is the only way of reaching us
                from this page, so it should be one press rather than a select
                and a copy. */}
            <a
              href={`mailto:${CONTACT.email}`}
              className={`${LINK} text-accent`}
            >
              {CONTACT.email}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
