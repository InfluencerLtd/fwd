import type { Metadata } from "next";
import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { BenefitTiles } from "@/components/benefit-tiles";
import { ApplyDialog } from "@/components/apply-dialog";
import { SiteMenu } from "@/components/site-menu";
import { SignupForm } from "@/components/signup-form";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink } from "@/components/button";
import { APPLY, MEMBERSHIP_PAGE, META } from "@/content/site";
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
      <SiteMenu />

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
            {/* No signature here. This mark is a small link home above a very
                large heading, and "by influencer" at that size read as clutter
                rather than as an endorsement. It is still on the hero, the
                holding page and the footer. */}
            <Link href="/" aria-label={META.title} className="inline-block">
              <Wordmark size="footer" signature={false} />
            </Link>
            {/* text-photo-ink, not the default ink: this is on the dark
                photograph, and ink is the near-black for the light page, so it
                would have been black type on a black picture. */}
            <h1 className="mt-10 text-5xl text-photo-ink sm:text-6xl">
              {MEMBERSHIP_PAGE.heading}
            </h1>

            {/* Only the members' door up here. The ask sits under the
                paragraph below, next to the words that make the case for it,
                rather than above them. */}
            <div className="mt-9">
              <ButtonLink href="/clubhouse" variant="outlineOnDark" size="sm">
                {MEMBERSHIP_PAGE.logIn}
              </ButtonLink>
            </div>
          </div>
        </PhotoPlaceholder>
      </div>

      <main id="main">
        {/* ---- 2. What membership is -------------------------------------- */}
        <div className="bg-surface-warm">
          <section className="px-6 py-24 sm:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="fwd-reveal text-4xl sm:text-5xl">
                {APPLICATIONS_OPEN
                  ? MEMBERSHIP_PAGE.about.heading
                  : MEMBERSHIP_PAGE.closed.heading}
              </h2>

              {APPLICATIONS_OPEN ? (
                <>
                  <p className="fwd-reveal mx-auto mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-ink-muted">
                    {MEMBERSHIP_PAGE.about.note}
                  </p>
                  {/* The ask, directly under the case for it. Centred by the
                      text-center on the container. */}
                  <div className="fwd-reveal mt-10">
                    <ApplyDialog label={APPLY.cta} />
                  </div>
                </>
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

        {/* ---- 4. The ask again, after the pictures ----------------------- */}
        <section className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="fwd-reveal text-4xl sm:text-5xl">
              {MEMBERSHIP_PAGE.closing.heading}
            </h2>
            {/* The same dialog the header opens, not a second form. Somebody
                persuaded by the pictures should not have to scroll back up to
                act on it. */}
            <div className="fwd-reveal mt-9">
              <ApplyDialog label={APPLY.cta} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
