import { ButtonLink, buttonClass } from "@/components/button";
import { BriefingSubmitDialog } from "@/components/briefing-submit-dialog";
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
            <p className="fwd-reveal fwd-eyebrow text-ink-muted">
              {BRIEFING_SUBMIT.eyebrow}
            </p>
            <h2 className="fwd-reveal fwd-h2 mt-5">
              {BRIEFING_SUBMIT.heading}
            </h2>
          </div>

          <div>
            <p className="fwd-reveal fwd-body max-w-xl text-ink-muted">
              {BRIEFING_SUBMIT.body}
            </p>

            <div className="fwd-reveal mt-8 flex flex-wrap gap-3">
              {/* Shaped by the same code as every other primary button, so it
                  cannot drift away from them. */}
              <BriefingSubmitDialog className={buttonClass("primary")} />
              {/* TODO: "ask the room" still goes nowhere. Where it should go
                  has not been decided — it is a different thing from sending
                  something in, and it may not be a form at all. */}
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
