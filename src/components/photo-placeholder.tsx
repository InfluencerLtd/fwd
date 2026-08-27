/**
 * A stand-in for a photograph we do not have yet.
 *
 * It is a dark grained block with a visible label, so a missing image is
 * obvious rather than looking like a design choice. Generic stock photography
 * is deliberately not used: the wrong image would damage the identity faster
 * than no image at all.
 *
 * To replace it, swap this component for a real <Image> at the same spot.
 */
export function PhotoPlaceholder({
  label,
  className = "",
  /**
   * Where the label sits. The hero moves it down on small screens so it does
   * not collide with the header sitting on top of the same photograph.
   */
  labelPosition = "left-6 top-6",
  children,
}: {
  label: string;
  className?: string;
  labelPosition?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`fwd-grain relative overflow-hidden bg-photo-ground ${className}`}
      style={{ "--fwd-grain-opacity": 0.05 } as React.CSSProperties}
    >
      <p
        className={`absolute z-1 max-w-[70%] font-body text-[11px] tracking-[0.18em] text-photo-ink/45 ${labelPosition}`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
