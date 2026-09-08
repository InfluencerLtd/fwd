import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { CLUB } from "@/content/pages";

export const metadata: Metadata = {
  title: CLUB.title,
  description: CLUB.lead[0],
};

export default function ClubPage() {
  return (
    <SimplePage
      photo="club"
      heading={CLUB.heading}
      lead={CLUB.lead}
      closingHeading={CLUB.closing.heading}
      closingNote={CLUB.closing.note}
    >
      <section className="bg-surface-warm px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="fwd-reveal text-3xl sm:text-4xl">{CLUB.how.heading}</h2>
          <ul className="mt-8 space-y-6">
            {CLUB.how.items.map((item) => (
              <li key={item.name} className="fwd-reveal border-t border-border pt-4">
                {/* Not a heading: these keep their capitals. */}
                <p className="font-body text-[17px] text-ink">{item.name}</p>
                <p className="mt-1.5 font-body text-[15px] leading-relaxed text-ink-muted">
                  {item.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SimplePage>
  );
}
