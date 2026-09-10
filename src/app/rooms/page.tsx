import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageClose } from "@/components/page-close";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoScrim } from "@/components/photo-scrim";
import { ROOMS } from "@/content/pages";
import { IMAGERY } from "@/content/site";
import { MarkedText, plainText } from "@/components/marked";

export const metadata: Metadata = {
  title: ROOMS.title,
  description: ROOMS.lead[0],
};

/**
 * The rooms — the index page.
 *
 * TWO THINGS MAKE IT ITS OWN. The photograph across the top is a letterbox
 * rather than the tall block every other page opens with, because this page is
 * a list and a list wants to start near the top of the screen. And the five
 * formats are set as a numbered index — full width, hairline separated, the
 * name large and the practical detail small and to the right — rather than as
 * tabs or cards.
 *
 * THE TABS WENT. They were the right idea on a page that had other things
 * competing with them; on a page whose entire subject is these five, hiding
 * four of them behind a control means the visitor has to press four times to
 * read a page that would fit on one screen. An index shows all five at once
 * and lets the eye do the choosing, which is faster and reads as more
 * confident: here is everything, rather than here is a menu.
 *
 * Every size and frequency here is still TEST COPY. See src/content/formats.ts.
 */
export default function RoomsPage() {
  return (
    <PageShell>
      {/* ---- A letterbox, not a block ----------------------------------- */}
      <div data-hero className="fwd-on-dark">
        <PhotoPlaceholder
          label={`${plainText(ROOMS.heading)} Photograph to come`}
          name="rooms"
          showLabel={false}
          sizes="100vw"
          ratio="fill"
          className="flex min-h-[34vh] flex-col justify-end sm:min-h-[38vh]"
        >
          <div className="relative z-2 mx-auto w-full max-w-6xl px-6 pb-10 pt-32">
            {/* THE PAGE'S ONE MAIN HEADING, AND A SENTENCE. normal-case! because
                the unlayered h1 rule in globals.css would otherwise lowercase
                it; the mark on "no" comes from the [[brackets]] in pages.ts. */}
            <div className="relative inline-block">
              <PhotoScrim />
              <h1 className="fwd-statement text-photo-ink normal-case!">
                <MarkedText text={ROOMS.heading} />
              </h1>
            </div>
          </div>
        </PhotoPlaceholder>
      </div>

      {/* ---- The lead ------------------------------------------------------ */}
      <section className="fwd-section px-6">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-6 lg:grid-cols-12">
          {ROOMS.lead.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "fwd-reveal fwd-standfirst col-span-full text-ink lg:col-span-6"
                  : "fwd-reveal fwd-body col-span-full text-ink-muted lg:col-span-5 lg:col-start-8 lg:self-end"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <PageClose
        heading={ROOMS.closing.heading}
        photo="rooms-close"
        photoBrief={IMAGERY.roomsClose}
      />
    </PageShell>
  );
}
