"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { NAV } from "@/content/site";

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
  const links = [
    { href: "/", label: NAV.home },
    { href: "/membership", label: NAV.membership },
    { href: "/clubhouse", label: NAV.signIn },
  ] as const;

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={NAV.menu}
        aria-expanded={open}
        // A dark pill with light lines, which reads as a control on the dark
        // photograph and on the off-white page alike, so it needs no knowledge
        // of what is behind it.
        className="fixed right-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-photo-ink/20 bg-photo-ground/70 backdrop-blur-sm transition-colors duration-300 hover:border-photo-ink/40"
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
        <div className="flex flex-col p-7">
          <div className="flex items-start justify-between gap-6">
            <Link href="/" onClick={hide} aria-label={NAV.home}>
              <span className="fwd-on-dark inline-block rounded-xl bg-photo-ground px-4 py-3">
                <Wordmark size="footer" />
              </span>
            </Link>

            <button
              type="button"
              onClick={hide}
              aria-label={NAV.menuClose}
              className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border font-body text-lg leading-none text-ink-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <nav aria-label={NAV.menu} className="mt-9">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={hide}
                    className="block rounded-xl px-3 py-3 font-display text-3xl text-ink transition-colors duration-300 hover:bg-surface-warm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-9 flex items-center gap-4 border-t border-border pt-6">
            <ThemeToggle />
            <span className="font-body text-[13px] text-ink-muted">
              {NAV.appearance}
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
