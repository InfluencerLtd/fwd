import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageClose } from "@/components/page-close";
import { CLUB } from "@/content/pages";

export const metadata: Metadata = {
  title: CLUB.title,
  description: CLUB.lead[0],
};

/**
 * The club — the manifesto page.
 *
 * IT IS THE ONE PAGE THAT OPENS WITHOUT A PHOTOGRAPH, and that is its whole
 * design. Every other page on the site starts with a picture; this one starts
 * with the argument, at statement scale, on the warm near-black. It is the page
 * somebody reads when they want to know what fwd. thinks, so the writing should
 * be the thing that arrives rather than a caption under an image.
 *
 * The rest is a narrow column with a great deal of space to the right of it.
 * That emptiness is the point: a page that is confident about what it has to
 * say does not need to fill the width.
 */
export default function ClubPage() {
  const [opening, ...rest] = CLUB.lead;

  return (
    <PageShell footer="bg-surface">
      {/* ---- The argument, as the opening ------------------------------- */}
      <section
        data-hero
        className="fwd-dark fwd-on-dark fwd-grain flex min-h-[62vh] flex-col justify-end px-6 pb-20 pt-40 sm:pb-28"
      >
        <div className="relative z-1 mx-auto w-full max-w-6xl">
          <p className="fwd-eyebrow text-accent-on-dark/70">{CLUB.title}</p>
          {/* HEADING SCALE, NOT STATEMENT SCALE, and `normal-case` on top of
              it. Both are corrections to the obvious version of this page.

              The statement size is built for six or seven words. This is a
              paragraph of about thirty, and at 148px it ran off the bottom of
              the screen — the size has to answer to the copy rather than the
              other way round.

              `normal-case` because the statement and heading classes lowercase
              what they are given, which is right for a heading and wrong for
              prose: it turned "The brands. The creators. The platforms." into
              three lowercase fragments. Utilities beat the type scale's own
              layer, which is why this works and why the scale was put in
              @layer components in the first place.

              Not an h1 either: the page's one main heading is "how it works"
              below. */}
          <p className="fwd-h2 mt-10 max-w-5xl normal-case text-photo-ink">
            {opening}
          </p>
        </div>
      </section>

      {/* ---- The rest of it, held to the left --------------------------- */}
      <section className="px-6 py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-y-6 lg:grid-cols-12">
          <div className="col-span-full space-y-6 lg:col-span-5">
            {rest.map((paragraph) => (
              <p
                key={paragraph}
                className="fwd-reveal fwd-body whitespace-pre-line text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How it works, as a numbered index -------------------------- */}
      <section className="bg-surface-warm px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h1 className="fwd-reveal fwd-h2">{CLUB.how.heading}</h1>

          <ol className="mt-14 sm:mt-20">
            {CLUB.how.items.map((item, index) => (
              <li
                key={item.name}
                className="fwd-reveal grid gap-x-10 gap-y-3 border-t border-ink/15 py-9 md:grid-cols-12"
              >
                <span className="fwd-eyebrow col-span-full text-ink-muted md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Not a heading: these keep their capitals. */}
                <p className="fwd-standfirst col-span-full text-ink md:col-span-5">
                  {item.name}
                </p>
                <p className="fwd-body col-span-full text-ink-muted md:col-span-5 md:col-start-8">
                  {item.line}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PageClose
        heading={CLUB.closing.heading}
        note={CLUB.closing.note}
        tone="light"
      />
    </PageShell>
  );
}
