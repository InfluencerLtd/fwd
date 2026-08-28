import Image from "next/image";
import { photoSrc } from "@/lib/photography";

/**
 * A photograph, or a stand-in for one that does not exist yet.
 *
 * Give it a `name` and it looks for that file in `public/photography/`. If it
 * is there, the real photograph is shown. If it is not, the warm labelled
 * placeholder is shown instead and the label says what the shot should be.
 *
 * That means adding a photograph is one file drop with no code change, and a
 * missing one never breaks the page or looks like a finished design.
 *
 * The placeholder is a warm, softly lit gradient with grain and a slow drift
 * rather than a flat black rectangle, so a page with a dozen of them still
 * reads as warm and lit instead of full of holes. Generic stock is deliberately
 * never used: the wrong photograph would damage the identity faster than no
 * photograph at all.
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
  name,
  ratio = "landscape",
  className = "",
  labelPosition = "left-5 top-5",
  showLabel = true,
  priority = false,
  sizes = "100vw",
  scrim,
  children,
}: {
  /** What the photograph should be. Written for whoever briefs the shoot. */
  label: string;
  /** The file name to look for in public/photography, without the extension. */
  name?: string;
  ratio?: PhotoRatio;
  className?: string;
  labelPosition?: string;
  showLabel?: boolean;
  /** True for the hero only. Tells the browser to fetch it first. */
  priority?: boolean;
  /** Roughly how wide this appears, so the right size is sent to each screen. */
  sizes?: string;
  /**
   * A dark wash over the photograph.
   *
   * This is not a mood choice, it is what keeps the words legible, and the real
   * hero photograph proves the point. Measured against every pixel in it:
   *
   *   no wash   1.27:1   the wordmark disappears into the pale satin dress
   *   40%       2.97:1   still fails
   *   45%       3.36:1   the floor
   *   50%       3.82:1   what is set
   *   55%       4.36:1
   *
   * Large text needs 3:1. Those figures are the worst pixel in the whole frame,
   * so there is more headroom than they suggest: the wordmark only crosses the
   * middle of it. Anything below 45% and the mark starts to vanish wherever the
   * picture is brightest.
   *
   * Defaults to on wherever there is something on top of the picture.
   */
  scrim?: boolean;
  children?: React.ReactNode;
}) {
  const src = photoSrc(name);
  const wash = scrim ?? Boolean(children);

  return (
    <div className={`fwd-photo fwd-grain ${RATIOS[ratio]} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          // The photograph is decoration behind the words. It carries no
          // information a screen reader needs, and the alt above is empty on
          // purpose so it is skipped rather than described badly.
          className="object-cover"
        />
      ) : showLabel ? (
        <p
          className={`absolute z-2 max-w-[75%] font-body text-[10px] leading-relaxed tracking-[0.16em] text-photo-ink/45 ${labelPosition}`}
        >
          {label}
        </p>
      ) : null}
      {src && wash ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-1 bg-photo-ground/50"
        />
      ) : null}
      {children}
    </div>
  );
}
