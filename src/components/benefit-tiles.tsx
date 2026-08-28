import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { IMAGERY, MEMBERSHIP } from "@/content/site";

/**
 * The whole offer as pictures, in two rows that drift sideways.
 *
 * This replaced a single line of scrolling text, which was standing in for
 * exactly this until it was clear the page wanted it. A membership is a set of
 * rooms and nights and people, and a list of words is the least persuasive way
 * to say so.
 *
 * The two rows drift in opposite directions. One row moving alone reads as a
 * component that is loading. Two moving against each other reads as a surface
 * with things on it, and the eye settles rather than following one tile.
 *
 * The captions are the card summaries, so the tiles cannot drift out of step
 * with the list underneath, and there is one place to change a benefit.
 *
 * aria-hidden, because every caption here appears again a screen further down
 * with its detail attached. A screen reader would otherwise hear all eight
 * benefits twice, and the version below is the useful one.
 */

/**
 * Widths vary on purpose. Eight identical rectangles read as a grid that has
 * been set in motion. Varying them makes it a row of photographs.
 *
 * The HEIGHT is fixed and the width is what changes, which is the part that
 * matters. Fixing the aspect ratio instead makes a wider tile a taller one, and
 * the row stops having a straight edge along the top and bottom.
 */
const WIDTHS = [
  "w-[68vw] sm:w-[38vw] lg:w-[26vw]",
  "w-[56vw] sm:w-[30vw] lg:w-[19vw]",
  "w-[72vw] sm:w-[42vw] lg:w-[29vw]",
  "w-[60vw] sm:w-[33vw] lg:w-[22vw]",
];

const TILE_HEIGHT = "h-44 sm:h-52 lg:h-60";

function Row({
  cards,
  reverse,
}: {
  cards: (typeof MEMBERSHIP.cards)[number][];
  reverse: boolean;
}) {
  // Rendered twice end to end. The animation moves the track by exactly half
  // its width, so the loop closes on itself with nothing to see.
  const row = [...cards, ...cards];

  return (
    <div className={`fwd-marquee ${reverse ? "fwd-marquee-reverse" : ""}`}>
      <div className="fwd-marquee-track gap-2">
        {row.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className={`shrink-0 ${TILE_HEIGHT} ${WIDTHS[index % WIDTHS.length]}`}
          >
            <PhotoPlaceholder
              label={IMAGERY.benefits[card.id as keyof typeof IMAGERY.benefits]}
              name={`benefit-${card.id}`}
              sizes="(min-width: 1024px) 26vw, (min-width: 640px) 38vw, 68vw"
              ratio="fill"
              showLabel={false}
              // Heavier than the hero's 50%. These captions are small, they sit
              // dead centre where a photograph is least predictable, and there
              // are eight different pictures rather than one that has been
              // measured. The wash is what makes that safe.
              washClassName="bg-photo-ground/60"
              className="h-full rounded-xl"
            >
              <p className="absolute inset-0 z-2 flex items-center justify-center px-6 text-center font-body text-[15px] leading-snug text-photo-ink sm:text-base">
                {card.summary}
              </p>
            </PhotoPlaceholder>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BenefitTiles() {
  const cards = MEMBERSHIP.cards;
  const half = Math.ceil(cards.length / 2);

  return (
    // Air above and below. Butted straight up against the dark top, the rows
    // read as part of it rather than as the first thing on the page.
    <div aria-hidden="true" className="space-y-2 overflow-hidden py-16 sm:py-20">
      <Row cards={cards.slice(0, half)} reverse={false} />
      <Row cards={cards.slice(half)} reverse />
    </div>
  );
}
