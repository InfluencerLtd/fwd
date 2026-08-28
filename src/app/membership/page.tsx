import type { Metadata } from "next";
import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { BenefitTiles } from "@/components/benefit-tiles";
import { ApplyDialog } from "@/components/apply-dialog";
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
 * The shape: what this is, the ask, the offer, and the door for anybody who is
 * already a member.
 *
 * THE ASK COMES BEFORE THE OFFER, which is the wrong way round for a page that
 * has to persuade and the right way round for this one. Nobody arrives here
 * cold: every route in is a button on the home page that already said "apply
 * for membership". They have decided. The form is one press away from where
 * they land, and the pictures are underneath for anybody who wants to look
 * before they do.
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

            {/* The only ask on the page, and it opens the form rather than
                scrolling to it. It used to jump to a button further down, which
                stopped making sense once that section moved up to sit directly
                underneath this one: it was a button that scrolled you almost
                nowhere, to a second button saying the same thing. */}
            <div className="mt-9">
              <ApplyDialog
                label={APPLY.cta}
                className="fwd-btn bg-accent-on-dark px-8 py-3.5 font-body text-base text-photo-ground hover:bg-photo-ink"
              />
            </div>
          </div>
        </PhotoPlaceholder>
      </div>

      <main id="main">
        {/* ---- 2. Ready to apply ----------------------------------------- */}
        <div className="bg-surface-warm">
          <section id="apply" className="px-6 py-24 sm:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="fwd-reveal text-4xl sm:text-5xl">
                {APPLICATIONS_OPEN
                  ? MEMBERSHIP_PAGE.ready.heading
                  : MEMBERSHIP_PAGE.closed.heading}
              </h2>

              {APPLICATIONS_OPEN ? (
                <p className="fwd-reveal mx-auto mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-ink-muted">
                  {MEMBERSHIP_PAGE.ready.note}
                </p>
              ) : (
                <div className="fwd-reveal mx-auto mt-8 max-w-xl">
                  <p className="font-body text-[17px] leading-relaxed text-ink-muted">
                    {MEMBERSHIP_PAGE.closed.intro}
                  </p>
                  {/* Back to the left. A centred heading is a heading; centred
                      field labels and error messages are just hard to read. */}
                  <div className="mt-8 text-left">
                    <SignupForm source="waitlist" tone="light" />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ---- 3. The whole offer at a glance ---------------------------- */}
        <BenefitTiles />

        {/* ---- 5. The door for anybody who is already in ------------------ */}
        <section className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="fwd-reveal text-4xl sm:text-5xl">
              {MEMBERSHIP_PAGE.member.heading}
            </h2>
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
