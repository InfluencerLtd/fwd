"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { HEADER_NAV } from "@/content/hero-modules";
import { ApplyLink } from "@/components/apply-link";
import { HashLink } from "@/components/hash-link";
import { META, NAV } from "@/content/site";

/**
 * The bar across the top of the public site.
 *
 * IT HAS TWO STATES AND THE LOGO MUST NOT MOVE BETWEEN THEM. Over the hero it
 * is nothing but a gradient, so the photograph runs to the top of the window
 * and the lockup sits on it. Past the hero it becomes a solid bar. The way this
 * usually goes wrong is that the two states are two different layouts and the
 * logo jumps a few pixels as one replaces the other; here there is one layout
 * and only the background changes underneath it, so there is nothing to jump.
 *
 * The gradient over the hero is doing real work rather than decoration. Without
 * it the logo is white type on whatever the photograph happens to be behind it,
 * which is fine until somebody swaps the photograph.
 *
 * WHICH ITEMS ARE LINKS IS DECIDED IN THE CONTENT FILE, not here, and four of
 * the five currently are not: those pages do not exist. They are rendered as
 * text so nobody presses them and lands nowhere. See src/content/hero-modules.ts.
 *
 * THERE IS NO SIGN-IN HERE. The mock has one and it is deliberately not built:
 * the member area is kept off the public site entirely, so nothing a visitor
 * can see says The House exists. Members are sent there by the code in a
 * sign-in email or the link in an invitation, and /clubhouse/sign-in still
 * works for anyone who has been given it.
 *
 * The menu button stays for phones. Below 900px five nav items, a pill and a
 * sign-in link do not fit across the top of the screen at any size a thumb can
 * hit, and the site already has a menu that does fit.
 */
export function SiteHeader({
  /**
   * Whether this page opens with the photograph the header sits on.
   *
   * A page without one has no transparent state to be in: the bar starts solid
   * and stays there, otherwise it is white type with nothing behind it on a
   * light page. Passed in rather than worked out from the DOM, because it is
   * known before anything renders and asking the document afterwards means a
   * frame of the wrong header.
   */
  overHero = false,
  /**
   * Whether the bar's lockup carries "by Influencer".
   *
   * On everywhere but the homepage, where the hero's mark carries it instead.
   * See the `signature` prop in wordmark.tsx for why it is one or the other
   * and never both.
   *
   * The width is the same either way, so the "fwd." is the same size on every
   * page and only the bar's height changes — the signature is what the extra
   * eleven pixels are for.
   */
  signature = true,
}: {
  overHero?: boolean;
  signature?: boolean;
} = {}) {
  const [scrolled, setScrolled] = useState(!overHero);

  useEffect(() => {
    if (!overHero) return;
    // A data attribute rather than #hero: any page can open with a dark
    // photographic band the bar sits over, and only one of them can be called
    // "hero" without duplicating an id.
    const band = document.querySelector("[data-hero]");
    if (!band) return;
    // Watching the hero itself rather than counting pixels: the bar goes solid
    // exactly when the picture has left, whatever height the picture is on this
    // screen, and no scroll handler runs on every frame to work that out.
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" },
    );
    observer.observe(band);
    return () => observer.disconnect();
  }, [overHero]);

  return (
    /* A PILL, NOT A STRIP (review, 17 September 2026).
       ------------------------------------------------------------------------
       WHAT CAME OFF. Two full-width layers used to sit behind this row: a
       gradient over the hero, and a tinted, blurred panel that faded out at
       its bottom edge past the hero (.fwd-header-veil in globals.css, still
       there and now unused). Together they were a band across the top of every
       page whose job was to make white type legible on whatever was behind it.

       WHAT IT IS NOW. One floating pill that carries its own ground, so the
       bar is an object on the page rather than a layer over it, and nothing
       depends on what it happens to be sitting on. That is what makes it work
       over the dark hero and over the off-white briefing page alike: the pill
       is near-black in both cases, and the type inside it never changes.

       It still has two states and the logo still must not move between them.
       Only the pill's opacity changes: translucent over the photograph, so the
       picture reads through it, and near-solid once the picture has gone. */
    <header className="fwd-on-dark fixed inset-x-0 top-0 z-40">
      {/* THE PILL HUGS THE MARK ON A PHONE AND SPANS THE MEASURE ABOVE 900px,
          which is where the navigation itself appears. A full-width pill with
          nothing in it but the logo is a strip again by another name. */}
      <div className="mx-auto flex max-w-6xl px-4 pt-3 sm:px-6 sm:pt-4">
        {/* THE PILL IS BUILT AROUND THE LOCKUP. py-2.5 at every width, so its
            height is the artwork's 55.6px plus 20px of air, with the same
            10px above and below the mark. It was py-2.5 rising to py-3 at
            640px, which made the bar two different heights either side of a
            breakpoint for no reason the eye could name. */}
        <div
          className={`relative flex items-center gap-6 rounded-full border px-5 py-2.5 transition-colors duration-300 min-[900px]:flex-1 ${
            scrolled
              ? "border-photo-ink/10 bg-photo-ground/95"
              : "border-photo-ink/15 bg-photo-ground/50"
          }`}
        >
          {/* THE SLOT IS THE HEIGHT OF THE FULL LOCKUP WHATEVER IS IN IT —
              the artwork's own ratio at the bar width, so it is one number to
              change, and it has to be the same number as `size="small"` in
              wordmark.tsx. 84px wide at 392.5:259.75 is 55.6px tall.
              Without it, a page whose bar carried the mark alone would have a
              shorter bar than every other page and the mark would move up the
              screen as you left it. */}
          <Link
            href="/"
            aria-label={META.title}
            className="inline-block h-[calc(84px*259.75/392.5)] shrink-0"
          >
            <Wordmark size="small" signature={signature} />
          </Link>

          <nav
            aria-label={NAV.menu}
            className="ml-auto hidden items-center gap-4 font-body text-sm min-[900px]:flex"
          >
            {HEADER_NAV.map((item) => {
              /* THE LOZENGE ON HOVER, NOT THE SITE'S USUAL UNDERLINE. The
                 underline is the quiet treatment for links inside running
                 text; up here the items are already a row of controls, and a
                 filled pill is what the apply button beside them is. The
                 near-white fill and near-black label are the two fixed
                 colours, not the mode-dependent ones, because this sits over
                 photography that stays dark in light and dark mode alike —
                 13.42:1 either way. */
              const className =
                "inline-block rounded-full px-3 py-1.5 text-photo-ink/75 transition-colors duration-200 hover:bg-photo-ink hover:text-photo-ground";

              if (!item.href) {
                // Not a link, on purpose. See the note in hero-modules.ts.
                return (
                  <span key={item.label} className="px-3 py-1.5 text-photo-ink/75">
                    {item.label}
                  </span>
                );
              }

              /* An item pointing at a section rather than a page gets the link
                 that guarantees the scroll: see hash-link.tsx for the two ways
                 a plain hash link quietly does nothing. */
              return item.href.includes("#") ? (
                <HashLink key={item.label} href={item.href} className={className}>
                  {item.label}
                </HashLink>
              ) : (
                <Link key={item.label} href={item.href} className={className}>
                  {item.label}
                </Link>
              );
            })}

            {/* Opens the chooser rather than going to the membership page: see
              the note in apply-link.tsx. */}
            <ApplyLink variant="onDark" size="sm" />
          </nav>
        </div>
      </div>
    </header>
  );
}
