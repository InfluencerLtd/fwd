import type { Metadata } from "next";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { SilentLoop } from "@/components/silent-loop";
import { photoSrc } from "@/lib/photography";
import { PhotoScrim } from "@/components/photo-scrim";
import { MarkedText } from "@/components/marked";
// BenefitTiles is not rendered at the moment: see section 2 below, which is
// where to put it back.
import { ApplyDialog } from "@/components/apply-dialog";
import { PageClose } from "@/components/page-close";
import { SiteMenu } from "@/components/site-menu";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { APPLY, FILM, IMAGERY, MEMBERSHIP_PAGE, META } from "@/content/site";
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
          {/* ---- 2. THE BENEFITS BAND IS OFF THE PAGE --------------------
               Taken off on 17 September 2026, kept rather than deleted: the
               two rows of photographic tiles that drifted in opposite
               directions, one per benefit, with the name of each over the
               picture. Thirteen of them: Meeting of Minds, A seat in the room,
               Partner rooms, Guest passes, The directory, Ask the room,
               Digital rooms, Members' merch, Nominate a member, Global access,
               The briefing, The clubhouse and the rest.

               NOTHING IS DISMANTLED. The component is still
               src/components/benefit-tiles.tsx, the names are still
               MEMBERSHIP.cards in src/content/site.ts, the photography briefs
               are still IMAGERY.benefits, and every picture is still
               benefit-*.jpg in public/photography. Putting the band back is
               this one line:

                   <BenefitTiles />

               It sat directly under the hero, which is the order the review of
               17 September 2026 asked for, so that is where it goes back. */}

          <section className="fwd-section px-6">
            <div className="mx-auto max-w-4xl text-center">
              {/* NOT THE h1 ANY MORE. The name over the photograph is now,
                  at page-name size; this was standing in for it — same as on every other page — so if this
                  were not here the page would have no main heading at all and
                  a screen reader jumping by heading would land in the middle
                  of it. Its size and weight are unchanged: this is what it is,
                  not how it looks. */}
              {/* normal-case! because it is a name: the h2 rule lowercases
                  headings across the site, and "Forward" keeps its capital
                  wherever it appears (see the naming rules in brand.ts). */}
              <h2 className="fwd-reveal fwd-h2 text-photo-ink normal-case!">
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
              {/* THE COPY ON THE LEFT AND A REEL BESIDE IT, from 18 September
                  2026. The wide photograph that used to sit under this copy is
                  now the reel's slot instead of a second picture in the same
                  section: the shape changed from a letterbox to a phone,
                  because that is the shape this industry films in, and because
                  it gives the paragraph something to sit against rather than
                  something to sit above.

                  Stacked below 1024px, where there is no room for two tracks,
                  and the reel goes second so the words are still read first. */}
              <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  {/* THE HEADING IS "there is no fixed program", NOT
                      ROOMS.claim. The claim was "every gathering is curated by
                      hand", which is word for word the first of the three
                      steps in How it works on the home page. The review asked
                      for the proposition copy that repeats Home or the intro
                      above to come off, and that was it; ROOMS.claim is still
                      in src/content/pages.ts, unrendered. */}
                  <h2 className="fwd-reveal fwd-h2 text-photo-ink normal-case!">
                    <MarkedText text={ROOMS.heading} dot />
                  </h2>

                  {ROOMS.lead.map((line, index) => (
                    <p
                      key={line}
                      className={
                        index === 0
                          ? "fwd-reveal fwd-standfirst mt-8 text-photo-ink/80"
                          : "fwd-reveal fwd-body mt-6 text-photo-ink/70"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* THE REEL. Silent, looping, no controls — see the note over
                    SilentLoop. Its poster is a phone-shaped cut of the same
                    dinner, so the slot is finished before the film exists. */}
                <div className="fwd-reveal lg:col-span-5">
                  <SilentLoop
                    src={FILM.reel.src}
                    poster={photoSrc(FILM.reel.poster) ?? ""}
                    ratioClass="aspect-[9/16]"
                    /* Capped rather than filling its column: a 9:16 film in
                       a five-column track is 790px tall against 350px of
                       copy, and the section reads as a picture with a caption
                       rather than as a paragraph with a film beside it.
                       Centred on the copy block, so the empty space is shared
                       rather than all under the words. */
                    className="mx-auto w-full max-w-[340px] rounded-2xl lg:mr-0"
                  />
                </div>
              </div>

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
          {/* IT CLOSES ON A PHOTOGRAPH NOW, like every other page does. This
              was a plain dark band with the heading and the button on it, and
              on a page that is otherwise one dark screen from the hero down it
              read as the page running out rather than ending.

              PageClose is the same component /briefing and the home page close
              on, so the heading, the button and the scrim behind them are one
              thing in one place rather than a fourth copy of them. `sentence`
              keeps the capital on "Ready to apply?" against the lowercase h2
              rule, and the dialog it opens is the same dialog the header
              opens — nobody persuaded by the pictures has to scroll back up. */}
          <PageClose
            heading={MEMBERSHIP_PAGE.closing.heading}
            sentence
            photo="membership-close"
            photoBrief={IMAGERY.membershipClose}
          />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
