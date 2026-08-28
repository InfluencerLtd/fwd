import type { Metadata } from "next";
import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { BenefitStrip } from "@/components/benefit-strip";
import { MembershipCards } from "@/components/membership-cards";
import { ApplyPanel } from "@/components/apply-panel";
import { SignupForm } from "@/components/signup-form";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink } from "@/components/button";
import { APPLY, MEMBERSHIP_PAGE, META, NAV } from "@/content/site";
import { APPLICATIONS_OPEN } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `membership · ${META.title}`,
  description: MEMBERSHIP_PAGE.description,
};

/**
 * Where every "apply for membership" button on the home page leads.
 *
 * The shape follows the order somebody actually reads in: what this is and the
 * ask, the whole offer at a glance, the offer explained, what we will need from
 * you, the form, and finally the door for anybody who is already a member.
 *
 * The ask appears twice, once at the top for anybody who arrived already
 * decided, and once at the bottom in full. The form is on the page rather than
 * behind another click, because somebody who has read this far has said yes.
 */
export default function MembershipPage() {
  return (
    <>
      {/* ---- 1. A short dark top, so the page opens the way the site does -- */}
      <div className="fwd-on-dark">
        <PhotoPlaceholder
          label="A room mid-conversation. Low light, faces optional"
          name="membership"
          showLabel={false}
          sizes="100vw"
          ratio="fill"
          className="flex min-h-[52vh] flex-col justify-end"
        >
          <div className="relative z-2 mx-auto w-full max-w-4xl px-6 pb-14 pt-24">
            <Link href="/" aria-label={META.title} className="inline-block">
              <Wordmark size="footer" />
            </Link>
            {/* The standfirst sits beside the heading rather than under it,
                lined up on the baseline the letters sit on. Aligning the boxes
                instead would leave the small text visibly floating against a
                word this size. It wraps underneath on a narrow screen.

                text-photo-ink, not the default ink: this is on the dark
                photograph, and ink is the near-black for the light page, so it
                would have been black type on a black picture. */}
            <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h1 className="text-5xl text-photo-ink sm:text-6xl">
                {MEMBERSHIP_PAGE.heading}
              </h1>
              <p className="font-body text-lg leading-relaxed text-photo-ink/85">
                {MEMBERSHIP_PAGE.intro}
              </p>
            </div>

            {/* The page is long now, so the ask is here as well as at the
                bottom. It jumps rather than navigates: the form is already on
                this page. */}
            <div className="mt-9">
              <ButtonLink href="#apply" variant="onDark" size="lg">
                {APPLY.cta}
              </ButtonLink>
            </div>
          </div>
        </PhotoPlaceholder>
      </div>

      <main id="main">
        {/* ---- 2. The whole offer at a glance ---------------------------- */}
        <BenefitStrip />

        {/* ---- 3. The same offer, explained ------------------------------ */}
        <section className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="fwd-reveal text-4xl sm:text-5xl">
              {MEMBERSHIP_PAGE.benefits.heading}
            </h2>
            <p className="fwd-reveal mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-ink-muted">
              {MEMBERSHIP_PAGE.benefits.lead}
            </p>
            <MembershipCards />
          </div>
        </section>

        {/* ---- 4. Ready to apply ----------------------------------------- */}
        <div className="bg-surface-warm">
          <section id="apply" className="px-6 py-24 sm:py-28">
            <div className="mx-auto max-w-4xl">
              <h2 className="fwd-reveal text-4xl sm:text-5xl">
                {APPLICATIONS_OPEN
                  ? MEMBERSHIP_PAGE.ready.heading
                  : MEMBERSHIP_PAGE.closed.heading}
              </h2>

              {APPLICATIONS_OPEN ? (
                <>
                  {/* How long this will take comes before what it will ask
                      for. Somebody deciding whether to start wants the size of
                      the job first, and the list second. */}
                  <p className="fwd-reveal mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-ink-muted">
                    {MEMBERSHIP_PAGE.ready.note}
                  </p>

                  <div className="fwd-reveal mt-10 max-w-2xl rounded-2xl border border-border bg-surface-raised p-7">
                    <h3 className="font-body text-sm tracking-[0.14em] text-ink-muted">
                      {MEMBERSHIP_PAGE.ready.needHeading}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {MEMBERSHIP_PAGE.ready.need.map((item) => (
                        <li
                          key={item}
                          className="font-body text-[15px] leading-relaxed text-ink"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <h3 className="fwd-reveal mt-16 text-2xl">
                    {MEMBERSHIP_PAGE.paths.heading}
                  </h3>
                  <p className="fwd-reveal mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-ink-muted">
                    {MEMBERSHIP_PAGE.paths.lead}
                  </p>
                  <div className="fwd-reveal mt-8">
                    <ApplyPanel />
                  </div>
                </>
              ) : (
                <div className="fwd-reveal mt-8 max-w-xl">
                  <p className="font-body text-[17px] leading-relaxed text-ink-muted">
                    {MEMBERSHIP_PAGE.closed.intro}
                  </p>
                  <div className="mt-8">
                    <SignupForm source="waitlist" tone="light" />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ---- 5. The door for anybody who is already in ------------------ */}
        <section className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="fwd-reveal text-4xl sm:text-5xl">
              {MEMBERSHIP_PAGE.member.heading}
            </h2>
            <p className="fwd-reveal mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-ink-muted">
              {MEMBERSHIP_PAGE.member.lead}
            </p>
            <div className="fwd-reveal mt-9">
              {/* NAV.signIn, not the footer's shorter label. A button this
                  size, on its own at the end of the page, can say where it
                  goes. */}
              <ButtonLink href="/clubhouse" variant="quiet" size="lg">
                {NAV.signIn}
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
