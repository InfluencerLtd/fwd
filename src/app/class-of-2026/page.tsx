import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ApplyDialog } from "@/components/apply-dialog";
import { CLASS_OF_2026 } from "@/content/pages";
import { APPLY } from "@/content/site";

export const metadata: Metadata = {
  title: CLASS_OF_2026.title,
  description: CLASS_OF_2026.lead[0],
};

/**
 * The class of 2026 — the announcement page.
 *
 * IT IS THE ONLY PAGE THAT OPENS CENTRED, and it is the only one that should.
 * Everything else on this site is left-aligned, which makes symmetry here a
 * change of posture rather than a default: this page is an announcement of a
 * thing with a deadline, and announcements are set on the axis.
 *
 * The name is a <p> rather than a heading because "The Forward Class of 2026"
 * has to keep its capitals and globals.css lowercases every h1 to h4. The
 * `normal-case` on it is undoing the statement class's own lowercasing —
 * which works, and works on purpose: the type scale lives in @layer components
 * precisely so a utility can still win. The page's real h1 is below.
 *
 * THE ASK IS AT THE TOP HERE. On every other page it is at the bottom, after
 * the case has been made. Somebody arriving on this page has usually been sent
 * to it, and the deadline is the reason they were sent, so making them scroll
 * past the whole page to reach the button would be the wrong way round. It is
 * at the bottom as well.
 */
export default function ClassOf2026Page() {
  return (
    <PageShell footer="light">
      {/* ---- The announcement ------------------------------------------- */}
      <section
        data-hero
        className="fwd-dark fwd-on-dark fwd-grain flex min-h-[82vh] flex-col justify-center px-6 py-32"
      >
        <div className="relative z-1 mx-auto w-full max-w-4xl text-center">
          <p className="fwd-enter fwd-eyebrow text-accent-on-dark/70">
            {CLASS_OF_2026.closing.heading}
          </p>

          <p
            className="fwd-enter fwd-statement mt-9 normal-case text-photo-ink"
            style={{ "--fwd-enter-delay": "260ms" } as React.CSSProperties}
          >
            {CLASS_OF_2026.heading}
          </p>

          <p className="mx-auto mt-10 max-w-md font-body text-[15px] leading-relaxed text-photo-ink/65">
            {CLASS_OF_2026.closing.note}
          </p>

          <div className="mt-11">
            <ApplyDialog label={APPLY.cta} />
          </div>
        </div>
      </section>

      {/* ---- Who it is for, in a single column off the centre ------------ */}
      <section className="px-6 py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-y-6 lg:grid-cols-12">
          <div className="col-span-full lg:col-span-6 lg:col-start-4">
            {CLASS_OF_2026.lead.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "fwd-reveal fwd-standfirst mb-8 text-ink"
                    : "fwd-reveal fwd-body mb-6 text-ink-muted last:mb-0"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What the first cohort gets --------------------------------- */}
      <section className="bg-surface-warm px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h1 className="fwd-reveal fwd-h2 max-w-3xl">
            {CLASS_OF_2026.whatYouGet.heading}
          </h1>

          <ol className="fwd-stagger mt-14 sm:mt-20">
            {CLASS_OF_2026.whatYouGet.items.map((item, index) => (
              <li
                key={item}
                className="fwd-reveal grid gap-x-10 gap-y-3 border-t border-ink/15 py-9 md:grid-cols-12"
              >
                <span className="fwd-eyebrow col-span-full pt-1.5 text-ink-muted md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="fwd-standfirst col-span-full text-ink md:col-span-9 md:col-start-3">
                  {item}
                </p>
              </li>
            ))}
          </ol>

          <div className="fwd-reveal mt-16">
            <ApplyDialog label={APPLY.cta} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
