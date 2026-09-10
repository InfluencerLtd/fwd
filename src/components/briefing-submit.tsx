import { buttonClass } from "@/components/button";
import { BriefingSubmitDialog } from "@/components/briefing-submit-dialog";
import { BRIEFING_SUBMIT } from "@/content/site";

/**
 * "What is actually changing?" — the contribute section.
 *
 * Two columns that read left to right: what this is on the left, what to do
 * about it on the right, both hanging from the same top line. One column below
 * 860px, which is where the heading and the paragraph stop having room to sit
 * beside each other rather than where a device boundary happens to be.
 *
 * NO EYEBROW AND NO RULE ACROSS THE TOP. The eyebrow said "the briefing" over
 * a heading about the briefing, and the rule was drawn to separate a section
 * that the change of subject already separates. What is left is the question,
 * the answer and the button — which is the whole section, and was always the
 * whole section.
 *
 * IT IS ON THE PAGE GROUND, NOT ON A DARK ONE. The brief specifies a near-black
 * panel (#111519) because it was written against a mock where the whole page is
 * black. This site is a light page with dark photography in it, and a black
 * band here would land between two light sections and read as a hole. The
 * space above and below is what separates it.
 *
 * THERE IS ONE BUTTON. "Put it to the members" sat beside it in the outlined
 * treatment and pointed at "#" — a control that looked like a control and did
 * nothing, waiting on a decision about where it should go that was never
 * taken. A section with one thing to press says what to do more clearly than
 * one with two, and half of one of them broken.
 */
export function BriefingSubmit({
  heading = BRIEFING_SUBMIT.heading,
  body = BRIEFING_SUBMIT.body,
}: {
  /**
   * On /briefing this section sits under a page already headed "the briefing"
   * and led by near enough the same paragraph, so it takes its own heading and
   * body there — see BRIEFING_SUBMIT.onBriefingPage. The home page uses the
   * defaults.
   */
  heading?: string;
  body?: string;
} = {}) {
  return (
    <section id="briefing" className="fwd-section scroll-mt-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 min-[860px]:grid-cols-2 min-[860px]:items-start min-[860px]:gap-16">
          <div>
            <h2 className="fwd-reveal fwd-h2">{heading}</h2>
          </div>

          <div>
            <p className="fwd-reveal fwd-body max-w-xl whitespace-pre-line text-ink-muted">
              {body}
            </p>

            <div className="fwd-reveal mt-8">
              {/* Shaped by the same code as every other primary button, so it
                  cannot drift away from them. */}
              <BriefingSubmitDialog className={buttonClass("primary")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
