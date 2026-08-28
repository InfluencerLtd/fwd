import { BRAND } from "@/lib/brand";

/**
 * The primary lockup: the mark, with the "by influencer" signature sitting
 * beside the full stop on the same baseline.
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
  const gapClass = size === "hero" ? "gap-2.5 sm:gap-3" : size === "footer" ? "gap-1.5" : "gap-1";

  const Mark = heading ? "h1" : "span";

  return (
    <div className={align === "center" ? "flex justify-center" : "flex"}>
      {/* Shrink-wrapped to the two of them together, so the pair centres as one
          unit rather than the mark centring and the signature hanging off it. */}
      <div className={`inline-flex items-baseline ${gapClass}`}>
        <Mark
          className={`font-display leading-[0.85] text-accent-on-dark ${markClass}`}
        >
          {BRAND.markShort}
        </Mark>
        {/* The same pale ice blue as the mark. The brief asks that the
            signature always reads quieter, and here that is carried by size and
            by the italic rather than by colour: the mark is six to nine times
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
      </div>
    </div>
  );
}
