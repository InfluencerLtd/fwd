"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ApplyForm, type ApplyPath } from "@/components/apply-form";
import { SignupForm } from "@/components/signup-form";
import { Button } from "@/components/button";
import { APPLY } from "@/content/site";
import { APPLICATIONS_OPEN } from "@/lib/site-config";

/**
 * The application, behind a button, opened from anywhere on the page.
 *
 * The ask is made three times as you scroll: under the hero, after the
 * membership cards, and after Meeting of Minds. There is still only ONE panel
 * in the page, opened by all three. Rendering a dialog per button would put
 * three copies of the form in the document, three sets of duplicated field ids,
 * and three things for a screen reader to trip over.
 *
 * It is the browser's own <dialog>, opened with showModal(), which is what
 * gives it a focus trap, Escape to close, an inert page behind it and the right
 * announcement to a screen reader. None of that is hand-rolled here.
 */

const ApplyContext = createContext<(() => void) | null>(null);

/** The button. Use it as many times as the page needs. */
export function ApplyButton({
  variant = "primary",
  className = "",
}: {
  variant?: "primary" | "onDark" | "outlineOnDark" | "quiet";
  className?: string;
}) {
  const open = useContext(ApplyContext);
  return (
    <Button type="button" size="lg" variant={variant} className={className} onClick={() => open?.()}>
      {APPLICATIONS_OPEN ? APPLY.cta : APPLY.closed.heading}
    </Button>
  );
}

export function ApplyProvider({ children }: { children: React.ReactNode }) {
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
  // state follows what the element actually did rather than assuming.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => setOpen(false);
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  const heading = !APPLICATIONS_OPEN
    ? APPLY.closed.heading
    : path === "creator"
      ? APPLY.fields.creator.heading
      : path === "brand"
        ? APPLY.fields.brand.heading
        : APPLY.choose.heading;

  return (
    <ApplyContext.Provider value={show}>
      {children}

      <dialog
        ref={dialog}
        className="fwd-dialog"
        aria-label={heading}
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
              <h2 className="mt-1 text-2xl">{heading}</h2>
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
            {/* With applications closed there is nothing to choose between:
                the panel is a waitlist sign-up and says so. */}
            {open && !APPLICATIONS_OPEN ? (
              <>
                <p className="mb-7 font-body text-[15px] leading-relaxed text-ink-muted">
                  {APPLY.closed.intro}
                </p>
                <SignupForm source="waitlist" tone="light" />
              </>
            ) : null}

            {open && APPLICATIONS_OPEN && path === null ? (
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

            {open && APPLICATIONS_OPEN && path ? (
              // Keyed on the path, so switching starts a clean form rather than
              // carrying the other one's state across.
              <ApplyForm key={path} path={path} onDone={hide} />
            ) : null}
          </div>
        </div>
      </dialog>
    </ApplyContext.Provider>
  );
}
