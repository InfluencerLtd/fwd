import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageClose } from "@/components/page-close";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { TablePlan } from "@/components/table-plan";
import { ABOUT_PAGE } from "@/content/pages";
import { IMAGERY } from "@/content/site";

export const metadata: Metadata = {
  title: ABOUT_PAGE.title,
  description: ABOUT_PAGE.lead[0],
};

/**
 * What it is — the manifesto page.
 *
 * It was /club, and the word has gone from the site: brand.ts forbids it
 * anywhere a visitor can read, and the positioning document rejected "The
 * Social Club" for describing the format rather than the ambition.
 *
 * IT OPENS ON A PHOTOGRAPH WITH THE HERO'S SCRIM — a pool of darkness under
 * the type only, rather than a flat wash over the frame. It used to open on
 * flat near-black with no picture at all, which was its distinguishing feature
 * and is no longer: what makes it itself now is the composition below, and the
 * fact that the writing rather than the name is what arrives first.
 *
 * The rest is a narrow column with a great deal of space to the right of it.
 * That emptiness is the point: a page that is confident about what it has to
 * say does not need to fill the width.
 */
export default function ClubPage() {
  const [opening, ...rest] = ABOUT_PAGE.lead;

  return (
    <PageShell footer="light">
      {/* ---- The argument, as the opening ------------------------------- */}
      <div data-hero className="fwd-on-dark">
        <PhotoPlaceholder
          label={IMAGERY.aboutOpening}
          /**
           * A STAND-IN. There is no `about` photograph yet, and a name with no
           * file behind it falls back to the warm placeholder gradient — which
           * has a slow drifting glow in it and reads as a design element
           * rather than as a missing picture.
           *
           * This is the room-from-above shot, which is the closest thing we
           * own to the brief in IMAGERY.aboutOpening. It is also on the home
           * page, at a quarter of this size and square, so the two are not
           * obviously the same photograph — but they are, and that is a reason
           * to shoot this one rather than a reason to leave it.
           *
           * Change to "about" the moment the real file lands.
           */
          name="meeting-of-minds"
          showLabel={false}
          sizes="100vw"
          ratio="fill"
          /* The placeholder's own flat wash is off. The scrim below does the
             darkening, under the type only, exactly as on the hero. */
          scrim={false}
          className="flex min-h-[62vh] flex-col justify-end px-6 pb-20 pt-40 sm:pb-28"
        >
        {/* A GRADIENT UP FROM THE BOTTOM, NOT THE HERO'S RADIAL POOL.
            The scrim works on the hero because the mark there is a compact
            block in the middle of the frame, so a soft ellipse covers it. Here
            the type is four wide lines anchored to the bottom left, and an
            ellipse either misses the ends of the lines or has to be so large
            it darkens the whole photograph anyway. A gradient rising from the
            edge the type sits on is the right shape for the type that is
            actually there — the same device the hero strip already uses along
            its own bottom. */}
        {/* TWO LAYERS, AND THE FLAT ONE IS NOT A FAILURE OF NERVE. Measured
            with the real photograph behind it, the gradient alone left the
            worst point behind the heading at 3.07:1 — which technically clears
            the 3:1 large text has to meet and visibly loses the type against
            the bright shirt at the top right. A gradient can only be as strong
            as its darkest end, and its darkest end is at the bottom, which is
            not where the trouble is.

            So: a light even wash to put a floor under the whole frame, and the
            gradient on top of it doing the work at the edge the type sits on.
            The wash is deliberately light — it darkens the photograph rather
            than flattening it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1 bg-black/[0.32]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-[86%] bg-gradient-to-t from-black/[0.82] via-black/[0.5] to-transparent"
        />
        <div className="relative z-2 mx-auto w-full max-w-6xl">
          {/* No eyebrow. It said "what it is" over a paragraph that says what
              it is, and the navigation item three inches above says it too. */}
          {/* HEADING SCALE, NOT STATEMENT SCALE, and `normal-case` on top of
              it. Both are corrections to the obvious version of this page.

              The statement size is built for six or seven words. This is a
              paragraph of about thirty, and at 148px it ran off the bottom of
              the screen — the size has to answer to the copy rather than the
              other way round.

              `normal-case` because the statement and heading classes lowercase
              what they are given, which is right for a heading and wrong for
              prose: it turned "The brands. The creators. The platforms." into
              three lowercase fragments. Utilities beat the type scale's own
              layer, which is why this works and why the scale was put in
              @layer components in the first place.

              Not an h1 either: the page's one main heading is "how it works"
              below. */}
          <div className="relative inline-block">
            {/* No delay: with the eyebrow gone there is nothing for it to
                arrive after, and a page opening on a quarter-second of empty
                screen is not a page opening. */}
            <p className="fwd-enter fwd-h2 max-w-5xl normal-case text-photo-ink">
              {opening}
            </p>
          </div>
        </div>
        </PhotoPlaceholder>
      </div>

      {/* ---- The rest of it, held to the left --------------------------- */}
      <section className="px-6 py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-y-6 lg:grid-cols-12">
          <div className="col-span-full space-y-6 lg:col-span-5">
            {rest.map((paragraph) => (
              <p
                key={paragraph}
                className="fwd-reveal fwd-body whitespace-pre-line text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* The room, drawn. It sits in the space this section was already
              holding open rather than the section growing to fit it. */}
          <div className="col-span-full lg:col-span-4 lg:col-start-8">
            <TablePlan />
          </div>
        </div>
      </section>

      {/* ---- Why it is called Forward -----------------------------------
           The only place on the site that explains the name, and the only
           place that uses the wider frame — culture, creativity, media and
           influence rather than the creator economy. Everything that has to
           convert or be searched for stays on the narrower, more specific
           claim; the ambition lives one click in, where somebody has already
           chosen to find out what this is. */}
      <section className="fwd-dark fwd-on-dark fwd-grain px-6 py-28 sm:py-36">
        <div className="relative z-1 mx-auto grid max-w-6xl gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <h2 className="fwd-reveal fwd-h2 col-span-full text-photo-ink lg:col-span-4">
            {ABOUT_PAGE.ambition.heading}
          </h2>

          <div className="col-span-full space-y-6 lg:col-span-6 lg:col-start-6">
            {ABOUT_PAGE.ambition.body.map((line) => (
              <p key={line} className="fwd-reveal fwd-body text-photo-ink/70">
                {line}
              </p>
            ))}
          </div>

          {/* The three it is built around. Not marked up as headings — they
              keep their capitals, and they are a list rather than a structure
              somebody should be able to navigate by. */}
          <ul className="fwd-stagger col-span-full mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-3 lg:col-start-6 lg:col-span-7">
            {ABOUT_PAGE.ambition.pillars.map((pillar) => (
              <li
                key={pillar}
                className="fwd-reveal fwd-standfirst border-t border-accent-on-dark/25 pt-5 text-accent-on-dark"
              >
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- How it works, as a numbered index -------------------------- */}
      <section className="bg-surface-alt px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h1 className="fwd-reveal fwd-h2">{ABOUT_PAGE.how.heading}</h1>

          <ol className="fwd-stagger mt-14 sm:mt-20">
            {ABOUT_PAGE.how.items.map((item, index) => (
              <li
                key={item.name}
                className="fwd-reveal grid gap-x-10 gap-y-3 border-t border-ink/15 py-9 md:grid-cols-12"
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

      <PageClose
        heading={ABOUT_PAGE.closing.heading}
        note={ABOUT_PAGE.closing.note}
        tone="light"
      />
    </PageShell>
  );
}
