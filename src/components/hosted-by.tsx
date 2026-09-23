import { BRAND } from "@/lib/brand";

/**
 * "Hosted by", then Influencer's own logo.
 *
 * The way Influencer's ownership of Forward is shown, after Sport Beach at
 * Cannes ("hosted by Stagwell"): Forward keeps its own name and mark, and the
 * parent signs underneath in its own logo. See `hostedBy` in src/lib/brand.ts
 * for where it appears and why only there.
 *
 * THE WORDS ARE REAL TEXT and the logo is decoration with the name beside it
 * for a screen reader, so the whole line reads "Hosted by Influencer" aloud.
 * The logo is a CSS mask, so it takes whatever colour the line is given.
 *
 * Three sizes: `lg` under the hero's button, `md` where it needs to be a step
 * quieter, `sm` in the footer and the dialog.
 */
export function HostedBy({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const text =
    size === "lg" ? "text-[14px]" : size === "md" ? "text-[12px]" : "text-[11px]";
  // The logo is set a little taller than the capitals beside it, because its
  // lowercase letters sit lower than a cap height and would look small at an
  // equal size. It is 1.6 times the type size, which is the ratio the brand
  // guidelines set for the hosted line and what these were matched to by eye.
  const logo =
    size === "lg" ? "h-[22px]" : size === "md" ? "h-[19px]" : "h-[15px]";

  return (
    // whitespace-nowrap because the footer's row is tight on a small phone and
    // was breaking the line into "HOSTED" over "BY" beside the logo.
    <span
      className={`inline-flex items-center gap-[0.75em] whitespace-nowrap ${className}`}
    >
      <span className={`fwd-eyebrow ${text}`}>{BRAND.hostedBy}</span>
      <span aria-hidden="true" className={`fwd-logo fwd-host-logo ${logo}`} />
      {/* The space is inside the hidden span on purpose: a flex container
          drops whitespace between its items, and without it a screen reader
          gets "Hosted byInfluencer" as one word. */}
      <span className="sr-only">{` ${BRAND.host}`}</span>
    </span>
  );
}
