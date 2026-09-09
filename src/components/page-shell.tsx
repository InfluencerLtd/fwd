import { SiteMenu } from "@/components/site-menu";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * The chrome every public page shares, and nothing else.
 *
 * This is what is left of SimplePage, which used to supply the whole shape of
 * four pages: a dark photographic band with the page's name on it, the writing
 * beneath, and the ask at the end. It made the site coherent and it made the
 * four pages interchangeable — you could not tell from a screenshot which one
 * you were on, and none of them had a reason to exist as a page rather than as
 * a section somewhere else.
 *
 * So the shape has gone and only the header, the menu and the footer are
 * shared. What holds the site together now is the type scale, the two blues
 * and the three grounds, which is a stronger kind of consistency than four
 * pages built from the same template.
 */
export function PageShell({
  /**
   * Whether the page opens with a dark band the header sits over. False makes
   * the bar solid from the first frame, which is what a page opening on the
   * light ground needs — see the note in site-header.tsx.
   */
  overHero = true,
  /** The footer's tone, so it continues whatever the last section was. */
  footer = "light",
  children,
}: {
  overHero?: boolean;
  footer?: "alt" | "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader overHero={overHero} />
      <SiteMenu />
      <main id="main">{children}</main>
      <SiteFooter tone={footer} />
    </>
  );
}
