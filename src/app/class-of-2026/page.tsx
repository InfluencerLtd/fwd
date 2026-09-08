import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { CLASS_OF_2026 } from "@/content/pages";

export const metadata: Metadata = {
  title: CLASS_OF_2026.title,
  description: CLASS_OF_2026.lead[0],
};

export default function ClassOf2026Page() {
  return (
    <SimplePage
      photo="class-of-2026"
      heading={CLASS_OF_2026.heading}
      lead={CLASS_OF_2026.lead}
      closingHeading={CLASS_OF_2026.closing.heading}
      closingNote={CLASS_OF_2026.closing.note}
    >
      <section className="bg-surface-warm px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="fwd-reveal text-3xl sm:text-4xl">
            {CLASS_OF_2026.whatYouGet.heading}
          </h2>
          <ul className="mt-8 space-y-4">
            {CLASS_OF_2026.whatYouGet.items.map((item) => (
              <li
                key={item}
                className="fwd-reveal border-t border-border pt-4 font-body text-[17px] leading-relaxed text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SimplePage>
  );
}
