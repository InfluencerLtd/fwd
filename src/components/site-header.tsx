"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { ButtonLink } from "@/components/button";
import { HEADER_NAV } from "@/content/hero-modules";
import { APPLY, NAV } from "@/content/site";
import { META } from "@/content/site";

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
   * The width stays 108px either way, so the "fwd." is the same size on every
   * page and only the bar's height changes — the signature is what the extra
   * fifteen pixels were for.
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
    <header className="fwd-on-dark fixed inset-x-0 top-0 z-40">
      {/* The scrim, and the bar, in the same place. Only their opacity
          changes, so the row above them never moves. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-black/[0.62] to-transparent transition-opacity duration-200 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* NO RULE ALONG THE BOTTOM. The panel is drawn past the row and faded
          out instead, so the tint and the blur end without an edge — see
          .fwd-header-veil in globals.css. -bottom-7 is the 28px the mask
          fades across; the two numbers have to agree. */}
      <div
        aria-hidden="true"
        className={`fwd-header-veil absolute inset-x-0 -bottom-7 top-0 bg-photo-ground/[0.92] backdrop-blur-md transition-opacity duration-200 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        {/* THE SLOT IS THE HEIGHT OF THE FULL LOCKUP WHATEVER IS IN IT — the
            artwork's own ratio at 108px wide, so it is one number to change.
            Without it the homepage bar is fifteen pixels shorter than every
            other page's, and the nav beside it, which is centred against this,
            moves half of that up the screen when you leave the homepage. The
            mark is top-aligned in the slot, so it stays where it has always
            been and only the empty space below it comes and goes. */}
        <Link
          href="/"
          aria-label={META.title}
          className="inline-block h-[calc(108px*214.87/355.96)] shrink-0"
        >
          <Wordmark size="small" signature={signature} />
        </Link>

        <nav
          aria-label={NAV.menu}
          className="ml-auto hidden items-center gap-4 font-body text-sm min-[900px]:flex"
        >
          {HEADER_NAV.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                /* A LOZENGE ON HOVER, NOT THE SITE'S USUAL UNDERLINE. The
                   underline is the quiet treatment for links inside running
                   text; up here the items are already a row of controls, and
                   a filled pill is what the apply button beside them is. The
                   near-white fill and near-black label are the two fixed
                   colours, not the mode-dependent ones, because this sits over
                   photography that stays dark in light and dark mode alike —
                   13.42:1 either way. */
                className="inline-block rounded-full px-3 py-1.5 text-photo-ink/75 transition-colors duration-200 hover:bg-photo-ink hover:text-photo-ground"
              >
                {item.label}
              </Link>
            ) : (
              // Not a link, on purpose. See the note in hero-modules.ts.
              <span key={item.label} className="px-3 py-1.5 text-photo-ink/75">
                {item.label}
              </span>
            ),
          )}

          <ButtonLink href="/membership" variant="onDark" size="sm">
            {APPLY.cta}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
