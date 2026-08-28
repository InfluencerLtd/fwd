"use client";

import { useActionState, useId } from "react";
import { signUpForUpdates } from "@/app/actions";
import { initialSignupState } from "@/lib/form-state";
import { HOLDING } from "@/content/site";
import type { SignupSource } from "@/lib/store/signups";
import { Button } from "@/components/button";

/**
 * The email capture. Used on the holding page now, and by the waitlist later,
 * which is why the source is passed in rather than hard-coded.
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
   * "dark" for the holding page, which sits on the photograph.
   * "light" for the waitlist on the public page, which sits on the off-white.
   * The two grounds need different colours or the text stops being legible.
   */
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";
  const c = {
    label: isDark ? "text-photo-ink/70" : "text-ink-muted",
    input: isDark
      ? "border-photo-ink/30 text-photo-ink placeholder:text-photo-ink/55"
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
  const emailId = useId();
  const consentId = useId();
  const messageId = useId();

  // Once they are on the list there is nothing left to ask them for.
  if (state.status === "success") {
    return (
      <p
        className={`font-body text-base ${c.success}`}
        role="status"
        aria-live="polite"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="font-body">
      <input type="hidden" name="source" value={source} />

      <label htmlFor={emailId} className={`block text-sm ${c.label}`}>
        {HOLDING.emailLabel}
      </label>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
          placeholder={HOLDING.emailPlaceholder}
          aria-describedby={state.status === "error" ? messageId : undefined}
          aria-invalid={state.status === "error" || undefined}
          className={`fwd-field w-full max-w-sm border bg-transparent px-5 py-3 text-base transition-colors duration-300 disabled:opacity-60 ${c.input}`}
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

      <div className="mt-4 flex max-w-md items-start gap-3">
        <input
          id={consentId}
          name="consent"
          type="checkbox"
          disabled={pending}
          className={`mt-0.5 h-5 w-5 shrink-0 ${c.checkbox}`}
        />
        <label htmlFor={consentId} className={`text-[13px] leading-relaxed ${c.consent}`}>
          {HOLDING.consent}
        </label>
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
