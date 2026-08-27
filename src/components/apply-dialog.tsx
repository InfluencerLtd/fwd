"use client";

import { useEffect, useRef, useState } from "react";
import { ApplyForm, type ApplyPath } from "@/components/apply-form";
import { Button } from "@/components/button";
import { APPLY } from "@/content/site";

/**
 * The application, behind a button.
 *
 * The section on the page is now a heading, a line and one button. Everything
 * else opens in a panel, so a long form is not sitting on the page for the many
 * more people who will read it than fill it in.
 *
 * It is the browser's own <dialog>, opened with showModal(), which is what
 * gives it a focus trap, Escape to close, an inert page behind it and the right
 * announcement to a screen reader. None of that is hand-rolled here.
 *
 * Applying starts by saying which of the two you are, because the questions
 * worth asking a creator are not the ones worth asking somebody at a brand.
 */
export function ApplyDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [path, setPath] = useState<ApplyPath | null>(null);
  const [open, setOpen] = useState(false);

  function show() {
    setPath(null);
    setOpen(true);
    dialog.current?.showModal();
  }

  function hide() {
    dialog.current?.close();
  }

  // Escape and the backdrop close it without going through our button, so the
  // state has to follow what the element actually did rather than assume.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => setOpen(false);
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <Button type="button" size="lg" onClick={show} className="mt-10">
        {APPLY.cta}
      </Button>

      <dialog
        ref={dialog}
        className="fwd-dialog"
        aria-label={APPLY.open.heading}
        // Clicking the backdrop is a click on the dialog itself, since the
        // content sits in a child. Anything inside stops it.
        onClick={(event) => {
          if (event.target === dialog.current) hide();
        }}
      >
        <div className="flex max-h-[inherit] flex-col">
          <div className="flex items-start justify-between gap-6 border-b border-border px-7 py-5">
            <div>
              {path ? (
                <button
                  type="button"
                  onClick={() => setPath(null)}
                  className="fwd-underline font-body text-sm text-accent"
                >
                  {APPLY.back}
                </button>
              ) : null}
              <h2 className="mt-1 text-2xl">
                {path === "creator"
                  ? APPLY.fields.creator.heading
                  : path === "brand"
                    ? APPLY.fields.brand.heading
                    : APPLY.choose.heading}
              </h2>
            </div>

            <button
              type="button"
              onClick={hide}
              aria-label={APPLY.close}
              className="-mr-2 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border font-body text-lg leading-none text-ink-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="overflow-y-auto px-7 py-7">
            {open && path === null ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["creator", APPLY.choose.creator],
                    ["brand", APPLY.choose.brand],
                  ] as const
                ).map(([id, option]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPath(id)}
                    className="rounded-2xl border border-border bg-surface-raised p-6 text-left font-body transition-colors duration-300 hover:border-ink/30"
                  >
                    <span className="block font-display text-2xl text-ink">
                      {option.label}
                    </span>
                    <span className="mt-2 block text-[14px] leading-relaxed text-ink-muted">
                      {option.hint}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            {open && path ? (
              // Keyed on the path, so switching between the two starts a clean
              // form rather than carrying the other one's state across.
              <ApplyForm key={path} path={path} onDone={hide} />
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
