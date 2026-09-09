import { MarkedText } from "@/components/marked";
import { CASE } from "@/content/site";

/**
 * The argument, on the light grey band, before anything is offered.
 *
 * IT WAS ON THE WARM NEAR-BLACK. The same grey the Meeting of Minds band uses,
 * so the two editorial sections of the page share a ground and the darks are
 * left to the photography. The grain went with it: the grey band elsewhere on
 * the page does not carry it, and the argument for it was texture on a large
 * flat dark area that is no longer here.
 *
 * Measured on this ground: the heading is 15.06:1 and the body 4.78:1.
 *
 * This is the section the site did not have. It opened with a photograph and
 * went straight to what membership unlocks, which sells a solution to a
 * problem nobody has named yet.
 *
 * THE COMPOSITION IS THE POINT AS MUCH AS THE WORDS. The heading is hard left
 * and enormous; the body is a narrow column pushed to the right of it, ending
 * well short of the edge. Roughly a third of this section is deliberately
 * empty. Centred type reads as the default a template gave you — asymmetry and
 * held space read as somebody having decided.
 *
 * THE HEADING IS THE SECTION'S ONE MACRO MOMENT. It is uncovered from its own
 * baseline rather than faded in — see `.fwd-rise` in globals.css.
 *
 * There was a second line under all of this, at standfirst size, carrying the
 * conclusion. It has been taken out: the section now ends on the third
 * paragraph, and the ground changing underneath is what closes it.
 */
export function TheCase() {
  return (
    <section id="why" className="bg-surface-alt scroll-mt-20 px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        {/* No eyebrow. "why it exists" over a heading that asks why it
            exists is a label on something already labelled, and the section
            has one job — the argument arrives faster without it. */}
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          {/* Seven of twelve columns. The heading is the loudest thing on the
              page after the wordmark itself, and it is left-aligned so the
              rag falls where the reading starts. */}
          <h2 className="fwd-rise fwd-statement col-span-full text-ink lg:col-span-7">
            <MarkedText text={CASE.heading} style="circle" />
          </h2>

          {/* Four of twelve, starting at nine: the gap between the two is the
              composition. */}
          <div className="col-span-full space-y-6 lg:col-span-4 lg:col-start-9 lg:self-end">
            {CASE.body.map((line) => (
              <p key={line} className="fwd-reveal fwd-body text-ink-muted">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
