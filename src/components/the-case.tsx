import { CASE } from "@/content/site";

/**
 * The argument, on the warm near-black, before anything is offered.
 *
 * This is the section the site did not have. It opened with a photograph and
 * went straight to what membership unlocks, which sells a solution to a
 * problem nobody has named yet.
 *
 * THE COMPOSITION IS THE POINT AS MUCH AS THE WORDS. The heading is hard left
 * and enormous; the body is a narrow column pushed to the right of it, ending
 * well short of the edge. Roughly a third of this section is deliberately
 * empty. Centred type reads as the default a template gave you — asymmetry and
 * held space read as somebody having decided.
 *
 * THE STATEMENT REVEALS AFTER THE BODY. `--fwd-reveal-shift` pushes its scroll
 * range down, so the argument has been read by the time the conclusion lands.
 * It is the one moment on this page allowed to feel like a moment.
 */
export function TheCase() {
  return (
    <section id="why" className="fwd-dark fwd-on-dark fwd-grain scroll-mt-20 px-6 py-28 sm:py-40">
      <div className="relative z-1 mx-auto max-w-6xl">
        <p className="fwd-reveal fwd-eyebrow text-accent-on-dark/70">
          {CASE.eyebrow}
        </p>

        <div className="mt-10 grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          {/* Seven of twelve columns. The heading is the loudest thing on the
              page after the wordmark itself, and it is left-aligned so the
              rag falls where the reading starts. */}
          <h2 className="fwd-reveal fwd-statement col-span-full text-photo-ink lg:col-span-7">
            {CASE.heading}
          </h2>

          {/* Four of twelve, starting at nine: the gap between the two is the
              composition. */}
          <div className="col-span-full space-y-6 lg:col-span-4 lg:col-start-9 lg:self-end">
            {CASE.body.map((line) => (
              <p key={line} className="fwd-reveal fwd-body text-photo-ink/70">
                {line}
              </p>
            ))}
          </div>
        </div>

        <p
          className="fwd-reveal fwd-standfirst mt-24 max-w-3xl text-accent-on-dark sm:mt-32"
          style={{ "--fwd-reveal-shift": "7%" } as React.CSSProperties}
        >
          {CASE.statement}
        </p>
      </div>
    </section>
  );
}
