import { BRAND } from "@/lib/brand";
import { Mark as MarkGlyph } from "@/components/mark";

/**
 * The primary lockup: the glyph, the word "fwd.", and the "by influencer"
 * signature.
 *
 * THE GLYPH SITS ABOVE THE WORD AT HERO SIZE AND BESIDE IT EVERYWHERE ELSE.
 * Stacked is the approved artwork and it is what the hero uses. A header bar is
 * a different problem: stacked, the lockup is three rows tall and the bar has to
 * grow to hold it, which is a lot of furniture for a mark you are meant to
 * glance at. Beside the word it keeps the bar its own height and still reads as
 * one lockup rather than an icon that happens to be near some type.
 *
 * The glyph is sized in em against the word, so the two stay in proportion at
 * every size without a second set of numbers to keep in step.
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
}: {
  size?: "hero" | "footer" | "small";
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
}) {
  const markClass =
    size === "hero"
      ? "text-7xl sm:text-8xl lg:text-9xl"
      : "text-3xl";
  const signatureClass =
    size === "hero" ? "text-lg sm:text-xl" : size === "footer" ? "text-xs" : "text-[10px]";
  // Enough of a gap to read as a signature beside the mark rather than as part
  // of the word, and no more.
  const gapClass =
    size === "hero"
      ? "gap-y-1"
      : size === "footer"
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
    size === "hero"
      ? `flex-col ${align === "center" ? "items-center" : "items-start"}`
      : "items-baseline";

  const Mark = heading ? "h1" : "span";

  /*
   * The glyph, sized against the word.
   *
   * The proportions come off the artwork: the glyph is a little over a third of
   * the word's font size when it is stacked above it. Beside the word it is
   * given a touch more, because a mark set next to type at its stacked size
   * reads as an afterthought rather than as half of a lockup.
   *
   * markClass is on the glyph as well so the em resolves against the same font
   * size the word is using. Without it the em would take the parent's size and
   * the glyph would come out the wrong scale at every size but one.
   */
  const glyph = (
    <MarkGlyph
      className={`${markClass} ${size === "hero" ? "mb-[0.05em] h-[0.36em]" : "h-[0.5em]"} text-accent-on-dark`}
    />
  );

  const word = (
    <>
      <Mark
        className={`font-display leading-[0.85] text-accent-on-dark ${markClass}`}
      >
        {BRAND.markShort}
      </Mark>
      {/* The same pale ice blue as the word. The brief asks that the
          signature always reads quieter, and here that is carried by size and
          by the italic rather than by colour: the word is six to nine times
          larger beside it. Every place this appears is a dark ground, where
          the pale blue measures 13.42:1. It must never be used on a light
          one. */}
      {signature ? (
        <span
          className={`font-display italic leading-none text-accent-on-dark ${signatureClass}`}
        >
          {BRAND.endorsement}
        </span>
      ) : null}
    </>
  );

  return (
    <div className={align === "center" ? "flex justify-center" : "flex"}>
      {/* Shrink-wrapped to the pieces together, so the lockup centres as one
          unit rather than the word centring and the rest hanging off it. */}
      {size === "hero" ? (
        <div className={`inline-flex ${stackClass} ${gapClass}`}>
          {glyph}
          {word}
        </div>
      ) : (
        /* Beside the word, and centred on it rather than on its baseline: the
           glyph has no baseline of its own to sit on. The word and the
           signature keep their own baseline pairing inside. */
        <div className="inline-flex items-center gap-2">
          {glyph}
          <div className={`inline-flex ${stackClass} ${gapClass}`}>{word}</div>
        </div>
      )}
    </div>
  );
}
