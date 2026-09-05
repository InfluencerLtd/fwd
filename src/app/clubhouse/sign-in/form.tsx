"use client";

import { useActionState, useId } from "react";
import { requestCode, submitCode } from "@/app/clubhouse/actions";
import { initialSignInState } from "@/lib/form-state";
import { SIGN_IN } from "@/content/clubhouse";
import { Button } from "@/components/button";

/**
 * Sign in, in two steps: address, then the six digits we email back.
 *
 * The second step looks the same whether or not the address belongs to a
 * member. That is deliberate and must stay that way, or this form becomes a
 * way of testing whether somebody is in the club.
 */
export function SignInForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(
    (previous: typeof initialSignInState, formData: FormData) =>
      formData.get("code") === null
        ? requestCode(previous, formData)
        : submitCode(previous, formData),
    { ...initialSignInState, next },
  );

  const emailId = useId();
  const codeId = useId();
  const errorId = useId();

  const onCodeStep = state.step === "code";

  return (
    <>
      <h1 className="text-4xl sm:text-5xl">
        {onCodeStep ? SIGN_IN.codeHeading : SIGN_IN.heading}
      </h1>
      <p className="mt-5 font-body text-[15px] leading-relaxed text-ink-muted">
        {onCodeStep ? SIGN_IN.codeIntro : SIGN_IN.intro}
      </p>

      <form action={action} className="mt-9 font-body" noValidate>
        <input type="hidden" name="next" value={state.next} />

        {onCodeStep ? (
          <>
            {/* Kept so the second step knows which address to check. */}
            <input type="hidden" name="email" value={state.email} />

            <label htmlFor={codeId} className="block text-sm text-ink-muted">
              {SIGN_IN.codeLabel}
            </label>
            <input
              id={codeId}
              name="code"
              // A numeric keypad on a phone, and the code filled in from the
              // text or email automatically where the browser can manage it.
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={6}
              autoFocus
              disabled={pending}
              aria-invalid={state.error ? true : undefined}
              aria-describedby={state.error ? errorId : undefined}
              className="fwd-field mt-2 w-full border border-border bg-surface-raised px-5 py-3 text-center font-mono text-2xl tracking-[0.4em] text-ink disabled:opacity-60"
            />

            <Button
              type="submit"
              variant="brand"
              size="lg"
              disabled={pending}
              className="mt-6 w-full"
            >
              {pending ? SIGN_IN.checking : SIGN_IN.codeSubmit}
            </Button>
          </>
        ) : (
          <>
            <label htmlFor={emailId} className="block text-sm text-ink-muted">
              {SIGN_IN.emailLabel}
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={state.email}
              disabled={pending}
              aria-invalid={state.error ? true : undefined}
              aria-describedby={state.error ? errorId : undefined}
              className="fwd-field mt-2 w-full border border-border bg-surface-raised px-5 py-3 text-base text-ink disabled:opacity-60"
            />

            <Button
              type="submit"
              variant="brand"
              size="lg"
              disabled={pending}
              className="mt-6 w-full"
            >
              {pending ? SIGN_IN.sending : SIGN_IN.emailSubmit}
            </Button>
          </>
        )}

        <p
          id={errorId}
          role="status"
          aria-live="polite"
          className="mt-4 min-h-5 text-sm text-ink"
        >
          {state.error ?? ""}
        </p>
      </form>

      {onCodeStep ? (
        <a
          href={`/clubhouse/sign-in?next=${encodeURIComponent(state.next)}`}
          className="fwd-underline mt-2 inline-block font-body text-sm text-accent"
        >
          {SIGN_IN.resend}
        </a>
      ) : null}
    </>
  );
}
