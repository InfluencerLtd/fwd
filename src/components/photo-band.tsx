import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { IMAGERY } from "@/content/site";

/**
 * A full-width band of photographs that drifts slowly sideways.
 *
 * The row is rendered twice, end to end, and the animation moves it by exactly
 * half its width before repeating. That is what makes the loop seamless: at the
 * moment it snaps back, the second copy is sitting exactly where the first one
 * started, so there is nothing to see.
 *
 * It pauses when the cursor is over it. For anyone who has asked their computer
 * to reduce motion it does not move at all and can be scrolled by hand instead.
 */
export function PhotoBand() {
  const row = [...IMAGERY.band, ...IMAGERY.band];

  return (
    <div className="fwd-marquee bg-photo-ground py-px" aria-hidden="true">
      <div className="fwd-marquee-track gap-px">
        {row.map((description, index) => (
          <div key={`${description}-${index}`} className="fwd-zoom shrink-0">
            <PhotoPlaceholder
              label={description}
              name={`band-${(index % IMAGERY.band.length) + 1}`}
              sizes="(min-width: 1024px) 19vw, 46vw"
              ratio="portrait"
              showLabel={index < IMAGERY.band.length}
              className="fwd-zoom-inner w-[46vw] sm:w-[30vw] lg:w-[19vw]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
