import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { IMAGERY, MEMBERSHIP, MEMBERSHIP_PAGE } from "@/content/site";

/**
 * The whole offer as pictures, in two rows that drift sideways.
 *
 * The two rows drift in opposite directions. One row moving alone reads as a
 * component that is loading. Two moving against each other reads as a surface
 * with things on it, and the eye settles rather than following one tile.
 *
 * The captions are the card summaries, so there is one place to change a
 * benefit.
 *
 * THIS IS NOW THE ONLY PLACE THE BENEFITS APPEAR ON THE PAGE. They used to be
 * written out again a screen below, which is why the whole block was hidden
 * from screen readers. That written out version has gone, so hiding this would
 * mean the benefits existed for sighted visitors only. It is a labelled list
 * now, and the only thing hidden is the second copy of each row, which exists
 * to make the loop close and would otherwise be read out twice.
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
      <ul className="fwd-marquee-track gap-2">
        {row.map((card, index) => (
          <li
            key={`${card.id}-${index}`}
            // The duplicate half. The same benefits again, so it is hidden
            // rather than read out a second time.
            aria-hidden={index >= cards.length || undefined}
            className={`shrink-0 ${TILE_HEIGHT} ${WIDTHS[index % WIDTHS.length]}`}
          >
            {/* NO "COMING SOON" TILES ANY MORE. Two of these were pale blue
                panels with no photograph, for The clubhouse and The briefing,
                and both came off on 15 September 2026: in a band of
                photographs they read as the two things that are not finished.
                The copy for both is recorded over `cards` in
                src/content/site.ts, and this is where the branch that drew
                them used to be. */}
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
              className="h-full rounded-2xl"
            >
              {/* THE NAME, AND NOTHING UNDER IT. The line from each card was
                  added on 15 September 2026 and taken off the same day: a
                  sentence on a tile drifting past is more reading than the
                  format can carry. The summaries stay in
                  src/content/site.ts, which is still the only written record
                  of what each benefit is, and putting them back is one <p>. */}
              <p className="absolute inset-0 z-2 flex items-center justify-center px-6 text-center font-body text-[17px] leading-snug text-photo-ink">
                {card.title}
              </p>
            </PhotoPlaceholder>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BenefitTiles() {
  const cards = MEMBERSHIP.cards;
  const half = Math.ceil(cards.length / 2);

  return (
    // Air above and below. Butted straight up against the dark top, the rows
    // read as part of it rather than as the first thing on the page.
    <section
      aria-label={MEMBERSHIP_PAGE.benefitsLabel}
      className="fwd-section-compact space-y-2 overflow-hidden"
    >
      <Row cards={cards.slice(0, half)} reverse={false} />
      <Row cards={cards.slice(half)} reverse />
    </section>
  );
}
