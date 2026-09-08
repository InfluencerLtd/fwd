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
}: {
  overHero?: boolean;
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
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b border-accent-on-dark/[0.18] bg-photo-ground/[0.92] backdrop-blur-md transition-opacity duration-200 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <Link href="/" aria-label={META.title} className="inline-block shrink-0">
          <Wordmark size="small" />
        </Link>

        <nav
          aria-label={NAV.menu}
          className="ml-auto hidden items-center gap-7 font-body text-sm min-[900px]:flex"
        >
          {HEADER_NAV.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="fwd-underline -my-1 inline-block py-1 text-photo-ink/75 hover:text-photo-ink"
              >
                {item.label}
              </Link>
            ) : (
              // Not a link, on purpose. See the note in hero-modules.ts.
              <span key={item.label} className="py-1 text-photo-ink/75">
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
