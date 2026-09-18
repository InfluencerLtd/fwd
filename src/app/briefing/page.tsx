import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageClose } from "@/components/page-close";
import { BriefingSubmit } from "@/components/briefing-submit";
import { IMAGERY, BRIEFING_SUBMIT } from "@/content/site";
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
    <PageShell overHero={false}>
      {/* ---- The masthead ----------------------------------------------- */}
      <section className="px-6 pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="mx-auto max-w-4xl">
          {/* No eyebrow. It said "the briefing" directly above a heading that
              says "the briefing", which is a label for something already
              named. The heading leads on its own, so it also loses the delay
              it was given to arrive after the eyebrow. */}
          {/* A capital T here only: the name is lowercase in the navigation, so
              the heading capitalises it rather than the name changing. */}
          {/* CENTRED, WITH THE ROW UNDER IT (review, 17 September 2026). The
              name was left-aligned over a masthead row that was already
              centred, so the two were arguing: a masthead is a symmetrical
              object or it is not one. */}
          <h1 className="fwd-enter fwd-statement text-center normal-case!">
            {BRIEFING.heading.charAt(0).toUpperCase() + BRIEFING.heading.slice(1)}
            {/* The logo's full stop, in the deep blue on this light ground. */}
            <span className="fwd-dot">.</span>
          </h1>

          {/* On screen before anybody scrolls, so these enter on load rather
              than on a scroll timeline. The delay is set on the list and
              inherited, so the whole row starts after the name above it has
              finished arriving; the stagger then walks the three along. Three now,
              so the row is narrower and centred rather than stretched to the width. */}
          <dl
            className="fwd-stagger mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-y-8 border-t border-ink/15 pt-8 text-center sm:mt-20 sm:grid-cols-3 sm:gap-x-8"
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

      {/* ---- What it is, one centred column -----------------------------
           IT WAS A TWELVE-COLUMN SPLIT, the opening line on the left and the
           rest dropped down the right-hand side. Under a centred masthead that
           read as the page changing its mind about where its axis is, so the
           whole top of the page is now one measure down the middle (review,
           17 September 2026). */}
      <section className="fwd-section px-6 pt-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="fwd-reveal fwd-standfirst text-ink">{opening}</p>
          {/* Only when there is more than the opening line. */}
          {rest.map((paragraph) => (
            <p key={paragraph} className="fwd-reveal fwd-body text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ---- The contents ----------------------------------------------- */}
      {/* WHAT IS IN IT IS OFF THE PAGE. The four-part index of the
          newsletter's sections came off on 15 September 2026; the copy is
          still BRIEFING.inside in src/content/pages.ts. */}


      <BriefingSubmit
        heading={BRIEFING_SUBMIT.onBriefingPage.heading}
        body={BRIEFING_SUBMIT.onBriefingPage.body}
      />

      <PageClose
        heading={BRIEFING.closing.heading}
        sentence
        photo="briefing"
        photoBrief={IMAGERY.briefingClose}
        /* KEEP THE TOP OF THE FRAME, AND THE LEFT OF IT. The speaker stands at
           the left of this photograph with her head near the top edge, and the
           band is as wide as the window and only 68vh tall: centred, a short
           wide screen cut the top of her head off, and a phone — where a
           landscape photograph is squeezed into a portrait slot — cut her out
           of the picture altogether. */
        photoPosition="20% 0%"
      />
    </PageShell>
  );
}
