import { ButtonLink } from "@/components/button";
import { BRIEFING_SUBMIT } from "@/content/site";

/**
 * "Most of it comes from the room" — the contribute section.
 *
 * Two columns that read left to right: what this is on the left, what to do
 * about it on the right, both hanging from the same top line. One column below
 * 860px, which is where the heading and the paragraph stop having room to sit
 * beside each other rather than where a device boundary happens to be.
 *
 * IT IS ON THE PAGE GROUND, NOT ON A DARK ONE. The brief specifies a near-black
 * panel (#111519) because it was written against a mock where the whole page is
 * black. This site is a light page with dark photography in it, and a black
 * band here would land between two light sections and read as a hole. The rule
 * along the top does the separating instead, which is the device the rest of
 * the site already uses.
 *
 * THE SECOND BUTTON IS NOT PALE BLUE, for the same reason nothing else on a
 * light ground is. #b1e3fc measures 1.27:1 against the page — see the note at
 * the top of globals.css. `quiet` is the outlined button for light grounds and
 * is the same pill, the same padding and the same radius as the primary.
 */
export function BriefingSubmit() {
  return (
    <section id="briefing" className="scroll-mt-20 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 border-t border-border pt-12 min-[860px]:grid-cols-2 min-[860px]:items-start min-[860px]:gap-16">
          <div>
            <p className="fwd-reveal font-body text-xs uppercase tracking-[0.16em] text-ink-muted">
              {BRIEFING_SUBMIT.eyebrow}
            </p>
            <h2 className="fwd-reveal mt-4 text-4xl sm:text-5xl">
              {BRIEFING_SUBMIT.heading}
            </h2>
          </div>

          <div>
            <p className="fwd-reveal max-w-xl font-body text-[17px] leading-relaxed text-ink-muted">
              {BRIEFING_SUBMIT.body}
            </p>

            <div className="fwd-reveal mt-8 flex flex-wrap gap-3">
              {/* TODO: both of these go nowhere. The first one opens the
                  submission form on the briefing-submit-form branch; the second
                  has no destination decided yet. */}
              <ButtonLink href="#" variant="primary">
                {BRIEFING_SUBMIT.send}
              </ButtonLink>
              <ButtonLink href="#" variant="quiet">
                {BRIEFING_SUBMIT.ask}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
