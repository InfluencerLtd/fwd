import { Hero } from "@/components/hero";
import { SiteMenu } from "@/components/site-menu";
import { SiteHeader } from "@/components/site-header";
import { Section } from "@/components/section";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoBand } from "@/components/photo-band";
import { ApplyLink } from "@/components/apply-link";
import { MarkedText } from "@/components/marked";
import { TheCase } from "@/components/the-case";
import { BriefingSubmit } from "@/components/briefing-submit";
import { PageClose } from "@/components/page-close";
import { SiteFooter } from "@/components/site-footer";
import {
  MEMBERSHIP,
  MEETING_OF_MINDS,
  NAV,
  IMAGERY,
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

        {/* ---- 3. What membership is ------------------------------------
             Left-aligned, and the two paragraphs run as a pair of columns
             beneath the heading rather than as a centred stack. That is a
             different composition from the section above on purpose: two big
             left-aligned headings with a right-hand column each would read as
             one section repeated. Here the heading is the only thing on its
             line and the reading happens underneath it. */}
        <section id="membership" className="fwd-section scroll-mt-20 px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="fwd-reveal fwd-h2 max-w-4xl">{MEMBERSHIP.heading}</h2>

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

        {/* ---- 4. The band of photographs. Left exactly as it was. ------- */}
        <PhotoBand />

        {/* ---- 5. Meeting of Minds --------------------------------------
             Where Soho House puts the festival: the one thing that is theirs
             and nobody else's. For fwd. that is the introductions. */}
        <div className="bg-surface-alt">
          <Section id="meeting-of-minds">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="fwd-zoom fwd-reveal order-2 overflow-hidden rounded-2xl lg:order-1">
                <PhotoPlaceholder
                  label={IMAGERY.meetingOfMinds}
                  name="meeting-of-minds"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  ratio="square"
                  className="fwd-zoom-inner"
                  showLabel={false}
                />
              </div>

              <div className="order-1 lg:order-2">
                {/* ON ONE LINE. Three words broke across two in the right-hand
                    column, and "minds" alone on a line under "meeting of" is
                    the heading reading as a stumble. It holds at every width
                    the site has: at the 34px floor the phrase is about 250px
                    against 327px of usable width on a 375px phone, and the
                    column only gets wider from there. */}
                <h2 className="fwd-reveal fwd-h2 whitespace-nowrap">
                  {MEETING_OF_MINDS.heading}
                </h2>
                <p className="fwd-reveal fwd-standfirst mt-7 text-ink">
                  <MarkedText text={MEETING_OF_MINDS.standfirst} />
                </p>
                <div className="fwd-reveal mt-7 space-y-5">
                  {MEETING_OF_MINDS.body.map((line) => (
                    <p key={line} className="fwd-body text-ink-muted">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="fwd-reveal mt-10">
                  <ApplyLink />
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* ---- 6. Most of it comes from the room ------------------------- */}
        <BriefingSubmit />

        {/* ---- 7. The close ---------------------------------------------
             The same component every other page closes on, at the larger
             scale. It used to be a component of its own, which is how it
             ended up with a mask two revisions behind everyone else's. */}
        <PageClose
          heading={WAY_IN.heading}
          note={WAY_IN.note}
          photo="closing"
          photoBrief={IMAGERY.statement}
        />
      </main>

      {/* ---- 8. The footer --------------------------------------------- */}
      <SiteFooter />
    </>
  );
}
