import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageClose } from "@/components/page-close";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoScrim } from "@/components/photo-scrim";
import { FORMATS } from "@/content/formats";
import { ROOMS } from "@/content/pages";

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
    <PageShell footer="light">
      {/* ---- A letterbox, not a block ----------------------------------- */}
      <div data-hero className="fwd-on-dark">
        <PhotoPlaceholder
          label={`${ROOMS.heading}. Photograph to come`}
          name="rooms"
          showLabel={false}
          sizes="100vw"
          ratio="fill"
          className="flex min-h-[34vh] flex-col justify-end sm:min-h-[38vh]"
        >
          <div className="relative z-2 mx-auto w-full max-w-6xl px-6 pb-10 pt-32">
            {/* An h1 here, unlike the other pages, because "The rooms" has no
                capitals worth keeping — globals.css lowercases it to "the
                rooms", which is what the navigation calls it anyway. The page
                needs one main heading and this is the honest one. */}
            <div className="relative inline-block">
              <PhotoScrim />
              <h1 className="fwd-h2 text-photo-ink">{ROOMS.heading}</h1>
            </div>
          </div>
        </PhotoPlaceholder>
      </div>

      {/* ---- The lead, beside the index rather than above it ------------- */}
      <section className="px-6 pb-4 pt-20 sm:pt-24">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-6 lg:grid-cols-12">
          {ROOMS.lead.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "fwd-reveal fwd-standfirst col-span-full text-ink lg:col-span-6"
                  : "fwd-reveal fwd-body col-span-full text-ink-muted lg:col-span-4 lg:col-start-9 lg:self-end"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ---- The five, all at once -------------------------------------- */}
      <section className="px-6 pb-24 pt-16 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <ol className="fwd-stagger">
            {FORMATS.map((format, index) => (
              <li
                key={format.id}
                className="fwd-reveal grid gap-x-10 gap-y-4 border-t border-ink/15 py-10 md:grid-cols-12 sm:py-12"
              >
                <span className="fwd-eyebrow col-span-full pt-2 text-ink-muted md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Not a heading: the names keep their capitals. */}
                <p className="fwd-h2 col-span-full font-display leading-none text-ink md:col-span-4">
                  {format.name}
                </p>

                <p className="fwd-body col-span-full text-ink-muted md:col-span-4 md:col-start-6">
                  {format.description}
                </p>

                {/* The practical detail, small and last, where a reader looks
                    for it once they already like the sound of the room. */}
                <dl className="col-span-full flex gap-x-10 md:col-span-2 md:col-start-11 md:flex-col md:gap-y-5">
                  <div>
                    <dt className="fwd-eyebrow text-ink-muted">in the room</dt>
                    <dd className="mt-1.5 font-body text-[15px] text-ink">
                      {format.size}
                    </dd>
                  </div>
                  <div>
                    <dt className="fwd-eyebrow text-ink-muted">how often</dt>
                    <dd className="mt-1.5 font-body text-[15px] text-ink">
                      {format.frequency}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PageClose
        heading={ROOMS.closing.heading}
        note={ROOMS.closing.note}
        tone="dark"
      />
    </PageShell>
  );
}
