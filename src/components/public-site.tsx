import { Hero } from "@/components/hero";
import { SiteMenu } from "@/components/site-menu";
import { SiteHeader } from "@/components/site-header";
import { ApplyLink } from "@/components/apply-link";
import { MarkedText } from "@/components/marked";
import { TheCase } from "@/components/the-case";
import { BriefingSubmit } from "@/components/briefing-submit";
import { PageClose } from "@/components/page-close";
import { SiteFooter } from "@/components/site-footer";
import {
  MEMBERSHIP,
  NAV,
  IMAGERY,
  NAME_STORY,
  WAY_IN,
} from "@/content/site";

/**
 * The public site: one page, scrolling.
 *
 *   1  the hero            photograph      the picture, and the name
 *   2  the case            near-black      why any of this needs to exist
 *   3  membership          off-white       what it gets you, then the ask
 *   4  the band            photography     texture
 *   5  the shape of it     off-white       four numbers, bare
*   6  Meeting of Minds    grey            the one thing nobody else does
 *   7  the briefing        off-white       the ask that is not "apply"
 *   8  the way in          near-black      the close
 *   9  the footer
 *
 * THE GROUND CHANGES SIX TIMES ON THE WAY DOWN, and that is the structure
 * rather than decoration. Before this the page was off-white almost the whole
 * way with a single photographic band in it, and a scroll with no change of
 * ground reads as one long document rather than as a sequence of rooms. Each
 * change is a page turn.
 *
 * WHY THE ARGUMENT COMES BEFORE THE OFFER. The page used to open with the
 * photograph and go straight to what membership unlocks, which sells a
 * solution to a problem nobody had named. Section two names it. Everything
 * after it is answering something.
 *
 * The ask appears four times and opens the same panel every time.
 */
export function PublicSite() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-surface-raised focus:px-5 focus:py-2 focus:font-body focus:text-sm focus:text-ink"
      >
        {NAV.skipToContent}
      </a>

      <SiteMenu />
      {/* The mark alone up here: the hero below carries the endorsement on
          this page. */}
      <SiteHeader overHero signature={false} />
      <Hero />

      <main id="main">
        {/* ---- 2. The case ---------------------------------------------- */}
        <TheCase />

        {/* ---- 2b. Why the name -----------------------------------------
             NEAR-BLACK, BETWEEN TWO LIGHT SECTIONS, so it reads as its own
             beat rather than as more of the argument above it. The words are
             the ones that were on /about (first-impression critique,
             14 September 2026): the name is what makes this stick, and it was
             on the second page. Short section, one idea, no button. */}
        <section className="fwd-dark fwd-on-dark fwd-grain fwd-section-compact px-6">
          <div className="relative z-1 mx-auto max-w-3xl text-center">
            <h2 className="fwd-reveal fwd-h2 text-photo-ink normal-case!">
              <MarkedText text={`${NAME_STORY.heading}.`} dot />
            </h2>
            <p className="fwd-reveal fwd-standfirst mt-7 text-photo-ink">
              {NAME_STORY.body[0]}
            </p>
            <p className="fwd-reveal fwd-body mt-5 text-photo-ink/70">
              {NAME_STORY.body[1]}
            </p>
          </div>
        </section>

        {/* ---- 3. What membership is ------------------------------------
             Left-aligned, and the two paragraphs run as a pair of columns
             beneath the heading rather than as a centred stack. That is a
             different composition from the section above on purpose: two big
             left-aligned headings with a right-hand column each would read as
             one section repeated. Here the heading is the only thing on its
             line and the reading happens underneath it. */}
        <section id="membership" className="fwd-section scroll-mt-20 px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="fwd-reveal fwd-h2 max-w-4xl normal-case!">{MEMBERSHIP.heading}</h2>

            <div className="mt-12 grid gap-x-16 gap-y-6 sm:mt-16 md:grid-cols-2">
              {/* whitespace-pre-line so a newline in the content file is a
                  line break here, and spaces still collapse. */}
              {MEMBERSHIP.lead.map((line) => (
                <p
                  key={line}
                  className="fwd-reveal fwd-body whitespace-pre-line text-ink-muted"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="fwd-reveal mt-14">
              <ApplyLink />
            </div>
          </div>
        </section>

        {/* ---- 4. THE BAND OF PHOTOGRAPHS IS OFF THE PAGE ----------------
             Taken off on 15 September 2026, kept rather than deleted: it is
             the drifting row of eight photographs with "Briefings",
             "Roundtables", "Introductions", "Dinners", "Guest lists",
             "Connections", "Small rooms" and "People worth meeting" along the
             bottom of each.

             Nothing about it has been dismantled. The component is still
             src/components/photo-band.tsx, its captions are still
             IMAGERY.bandCaptions and IMAGERY.bandLabel in
             src/content/site.ts, and the photographs are still band-1 to
             band-8 in public/photography. Putting it back is this one line:

                 <PhotoBand />

             The page runs the offer straight on to what follows it now, which
             is one change of ground fewer on the way down. */}

        {/* ---- 5. MEETING OF MINDS IS OFF THE HOME PAGE ------------------
             Taken off on 15 September 2026, kept rather than deleted: the
             square photograph, "The right introduction can change
             everything", the two paragraphs about how an introduction is
             made, and a button.

             Nothing is dismantled. The copy is still MEETING_OF_MINDS in
             src/content/site.ts and the photograph is still
             meeting-of-minds.jpg in public/photography.

             THE IDEA STILL HAS TWO HOMES. "A meeting of minds" is one of the
             three pillars on /about, and the Meeting of Minds tile on
             /membership carries the line about introductions with a reason
             attached. What the home page no longer says is that Forward is
             about bringing people together at all, which Sophie wants said
             somewhere: see the note in the same file's section 3. */}

        {/* ---- 6. Most of it comes from the room ------------------------- */}
        <BriefingSubmit />

        {/* ---- 7. The close ---------------------------------------------
             The same component every other page closes on, at the larger
             scale. It used to be a component of its own, which is how it
             ended up with a mask two revisions behind everyone else's. */}
        {/* NO LINE UNDER THE HEADING. It carried the application promise
            ("read by a person... we answer either way") for a day and came
            out on 15 September 2026: the close is an invitation, and the
            process belongs on the membership page rather than in front of the
            button. */}
        <PageClose
          heading={WAY_IN.heading}
          sentence
          photo="closing"
          photoBrief={IMAGERY.statement}
        />
      </main>

      {/* ---- 8. The footer --------------------------------------------- */}
      <SiteFooter />
    </>
  );
}
