import { BRAND } from "@/lib/brand";

/**
 * The primary lockup: the fwd. mark, with the "by influencer" signature set
 * apart from it and always quieter.
 *
 * The two are deliberately NOT a single unit. The mark sits at the lower left,
 * the signature at the lower right, as in the approved treatment.
 *
 * `heading` makes the mark the page's main heading. Every page needs exactly
 * one, and on this site the name of the club is the right thing for it to be.
 * The footer lockup is not a heading, so it leaves this off.
 */
export function Wordmark({
  size = "hero",
  heading = false,
}: {
  size?: "hero" | "footer";
  heading?: boolean;
}) {
  const markClass =
    size === "hero" ? "text-7xl sm:text-8xl lg:text-9xl" : "text-3xl";
  const signatureClass = size === "hero" ? "text-lg sm:text-xl" : "text-sm";

  const Mark = heading ? "h1" : "span";

  return (
    <div className="flex w-full items-end justify-between gap-6">
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
  );
}
