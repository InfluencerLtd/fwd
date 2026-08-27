import { Hero } from "@/components/hero";
import { Section, Prose } from "@/components/section";
import { MembershipCards } from "@/components/membership-cards";
import { ApplyForm } from "@/components/apply-form";
import { SignupForm } from "@/components/signup-form";
import { SiteFooter } from "@/components/site-footer";
import { DraftCopyMarker } from "@/components/draft-copy-marker";
import {
  ABOUT,
  MEMBERSHIP,
  MEETING_OF_MINDS,
  WHY,
  APPLY,
  NAV,
} from "@/content/site";
import { APPLICATIONS_OPEN } from "@/lib/site-config";

/**
 * The full public site: one page, scrolling, in the order the brief sets out.
 *
 *   hero, what the club is, what membership includes, meeting of minds,
 *   why it exists, apply, footer.
 */
export function PublicSite() {
  const apply = APPLICATIONS_OPEN ? APPLY.open : APPLY.closed;

  return (
    <>
      {/* The first thing a keyboard or screen reader user reaches, so they can
          jump past the hero straight into the page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-surface-raised focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-ink"
      >
        {NAV.skipToContent}
      </a>

      <Hero />

      <main id="main">
        <Section id="about" heading={ABOUT.heading}>
          <Prose lines={ABOUT.body} />
        </Section>

        {/* Meeting of Minds gets its own moment, pulled out of the card grid
            and set on the dark ground so it carries more weight than the cards
            that follow it. */}
        <div className="fwd-on-dark bg-photo-ground">
          <div className="fwd-grain">
            <div className="relative z-1">
              <Section id="meeting-of-minds">
                <p className="fwd-reveal font-body text-xs tracking-[0.2em] text-photo-ink/50">
                  the signature benefit
                </p>
                <h2 className="fwd-reveal mt-5 text-4xl text-accent-on-dark sm:text-5xl">
                  {MEETING_OF_MINDS.heading}
                </h2>
                <p className="fwd-reveal mt-8 max-w-2xl font-display text-2xl leading-snug text-photo-ink sm:text-3xl">
                  {MEETING_OF_MINDS.standfirst}
                </p>
                <div className="fwd-reveal mt-8 max-w-2xl space-y-5">
                  {MEETING_OF_MINDS.body.map((line) => (
                    <p
                      key={line}
                      className="font-body text-lg leading-relaxed text-photo-ink/75"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </Section>
            </div>
          </div>
        </div>

        <Section id="membership" heading={MEMBERSHIP.heading}>
          <p className="fwd-reveal mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-muted">
            {MEMBERSHIP.intro}
          </p>
          <MembershipCards />
        </Section>

        <Section id="why" heading={WHY.heading} className="border-t border-border">
          <Prose lines={WHY.body} />
        </Section>

        <Section id="apply" heading={apply.heading} className="border-t border-border">
          <p className="fwd-reveal mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-muted">
            {apply.intro}
          </p>

          {APPLICATIONS_OPEN ? (
            <ApplyForm />
          ) : (
            <div className="fwd-reveal mt-10 max-w-xl">
              <SignupForm source="waitlist" tone="light" />
            </div>
          )}
        </Section>
      </main>

      <SiteFooter />
      <DraftCopyMarker />
    </>
  );
}
