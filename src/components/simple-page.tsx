import { SiteMenu } from "@/components/site-menu";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ApplyDialog } from "@/components/apply-dialog";
import { APPLY } from "@/content/site";

/**
 * The shape the two new pages share: a dark photographic top with the page's
 * name on it, the writing on the light ground beneath, and the ask at the end.
 *
 * It is the membership page's shape rather than a new one, because two pages
 * arriving with a layout of their own would make the site read as three sites.
 * The only thing that changes between them is the words.
 */
export function SimplePage({
  photo,
  heading,
  lead,
  children,
  closingHeading,
  closingNote,
}: {
  /** The file to look for in public/photography, without the extension. */
  photo: string;
  heading: string;
  lead: readonly string[];
  children?: React.ReactNode;
  closingHeading: string;
  closingNote: string;
}) {
  return (
    <>
      <SiteHeader overHero />
      <SiteMenu />

      <div data-hero className="fwd-on-dark">
        <PhotoPlaceholder
          label={`${heading}. Photograph to come`}
          name={photo}
          showLabel={false}
          sizes="100vw"
          ratio="fill"
          className="flex min-h-[46vh] flex-col justify-end"
        >
          <div className="relative z-2 mx-auto w-full max-w-4xl px-6 pb-14 pt-32">
            {/* Not marked up as a heading: globals.css lowercases every h1 to
                h4 and sets it in the serif, and "The Forward Class of 2026"
                has to keep its capitals. The page's h1 is the section below,
                which is lowercase anyway. */}
            <p className="fwd-h2 font-display text-photo-ink">
              {heading}
            </p>
          </div>
        </PhotoPlaceholder>
      </div>

      <main id="main" className="flex-1">
        <section className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-2xl">
            {lead.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? // The first paragraph is the page's argument. Set in the
                      // display face at standfirst size so the eye has
                      // somewhere to land between the name over the photograph
                      // and a column of body copy.
                      "fwd-reveal fwd-standfirst mb-8 whitespace-pre-line text-ink"
                    : "fwd-reveal fwd-body mb-6 whitespace-pre-line text-ink-muted last:mb-0"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {children}

        <section className="px-6 py-[81px] sm:py-[97px]">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="fwd-reveal fwd-h2">{closingHeading}</h1>
            <p className="fwd-reveal fwd-body mx-auto mt-6 max-w-xl text-ink-muted">
              {closingNote}
            </p>
            <div className="fwd-reveal mt-9">
              <ApplyDialog label={APPLY.cta} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter background="bg-surface" />
    </>
  );
}
