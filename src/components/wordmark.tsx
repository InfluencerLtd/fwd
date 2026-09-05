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
  tone = "photo",
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
  /**
   * Which kind of ground the lockup is sitting on.
   *
   * "photo" is the pale ice blue. It is a FIXED colour, for the grounds that
   * stay dark whatever the light and dark switch says: the hero, the holding
   * page, the top of the membership page. globals.css says that blue is "ONLY
   * ever on dark grounds" and it means it, so this must not be used anywhere
   * the ground can turn light.
   *
   * "page" is the ink token, which follows the switch: near-black on the light
   * page, near-white on the dark one. That is what the footer wants, because
   * the footer sits on the page rather than on a photograph.
   *
   * The signature stays quieter than the mark either way, and it is size and
   * the italic that carry that, not colour.
   */
  tone?: "photo" | "page";
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
      ? "gap-y-1 sm:gap-x-3"
      : size === "footer"
        ? "gap-1.5"
        : "gap-1";

  /*
   * AT HERO SIZE THE SIGNATURE DROPS UNDER THE MARK ON A PHONE.
   *
   * Beside it, the pair is as wide as "fwd." plus "by influencer" plus a gap,
   * which on a 375px screen leaves the mark nowhere to go but smaller. The
   * point of the hero is that the mark is enormous, so the signature moves
   * instead of the mark shrinking.
   *
   * Stacked it also reads more like a signature under a name, which is what it
   * is. Above sm it goes back beside the mark, where there is room.
   *
   * `items-baseline` only applies once they share a line: baselines mean
   * nothing between two stacked rows, and it would sit the second row's text
   * oddly. So the alignment is part of the same switch.
   */
  const stackClass =
    size === "hero"
      ? `flex-col ${align === "center" ? "items-center" : "items-start"} sm:flex-row sm:items-baseline`
      : "items-baseline";

  const Mark = heading ? "h1" : "span";
  const inkClass = tone === "photo" ? "text-accent-on-dark" : "text-ink";

  return (
    <div className={align === "center" ? "flex justify-center" : "flex"}>
      {/* Shrink-wrapped to the two of them together, so the pair centres as one
          unit rather than the mark centring and the signature hanging off it. */}
      <div className={`inline-flex ${stackClass} ${gapClass}`}>
        <Mark
          className={`font-display leading-[0.85] ${inkClass} ${markClass}`}
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
            className={`font-display italic leading-none ${inkClass} ${signatureClass}`}
          >
            {BRAND.endorsement}
          </span>
        ) : null}
      </div>
    </div>
  );
}
