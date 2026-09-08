import { BRAND } from "@/lib/brand";

/**
 * The primary lockup: the word "fwd." and the "by influencer" signature.
 *
 * THERE IS NO GLYPH ANY MORE. An arrow mark sat above the word in the hero and
 * beside it in the bars, traced from the approved artwork. It has been taken
 * out on the brief that fwd. should be a word mark rather than an icon: an icon
 * reads as a brand of its own, and this one is meant to sit next to influencer
 * and next to partner brands without competing with either.
 *
 * The word set in the display face IS the mark. Nothing else is needed.
 *
 * `items-baseline` is what does that. It lines the two up by the line the
 * letters sit on rather than by the top or the bottom of their boxes, which is
 * the only alignment that looks right when two pieces of type are this
 * different in size. Aligning the boxes instead would leave the signature
 * floating visibly high or low against the mark.
 *
 * The signature belongs to the MARK, not to the page: it sits directly beside
 * the word, whatever width the word happens to be. An earlier version pushed it
 * to the far right edge of the page, which broke the lockup into two things
 * that happened to share a line.
 *
 * The two are still separate elements and never join into a single phrase in
 * running text. This is a layout relationship, not a name.
 */
export function Wordmark({
  size = "hero",
  heading = false,
  align = "left",
  signature = true,
  tone = "onDark",
}: {
  size?: "hero" | "heroLarge" | "page" | "large" | "footer" | "small";
  /**
   * Makes the mark the page's main heading. Every page needs exactly one, and
   * the name of the thing is the right thing for it to be.
   */
  heading?: boolean;
  align?: "left" | "center";
  /**
   * Whether the "by influencer" signature appears beside the mark.
   *
   * On by default, and it should stay on almost everywhere: the endorsement is
   * the point of the lockup. It is off at the top of the membership page, where
   * the mark is a small link back to the home page sitting above a large
   * heading, and the signature at that size read as clutter rather than as an
   * endorsement.
   *
   * Turning this off does not change the naming rules in src/lib/brand.ts. The
   * two are still never joined into a single phrase in running text.
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
   * follow the page into dark mode: `accent` becomes the pale ice blue there,
   * because the dark blue is 2.69:1 on near-black, and `ink` becomes the
   * off-white.
   */
  tone?: "onDark" | "brand" | "ink";
}) {
  /*
   * "page" is a fifth of a step up from the rest, and that is the whole
   * difference: 1.875rem to 2.25rem is exactly the 20% asked for.
   *
   * It exists because the sign-in page is not a bar. There, the lockup is the
   * only branding on screen and the only way back out, rather than one item in
   * a row of navigation, so it can carry a little more weight without shouting.
   * Everywhere that IS a bar stays where it was: making them all bigger would
   * grow the bar to hold it.
   */
  const markClass =
    size === "heroLarge"
      ? /*
         * A FRACTION OF THE WINDOW, NOT A LIST OF FIXED SIZES, because that is
         * what "roughly a third of the viewport" actually asks for. Fourteen
         * per cent of the width puts the lockup at about a quarter of the
         * screen at every size, which is the proportion in the mock, and it
         * holds at widths nobody thought to write a breakpoint for.
         *
         * The floor stops it disappearing on a narrow phone. The ceiling stops
         * it filling a cinema display, where a third of the width would be
         * absurd rather than confident.
         */
        "text-[clamp(56px,14vw,200px)]"
      : size === "hero"
        ? "text-7xl sm:text-8xl lg:text-9xl"
        : size === "large"
          ? // Half again as big as the bars, twice: 1.875rem to 2.8125rem to
            // 4.21875rem, which is 67.5px. Set directly, because the type scale
            // has no step near either number — the nearest to 45 are 36 and 48,
            // and the nearest to 67.5 are 60 and 72.
            "text-[4.21875rem]"
          : size === "page"
            ? "text-4xl"
            : "text-3xl";
  const signatureClass =
    size === "heroLarge"
      ? // The same curve at about a fifth of it, so the signature stays a
        // signature rather than growing into a second headline.
        "text-[clamp(12px,2.9vw,42px)]"
      : size === "hero"
        ? "text-lg sm:text-xl"
        : size === "footer" || size === "page" || size === "large"
          ? "text-xs"
          : "text-[10px]";
  // Enough of a gap to read as a signature beside the mark rather than as part
  // of the word, and no more.
  const gapClass =
    size === "hero" || size === "heroLarge"
      ? "gap-y-1"
      : size === "footer" || size === "page" || size === "large"
        ? "gap-1.5"
        : "gap-1";

  /*
   * AT HERO SIZE THE SIGNATURE IS ALWAYS UNDER THE MARK, NOT BESIDE IT.
   *
   * The placement rules call for the stacked lockup in the hero, and they are
   * right about why: inline, the pair is as wide as "fwd." plus "by
   * influencer" plus a gap, so it spreads across the busiest part of the
   * photograph and the endorsement ends up competing with whatever is behind
   * it. Stacked, the lockup holds its own shape against a busy image, and it
   * reads as a signature under a name, which is what it is.
   *
   * It used to be stacked only below 640px, for a different reason: on a phone
   * the inline pair left the mark nowhere to go but smaller. Both reasons point
   * the same way, so it is stacked everywhere now.
   *
   * `items-baseline` would mean nothing between two stacked rows, so the
   * alignment goes with it.
   */
  const stackClass =
    size === "hero" || size === "heroLarge"
      ? `flex-col ${align === "center" ? "items-center" : "items-start"}`
      : "items-baseline";

  const Mark = heading ? "h1" : "span";

  const inkClass =
    tone === "onDark"
      ? "text-accent-on-dark"
      : tone === "brand"
        ? "text-accent"
        : "text-ink";

  const word = (
    <>
      <Mark
        className={`font-display leading-[0.85] ${inkClass} ${markClass}`}
      >
        {BRAND.markShort}
      </Mark>
      {/* The same colour as the word. The brief asks that the signature always
          reads quieter, and here that is carried by size and by the italic
          rather than by colour: the word is six to nine times larger beside
          it. */}
      {signature ? (
        <span
          className={`font-display italic leading-none ${inkClass} ${signatureClass}`}
        >
          {BRAND.endorsement}
        </span>
      ) : null}
    </>
  );

  return (
    <div className={align === "center" ? "flex justify-center" : "flex"}>
      {/* Shrink-wrapped to the two of them together, so the pair centres as one
          unit rather than the word centring and the signature hanging off it. */}
      <div className={`inline-flex ${stackClass} ${gapClass}`}>{word}</div>
    </div>
  );
}
