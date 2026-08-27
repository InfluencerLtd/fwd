import { Hero } from "@/components/hero";
import { FloatingThemeToggle } from "@/components/floating-theme-toggle";
import { Section, Prose } from "@/components/section";
import { MembershipCards } from "@/components/membership-cards";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoBand } from "@/components/photo-band";
import { ApplyDialog } from "@/components/apply-dialog";
import { SignupForm } from "@/components/signup-form";
import { SiteFooter } from "@/components/site-footer";
import {
  ABOUT,
  MEMBERSHIP,
  MEETING_OF_MINDS,
  STATEMENT,
  WHY,
  APPLY,
  NAV,
  IMAGERY,
} from "@/content/site";
import { APPLICATIONS_OPEN } from "@/lib/site-config";

/**
 * The full public site: one page, scrolling.
 *
 * The rhythm alternates warm light grounds with photography, so no single
 * stretch is all text or all dark. Meeting of Minds now sits on the warm sand
 * ground beside a photograph rather than in a black box, which is what was
 * making the middle of the page feel heavy.
 */
export function PublicSite() {
  const apply = APPLICATIONS_OPEN ? APPLY.open : APPLY.closed;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-surface-raised focus:px-5 focus:py-2 focus:font-body focus:text-sm focus:text-ink"
      >
        {NAV.skipToContent}
      </a>

      <Hero />
      <FloatingThemeToggle watch="hero" />

      <main id="main">
        {/* ---- What fwd. is, with photography alongside ------------------
             The heading sits INSIDE the left column rather than above the whole
             section, so the words and the pictures can be centred against each
             other. With the heading above the grid, centring the paragraphs
             would have left it stranded at the top on its own. */}
        <Section id="about">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <h2 className="fwd-reveal text-4xl sm:text-5xl">{ABOUT.heading}</h2>
              <Prose lines={ABOUT.body} />
            </div>

            <div className="fwd-reveal grid grid-cols-2 gap-4">
              <div className="fwd-zoom col-span-2 overflow-hidden rounded-2xl">
                <PhotoPlaceholder
                  label={IMAGERY.aboutWide}
                  ratio="landscape"
                  className="fwd-zoom-inner"
                />
              </div>
              <div className="fwd-zoom overflow-hidden rounded-2xl">
                <PhotoPlaceholder
                  label={IMAGERY.aboutTall}
                  ratio="square"
                  className="fwd-zoom-inner"
                />
              </div>
              <div className="fwd-zoom overflow-hidden rounded-2xl">
                <PhotoPlaceholder
                  label={IMAGERY.aboutDetail}
                  ratio="square"
                  className="fwd-zoom-inner"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ---- The band of photographs that drifts sideways --------------- */}
        <PhotoBand />

        {/* ---- Meeting of Minds, on warm sand rather than in a black box -- */}
        <div className="bg-surface-warm">
          <Section id="meeting-of-minds">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="fwd-zoom fwd-reveal order-2 overflow-hidden rounded-2xl lg:order-1">
                <PhotoPlaceholder
                  label={IMAGERY.meetingOfMinds}
                  ratio="square"
                  className="fwd-zoom-inner"
                />
              </div>

              <div className="order-1 lg:order-2">
                <p className="fwd-reveal font-body text-xs tracking-[0.2em] text-ember">
                  the signature benefit
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
              </div>
            </div>
          </Section>
        </div>

        {/* ---- Membership ------------------------------------------------- */}
        <Section id="membership" heading={MEMBERSHIP.heading}>
          <p className="fwd-reveal mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-muted">
            {MEMBERSHIP.intro}
          </p>
          <MembershipCards />
        </Section>

        {/* ---- A statement over a photograph ------------------------------ */}
        <div className="fwd-on-dark">
          <PhotoPlaceholder
            label={IMAGERY.statement}
            ratio="fill"
            showLabel={false}
            className="flex min-h-[62vh] items-center"
          >
            <div className="relative z-2 mx-auto w-full max-w-4xl px-6 py-24">
              <p className="fwd-reveal max-w-3xl font-display text-3xl leading-tight text-accent-on-dark sm:text-4xl lg:text-5xl">
                {STATEMENT.line}
              </p>
            </div>
          </PhotoPlaceholder>
        </div>

        {/* ---- Why it exists ---------------------------------------------- */}
        <Section id="why" heading={WHY.heading}>
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[0.85fr_1fr]">
            <div className="fwd-zoom fwd-reveal overflow-hidden rounded-2xl">
              <PhotoPlaceholder
                label={IMAGERY.why}
                ratio="landscape"
                className="fwd-zoom-inner"
              />
            </div>
            <Prose lines={WHY.body} className="mt-0" />
          </div>
        </Section>

        {/* ---- Apply, on the warm ground ---------------------------------- */}
        <div className="bg-surface-warm">
          <Section id="apply" heading={apply.heading}>
            <p className="fwd-reveal mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-muted">
              {apply.intro}
            </p>

            {APPLICATIONS_OPEN ? (
              <ApplyDialog />
            ) : (
              <div className="fwd-reveal mt-10 max-w-xl">
                <SignupForm source="waitlist" tone="light" />
              </div>
            )}
          </Section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
