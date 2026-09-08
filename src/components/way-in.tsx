import { ApplyDialog } from "@/components/apply-dialog";
import { APPLY, WAY_IN } from "@/content/site";

/**
 * The last thing before the footer.
 *
 * The page used to end on a section about a newsletter and then simply stop,
 * which is a strange note to leave somebody on when the only thing we want
 * them to do is apply.
 *
 * CENTRED, AND ALMOST NOTHING ELSE ALLOWED IN IT. Everything above this is
 * left-aligned, so symmetry here is not the default — it is a change of
 * posture, and it reads as one. One statement, one line, one button.
 *
 * The urgency is real or it is not there: the cohort genuinely closes when it
 * is full rather than on a date, and that is what the note says. A countdown
 * to a deadline nobody has set would be the one dishonest thing on the site.
 */
export function WayIn() {
  return (
    <section className="fwd-dark fwd-on-dark fwd-grain px-6 py-32 sm:py-44">
      <div className="relative z-1 mx-auto max-w-4xl text-center">
        <h2 className="fwd-reveal fwd-statement text-photo-ink">
          {WAY_IN.heading}
        </h2>
        <p className="fwd-reveal mx-auto mt-9 max-w-md font-body text-[15px] leading-relaxed text-photo-ink/65">
          {WAY_IN.note}
        </p>
        <div className="fwd-reveal mt-12">
          <ApplyDialog label={APPLY.cta} />
        </div>
      </div>
    </section>
  );
}
