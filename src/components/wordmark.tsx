import { BRAND } from "@/lib/brand";

/**
 * The primary lockup: the fwd. mark, with the "by influencer" signature set
 * apart from it and always quieter.
 *
 * The two are deliberately NOT a single unit. The mark sits at the lower left,
 * the signature at the lower right, as in the approved treatment.
 */
export function Wordmark({ size = "hero" }: { size?: "hero" | "footer" }) {
  const markClass =
    size === "hero"
      ? "text-7xl sm:text-8xl lg:text-9xl"
      : "text-3xl";
  const signatureClass = size === "hero" ? "text-lg sm:text-xl" : "text-sm";

  return (
    <div className="flex w-full items-end justify-between gap-6">
      <span
        className={`font-display leading-[0.85] text-accent-on-dark ${markClass}`}
      >
        {BRAND.markShort}
      </span>
      <span
        className={`font-display italic leading-none text-photo-ink/70 ${signatureClass}`}
      >
        {BRAND.endorsement}
      </span>
    </div>
  );
}
