"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ApplyLink } from "@/components/apply-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { NAV } from "@/content/site";
import { HEADER_NAV } from "@/content/hero-modules";
import { HashLink } from "@/components/hash-link";

/**
 * The three-line menu.
 *
 * It is fixed in the top corner and always there, including over the hero. That
 * is a deliberate exception to "nothing sits on the photograph": a bar of links
 * did, which is why it was taken off, but a single small button is the least
 * that navigation can be and still exist. Without it the only way around is the
 * footer, which is a long way down.
 *
 * The panel is the browser's own <dialog>, opened with showModal(), which gives
 * it a focus trap, Escape to close, an inert page behind it and the right
 * announcement to a screen reader. None of that is hand-rolled.
 *
 * The light and dark switch lives inside it rather than floating separately, so
 * there is one small thing in the corner rather than two.
 */
export function SiteMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => setOpen(false);
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  function show() {
    setOpen(true);
    dialog.current?.showModal();
  }
  function hide() {
    dialog.current?.close();
  }

  // Where you can go. Privacy and cookies are not here: they are legal pages
  // rather than places, they live in the footer, and a menu this short reads
  // better without them.
  //
  // NEITHER IS THE MEMBER AREA. It is not linked from anywhere a visitor can
  // see: members are sent there, by the code in a sign-in email or the link in
  // an invitation. /clubhouse/sign-in still works for anybody who has been
  // given it. See src/components/hero.tsx.
  /*
   * EVERY PAGE THE DESKTOP BAR LINKS TO, AND HOME. This list was written out
   * by hand as home and membership only, so on a phone "what it is", "what's
   * on" and "the briefing" could not be reached from the navigation at all —
   * the bar that has them is hidden below 900px. It reads HEADER_NAV now, the
   * same list the bar reads, so the two cannot drift apart again. Items with
   * no page yet (href: null) are left out, as they are in the bar.
   */
  const links = [
    { href: "/", label: NAV.home },
    ...HEADER_NAV.filter(
      (item): item is { label: string; href: string } => item.href !== null,
    ),
  ];

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={NAV.menu}
        aria-expanded={open}
        // CENTRED ON THE PILL BESIDE IT, not on the top of the screen. The
        // header is a floating pill 78px tall sitting 12px down (16px from
        // 640px up), so its middle is at 51px and 55px; a 44px button centres
        // on those at 29px and 33px. Measured rather than guessed, and worth
        // re-measuring whenever the lockup's own proportions change.
        // A dark pill with light lines, which reads as a control on the dark
        // photograph and on the off-white page alike, so it needs no knowledge
        // of what is behind it.
        // Phones only, now that the header carries a full navigation above
        // 900px. Both on screen at once is two ways to do the same thing,
        // sitting a centimetre apart.
        className="fixed right-5 top-[29px] z-50 sm:top-[33px] flex h-11 w-11 items-center justify-center rounded-full border border-photo-ink/15 bg-photo-ground/90 transition-colors duration-300 hover:border-photo-ink/40 min-[900px]:hidden"
      >
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className="h-px w-full bg-photo-ink" />
          <span className="h-px w-full bg-photo-ink" />
          <span className="h-px w-full bg-photo-ink" />
        </span>
      </button>

      <dialog
        ref={dialog}
        className="fwd-dialog fwd-menu"
        aria-label={NAV.menu}
        onClick={(event) => {
          if (event.target === dialog.current) hide();
        }}
      >
        <div className="flex flex-col p-5">
          <div className="flex items-start justify-between gap-6">
            {/* THE BLACK PILL HAS GONE. The lockup only had one because it
                was set in the pale ice blue, which is invisible on this panel
                — so a slab of near-black had to be put behind it to make the
                blue legible. Setting the lockup in the near-black instead
                removes the reason for the box, and the mark sits on the panel
                like everything else in it rather than in a badge of its own. */}
            <Link href="/" onClick={hide} aria-label={NAV.home} className="inline-block">
              <Wordmark size="small" tone="ink" />
            </Link>

            <button
              type="button"
              onClick={hide}
              aria-label={NAV.menuClose}
              className="-mr-1 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border font-body text-base leading-none text-ink-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <nav aria-label={NAV.menu} className="mt-6">
            <ul className="space-y-0.5">
              {links.map((link) => {
                const className =
                  "block rounded-lg px-3 py-2.5 font-display text-xl text-ink transition-colors duration-300 hover:bg-surface-alt";
                /* Same as the bar: an item that points at a section uses the
                   link that actually scrolls to it, and closing the menu is
                   part of the same press. Written as two branches rather than
                   one component in a variable, because the two take different
                   props and a union of them is a type nobody can read. */
                return (
                  <li key={link.href}>
                    {link.href.includes("#") ? (
                      <HashLink
                        href={link.href}
                        onNavigate={hide}
                        className={className}
                      >
                        {link.label}
                      </HashLink>
                    ) : (
                      <Link href={link.href} onClick={hide} className={className}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* THE ASK, IN THE PHONE MENU. The bar that carries it is hidden
              below 900px, so on a phone the only way in was a button
              somewhere down the page. Added 15 September 2026, and it opens
              the chooser over the menu rather than sending anybody to another
              page. */}
          <div className="mt-6 border-t border-border pt-5">
            <ApplyLink className="w-full justify-center" />
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
            <ThemeToggle />
            <span className="font-body text-[12px] text-ink-muted">
              {NAV.appearance}
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
