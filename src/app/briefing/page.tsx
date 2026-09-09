import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageClose } from "@/components/page-close";
import { BriefingSubmit } from "@/components/briefing-submit";
import { IMAGERY } from "@/content/site";
import { BRIEFING } from "@/content/pages";

export const metadata: Metadata = {
  title: BRIEFING.title,
  description: BRIEFING.lead[0],
};

/**
 * The briefing — the publication page.
 *
 * IT IS THE ONLY PAGE THAT OPENS ON THE LIGHT GROUND, with no photograph and
 * no dark band, which is why `overHero` is false: the header has nothing to
 * sit over and goes solid from the first frame. A publication announces itself
 * with a masthead, not with a picture of a room, and the difference is visible
 * from the first second — which is the point of giving each page its own
 * opening.
 *
 * The masthead row is the facts a reader wants before the description: how
 * often, who gets it, when the next one lands, how long it takes to read.
 *
 * "What is in it" is set as a contents page, because that is what it is.
 *
 * THE ONLY PAGE WITH A DARK FOOTER. It closes on a dark section, and a band
 * of off-white under that would stop the page rather than end it. The footer
 * carries the close on to the bottom of the screen instead.
 *
 * THE CONTRIBUTE SECTION IS THE SAME COMPONENT THE HOME PAGE USES. It belongs
 * here more than it belongs there — this is the page somebody reads when they
 * are deciding whether they have something worth sending — and two copies of
 * it would drift apart within a month.
 */
export default function BriefingPage() {
  const [opening, ...rest] = BRIEFING.lead;

  return (
    <PageShell overHero={false} footer="dark">
      {/* ---- The masthead ----------------------------------------------- */}
      <section className="px-6 pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="mx-auto max-w-6xl">
          {/* No eyebrow. It said "the briefing" directly above a heading that
              says "the briefing", which is a label for something already
              named. The heading leads on its own, so it also loses the delay
              it was given to arrive after the eyebrow. */}
          <h1 className="fwd-enter fwd-statement">{BRIEFING.heading}</h1>

          {/* On screen before anybody scrolls, so these enter on load rather
              than on a scroll timeline. The delay is set on the list and
              inherited, so the whole row starts after the name above it has
              finished arriving; the stagger then walks the four along. */}
          <dl
            className="fwd-stagger mt-16 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-ink/15 pt-8 sm:mt-20 md:grid-cols-4"
            style={{ "--fwd-enter-delay": "420ms" } as React.CSSProperties}
          >
            {BRIEFING.masthead.map((item) =>
              item.value ? (
                <div key={item.label} className="fwd-enter">
                  <dt className="fwd-eyebrow text-ink-muted">{item.label}</dt>
                  <dd className="mt-3 font-display text-2xl leading-none text-ink">
                    {item.value}
                  </dd>
                </div>
              ) : null,
            )}
          </dl>
        </div>
      </section>

      {/* ---- What it is, held to one column ----------------------------- */}
      <section className="px-6 pb-24 pt-8 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-6 lg:grid-cols-12">
          <p className="fwd-reveal fwd-standfirst col-span-full text-ink lg:col-span-6">
            {opening}
          </p>
          <div className="col-span-full space-y-6 lg:col-span-4 lg:col-start-9 lg:self-end">
            {rest.map((paragraph) => (
              <p key={paragraph} className="fwd-reveal fwd-body text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- The contents ----------------------------------------------- */}
      <section className="bg-surface-warm px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="fwd-reveal fwd-h2">{BRIEFING.inside.heading}</h2>

          <ol className="fwd-stagger mt-14 sm:mt-20">
            {BRIEFING.inside.items.map((item, index) => (
              <li
                key={item.name}
                className="fwd-reveal grid items-baseline gap-x-10 gap-y-2 border-t border-ink/15 py-8 md:grid-cols-12"
              >
                <span className="fwd-eyebrow col-span-full text-ink-muted md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Not a heading: these keep their capitals. */}
                <p className="fwd-standfirst col-span-full text-ink md:col-span-5">
                  {item.name}
                </p>
                <p className="fwd-body col-span-full text-ink-muted md:col-span-5 md:col-start-8">
                  {item.line}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BriefingSubmit />

      <PageClose
        heading={BRIEFING.closing.heading}
        note={BRIEFING.closing.note}
        photo="briefing"
        photoBrief={IMAGERY.briefingClose}
      />
    </PageShell>
  );
}
