import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoScrim } from "@/components/photo-scrim";
import { ApplyDialog } from "@/components/apply-dialog";
import { APPLY, IMAGERY, WAY_IN } from "@/content/site";

/**
 * The last thing before the footer.
 *
 * IT NOW BOOKENDS THE PAGE. The home page opens on a photograph with a soft
 * pool of darkness under the type, and it closes on one — the same treatment,
 * a different room, and nothing else in between uses it. That is the reason it
 * is worth doing: a device that appears at the top and the bottom and nowhere
 * else reads as a frame around the page. A device used in every section is a
 * texture, and by the fourth time nobody sees it.
 *
 * The flat near-black is still what the middle of the page uses — the case
 * section is unchanged — so there are two kinds of dark here, photographic and
 * plain, and they are doing different jobs.
 *
 * CENTRED, AND ALMOST NOTHING IN IT. Everything above is left-aligned, so
 * symmetry here is not the default, it is a change of posture. One statement,
 * one line, one button.
 *
 * The urgency is real or it is not there: the cohort genuinely closes when it
 * is full rather than on a date, and that is what the note says. A countdown
 * to a deadline nobody has set would be the one dishonest thing on the site.
 */
export function WayIn() {
  return (
    <div className="fwd-on-dark">
      <PhotoPlaceholder
        label={IMAGERY.statement}
        name="closing"
        showLabel={false}
        sizes="100vw"
        ratio="fill"
        /* The placeholder's own wash is off: the scrim below does the
           darkening, in the one place it is needed, exactly as on the hero. */
        scrim={false}
        className="flex min-h-[74vh] flex-col justify-center px-6 py-28"
      >
        <div className="relative z-2 mx-auto w-full max-w-4xl text-center">
          <div className="relative inline-block">
            <PhotoScrim size="lockup" />
            <h2 className="fwd-rise fwd-statement text-photo-ink">
              {WAY_IN.heading}
            </h2>
          </div>

          <p className="fwd-reveal mx-auto mt-9 max-w-md font-body text-[15px] leading-relaxed text-photo-ink/75">
            {WAY_IN.note}
          </p>
          <div className="fwd-reveal mt-12">
            <ApplyDialog label={APPLY.cta} />
          </div>
        </div>
      </PhotoPlaceholder>
    </div>
  );
}
