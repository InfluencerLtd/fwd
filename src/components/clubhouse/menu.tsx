"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { signOut } from "@/app/clubhouse/actions";
import { NAV as SITE_NAV } from "@/content/site";

/**
 * The member area's navigation on a small screen.
 *
 * THE BAR USED TO WRAP INSTEAD, and it was the worst-looking thing on the site.
 * Six links plus a sign out do not fit across 375px, so they fell into a ragged
 * column stranded between the lockup on the left and "sign out" on the right —
 * 181px of black, a quarter of the screen, at the top of every page a member
 * opened. It worked. It was ugly, and it cost a member a quarter of their phone
 * to say nothing.
 *
 * So below the medium breakpoint the links go behind a button and the bar goes
 * back to being a bar. Above it, where all seven fit on one line, nothing has
 * changed and this is not rendered at all.
 *
 * The panel is the browser's own <dialog>, opened with showModal(), which is
 * what gives the focus trap, Escape to close, an inert page behind and the
 * right announcement to a screen reader. Same as the public site's menu, and
 * for the same reason: none of that is worth hand-rolling.
 *
 * Sign out sits at the bottom, behind a rule, because it is the one thing in
 * here that is not "take me somewhere" and should not be a mis-tap away from
 * the links above it.
 */
export function ClubhouseMenu({
  links,
  signOutLabel,
}: {
  links: readonly { href: string; label: string }[];
  signOutLabel: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => setOpen(false);
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  const show = () => {
    setOpen(true);
    dialog.current?.showModal();
  };
  const hide = () => dialog.current?.close();

  return (
    <>
      {/* Light lines on the dark bar, unlike the public site's button, which
          has to work over a photograph and carries its own dark pill for it.
          Here the bar is already the dark ground, so the pill would be a box
          drawn on top of the same colour. 44px square, which is comfortably
          over the minimum rather than only just. */}
      <button
        type="button"
        onClick={show}
        aria-label={SITE_NAV.menu}
        aria-expanded={open}
        className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-photo-ink/20 transition-colors duration-300 hover:border-photo-ink/40"
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
        aria-label={SITE_NAV.menu}
        onClick={(event) => {
          if (event.target === dialog.current) hide();
        }}
      >
        <div className="flex flex-col p-5">
          <div className="flex items-start justify-between gap-6">
            <Link
              href="/clubhouse"
              onClick={hide}
              aria-label={SITE_NAV.home}
              className="inline-block"
            >
              <Wordmark size="small" tone="ink" />
            </Link>

            <button
              type="button"
              onClick={hide}
              aria-label={SITE_NAV.menuClose}
              className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border font-body text-base leading-none text-ink-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <nav aria-label={SITE_NAV.menu} className="mt-6">
            <ul className="space-y-0.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={hide}
                    className="block rounded-lg px-3 py-2.5 font-display text-xl text-ink transition-colors duration-300 hover:bg-surface-warm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <form action={signOut} className="mt-6 border-t border-border pt-4">
            <button
              type="submit"
              className="-my-1 inline-block rounded-lg px-3 py-2.5 font-body text-[15px] text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              {signOutLabel}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
