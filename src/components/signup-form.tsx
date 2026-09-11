"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { signUpForUpdates } from "@/app/actions";
import { initialSignupState } from "@/lib/form-state";
import { HOLDING } from "@/content/site";
import type { SignupSource } from "@/lib/store/signups";
import { Button } from "@/components/button";
import { fieldHint } from "@/lib/field-hint";

/**
 * The email capture. The holding page is the only thing that uses it — the
 * waitlist it was also built for has gone from the membership page.
 *
 * It is a real HTML form wired to a server action, so it still works if
 * JavaScript is slow to load or fails.
 */
export function SignupForm({
  source = "holding",
  tone = "dark",
}: {
  source?: SignupSource;
  /**
   * "dark" for the holding page, which sits on the photograph. "light" is
   * kept for a light ground, and nothing uses it since the waitlist went. The
   * two grounds need different colours or the text stops being legible.
   */
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";
  const c = {
    label: isDark ? "text-photo-ink/70" : "text-ink-muted",
    /*
     * The dark field has a fill and a heavier border than it used to.
     *
     * It used to have neither: a 30% border and no background, sitting over a
     * flat placeholder gradient it was measured against. The holding page now
     * carries the real hero photograph, which is not flat and not predictable.
     * Measured against the brightest pixel the field crossed, the 30% border
     * came out at 1.75:1 where a control's boundary needs 3:1, and the 55%
     * placeholder at 2.62:1 where text needs 4.5:1.
     *
     * Chasing those numbers with opacity alone does not hold, because the
     * crop under the field changes with the window and a brighter patch moves
     * beneath it. The fill is the fix: it gives everything inside the field a
     * known ground, so the placeholder and the typed address are measured
     * against a colour we control rather than against whatever the photograph
     * is doing at that size. The border is still measured against the
     * photograph, so that one is raised instead.
     */
    input: isDark
      ? "border-photo-ink/65 bg-photo-ground/85 text-photo-ink placeholder:text-photo-ink/70"
      : "border-border bg-surface-raised text-ink placeholder:text-ink-muted/60",
    consent: isDark ? "text-photo-ink/70" : "text-ink-muted",
    message: isDark ? "text-accent-on-dark" : "text-ink",
    success: isDark ? "text-photo-ink" : "text-ink",
    checkbox: isDark
      ? "accent-[var(--fwd-accent-on-dark)]"
      : "accent-[var(--fwd-accent)]",
  };

  const [state, formAction, pending] = useActionState(
    signUpForUpdates,
    initialSignupState,
  );
  const firstField = useRef<HTMLInputElement>(null);
  // THE CURSOR IS ALREADY WAITING, the page carrying on the gesture the
  // blinking full stop starts. Desktop only: on a phone it would throw the
  // keyboard up before anybody asked for it.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      firstField.current?.focus({ preventScroll: true });
    }
  }, []);

  const emailId = useId();
  const messageId = useId();

  // Once they are on the list there is nothing left to ask them for.
  if (state.status === "success") {
    return (
      <p
        className={`font-body text-base ${c.success}`}
        role="status"
        aria-live="polite"
        /* The holding page watches for this to take its date and line away
           once somebody has signed up — see .fwd-holding in globals.css. */
        data-signup-done=""
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="font-body">
      <input type="hidden" name="source" value={source} />

      {/* The label hangs off the row that holds the field, not off the form,
          so it lands above the field rather than above the whole thing. */}
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        {/* NOT SHOWN, BUT STILL THERE. The label used to float up above the
            field once you started typing, and the focus ring drew straight
            through it. The placeholder already says what the box is for, so
            the visible label went — but a screen reader still needs a name for
            the field, and a placeholder is not one, so the label stays for it. */}
        <label htmlFor={emailId} className="sr-only">
          {HOLDING.emailLabel}
        </label>
        <input
          ref={firstField}
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
          placeholder={fieldHint(HOLDING.emailLabel)}
          aria-describedby={state.status === "error" ? messageId : undefined}
          aria-invalid={state.status === "error" || undefined}
          className={`fwd-field min-h-[52px] w-full max-w-sm border px-5 py-3 text-base transition-colors duration-300 disabled:opacity-60 ${c.input}`}
        />
        <Button
          type="submit"
          size="lg"
          variant={isDark ? "onDark" : "primary"}
          disabled={pending}
          className="shrink-0 disabled:opacity-60"
        >
          {pending ? HOLDING.submitting : HOLDING.submit}
        </Button>
      </div>

      {/* Errors are announced to screen readers as soon as they appear. */}
      <p
        id={messageId}
        role="status"
        aria-live="polite"
        className={`mt-4 min-h-5 text-sm ${c.message}`}
      >
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
