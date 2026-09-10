import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Circled, MarkedText, plainText } from "@/components/marked";
import { ABOUT_PAGE } from "@/content/pages";
import { IMAGERY } from "@/content/site";

export const metadata: Metadata = {
  title: ABOUT_PAGE.title,
  description: plainText(ABOUT_PAGE.lead[0]),
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
    <PageShell>
      {/* ---- The argument, as the opening ------------------------------- */}
      <div data-hero className="fwd-on-dark">
        <PhotoPlaceholder
          label={IMAGERY.aboutOpening}
          name="about"
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
            {/* normal-case WITH A !, because this is an h1 now. The site-wide
                h1–h4 rule that lowercases headings is plain CSS, and plain CSS
                outranks a utility — on a <p> it never applied, as an h1 it
                turned "Bringing" into "bringing". !important is the one thing
                that reaches past it. */}
            <h1 className="fwd-enter fwd-h2 max-w-5xl normal-case! text-photo-ink">
              {/* One mark, on "shaping", and it is a decision taken in the
                  content file rather than here. On the photograph the blue is
                  13.4:1, so this is the one place on the site the device is at
                  full strength. */}
              <MarkedText text={opening} dot />
            </h1>
          </div>
        </div>
        </PhotoPlaceholder>
      </div>

      {/* ---- The claim, then the detail of it ---------------------------
           THREE PARAGRAPHS OF THE SAME SIZE IN ONE COLUMN IS NOT A SECTION,
           it is a block of text, and the reader has nothing to go on about
           which line matters. So the section now has two voices: the claim at
           heading size across the top, and the two paragraphs that are its
           detail underneath in the body face, as a pair of columns rather than
           a single stack.

           THE CLAIM HOLDS THE LEFT, THE DETAIL RUNS DOWN THE RIGHT. Reading it
           is a diagonal rather than a column: the eye takes the big line, then
           drops to the paragraphs beside it. The gap between the two columns
           is what makes them read as claim and gloss rather than as two
           paragraphs that happen to be different sizes. */}
      <section className="fwd-section px-6">
        <div className="mx-auto grid max-w-6xl gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          {/* normal-case for the same reason as the opening: the heading
              scale lowercases what it is given, which is right for a heading
              and wrong for a sentence with "This" at the front of it. */}
          <p className="fwd-reveal fwd-h2 col-span-full normal-case lg:col-span-6">
            <MarkedText text={ABOUT_PAGE.statement} dot />
          </p>

          {/* Starting at 8 rather than 7 leaves a column of air between the
              two, so the right-hand text is beside the claim rather than
              butted against it. */}
          <div className="col-span-full space-y-6 lg:col-span-5 lg:col-start-8">
            {rest.map((paragraph) => (
              <p
                key={paragraph}
                className="fwd-reveal fwd-body whitespace-pre-line text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* ---- Who is in it, in three ---------------------------------
               THE THREE SIT UNDER THE CLAIM RATHER THAN AT THE END OF THE
               PAGE. "This is where the creator economy comes together" is a
               sentence about a room, and the three are who is in that room, so
               they belong on the same breath as the claim rather than four
               sections later. They are inside this section, not a section of
               their own: two off-white blocks in a row read as one section
               with an accidental gap in it.

               A COLUMN EACH. All three were briefly on one line over the
               photograph at the top of this page; apart, each reads as its own
               group. (They carried drawn circles until 10 September 2026; the
               marks came out site-wide, see marked.tsx.)

               NO RULE OVER EACH ONE. There was one, borrowed from the pillars
               on the dark section below, and three hairlines across an
               otherwise open page drew more attention than the three phrases
               under them. The space is the separation.

               THE LIST IS NARROWER THAN THE SECTION IT SITS IN, AND CENTRED
               IN IT. Three equal thirds of the full width put a hand's width
               of empty page between each phrase and the next, and three things
               that far apart stop reading as one set. Held to max-w-4xl and
               centred, they are a group with even air either side of it rather
               than three lines spread across the screen — and the middle of
               the block is the middle of the page, which is the axis the
               header lockup and every centred close on the site already sit
               on. The type inside each column stays left-aligned: it is
               reading, not a caption. */}
          <ul className="fwd-stagger col-span-full mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-12 sm:mt-16 sm:grid-cols-3">
            {ABOUT_PAGE.forWhom.map((item) => (
              <li key={item.name} className="fwd-reveal">
                {/* Not a heading. Three of these are a list of who is in the
                    room, not a structure anybody should be able to navigate
                    by — and they keep their capitals, which a heading here
                    would take away. */}
                <p className="fwd-standfirst text-ink">
                  <Circled>{item.name}</Circled>
                </p>
                <p className="mt-5 max-w-[28ch] font-body text-[15px] leading-relaxed text-ink-muted">
                  {item.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Why it is called Forward -----------------------------------
           The only place on the site that explains the name, and the only
           place that uses the wider frame — culture, creativity, media and
           influence rather than the creator economy. Everything that has to
           convert or be searched for stays on the narrower, more specific
           claim; the ambition lives one click in, where somebody has already
           chosen to find out what this is. */}
      <section className="fwd-dark fwd-on-dark fwd-grain fwd-section px-6">
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
      <section className="fwd-section bg-surface-alt px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="fwd-reveal fwd-h2">{ABOUT_PAGE.how.heading}</h2>

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

      {/* NO CLOSE ON THIS PAGE. Every other page ends on the shared "ready to
          apply" block and this one deliberately does not: it ended on "who it
          is for" over a paragraph that said who it is for, three sections
          after the three columns that answer the same question. The page ends
          on how it works, and the ask is in the bar at the top of the screen
          the whole way down. */}
    </PageShell>
  );
}
