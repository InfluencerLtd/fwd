import type { Metadata } from "next";
import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { MembershipCards } from "@/components/membership-cards";
import { ApplyPanel } from "@/components/apply-panel";
import { SignupForm } from "@/components/signup-form";
import { SiteFooter } from "@/components/site-footer";
import { MEMBERSHIP_PAGE, META } from "@/content/site";
import { APPLICATIONS_OPEN } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `membership · ${META.title}`,
  description: MEMBERSHIP_PAGE.description,
};

/**
 * Where every "apply for membership" button on the home page leads.
 *
 * The shape: what it is, what it gets you, which of the two you are, what you
 * will need to hand, then the form. The form is on the page rather than behind
 * another click, because somebody who has come this far has already said yes.
 */
export default function MembershipPage() {
  return (
    <>
      {/* ---- A short dark top, so the page opens the way the site does ---- */}
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
          </div>
        </PhotoPlaceholder>
      </div>

      <main id="main">
        {/* ---- What it gets you ---------------------------------------- */}
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

        {/* ---- Ready to apply ------------------------------------------ */}
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
                    <p className="mt-6 font-body text-[13px] leading-relaxed text-ink-muted">
                      {MEMBERSHIP_PAGE.ready.note}
                    </p>
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
      </main>

      <SiteFooter />
    </>
  );
}
