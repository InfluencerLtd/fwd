import { Hero } from "@/components/hero";
import { SiteMenu } from "@/components/site-menu";
import { SiteHeader } from "@/components/site-header";
import { ApplyLink } from "@/components/apply-link";
import { Circled, MarkedText } from "@/components/marked";
import { TheCase } from "@/components/the-case";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PageClose } from "@/components/page-close";
import { SiteFooter } from "@/components/site-footer";
import {
  MEMBERSHIP,
  NAV,
  IMAGERY,
  NAME_STORY,
  WAY_IN,
  FILM,
} from "@/content/site";
import { ABOUT_PAGE } from "@/content/pages";

/**
 * The public site: one page, scrolling.
 *
 *   1  the hero            photograph      the picture, and the name
 *   2  the case            near-black      why any of this needs to exist
 *   3  membership          off-white       what it gets you, then the ask
 *   4  the band            photography     texture
 *   5  the shape of it     off-white       four numbers, bare
*   6  Meeting of Minds    grey            the one thing nobody else does
 *   7  the briefing        off-white       the ask that is not "apply"
 *   8  the way in          near-black      the close
 *   9  the footer
 *
 * THE GROUND CHANGES SIX TIMES ON THE WAY DOWN, and that is the structure
 * rather than decoration. Before this the page was off-white almost the whole
 * way with a single photographic band in it, and a scroll with no change of
 * ground reads as one long document rather than as a sequence of rooms. Each
 * change is a page turn.
 *
 * WHY THE ARGUMENT COMES BEFORE THE OFFER. The page used to open with the
 * photograph and go straight to what membership unlocks, which sells a
 * solution to a problem nobody had named. Section two names it. Everything
 * after it is answering something.
 *
 * The ask appears four times and opens the same panel every time.
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

      <SiteMenu />
      {/* THE FULL LOCKUP, LIKE EVERY OTHER PAGE. The bar carried the mark
          alone here because the hero below it carried the endorsement; the
          hero's lockup came off on 17 September 2026, which left "by
          Influencer" nowhere on the home page at all. */}
      <SiteHeader overHero />
      <Hero />

      <main id="main">
        {/* ---- 2. The case ---------------------------------------------- */}
        <TheCase />

        {/* ---- 2a. Why the name, and a room it happened in --------------
             ONE SECTION, TWO THINGS. The entry explains the name; the film
             beside it is a room the name was used in. They were two sections
             stacked, the film centred on its own with nothing to sit against,
             which read as decoration dropped between two pieces of writing
             (18 September 2026). Set as a pair they explain each other.

             THE COMPOSITION IS THE REFERENCE'S. mvemanagement.com runs its one
             film exactly this way: copy on the left, a phone-shaped reel on
             the right, nothing written over it.

             NEAR-BLACK, BETWEEN TWO LIGHT SECTIONS, so it reads as its own
             beat rather than as more of the argument above it. The words are
             the ones that were on /about (first-impression critique,
             14 September 2026): the name is what makes this stick, and it was
             on the second page.

             A DICTIONARY ENTRY, from 17 September 2026 (the review's own
             direction for this section): the word as the headword, its
             syllable break, how it is said and what part of speech it is, one
             hairline rule, then the senses in italic. Left-aligned, which is
             how an entry is set and which the column it now sits in wanted
             anyway — it was centred while it had the page to itself.

             NO DEFINITION AND NO PART OF SPEECH BEYOND THE FACTS. See the note
             on NAME_STORY in src/content/site.ts: the sentence that defines
             Forward is the review's to write, not ours to invent, and the
             entry stands up without it.

             AND NO CAPTION UNDER THE FILM. A line naming the night would make
             it evidence rather than atmosphere, and the only wording on the
             record for that is ROOMS.origin in src/content/pages.ts, which is
             written and deliberately unused. */}
        <section className="fwd-dark fwd-on-dark fwd-grain fwd-section px-6">
          <div className="relative z-1 mx-auto grid max-w-6xl gap-x-16 gap-y-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="sr-only">{NAME_STORY.heading}</h2>

              {/* The headword, broken at the syllable. Lowercase, and without
                  the full stop the mark carries: this is the word, not the
                  wordmark. */}
              <p className="fwd-reveal font-display text-[clamp(2.75rem,8vw,4.5rem)] leading-[1] tracking-[0.01em] text-photo-ink">
                {NAME_STORY.syllables}
              </p>

              {/* How it is said, and what it is. One line, small, in the body
                  face, because that is the one part of an entry that is not
                  set in the book's display face. */}
              <p className="fwd-reveal mt-3 font-body text-sm text-photo-ink/55">
                {NAME_STORY.pronunciation}
                <span className="px-2 text-photo-ink/35">:</span>
                <span className="italic">{NAME_STORY.partOfSpeech}</span>
              </p>

              {/* THE RULE. One hairline across the measure, which is the whole
                  structure of an entry: everything above it names the word,
                  everything below it is what the word means. */}
              <hr className="fwd-reveal mt-10 w-full border-0 border-t border-photo-ink/20" />

              {/* The senses, italic, the way a definition is set. The first is
                  the definition proper and the second is the gloss on it, so
                  the second is quieter and a size down rather than an equal
                  sibling. */}
              <p className="fwd-reveal mt-10 font-display text-[22px] italic leading-[1.45] text-photo-ink sm:text-[26px]">
                {NAME_STORY.body[0]}
              </p>
              {/* THE GLOSS, IN DM SANS. Asked for on 18 September 2026. It is
                  the one line on the site in a third face, and it is upright
                  rather than italic: the sense above it is the definition and
                  carries the italic a dictionary sets a definition in, so a
                  second italic line in a different face read as a mistake
                  rather than as a distinction. `font-alt` is DM Sans — see
                  src/lib/fonts.ts. */}
              <p className="fwd-reveal font-alt mt-6 text-[16px] leading-[1.6] text-photo-ink/60 sm:text-[17px]">
                {NAME_STORY.body[1]}
              </p>
            </div>

            {/* A PHOTOGRAPH FOR NOW, from 25 September 2026. This was a silent
                looping film (public/film/room.mp4) and a film goes back in when
                the right one is cut: the slot keeps the 9:16 shape it was built
                at, so that swap is this block returning to SilentLoop with
                FILM.room and nothing else moving. The film and its brief are
                still in public/film/. */}
            <div className="fwd-reveal lg:col-span-5">
              <PhotoPlaceholder
                label={IMAGERY.roomStill}
                name="room-still"
                ratio="fill"
                sizes="(min-width: 1024px) 340px, 100vw"
                className="mx-auto aspect-[9/16] w-full max-w-[340px] rounded-2xl lg:mr-0"
              />
            </div>
          </div>
        </section>

        {/* ---- 3. What membership is ------------------------------------
             Left-aligned, and the two paragraphs run as a pair of columns
             beneath the heading rather than as a centred stack. That is a
             different composition from the section above on purpose: two big
             left-aligned headings with a right-hand column each would read as
             one section repeated. Here the heading is the only thing on its
             line and the reading happens underneath it. */}
        <section id="membership" className="fwd-section scroll-mt-20 px-6">
          <div className="mx-auto max-w-6xl">
            {/* NO HEADING. "A year of rooms, and the people in them" came off
                on 17 September 2026 at the review's request: the benefit line
                is the section now, and the page had three big headings in a
                row before it. */}
            <div className="mt-12 grid gap-x-16 gap-y-6 sm:mt-16 md:grid-cols-2">
              {/* whitespace-pre-line so a newline in the content file is a
                  line break here, and spaces still collapse. */}
              {MEMBERSHIP.lead.map((line) => (
                <p
                  key={line}
                  className="fwd-reveal fwd-body whitespace-pre-line text-ink-muted"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="fwd-reveal mt-14">
              <ApplyLink />
            </div>
          </div>
        </section>

        {/* ---- 3b. About, folded in from its own page --------------------
             THE STANDALONE /about PAGE HAS GONE (review, 17 September 2026).
             Its two strongest parts are here: the claim with the three groups
             under it, and How it works as one numbered sequence. /about now
             redirects to this section, and the nav item scrolls to it, so
             every link anybody has ever sent still lands in the right place.

             WHAT WAS LEFT BEHIND, on purpose: the year-round membership
             paragraph and the benefit copy, which Home already says one
             section above, and "What it is for", which the review asked to
             remove as explained enough. All three are still in
             src/content/pages.ts. */}
        <section id="about" className="fwd-section scroll-mt-24 bg-surface-alt px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="fwd-rise fwd-statement max-w-4xl text-ink normal-case!">
              <MarkedText text={ABOUT_PAGE.statement} />
            </h2>

            {/* Who is in the room, in three. The circles are the review's
                one visual keeper from this page, a size up on what they
                were. */}
            <ul className="fwd-stagger mx-auto mt-16 grid max-w-5xl gap-x-12 gap-y-14 sm:mt-20 sm:grid-cols-3">
              {ABOUT_PAGE.forWhom.map((item) => (
                <li key={item.name} className="fwd-reveal">
                  <p className="fwd-h3 text-ink">
                    <Circled>{item.name}</Circled>
                  </p>
                  <p className="mt-6 max-w-[30ch] font-body text-base leading-relaxed text-ink-muted">
                    {item.line}
                  </p>
                </li>
              ))}
            </ul>

            {/* How it works, as one clean 1-2-3, which is how the review
                asked for it rather than three separate cards. */}
            <h3 className="fwd-reveal fwd-h3 mt-24 normal-case! sm:mt-32">
              {ABOUT_PAGE.how.heading}
            </h3>
            <ol className="fwd-stagger mt-10">
              {ABOUT_PAGE.how.items.map((item, index) => (
                /* THE THREE COLUMNS ARRIVE AT 1024px, NOT 768px. They used to
                   split at md, which on a tablet left the step's name in a
                   285px column with a hand's width of empty page beside it and
                   the sentence opposite running five short lines. There is not
                   enough width for three tracks until lg, so below that the
                   number, the name and the line simply stack.

                   5 and 6 of twelve, with the number in the first: that uses
                   the whole grid, and it keeps the step's name off three lines
                   at 1024px, which a narrower track did not. */
                <li
                  key={item.name}
                  className="fwd-reveal grid gap-x-10 gap-y-3 border-t border-ink/15 py-8 lg:grid-cols-12"
                >
                  <span className="fwd-eyebrow col-span-full text-ink-muted lg:col-span-1">
                    {index + 1}
                  </span>
                  <p className="fwd-standfirst col-span-full text-ink lg:col-span-5">
                    {item.name}
                  </p>
                  <p className="fwd-body col-span-full text-ink-muted lg:col-span-6 lg:col-start-7">
                    {item.line}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- 4. THE BAND OF PHOTOGRAPHS IS OFF THE PAGE ----------------
             Taken off on 15 September 2026, kept rather than deleted: it is
             the drifting row of eight photographs with "Briefings",
             "Roundtables", "Introductions", "Dinners", "Guest lists",
             "Connections", "Small rooms" and "People worth meeting" along the
             bottom of each.

             Nothing about it has been dismantled. The component is still
             src/components/photo-band.tsx, its captions are still
             IMAGERY.bandCaptions and IMAGERY.bandLabel in
             src/content/site.ts, and the photographs are still band-1 to
             band-8 in public/photography. Putting it back is this one line:

                 <PhotoBand />

             The page runs the offer straight on to what follows it now, which
             is one change of ground fewer on the way down. */}

        {/* ---- 5. MEETING OF MINDS IS OFF THE HOME PAGE ------------------
             Taken off on 15 September 2026, kept rather than deleted: the
             square photograph, "The right introduction can change
             everything", the two paragraphs about how an introduction is
             made, and a button.

             Nothing is dismantled. The copy is still MEETING_OF_MINDS in
             src/content/site.ts and the photograph is still
             meeting-of-minds.jpg in public/photography.

             THE IDEA STILL HAS TWO HOMES. "A meeting of minds" is one of the
             three pillars on /about, and the Meeting of Minds tile on
             /membership carries the line about introductions with a reason
             attached. What the home page no longer says is that Forward is
             about bringing people together at all, which Sophie wants said
             somewhere: see the note in the same file's section 3. */}

        {/* ---- 6. THE BRIEFING SECTION IS OFF THE HOME PAGE ---------------
             Taken off on 15 September 2026, kept rather than deleted: the
             heading, the paragraph about where the writing comes from, and
             the button that opens "send something in".

             It is still a component and still in use: /briefing renders the
             same <BriefingSubmit /> with its own heading and copy, so the
             form and everything behind it are untouched. Putting it back here
             is one line.

             The home page now has one ask on it, which is to apply. */}

        {/* ---- 7. The close ---------------------------------------------
             The same component every other page closes on, at the larger
             scale. It used to be a component of its own, which is how it
             ended up with a mask two revisions behind everyone else's. */}
        {/* NO LINE UNDER THE HEADING. It carried the application promise
            ("read by a person... we answer either way") for a day and came
            out on 15 September 2026: the close is an invitation, and the
            process belongs on the membership page rather than in front of the
            button. */}
        <PageClose
          heading={WAY_IN.heading}
          sentence
          photo="closing"
          photoBrief={IMAGERY.statement}
        />
      </main>

      {/* ---- 8. The footer --------------------------------------------- */}
      <SiteFooter />
    </>
  );
}
