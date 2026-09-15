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
           CENTRED, WHICH THE REST OF THE SITE IS NOT. Asked for on
           15 September 2026. Three names with a portrait each sit on the page
           axis rather than against the left margin: it is a credit, and a
           credit reads as a credit when it is centred under the thing it is
           crediting. The class page takes the same posture for the same
           reason.

           The lead line that was under the heading has gone with the same
           request. It is still in the content file. */}
      <section className="fwd-section px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="fwd-reveal fwd-h2 normal-case!">
            {FORWARD_THINKERS.curators.heading}
          </h2>
          <ul className="fwd-stagger mx-auto mt-14 flex flex-col items-center gap-12 sm:flex-row sm:items-start sm:justify-center sm:gap-16">
            {FORWARD_THINKERS.curators.people.map((person) => (
              <li
                key={person.name}
                className="fwd-reveal flex w-full max-w-[16rem] flex-col items-center"
              >
                {/* Small, and the same shape as the portraits in the list
                    below, so the two sections read as one family. A missing
                    file draws the warm placeholder rather than a hole. */}
                <div className="w-28 overflow-hidden rounded-2xl sm:w-32">
                  <PhotoPlaceholder
                    label={FORWARD_THINKERS.curators.photoBrief}
                    name={person.photo}
                    ratio="portrait"
                    showLabel={false}
                    sizes="128px"
                    washClassName="bg-photo-ground/20"
                  />
                </div>
                <p className="mt-6 font-display text-[32px] leading-[1.05] text-ink">
                  {person.name}
                </p>
                <p className="fwd-body mt-3 text-ink-muted">{person.line}</p>
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

          {/* THIRTY PLACES, SIX ACROSS AND FIVE DOWN. It was a carousel for
              an hour on 15 September 2026 and is a grid again by request: the
              whole list is in one frame, which is what a list of thirty people
              is for. Two across on a phone, three on a tablet, six on a
              desktop, so the rows stay whole at every width.

              Blank until the names arrive, so the shape is the finished shape.
              Filling list.people in src/content/pages.ts is the whole job. */}
          <ul className="fwd-stagger mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {(FORWARD_THINKERS.list.people.length > 0
              ? FORWARD_THINKERS.list.people
              : Array.from({ length: FORWARD_THINKERS.list.slots }, () => null)
            ).map((person, index) => (
              <li key={person ? person.name : index} className="fwd-reveal group">
                <div
                  tabIndex={person ? 0 : -1}
                  className="relative overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <PhotoPlaceholder
                    label={FORWARD_THINKERS.list.photoBrief}
                    name={person?.photo}
                    ratio="portrait"
                    showLabel={false}
                    sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 44vw"
                    washClassName="bg-photo-ground/25"
                    className="rounded-2xl"
                  />
                  {/* The reason, over the picture: on hover, on keyboard focus,
                      and always where there is no hover to be had. */}
                  {person ? (
                    <p className="pointer-events-none absolute inset-0 z-2 flex items-end bg-photo-ground/80 p-4 font-body text-[13px] leading-snug text-photo-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                      {person.why}
                    </p>
                  ) : null}
                </div>

                {person ? (
                  <>
                    <p className="mt-4 font-display text-[19px] leading-[1.15] text-ink">
                      {person.name}
                    </p>
                    <p className="mt-1 font-body text-[12.5px] leading-snug text-ink-muted">
                      {person.title}
                    </p>
                  </>
                ) : (
                  <p className="mt-4 font-body text-[12.5px] tracking-[0.14em] text-ink-muted uppercase">
                    {FORWARD_THINKERS.list.slotLabel}
                  </p>
                )}
              </li>
            ))}
          </ul>
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
