import type { Metadata } from "next";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoScrim } from "@/components/photo-scrim";
import { MarkedText } from "@/components/marked";
import { BenefitTiles } from "@/components/benefit-tiles";
import { ApplyDialog } from "@/components/apply-dialog";
import { SiteMenu } from "@/components/site-menu";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { APPLY, MEMBERSHIP_PAGE, META } from "@/content/site";
import { ROOMS } from "@/content/pages";

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
              <h1 className="fwd-statement text-photo-ink normal-case!">
                <MarkedText text={`${MEMBERSHIP_PAGE.heading}.`} dot />
              </h1>
            </div>
            {/* The members' door was here, and has gone with every other
                mention of the member area on the public site. Members are sent
                to The House rather than finding it. */}

          </div>
        </PhotoPlaceholder>
      </div>

      <main id="main">
        {/* ---- 2. What membership is --------------------------------------
             DARK, AND SO IS EVERYTHING BELOW IT. The page used to run
             off-white from here to the footer with the tiles as the only dark
             thing in it, so the tiles read as a band dropped into a light page.
             From the photograph down it is now one dark page: this section,
             the tiles, and the ask at the end. The blue button is unchanged —
             it is 13.4:1 on this ground, which is where it is strongest. */}
        <div className="fwd-dark fwd-on-dark">
          {/* ---- 2. THE BENEFITS, DIRECTLY UNDER THE HERO ----------------
               The review of 17 September 2026 asked for this order: hero, the
               horizontal benefits, then the ask with the short paragraph. The
               intro and the button used to come first, which meant somebody
               arriving from the home page read the proposition a third time
               before seeing anything they would get. */}
          <BenefitTiles />

          <section className="fwd-section px-6">
            <div className="mx-auto max-w-4xl text-center">
              {/* NOT THE h1 ANY MORE. The name over the photograph is now,
                  at page-name size; this was standing in for it — same as on every other page — so if this
                  were not here the page would have no main heading at all and
                  a screen reader jumping by heading would land in the middle
                  of it. Its size and weight are unchanged: this is what it is,
                  not how it looks. */}
              <h2 className="fwd-reveal fwd-h2 text-photo-ink">
                {MEMBERSHIP_PAGE.about.heading}
              </h2>

              {/* NO WAITLIST. This used to fork on APPLICATIONS_OPEN: the
                  application when they were open, an email capture when they
                  were not. There is no waitlist any more, so there is no fork
                  — the page always makes the same ask, and the switch, its
                  copy and the form have gone with it. */}
              <p className="fwd-reveal fwd-body mx-auto mt-6 max-w-2xl text-photo-ink/75">
                <MarkedText text={MEMBERSHIP_PAGE.about.note} />
              </p>
              {/* The ask, directly under the case for it. Centred by the
                  text-center on the container. */}
              <div className="fwd-reveal mt-10">
                <ApplyDialog label={APPLY.cta} />
              </div>
            </div>
          </section>



          {/* THE EXPLAINED LIST HAS GONE FROM HERE. It was added on
               14 September 2026 to answer the critique that the tiles were a
               word cloud, and on 15 September the tiles themselves took the
               lines instead. Keeping both would have said every benefit twice
               on one page. */}

          {/* ---- 3. THE ROOMS, MERGED IN FROM THEIR OWN PAGE -------------
               /rooms has gone (review, 17 September 2026) and this is what
               was worth keeping: where the rooms happen, and the shapes they
               take. The proposition copy that page opened with is not here,
               because Home says it and the intro above says it.

               The anchor is #rooms, so /rooms redirects to it and a nav item
               can still point at it if the team decides to keep one. */}
          <section id="rooms" className="fwd-section scroll-mt-24 px-6">
            <div className="mx-auto max-w-6xl">
              {/* THE HEADING IS "there is no fixed program", NOT ROOMS.claim.
                  The claim was "every gathering is curated by hand", which is
                  word for word the first of the three steps in How it works on
                  the home page. The review asked for the proposition copy that
                  repeats Home or the intro above to come off, and that was it;
                  ROOMS.claim is still in src/content/pages.ts, unrendered. */}
              <h2 className="fwd-reveal fwd-h2 max-w-3xl text-photo-ink normal-case!">
                <MarkedText text={ROOMS.heading} dot />
              </h2>

              {ROOMS.lead.map((line, index) => (
                <p
                  key={line}
                  className={
                    index === 0
                      ? "fwd-reveal fwd-standfirst mt-8 max-w-3xl text-photo-ink/80"
                      : "fwd-reveal fwd-body mt-6 max-w-3xl text-photo-ink/70"
                  }
                >
                  {line}
                </p>
              ))}

              <h3 className="fwd-reveal fwd-h3 mt-20 text-photo-ink normal-case! sm:mt-24">
                {ROOMS.formatsHeading}
              </h3>
              <ul className="fwd-stagger mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
                {ROOMS.formats.map((format) => (
                  <li
                    key={format.name}
                    className="fwd-reveal border-t border-photo-ink/15 pb-10 pt-6"
                  >
                    <p className="font-display text-[26px] leading-[1.1] text-photo-ink">
                      {format.name}
                    </p>
                    <p className="fwd-body mt-3 text-photo-ink/70">
                      {format.line}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ---- 4. The ask again, after the pictures --------------------- */}
          {/* 15px less top and bottom than the section pattern elsewhere.
              Now the compact section token — 64 / 72 / 96 — which keeps the 97
              asked for at desktop. */}
          <section className="fwd-section-compact px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="fwd-reveal fwd-h2 text-photo-ink normal-case!">
                {MEMBERSHIP_PAGE.closing.heading}
              </h2>
              {/* The same dialog the header opens, not a second form.
                  Somebody persuaded by the pictures should not have to scroll
                  back up to act on it. */}
              <div className="fwd-reveal mt-9">
                <ApplyDialog label={APPLY.cta} />
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
