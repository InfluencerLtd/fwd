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
  objectPosition,
  twinkle = false,
  className = "",
  labelPosition = "left-5 top-5",
  showLabel = true,
  priority = false,
  sizes = "100vw",
  scrim,
  washClassName = "bg-photo-ground/50",
  children,
}: {
  /** What the photograph should be. Written for whoever briefs the shoot. */
  label: string;
  /** The file name to look for in public/photography, without the extension. */
  name?: string;
  ratio?: PhotoRatio;
  /**
   * Where the crop is taken from, as a CSS object-position.
   *
   * WHY IT IS SOMETIMES NEEDED. Every photograph here is `object-cover` in a
   * box whose shape is set by the layout rather than by the picture, so the
   * two rarely match and something is always cut off. Centred is right almost
   * always, and wrong the moment the thing that matters is not in the middle:
   * a face at the top of the frame loses the top of its head on a short wide
   * window, and a figure at one side disappears entirely on a phone, where a
   * landscape photograph is cropped to a portrait slot.
   *
   * Given as a percentage pair, and read as "the point in the photograph that
   * stays in view": "50% 0%" keeps the top edge, "20% 0%" keeps the top and
   * the left-hand third.
   */
  objectPosition?: string;
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
   *   no wash    4.49:1     5.43:1   WHAT THE HERO NOW USES
   *   20%        5.71:1     6.90:1
   *   25%        6.07:1     7.34:1
   *   50%        8.22:1     9.93:1
   *
   * The wordmark is large text and needs 3:1. The line beneath it is normal
   * size and needs 4.5:1. This photograph clears both with no wash at all,
   * which is why the hero now runs without one: `scrim={false}` in hero.tsx.
   *
   * Every piece of text over it was measured again with the wash off, against
   * the brightest pixel each one crosses, at 1149px and at 375px. The lowest
   * was 5.09:1 on the line under the mark, against a 4.5 requirement.
   *
   * IF A BRIGHTER PHOTOGRAPH IS EVER USED HERE, THIS NUMBER HAS TO BE CHECKED
   * AGAIN. The same measurement on the version Canva served, which was not
   * pre-darkened, needed 45% before the wordmark cleared 3:1.
   *
   * Defaults to on wherever there is something on top of the picture.
   */
  scrim?: boolean;
  /**
   * How heavy that wash is, as a whole Tailwind class.
   *
   * 50% is right for the hero, where the only things over the picture are the
   * wordmark and one line, both large and both high up the frame. The holding
   * page is a different job: it carries a form, a consent line and a footer,
   * all small, all low down where this photograph is at its brightest. Every
   * one of those measured under 4.5:1 at 50% and clears it at 70%.
   *
   * Change this and the page it belongs to has to be measured again.
   */
  washClassName?: string;
  /**
   * Lay a second, brighter copy of the same photograph over it, blended so
   * that only the bright parts of the picture lift, and fade that copy in and
   * out on an irregular rhythm. On a photograph with lights in it, the lights
   * twinkle and nothing else visibly moves.
   *
   * IT IS A SECOND COPY OF THE PICTURE, deliberately requested small — see
   * the note over .fwd-photo-twinkle in globals.css for why that is cheap and
   * what it costs.
   */
  twinkle?: boolean;
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
          style={objectPosition ? { objectPosition } : undefined}
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
          className={`absolute inset-0 z-1 ${washClassName}`}
        />
      ) : null}
      {/* THE TWINKLE LAYER: the same photograph again, brighter and harder,
          blended so only its own highlights lift.
          AFTER THE WASH, AND AT THE SAME z-1, so it paints over it. It was
          under the wash, which meant the hero's 58% black took 58% of it and
          the whole thing was invisible — measured, 0.01% of the page moved.
          Still below the words at z-2, so nothing is drawn over the type. */}
      {src && twinkle ? (
        <div aria-hidden="true" className="fwd-photo-twinkle absolute inset-0 z-1">
          <Image
            src={src}
            alt=""
            fill
            /* SMALL ON PURPOSE. It contributes blooms rather than detail, so a
               480px copy is indistinguishable from the full one once it is
               blurred by the blend and held under 40% opacity — and it is a
               few tens of kilobytes rather than a second hero-sized download.
               Lazy, so it never competes with the real one for the first
               paint. */
            sizes="480px"
            loading="lazy"
            className="object-cover"
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>
      ) : null}
      {children}
    </div>
  );
}
