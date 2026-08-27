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
 */
export function MembershipCards() {
  return (
    <div className="fwd-reveal mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
      {MEMBERSHIP.cards.map((card) => (
        <details key={card.id} className="fwd-card group bg-surface-raised">
          <summary className="flex items-start justify-between gap-4 px-6 py-6">
            <span className="min-w-0">
              {/* Deliberately NOT forced lowercase. Section headings are set
                  lowercase as part of the identity, but these are names:
                  Meeting of Minds and The Clubhouse are proper nouns and
                  "the clubhouse" reads as a room rather than as the thing it
                  is called. Capitalisation here follows src/content/site.ts,
                  so it can be changed there without touching this file. */}
              <span className="block font-display text-2xl text-ink">
                {card.title}
              </span>
              <span className="mt-2 block font-body text-[15px] leading-relaxed text-ink-muted">
                {card.summary}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="fwd-card-indicator mt-1 shrink-0 font-body text-xl leading-none text-ink-muted"
            >
              +
            </span>
          </summary>
          <p className="fwd-card-detail border-t border-border px-6 py-5 font-body text-[15px] leading-relaxed text-ink">
            {card.detail}
          </p>
        </details>
      ))}
    </div>
  );
}
