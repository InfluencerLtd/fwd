import Link from "next/link";
import { CONTACT } from "@/lib/brand";
import { FOOTER } from "@/content/site";

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
 * IT IS ONE LINE NOW. The address holds the left and the legal pair sits
 * against the right, all on the same baseline — the two links beside each
 * other rather than stacked, which is what four words deserve. Stacking them
 * made a column out of a pair.
 *
 * There are no visible headings over any of it. There are five words in this
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
const LINK = "fwd-underline -my-1 inline-block py-1 font-body text-[15px]";

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
const MUTED = "text-photo-ink/60";

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

          {/* The pair sits against the right edge of the page rather than in
              a third of it — `justify-between` on the row above is what puts
              it there — and runs along one line rather than down two. */}
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
    </footer>
  );
}
