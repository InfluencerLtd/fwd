"use client";

import { useActionState, useId } from "react";
import { unlockEarlyAccess } from "./actions";
import { initialEarlyAccessState } from "@/lib/form-state";

export function EarlyAccessForm() {
  const [state, formAction, pending] = useActionState(
    unlockEarlyAccess,
    initialEarlyAccessState,
  );
  const passwordId = useId();
  const errorId = useId();

  return (
    <form action={formAction} className="mt-8 font-body">
      <label htmlFor={passwordId} className="sr-only">
        Password
      </label>
      <input
        id={passwordId}
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="enter password"
        required
        disabled={pending}
        aria-describedby={state.error ? errorId : undefined}
        aria-invalid={state.error ? true : undefined}
        className="fwd-field mt-2 w-full border border-border bg-surface-raised px-5 py-3 text-base text-ink disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={pending}
        className="fwd-btn mt-4 w-full border border-photo-ground/60 bg-accent-on-dark px-6 py-3 font-body text-base text-photo-ground hover:border-photo-ground hover:bg-photo-ground hover:text-accent-on-dark disabled:opacity-60"
      >
        {pending ? "Checking" : "Continue"}
      </button>
      <p id={errorId} role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-ink">
        {state.error ?? ""}
      </p>
    </form>
  );
}
