"use client";

import { useEffect, useRef, useState } from "react";
import { TypeformEmbed } from "@/components/typeform-embed";
import { BRIEFING_SUBMIT, NAV } from "@/content/site";

/*
 * THE CONTRIBUTION FORM IS A TYPEFORM, from 23 September 2026, as the two
 * application paths already are. Asked for directly.
 *
 * BriefingSubmitForm — our own form, which wrote to the database and asked
 * about attribution in its own words — is untouched in the repo, so swapping
 * back is one line here. Note what moves with the form: submissions land in
 * Typeform, not in our database, and the attribution question is whatever
 * Typeform asks, so the promise this section makes on the page ("nothing is
 * attributed without asking you first") has to be kept inside the Typeform.
 */
const BRIEFING_TYPEFORM_ID = "01M343KCYV8MYNB2PRRYNG19FN";

/**
 * "send something in", and the panel it opens.
 *
 * The same construction as the application dialog, on purpose: the browser's
 * own <dialog>, opened with showModal(), which brings a focus trap, Escape to
 * close, an inert page behind and the right announcement to a screen reader
 * without any of it being hand-rolled.
 *
 * IT IS THE SITE'S PANEL, NOT THE MOCK'S. The brief asks for a near-black
 * ground with square corners and pale blue labels. That is the styling of a
 * page where everything is black; this one opens over a light page, pale blue
 * text on it measures 1.27:1, and a second modal shaped differently from the
 * first would read as belonging to another site. So it is `.fwd-dialog`, the
 * panel the application already opens in, with the hairline borders the brief
 * asks for because those are what the site uses anyway.
 *
 * The form is remounted each time it opens, so somebody who closed it
 * half-written does not come back to yesterday's draft — and, more to the
 * point, does not come back to a ticked attribution box they do not remember
 * ticking.
 */
export function BriefingSubmitDialog({ className }: { className: string }) {
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
        {BRIEFING_SUBMIT.send}
      </button>

      <dialog
        ref={dialog}
        className="fwd-dialog"
        aria-label={BRIEFING_SUBMIT.form.heading}
        onClick={(event) => {
          // The backdrop only. A click that began inside the form is not a
          // request to throw away what has been written in it.
          if (event.target === dialog.current) hide();
        }}
      >
        <div className="flex max-h-[inherit] flex-col">
          <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5 sm:px-8">
            <h2 className="text-2xl normal-case!">{BRIEFING_SUBMIT.form.heading}</h2>
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
            {/* Keyed on `open` so the embed is built fresh each time the panel
                opens, the way the application panel keys its embed on the type:
                Typeform scans for `data-tf-live` when its script loads, and a
                div that was already there from last time is not scanned again. */}
            {open ? (
              <TypeformEmbed key="briefing" id={BRIEFING_TYPEFORM_ID} />
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
