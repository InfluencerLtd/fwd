import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FORWARD_THINKERS_PUBLIC } from "@/lib/site-config";
import { PageShell } from "@/components/page-shell";
import { MarkedText } from "@/components/marked";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { FORWARD_THINKERS } from "@/content/pages";
import { NOT_FOUND } from "@/content/site";

// While the page is private it answers as the 404 page, name and all, so a
// browser tab cannot give away what is behind it. Same handling as the class
// page: see the note over FORWARD_THINKERS_PUBLIC in site-config.ts.
export const metadata: Metadata = FORWARD_THINKERS_PUBLIC
  ? {
      title: FORWARD_THINKERS.title,
      description: FORWARD_THINKERS.description,
    }
  : { title: NOT_FOUND.title, robots: { index: false } };

/**
 * Forward Thinkers — what the list is, and how somebody gets on it.
 *
 * NO PHOTOGRAPH AT THE TOP, and no names anywhere. The page opens on the
 * near-black with type alone, which is the posture the class page took for the
 * same reason: this is an announcement about people, and a stock room full of
 * strangers underneath it would be the wrong picture. The only photograph is
 * the one in the close, which every page shares.
 *
 * WHAT IT SAYS AND WHY THAT ORDER. What the list is, then how it is made, then
 * what the people on it get. The middle section is the one that matters:
 * everything that protects the list's value is a rule about how names arrive,
 * so it comes before the perks rather than after them.
 */
export default function ForwardThinkersPage() {
  if (!FORWARD_THINKERS_PUBLIC) notFound();

  const [opening, ...rest] = FORWARD_THINKERS.lead;

  return (
    <PageShell>
      {/* ---- What it is -------------------------------------------------- */}
      <section
        data-hero
        className="fwd-dark fwd-on-dark fwd-grain fwd-section px-6 pt-36 sm:pt-40"
      >
        <div className="relative z-1 mx-auto grid max-w-6xl gap-x-16 gap-y-10 lg:grid-cols-12">
          {/* The page's one main heading. normal-case! because the unlayered
              h1 rule in globals.css would otherwise lowercase it. */}
          <h1 className="fwd-rise fwd-statement col-span-full text-photo-ink normal-case! lg:col-span-9">
            <MarkedText text={FORWARD_THINKERS.heading} dot />
          </h1>

          <p className="fwd-reveal fwd-standfirst col-span-full text-photo-ink lg:col-span-7">
            {opening}
          </p>

          {rest.length > 0 ? (
            <div className="col-span-full space-y-5 lg:col-span-4 lg:col-start-9 lg:self-end">
              {rest.map((line) => (
                <p key={line} className="fwd-reveal fwd-body text-photo-ink/70">
                  {line}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ---- Who chooses --------------------------------------------------
           THREE NAMES, SET LIKE A CREDIT. Big in the display face, the market
           each one curates underneath, hairline above each. The people are the
           credibility here, so they are the largest thing in the section
           after the heading. */}
      <section className="fwd-section px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="fwd-reveal fwd-h2 max-w-3xl normal-case!">
            {FORWARD_THINKERS.curators.heading}
          </h2>
          <p className="fwd-reveal fwd-standfirst mt-7 max-w-2xl text-ink-muted">
            {FORWARD_THINKERS.curators.lead}
          </p>
          <ul className="fwd-stagger mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-3">
            {FORWARD_THINKERS.curators.people.map((person) => (
              <li
                key={person.name}
                className="fwd-reveal border-t border-ink/15 pt-7"
              >
                <p className="font-display text-[32px] leading-[1.05] text-ink">
                  {person.name}
                </p>
                <p className="fwd-body mt-4 text-ink-muted">{person.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- The list ------------------------------------------------------
           A WALL OF FACES. A small portrait each, the name under it, the job
           title under that, and one sentence about why they are on the list
           which comes up over the photograph on hover.

           THE SENTENCE IS NOT HOVER-ONLY. A hover is not available on a phone
           and not reachable from a keyboard, so it also shows on focus, and on
           any device without hover it is simply always there. The card is a
           button-less <li> with tabIndex so a keyboard can reach it: nothing
           happens on click, the sentence is the whole interaction.

           WHILE THE NAMES ARE OUT WITH THE CURATORS the section draws
           `list.slots` blank portraits, so the shape is visible and no name is
           invented. See the note over `list` in src/content/pages.ts. */}
      <section className="fwd-section bg-surface-alt px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="fwd-reveal fwd-h2 max-w-3xl normal-case!">
            {FORWARD_THINKERS.list.heading}
          </h2>

          {FORWARD_THINKERS.list.people.length > 0 ? (
            <ul className="fwd-stagger mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {FORWARD_THINKERS.list.people.map((person) => (
                <li key={person.name} className="fwd-reveal group">
                  <div
                    tabIndex={0}
                    className="fwd-photo relative overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <PhotoPlaceholder
                      label={FORWARD_THINKERS.list.photoBrief}
                      name={person.photo}
                      ratio="portrait"
                      showLabel={false}
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 44vw"
                      washClassName="bg-photo-ground/25"
                      className="rounded-2xl"
                    />
                    {/* The reason, over the picture. Hidden until hover or
                        focus, and always on where there is no hover. */}
                    <p className="pointer-events-none absolute inset-0 z-2 flex items-end bg-photo-ground/80 p-4 font-body text-[13px] leading-snug text-photo-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                      {person.why}
                    </p>
                  </div>
                  <p className="mt-4 font-display text-[21px] leading-[1.1] text-ink">
                    {person.name}
                  </p>
                  <p className="mt-1 font-body text-[13px] leading-snug text-ink-muted">
                    {person.title}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="fwd-reveal fwd-standfirst mt-8 max-w-2xl text-ink-muted">
                {FORWARD_THINKERS.list.empty}
              </p>
              <ul
                aria-hidden="true"
                className="fwd-stagger mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
              >
                {Array.from({ length: FORWARD_THINKERS.list.slots }).map(
                  (_, index) => (
                    <li key={index} className="fwd-reveal">
                      <PhotoPlaceholder
                        label={FORWARD_THINKERS.list.photoBrief}
                        ratio="portrait"
                        showLabel={false}
                        washClassName="bg-photo-ground/25"
                        className="rounded-2xl"
                      />
                      <p className="mt-4 font-body text-[13px] tracking-[0.14em] text-ink-muted uppercase">
                        {FORWARD_THINKERS.list.slotLabel}
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* NO CLOSE ON THIS PAGE. Every other page ends on the photograph and
          the apply button; this one came off on 15 September 2026. The page is
          about people who are chosen rather than people who apply, so asking
          the reader to apply underneath the list was the wrong ask in the
          wrong place. FORWARD_THINKERS.closing is still in the content file if
          it comes back. */}
    </PageShell>
  );
}
