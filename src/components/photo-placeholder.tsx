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
   * This is not a mood choice, it is what keeps the words legible. The pale ice
   * blue only works on a dark ground, and a photograph with a bright patch in
   * it, a shirt or a window or a skin tone, would swallow the wordmark wherever
   * it crossed one.
   *
   * Measured against every pixel of the real hero photograph, which arrives
   * already darkened from the artwork:
   *
   *             wordmark   body text
   *   no wash    4.49:1     5.43:1
   *   20%        5.71:1     6.90:1
   *   25%        6.07:1     7.34:1
   *   50%        8.22:1     9.93:1   what is set, chosen for the look
   *
   * The wordmark is large text and needs 3:1. The line beneath it is normal
   * size and needs 4.5:1. This photograph clears both with no wash at all, so
   * the setting is a look rather than a requirement, and 50% is what was
   * chosen: a heavier, moodier frame with the photograph further back.
   *
   * IF A BRIGHTER PHOTOGRAPH IS EVER USED HERE, THIS NUMBER HAS TO BE CHECKED
   * AGAIN. The same measurement on the version Canva served, which was not
   * pre-darkened, needed 45% before the wordmark cleared 3:1.
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
          className={`absolute z-2 max-w-[75%] font-body text-[10px] leading-relaxed tracking-[0.16em] text-photo-ink/60 ${labelPosition}`}
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
