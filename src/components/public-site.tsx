import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { MembershipCards } from "@/components/membership-cards";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoBand } from "@/components/photo-band";
import { ApplyLink } from "@/components/apply-link";
import { FloatingThemeToggle } from "@/components/floating-theme-toggle";
import { SiteFooter } from "@/components/site-footer";
import { MEMBERSHIP, MEETING_OF_MINDS, NAV, IMAGERY } from "@/content/site";

/**
 * The public site: one page, scrolling.
 *
 *   1  the hero            the picture, what this is, and the ask
 *   2  what membership     what it unlocks, then the ask again
 *      unlocks
 *   3  the photo band      untouched
 *   4  Meeting of Minds    the one thing nobody else does, then the ask again
 *   5  the footer
 *
 * The ask appears three times and the panel it opens is the same one each time.
 * Everything the brief asked to be on this page is still here: what the club is
 * now opens section two rather than standing alone, and why it exists frames
 * Meeting of Minds rather than being a section of its own. Fewer, longer
 * sections, each ending in something to do.
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

      {/* ---- 1. The hero ------------------------------------------------ */}
      <Hero />
      <FloatingThemeToggle watch="hero" />

      <main id="main">
        {/* ---- 2. What membership unlocks ------------------------------- */}
        <Section id="membership" heading={MEMBERSHIP.heading}>
          <div className="fwd-reveal mt-8 max-w-2xl space-y-5">
            {MEMBERSHIP.lead.map((line) => (
              <p
                key={line}
                className="font-body text-[17px] leading-relaxed text-ink-muted"
              >
                {line}
              </p>
            ))}
          </div>

          <p className="fwd-reveal mt-10 font-display text-2xl text-ink sm:text-3xl">
            {MEMBERSHIP.intro}
          </p>

          <MembershipCards />

          <div className="fwd-reveal mt-14">
            <ApplyLink />
          </div>
        </Section>

        {/* ---- 3. The band of photographs. Left exactly as it was. ------- */}
        <PhotoBand />

        {/* ---- 4. Meeting of Minds --------------------------------------
             Where Soho House puts the festival: the one thing that is theirs
             and nobody else's. For fwd. that is the introductions. */}
        <div className="bg-surface-warm">
          <Section id="meeting-of-minds">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="fwd-zoom fwd-reveal order-2 overflow-hidden rounded-2xl lg:order-1">
                <PhotoPlaceholder
                  label={IMAGERY.meetingOfMinds}
                  name="meeting-of-minds"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  ratio="square"
                  className="fwd-zoom-inner"
                />
              </div>

              <div className="order-1 lg:order-2">
                <p className="fwd-reveal font-body text-xs tracking-[0.2em] text-ember">
                  {MEETING_OF_MINDS.eyebrow}
                </p>
                <h2 className="fwd-reveal mt-5 text-4xl sm:text-5xl">
                  {MEETING_OF_MINDS.heading}
                </h2>
                <p className="fwd-reveal mt-7 font-display text-2xl leading-snug text-ink sm:text-3xl">
                  {MEETING_OF_MINDS.standfirst}
                </p>
                <div className="fwd-reveal mt-7 space-y-5">
                  {MEETING_OF_MINDS.body.map((line) => (
                    <p
                      key={line}
                      className="font-body text-[17px] leading-relaxed text-ink-muted"
                    >
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
      </main>

      {/* ---- 5. The footer --------------------------------------------- */}
      <SiteFooter />
    </>
  );
}
