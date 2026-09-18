import { BRAND } from "@/lib/brand";

/**
 * The lockup: the supplied artwork, not type set to look like it.
 *
 * IT USED TO BE LIVE TEXT — "fwd." in the display face with "by influencer"
 * beside it in italic. That was a good stand-in and it is not the logo. The
 * delivered mark differs in three ways that type could not have guessed: the
 * signature is a sans rather than an italic serif, it reads "by Influencer"
 * with a capital I, and it sits tucked under the right of the mark rather than
 * beside it on the baseline.
 *
 * IT IS A MASK, NOT AN IMAGE, so the artwork carries no colour of its own and
 * `tone` still works exactly as it did. See `.fwd-logo` in globals.css for why
 * that matters more than it sounds.
 *
 * THE SHAPE IS FIXED NOW, which changes what some of these props can mean. The
 * old component could restack the signature under the mark at hero size and
 * put it beside the mark in a bar; the artwork has one arrangement and that is
 * the point of artwork. `size` is a width rather than a font size, and the
 * height follows from the aspect ratio.
 *
 * THE LOCKUP IS ALSO TALLER THAN IT WAS RELATIVE TO ITS WIDTH — 1.66:1 against
 * roughly 4:1 for the old inline pair — because the signature is underneath
 * rather than alongside. That is what makes the bars the hard case: a lockup
 * wide enough to read the endorsement is tall enough to grow the bar around
 * it, and there is no arrangement of the artwork that avoids the trade.
 */
export function Wordmark({
  size = "hero",
  heading = false,
  align = "left",
  signature = true,
  tone = "onDark",
  blinkDot = false,
}: {
  size?: "hero" | "heroLarge" | "holding" | "page" | "large" | "footer" | "small";
  /**
   * Makes the mark the page's main heading. Every page needs exactly one, and
   * the name of the thing is the right thing for it to be.
   */
  heading?: boolean;
  align?: "left" | "center";
  /**
   * Whether the "by Influencer" signature is part of it.
   *
   * On by default, and it should stay on almost everywhere: the endorsement is
   * the point of the lockup.
   *
   * IT APPEARS ONCE PER SCREEN, AND THE HOMEPAGE IS THE ONE PAGE WHERE THAT IS
   * NOT THE HEADER. Everywhere else the bar at the top left carries it, because
   * the bar is the only place the name appears at all. The homepage also has
   * the mark across the middle of the photograph at ten times the size, and the
   * endorsement belongs on the larger of the two — so there the hero has it and
   * the bar is the mark alone. Two lockups on one screen is the thing to avoid:
   * the signature is small enough that repeating it reads as a print error.
   *
   * This switches to a second file rather than hiding an element, because the
   * mark is drawn artwork and its signature is part of the drawing.
   */
  signature?: boolean;
  /**
   * Which of the three colours the lockup is set in. It follows the ground.
   *
   * `onDark` is the pale ice blue and the default, because almost everywhere
   * the lockup sits on a photograph or on the near-black. It is 13.42:1 there
   * and it is the identity. IT MUST NEVER GO ON A LIGHT GROUND: on the
   * off-white it is about 1.3:1, a colour you can see is there and cannot read.
   *
   * `brand` is the dark blue from the influencer guidelines, 6.61:1 on the
   * off-white. The sign-in page, where the lockup is the only branding on
   * screen and can carry the colour.
   *
   * `ink` is the near-black, 16.7:1. For a light ground where the lockup is one
   * thing among several and the blue would be the loudest thing in the panel —
   * the menu, where it sits directly above the navigation it belongs to.
   *
   * `brand` and `ink` are both tokens rather than colours written out, so they
   * follow the page into dark mode.
   */
  tone?: "onDark" | "brand" | "ink";
  /**
   * Makes the full stop blink. Only with the signature on, and only where the
   * page is asked to — the holding page, where it is the one moving thing.
   *
   * THE DOT IS LIFTED OUT OF THE ARTWORK, not covered over. The lockup is
   * drawn as a mask, so there is no separate element to animate; instead it
   * is split into two files with the SAME viewBox — the lockup without its
   * full stop, and the full stop alone — and the two are stacked. Same
   * viewBox, same box, same mask sizing: the dot lands exactly where the
   * artwork put it, at every width, without a single measured offset.
   */
  blinkDot?: boolean;
}) {
  /**
   * A WIDTH, not a font size, and the height comes from the aspect ratio.
   *
   * The hero is a fraction of the window rather than a list of fixed sizes,
   * which is what "roughly a third of the viewport" actually asks for: it
   * holds the same proportion at widths nobody thought to write a breakpoint
   * for. The floor stops it disappearing on a narrow phone; the ceiling stops
   * it filling a cinema display.
   */
  const widthClass =
    size === "holding"
      ? /*
         * THE HOLDING PAGE'S MARK IS THE PAGE, so it is wider than anything
         * under it at every width. At heroLarge it was 289px against a 349px
         * line on desktop and 115px against 243px on a phone — the italic line
         * led and the mark followed, on a page that is meant to be mostly the
         * mark. 250px floor, 44vw, 460px ceiling: always the widest thing on
         * the page, measured against the line's own breakpoints in
         * holding-page.tsx.
         */
        "w-[clamp(250px,44vw,460px)]"
      : size === "heroLarge"
      ? "w-[clamp(115px,calc(20.48vw-6.4px),352px)]"
      : size === "hero"
        ? "w-[clamp(170px,26vw,420px)]"
        : size === "large"
          ? "w-[150px]"
          : size === "page"
            ? "w-[124px]"
            : size === "footer"
              ? "w-[104px]"
              : /*
                 * THE BAR LOCKUP IS SIZED BY ITS SIGNATURE, NOT BY ITS MARK.
                 *
                 * This was 78px against the old artwork, where the lockup was
                 * 47px tall and "by Influencer" landed at a cap height near
                 * 3.6px — past the point where it is read, and recognised by
                 * its shape instead. That was a decision rather than an
                 * accident, and it was taken because the stand-in artwork set
                 * the signature tiny.
                 *
                 * THE DELIVERED LOCKUP SETS IT MUCH LARGER (18 September
                 * 2026), so the same argument now lands somewhere else. At
                 * 84px the lockup was 55.6px tall and the signature's cap
                 * height about 9px — readable, which it could not be before,
                 * and big enough in the bar that it was asked to come down.
                 *
                 * IT IS 60px NOW — 84 to 67 to 60 across one afternoon,
                 * each step asked for after seeing the last one. The lockup is
                 * 39.7px tall and the signature's cap height is near 6.
                 *
                 * THAT IS ABOUT AS SMALL AS IT GOES while "by Influencer" is
                 * still read rather than recognised by its shape, which was
                 * the whole point of going up from 78px this morning. Below
                 * this the signature becomes a texture under the word again
                 * and the width should come back up instead.
                 *
                 * The bar is built around this number. Change it and the pill
                 * in site-header.tsx and the menu button in site-menu.tsx both
                 * want re-measuring, because both are centred against it.
                 */
                "w-[60px]";

  const inkClass =
    tone === "onDark"
      ? "text-accent-on-dark"
      : tone === "brand"
        ? "text-accent"
        : "text-ink";

  const Tag = heading ? "h1" : "span";

  return (
    <div className={align === "center" ? "flex justify-center" : "flex"}>
      {/* The name is on the wrapper and the artwork is hidden from the
          accessibility tree. A mask has no alt text and no glyphs to read: to
          a screen reader it is an empty box unless something says what it is.
          Nothing about it is lowercased or restyled, so this is the one place
          the two halves of the name appear as a single phrase — see the naming
          rules in src/lib/brand.ts, which allow it in the lock-up and forbid
          it in running text. */}
      <Tag className={`${widthClass} ${inkClass}`}>
        <span className="sr-only">
          {`${BRAND.markShort} ${BRAND.endorsement}`}
        </span>
        {blinkDot && signature ? (
          <span aria-hidden="true" className="relative block w-full">
            <span className="fwd-logo fwd-logo-lockup-nodot w-full" />
            <span className="fwd-logo fwd-logo-dot absolute inset-0" />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className={`fwd-logo w-full ${
              signature ? "fwd-logo-lockup" : "fwd-logo-mark"
            }`}
          />
        )}
      </Tag>
    </div>
  );
}
