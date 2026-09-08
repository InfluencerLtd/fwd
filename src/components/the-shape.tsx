import { SHAPE } from "@/content/site";

/**
 * Four numbers, bare. No cards, no borders around them, no icons.
 *
 * THEY DESCRIBE SHAPE RATHER THAN SCALE. Every members' club site has this
 * section and every one of them uses it to brag: members, events, cities,
 * years in operation. We are pre-launch with seventeen places left, and a
 * number chosen to sound big is the fastest way to look small.
 *
 * So these say how the thing is built. Two cities, five kinds of room, four
 * briefings — and then nought stages, which is the entire argument of the
 * section above compressed into one character. It is last because it is the
 * one worth stopping on.
 *
 * The figures are set in the display face at heading scale with the label
 * beneath at eleven pixels. That ratio — roughly six to one — is what makes
 * them read as an exhibit rather than as a statistic in a paragraph.
 */
export function TheShape() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="fwd-reveal fwd-eyebrow text-ink-muted">{SHAPE.eyebrow}</p>

        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
          {SHAPE.figures.map((item) => (
            <div key={item.label} className="fwd-reveal border-t border-ink/15 pt-5">
              {/* A <dd> before its <dt> is the correct order for a description
                  list where the value is the thing being shown. The figure is
                  not marked up as a heading: it is data, and a screen reader
                  jumping by heading should not land on the word "0". */}
              <dd className="fwd-figure text-ink">
                {item.figure}
              </dd>
              <dt className="mt-5 font-body text-[15px] leading-snug text-ink">
                {item.label}
              </dt>
              <p className="mt-1.5 font-body text-[13px] leading-relaxed text-ink-muted">
                {item.note}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
