import { MEMBERSHIP } from "@/content/site";

/**
 * The membership cards.
 *
 * Each one opens to reveal its detail, so the section stays short and scannable
 * while the substance is still there for anyone who wants it.
 *
 * These are the browser's own <details> elements. That means they open and
 * close with the keyboard, screen readers announce whether they are open or
 * closed, and they still work if JavaScript never loads. We only replace the
 * default triangle with our own mark.
 *
 * The cards reveal in sequence rather than all at once as the grid comes into
 * view. That is the `--fwd-reveal-shift` below, which nudges each card's reveal
 * a little further down the scroll than the one before it.
 */
export function MembershipCards() {
  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2">
      {MEMBERSHIP.cards.map((card, index) => (
        <details
          key={card.id}
          className="fwd-card fwd-reveal group rounded-2xl border border-border bg-surface-raised transition-colors duration-500 hover:border-ink/25"
          style={
            { "--fwd-reveal-shift": `${index * 1.5}%` } as React.CSSProperties
          }
        >
          <summary className="flex items-start justify-between gap-4 px-7 py-7">
            <span className="min-w-0">
              {/* Deliberately NOT forced lowercase. Section headings are set
                  lowercase as part of the identity, but these are names:
                  Meeting of Minds and The Clubhouse are proper nouns, and
                  "the clubhouse" reads as a room rather than as the thing it
                  is called. Capitalisation follows src/content/site.ts. */}
              <span className="block font-display text-2xl text-ink">
                {card.title}
              </span>
              <span className="mt-2 block font-body text-[15px] leading-relaxed text-ink-muted">
                {card.summary}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="fwd-card-indicator mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border font-body text-lg leading-none text-ink-muted transition-colors duration-500 group-hover:border-ink/30 group-hover:text-ink"
            >
              +
            </span>
          </summary>
          <p className="fwd-card-detail mx-7 border-t border-border py-6 font-body text-[15px] leading-relaxed text-ink">
            {card.detail}
          </p>
        </details>
      ))}
    </div>
  );
}
