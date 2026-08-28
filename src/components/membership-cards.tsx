import { MEMBERSHIP } from "@/content/site";

/**
 * What membership gets you, as an editorial list.
 *
 * IT USED TO BE EIGHT BORDERED BOXES IN A TWO COLUMN GRID, and that was the
 * problem. Eight containers of equal weight read as a spec sheet: the eye
 * counts boxes instead of reading names, nothing leads, and a rounded card with
 * a border and a raised fill is the most generic shape on the internet. It also
 * made the page feel like an interface rather than a club.
 *
 * This is the same eight things with the containers taken away. One column,
 * hairline rules between, the name set large in the display face, and a lot of
 * air. The structure comes from the type and the spacing rather than from
 * drawing a rectangle around each one, which is how a printed membership page
 * would do it and how Soho House does it.
 *
 * One column, not two, on purpose. Two columns of this would put two large
 * serif names side by side competing to be read first. In one column the eye
 * goes straight down the names, which is the point: the names are the offer.
 *
 * The mechanism is unchanged. These are still the browser's own <details>, so
 * they open with the keyboard, screen readers announce open or closed, and they
 * work with no JavaScript at all. Only the dressing is different.
 */
export function MembershipCards() {
  return (
    <div className="mt-16 border-t border-border">
      {MEMBERSHIP.cards.map((card, index) => (
        <details
          key={card.id}
          className="fwd-card fwd-reveal group border-b border-border"
          style={
            { "--fwd-reveal-shift": `${index * 1.5}%` } as React.CSSProperties
          }
        >
          <summary className="flex items-baseline gap-6 py-8 sm:gap-10 sm:py-10">
            {/* The count is decoration for the eye, not information, so it is
                hidden from screen readers. It gives the column a left edge to
                run down and makes eight things read as a sequence rather than
                as a pile. */}
            <span
              aria-hidden="true"
              /* Full ink-muted, not a faded version of it. At 13px the faded
                 one measured 3.01:1 against the page where text needs 4.5:1.
                 Hidden from screen readers is not a licence to make it
                 unreadable for everyone else. This measures 5.55:1. */
              className="w-6 shrink-0 font-body text-[13px] tabular-nums text-ink-muted"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="min-w-0 flex-1">
              {/* Deliberately NOT forced lowercase. Section headings are set
                  lowercase as part of the identity, but these are names:
                  Meeting of Minds and The House are proper nouns, and
                  "the house" reads as a building rather than as the thing it
                  is called. Capitalisation follows src/content/site.ts. */}
              <span className="block font-display text-3xl leading-tight text-ink transition-opacity duration-500 group-hover:opacity-70 sm:text-4xl">
                {card.title}
              </span>
              <span className="mt-3 block max-w-xl font-body text-[15px] leading-relaxed text-ink-muted">
                {card.summary}
              </span>
            </span>

            {/* A rule and a mark rather than a bordered circle. At this size a
                button-shaped thing would read as the most important element in
                the row, which it is not: the name is. */}
            <span
              aria-hidden="true"
              className="fwd-card-indicator shrink-0 self-center font-body text-2xl leading-none text-ink-muted transition-colors duration-500 group-hover:text-ink"
            >
              +
            </span>
          </summary>

          <p className="fwd-card-detail max-w-2xl pb-10 font-body text-[15px] leading-relaxed text-ink sm:ml-16">
            {card.detail}
          </p>
        </details>
      ))}
    </div>
  );
}
