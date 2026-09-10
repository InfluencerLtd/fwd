"use client";

import { useEffect, useRef, useState } from "react";
import { ApplyPanel } from "@/components/apply-panel";
import { buttonClass } from "@/components/button";
import { APPLY, NAV } from "@/content/site";

/**
 * The application, behind one unmistakable button.
 *
 * It used to sit open on the page, under a pair of quiet cards that looked like
 * the other cards on the page and did not read as the way in. The whole point
 * of this section is that somebody applies, so there is now one button that
 * says so and nothing else competing with it.
 *
 * The form opens in the browser's own <dialog>, opened with showModal(). That
 * gives it a focus trap, Escape to close, an inert page behind it and the right
 * announcement to a screen reader, none of it hand-rolled. Same as the menu.
 *
 * WHY A DIALOG AND NOT ANOTHER PAGE: the form is short, and sending somebody to
 * a third page after they have already come from the home page to this one is a
 * step too many. It opens where they are.
 *
 * The button takes its label and its dressing from wherever it is used, so the
 * same dialog can be opened from the dark top of the page or from a light
 * section further down without either one growing its own copy of the form.
 */
export function ApplyDialog({
  label = APPLY.start,
  /* The shared large button, not its own padding: see SIZES in button.tsx. */
  className = buttonClass("primary", "lg"),
}: {
  label?: string;
  className?: string;
} = {}) {
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

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={className}
      >
        {label}
      </button>

      <dialog
        ref={dialog}
        className="fwd-dialog"
        aria-label={APPLY.open.heading}
        onClick={(event) => {
          // Only the backdrop. A click that started inside the form is not a
          // request to throw the form away.
          if (event.target === dialog.current) hide();
        }}
      >
        {/* The header stays put and the form scrolls under it, so the way out
            is always on screen however long the form is. */}
        <div className="flex max-h-[inherit] flex-col">
          <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5 sm:px-8">
            <h2 className="text-2xl">{APPLY.open.heading}</h2>
            <button
              type="button"
              onClick={hide}
              aria-label={NAV.menuClose}
              className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border font-body text-base leading-none text-ink-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-7 sm:px-8">
            {/* Remounted every time it opens, so somebody who closed it
                half-finished and came back does not find the other path's
                answers still sitting there. */}
            {open ? <ApplyPanel /> : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
