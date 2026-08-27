import { BRAND } from "@/lib/brand";

/**
 * The primary lockup: the mark, with the "by influencer" signature tucked to
 * its bottom right.
 *
 * The signature belongs to the MARK, not to the page. It sits under the right
 * edge of the word, close enough to read as one unit and small enough to stay
 * quieter, exactly as in the approved artwork. An earlier version pushed it to
 * the far right edge of the page, which broke the lockup into two things that
 * happened to share a line.
 *
 * The two are still separate elements and never join into a single phrase in
 * running text. This is a layout relationship, not a name.
 */
export function Wordmark({
  size = "hero",
  heading = false,
  align = "left",
}: {
  size?: "hero" | "footer";
  /**
   * Makes the mark the page's main heading. Every page needs exactly one, and
   * the name of the club is the right thing for it to be.
   */
  heading?: boolean;
  align?: "left" | "center";
}) {
  const markClass =
    size === "hero"
      ? "text-7xl sm:text-8xl lg:text-9xl"
      : "text-3xl";
  const signatureClass =
    size === "hero" ? "-mt-1 text-lg sm:-mt-2 sm:text-xl" : "-mt-0.5 text-xs";

  const Mark = heading ? "h1" : "span";

  return (
    <div className={align === "center" ? "flex justify-center" : "flex"}>
      {/* Shrink-wrapped to the width of the word, so the signature can sit
          under its right edge however wide the word happens to be. */}
      <div className="inline-flex flex-col items-end">
        <Mark
          className={`font-display leading-[0.85] text-accent-on-dark ${markClass}`}
        >
          {BRAND.markShort}
        </Mark>
        <span
          className={`font-display italic leading-none text-photo-ink/70 ${signatureClass}`}
        >
          {BRAND.endorsement}
        </span>
      </div>
    </div>
  );
}
