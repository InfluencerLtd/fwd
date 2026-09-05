"use client";

import { useActionState, useId } from "react";
import { askForIntroduction } from "@/app/clubhouse/directory/actions";
import { initialIntroState } from "@/lib/form-state";
import { INTRO } from "@/content/clubhouse";
import { Button } from "@/components/button";

/**
 * Asking to be introduced to another member.
 *
 * This goes to the CLUB TEAM. It does not email the other member and it does
 * not tell them a request was made. That is the whole point of the benefit:
 * introductions are made properly, with context, by a person, rather than by
 * firing a notification at somebody.
 */
export function IntroForm({
  targetId,
  targetName,
}: {
  targetId: string;
  targetName: string;
}) {
  const [state, action, pending] = useActionState(
    askForIntroduction,
    initialIntroState,
  );
  const reasonId = useId();

  if (state.status === "success") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="mt-4 font-body text-[15px] leading-relaxed text-ink"
      >
        {INTRO.success}
      </p>
    );
  }

  return (
    <form action={action} className="mt-4 font-body">
      <input type="hidden" name="targetId" value={targetId} />

      <p className="text-[15px] leading-relaxed text-ink-muted">
        {INTRO.intro.replace("{name}", targetName.split(" ")[0])}
      </p>

      <div className="mt-6">
        <label htmlFor={reasonId} className="fwd-float">
          {INTRO.reasonLabel}
        </label>
        <textarea
        id={reasonId}
        name="reason"
        placeholder={INTRO.reasonLabel}
        rows={4}
        disabled={pending}
        aria-invalid={state.status === "error" ? true : undefined}
          className="fwd-field w-full border border-border bg-surface px-5 py-3 text-base text-ink disabled:opacity-60"
        />
      </div>
      <p className="mt-1.5 text-[13px] text-ink-muted/80">{INTRO.reasonHint}</p>

      <Button type="submit" size="lg" disabled={pending} className="mt-6">
        {pending ? INTRO.sending : INTRO.submit}
      </Button>

      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-ink">
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
