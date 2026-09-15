import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { IMAGERY } from "@/content/site";

/*
 * NOT ON THE SITE AT THE MOMENT. The home page stopped rendering this on
 * 15 September 2026 and kept it for future reference: see the note where it
 * used to sit, section 4 of src/components/public-site.tsx. Everything it
 * needs is still here and still in src/content/site.ts.
 */

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
 *
 * IT USED TO BE HIDDEN FROM SCREEN READERS ENTIRELY, and could be, because it
 * was eight pictures and no words: pure decoration, and announcing eight empty
 * panels would have been noise. It carries words now, so it is a labelled list
 * like the benefit tiles, with only the duplicate half hidden — otherwise the
 * one part of this band that says anything would be the part nobody using a
 * screen reader could reach.
 */
export function PhotoBand() {
  const captions = IMAGERY.bandCaptions;
  const row = [...captions, ...captions];

  return (
    <div className="fwd-marquee bg-photo-ground py-px">
      <ul className="fwd-marquee-track gap-px" aria-label={IMAGERY.bandLabel}>
        {row.map((caption, index) => {
          const shot = index % captions.length;
          return (
            <li
              key={`${caption}-${index}`}
              aria-hidden={index >= captions.length || undefined}
              className="fwd-zoom shrink-0"
            >
              <PhotoPlaceholder
                label={IMAGERY.band[shot]}
                name={`band-${shot + 1}`}
                sizes="(min-width: 1024px) 19vw, 46vw"
                ratio="portrait"
                // The brief for each shot stays in the content file, but it is
                // not printed over the placeholder. Until the photographs land
                // this band is a row of plain warm panels.
                showLabel={false}
                // Heavier than the hero's, for the same reason the benefit
                // tiles are: the words sit over eight different pictures that
                // nobody has measured yet, and the wash is what makes that
                // safe before they land.
                washClassName="bg-photo-ground/55"
                className="fwd-zoom-inner w-[46vw] sm:w-[30vw] lg:w-[19vw]"
              >
                {/* Low in the frame rather than dead centre. These are
                    portraits and the middle is where a face lands. */}
                <p className="absolute inset-x-0 bottom-0 z-2 px-5 pb-5 font-body text-[15px] leading-snug text-photo-ink">
                  {caption}
                </p>
              </PhotoPlaceholder>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
