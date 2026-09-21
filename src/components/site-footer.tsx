import Link from "next/link";
import { CONTACT } from "@/lib/brand";
import { FOOTER } from "@/content/site";
import { HostedBy } from "@/components/hosted-by";

/**
 * The footer.
 *
 * IT IS THE NEAR-BLACK ON EVERY PAGE, and it takes no argument about it. It
 * spent a while following whatever section came last — grey on the home page,
 * off-white on membership, dark on the briefing — on the reasoning that a
 * footer should read as the page carrying on rather than as a second design
 * arriving. That is a fair argument and it is not the one being made now: a
 * site with one footer, in one colour, at the bottom of every page, is the
 * plainer and more confident answer. The page ends. This is the end of it.
 *
 * The three-tone system that used to sit here has gone with it rather than
 * being left set to one value, so there is nothing to set wrong later.
 *
 * There is no rule across the top. The change of ground is the join.
 *
 * IT IS ONE LINE NOW. The address holds the left, and the parent company and
 * the legal pair sit against the right, all on the same baseline — beside each
 * other rather than stacked, which is what six words deserve. Stacking them
 * made a column out of a row.
 *
 * There are no visible headings over any of it. There are six words in this
 * whole footer and a heading would be more furniture than content; the labels
 * live on the nav element instead, where a screen reader still gets the
 * structure and the eye is not given anything else to read.
 *
 * NOTHING DOWN HERE CARRIES THE NAME, and there is still no year. "fwd." is
 * already at the top of every page, and a footer that sets it again is a site
 * signing its name twice on the same letter. The glyph that briefly sat here
 * instead has gone with every other one.
 */

/*
 * THERE IS NO LIST OF PLACES DOWN HERE ANY MORE. It held "home" and
 * "membership", and both were already in the bar at the top of the same page —
 * a footer that repeats the navigation is furniture. What is left is the two
 * things that are only here: the address, and the legal pair.
 */
const LEGAL = [
  { href: "/privacy", label: FOOTER.privacy },
  { href: "/cookies", label: FOOTER.cookies },
] as const;

/*
 * The padding is the tap target, and the negative margin takes it back out of
 * the layout so the lists stay tight. A 15px line of text is about 21px tall,
 * which is a small thing to hit with a thumb.
 */
/*
 * THE TAP TARGET IS A PSEUDO-ELEMENT, NOT PADDING. Padding was the first
 * attempt and it cannot work here: `.fwd-underline` sets its own
 * padding-bottom: 2px in plain CSS, which outranks a utility, so py-[11px]
 * came out as 11px on top and 2px underneath — 35.5px tall, measured, not 44.
 * And padding would have been wrong even if it applied, because the underline
 * is a background drawn along the bottom of the box: pad the box and the line
 * drops away from the words.
 *
 * So the link keeps its tight box and the underline stays where it was, and an
 * invisible ::after reaches 11px above and below it. The underline does not use
 * ::after, so nothing else is disturbed. On a phone the links stack with 24px
 * between rows, so 11px either side cannot reach the next link's area.
 */
const LINK =
  "fwd-underline relative -my-1 inline-block py-1 font-body text-[15px] after:absolute after:inset-x-0 after:-inset-y-[11px] after:content-['']";

/*
 * The ground, and the two text colours that go with it.
 *
 * THEY ARE WRITTEN TOGETHER, IN ONE PLACE, because they only make sense
 * together: near-black text on the near-black ground is the failure this
 * arrangement exists to make impossible. `fwd-on-dark` comes with the ground,
 * which switches the focus ring to the pale ice blue — the brand dark blue
 * measures 2.69:1 here and a keyboard user would lose track of where they are.
 */
const GROUND = "fwd-dark fwd-on-dark";
const TEXT = "text-photo-ink";
/* NOT MUTED ANY MORE, from 21 September 2026. The right-hand group (Hosted by
   Influencer, privacy, cookies) was the off-white at 60%, and it was asked to
   be white like the address on the left. The constant keeps its name so every
   place that uses it follows; it now matches TEXT. */
const MUTED = "text-photo-ink";

export function SiteFooter() {
  return (
    <footer className={`mt-auto ${GROUND}`}>
      <div className="mx-auto max-w-5xl px-6 py-14">
        {/* One row: the address holding the left, the legal pair against the
            right, everything on the same baseline. `items-baseline` rather
            than `items-start` because that is what "the same line" means for
            type — the two sides are the same size here, but a footer that
            aligns box tops drifts the moment one of them is not.

            On a phone it stacks, which is the only thing that fits. */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
          {/* The address, where the mark used to sit beside it. The mark has
              gone with every other appearance of the glyph: fwd. is a word
              mark, and the footer already ends the page quietly enough without
              one.

              It is a link, not a line of text: it is the way of reaching us
              from this page, so it should be one press rather than a select and
              a copy. It keeps the site's usual hover underline rather than the
              permanent one the sign-in link needed — an email address already
              reads as something you can write to, and if somebody misses that
              it is clickable they can still read it and copy it. */}
          <div>
            <a href={`mailto:${CONTACT.email}`} className={`${LINK} ${TEXT}`}>
              {CONTACT.email}
            </a>
          </div>

          {/* The right-hand end of the row: the parent company, then the
              legal pair, all on one line.

              INFLUENCER.COM IS NOT IN THE LEGAL LIST, even though it sits
              beside it. It is the company this belongs to and the only link in
              the footer that leaves the site; privacy and cookies are pages of
              this one. A screen reader is told they are two different things
              rather than three items of the same kind.

              It leaves the site, so it opens in its own tab and carries
              rel="noreferrer", which is what every outbound link here does. */}
          <div className="flex items-baseline gap-8">
            {/* HOSTED BY INFLUENCER, where somebody leaves, on every page.
                It was the words "Influencer.com" (FOOTER.parent.label, kept in
                the content file); from 21 September 2026 it is Influencer's own
                logo after "Hosted by", still linking to influencer.com. See
                `hostedBy` in src/lib/brand.ts.

                No underline on hover: an underline drawn under a logo reads as
                a mistake. It dims slightly instead, since it is already at full
                white. */}
            <a
              href={FOOTER.parent.href}
              target="_blank"
              rel="noreferrer"
              className={`relative -my-1 inline-block py-1 ${MUTED} transition-opacity duration-200 hover:opacity-75 after:absolute after:inset-x-0 after:-inset-y-[11px] after:content-['']`}
            >
              <HostedBy size="sm" />
            </a>

            <nav aria-label={FOOTER.legalHeading}>
              <ul className="flex gap-8">
                {LEGAL.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className={`${LINK} ${MUTED}`}>
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
