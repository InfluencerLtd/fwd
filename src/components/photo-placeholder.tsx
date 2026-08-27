/**
 * A stand-in for a photograph we do not have yet.
 *
 * It is a warm, softly lit gradient with grain over it and a slow drift, rather
 * than a flat black rectangle. A page with a dozen of these still reads as warm
 * and lit, instead of reading as a page full of holes. It stays clearly
 * labelled, so nobody mistakes one for a finished image.
 *
 * Generic stock is deliberately not used. The wrong photograph would damage the
 * identity faster than no photograph at all.
 *
 * TO PUT A REAL PHOTOGRAPH IN: replace this component at that spot with
 * <Image src={...} alt={...} fill className="object-cover" /> wrapped in the
 * same `fwd-photo` container. Nothing else needs to change.
 */

export type PhotoRatio = "portrait" | "landscape" | "square" | "wide" | "fill";

const RATIOS: Record<PhotoRatio, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
  fill: "",
};

export function PhotoPlaceholder({
  label,
  ratio = "landscape",
  className = "",
  labelPosition = "left-5 top-5",
  showLabel = true,
  children,
}: {
  /** What the photograph should be. Written for whoever briefs the shoot. */
  label: string;
  ratio?: PhotoRatio;
  className?: string;
  labelPosition?: string;
  /** Off for small decorative slots where a label would be noise. */
  showLabel?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={`fwd-photo fwd-grain ${RATIOS[ratio]} ${className}`}>
      {showLabel ? (
        <p
          className={`absolute z-2 max-w-[75%] font-body text-[10px] leading-relaxed tracking-[0.16em] text-photo-ink/45 ${labelPosition}`}
        >
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}
