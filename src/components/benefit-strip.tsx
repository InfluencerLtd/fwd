import { MEMBERSHIP } from "@/content/site";

/**
 * A single line of the membership benefits, drifting slowly sideways.
 *
 * It sits between the top of the membership page and the prose, and its job is
 * to let somebody take the whole offer in at a glance before they decide to
 * read. The detail is in the cards below; this is the scan.
 *
 * The lines are the card summaries rather than copy of their own, so there is
 * one place to change a benefit and the strip cannot drift out of step with the
 * cards underneath it.
 *
 * Cards whose summary is still a bracketed placeholder are left out. A card
 * that says it needs content belongs in the section below, where it is a note
 * to us, not scrolling past a visitor as though it were a benefit.
 *
 * aria-hidden, because every line here is repeated in full a screen further
 * down. A screen reader would otherwise read the same eight benefits twice, and
 * the version below is the one with the detail attached.
 */
export function BenefitStrip() {
  const items = MEMBERSHIP.cards
    .map((card) => card.summary)
    .filter((summary) => !summary.includes("["));

  // Rendered twice end to end. The animation moves the track by exactly half
  // its width, so the loop closes on itself with nothing to see.
  const row = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="fwd-marquee fwd-marquee-brisk bg-photo-ground"
    >
      <div className="fwd-grain">
        <div className="fwd-marquee-track relative z-1 py-5">
          {row.map((summary, index) => (
            <p
              key={`${summary}-${index}`}
              className="flex shrink-0 items-center gap-8 pr-8 font-body text-[15px] whitespace-nowrap text-photo-ink"
            >
              {summary}
              <span className="text-accent-on-dark">&bull;</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
