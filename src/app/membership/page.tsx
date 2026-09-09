import type { Metadata } from "next";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoScrim } from "@/components/photo-scrim";
import { MarkedText } from "@/components/marked";
import { BenefitTiles } from "@/components/benefit-tiles";
import { ApplyDialog } from "@/components/apply-dialog";
import { SiteMenu } from "@/components/site-menu";
import { SiteHeader } from "@/components/site-header";
import { SignupForm } from "@/components/signup-form";
import { SiteFooter } from "@/components/site-footer";
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
      <SiteHeader overHero />
      <SiteMenu />

      {/* ---- 1. A short dark top, so the page opens the way the site does -- */}
      <div data-hero className="fwd-on-dark">
        <PhotoPlaceholder
          label="A room mid-conversation. Low light, faces optional"
          name="membership"
          showLabel={false}
          sizes="100vw"
          ratio="fill"
          className="flex min-h-[78vh] flex-col justify-end"
        >
          <div className="relative z-2 mx-auto w-full max-w-4xl px-6 pb-14 pt-24">
            {/* The page's name, not the wordmark. Every other page names
                itself here — the club, rooms, the class of 2026, the briefing
                — and this one showed the mark instead, which told somebody
                which site they were on and nothing about which page. The link
                home has not gone: it is the lockup at the top left of the
                header, on this page and on every other one.

                Not marked up as a heading, for the same reason as on those
                pages: the h1 is the section below, and this would make two.
                See the note on it. */}
            {/* The hero's scrim, at page-name size. Without it this is
                white type sitting on whatever the photograph happens to be,
                which is fine while the picture is a placeholder and stops
                being fine the moment a real one arrives. */}
            <div className="relative inline-block">
              <PhotoScrim />
              <p className="fwd-h2 font-display text-photo-ink">
                {MEMBERSHIP_PAGE.heading}
              </p>
            </div>
            {/* The members' door was here, and has gone with every other
                mention of the member area on the public site. Members are sent
                to The House rather than finding it. */}

          </div>
        </PhotoPlaceholder>
      </div>

      <main id="main">
        {/* ---- 2. What membership is -------------------------------------- */}
        <div className="bg-surface-alt">
          <section className="px-6 py-24 sm:py-28">
            <div className="mx-auto max-w-4xl text-center">
              {/* THIS IS THE PAGE'S h1. The name over the photograph is not
                  marked up as one — same as on every other page — so if this
                  were not here the page would have no main heading at all and
                  a screen reader jumping by heading would land in the middle
                  of it. Its size and weight are unchanged: this is what it is,
                  not how it looks. */}
              <h1 className="fwd-reveal fwd-h2">
                {APPLICATIONS_OPEN
                  ? MEMBERSHIP_PAGE.about.heading
                  : MEMBERSHIP_PAGE.closed.heading}
              </h1>

              {APPLICATIONS_OPEN ? (
                <>
                  <p className="fwd-reveal fwd-body mx-auto mt-6 max-w-2xl text-ink-muted">
                    <MarkedText text={MEMBERSHIP_PAGE.about.note} style="swoosh" />
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
        {/* 15px less top and bottom than the section pattern elsewhere.
            py-24 is 96 and py-28 is 112, so this is 81 and 97. */}
        <section className="px-6 py-[81px] sm:py-[97px]">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="fwd-reveal fwd-h2">
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
