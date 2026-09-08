"use client";

import { useActionState, useId } from "react";
import { sendToBriefing } from "@/app/actions";
import { initialBriefingSubmitState } from "@/lib/form-state";
import { BRIEFING_SUBMIT } from "@/content/site";
import { Button } from "@/components/button";

const copy = BRIEFING_SUBMIT.form;

/**
 * The form behind "send something in".
 *
 * Four fields and a box. It is deliberately the same set of parts as the
 * application form — the same pill fields, the same label that floats back once
 * you have answered, the same submit button — because a second form on the same
 * site with its own manners reads as a second site.
 *
 * THE BOX IS NOT REQUIRED AND STARTS EMPTY.
 *
 * The brief called it a required checkbox and also said that unchecked by
 * default is the bit that matters, because it makes off the record the default
 * rather than a favour. Those two cannot both be true: a required box cannot be
 * left unticked, so requiring it would mean nobody could send anything in
 * without agreeing to be named, which is the opposite of the stated intent.
 *
 * So it is optional, and the sentence under it says what leaving it alone
 * means. The value is still always recorded — the column is `not null` — so
 * "we never asked" is not a state anything downstream has to interpret.
 */
export function BriefingSubmitForm({ onDone }: { onDone?: () => void } = {}) {
  const [state, action, pending] = useActionState(
    sendToBriefing,
    initialBriefingSubmitState,
  );
  const id = useId();
  const ids = {
    name: `${id}-name`,
    email: `${id}-email`,
    subject: `${id}-subject`,
    message: `${id}-message`,
    attribute: `${id}-attribute`,
  };
  const errors = state.status === "error" ? state.fieldErrors : {};

  if (state.status === "success") {
    return (
      <div>
        <p
          role="status"
          aria-live="polite"
          className="font-body text-[17px] leading-relaxed text-ink"
        >
          {copy.success}
        </p>
        {onDone ? (
          <Button type="button" variant="quiet" onClick={onDone} className="mt-7">
            {/* The dialog's own close label, so there is one way of saying it. */}
            close
          </Button>
        ) : null}
      </div>
    );
  }

  const field =
    "fwd-field w-full border border-border bg-surface-raised px-5 py-3 font-body text-base text-ink disabled:opacity-60";

  return (
    <form action={action} className="font-body">
      <p className="text-[15px] leading-relaxed text-ink-muted">{copy.intro}</p>

      <div className="mt-9 grid gap-6 sm:grid-cols-2">
        <Field id={ids.name} label={copy.name} error={errors.name}>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.name}
            disabled={pending}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            className={field}
          />
        </Field>

        <Field id={ids.email} label={copy.email} error={errors.email}>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.email}
            disabled={pending}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            className={field}
          />
        </Field>
      </div>

      <Field
        id={ids.subject}
        label={copy.subject}
        error={errors.subject}
        className="mt-6"
      >
        <input
          id={ids.subject}
          name="subject"
          type="text"
          placeholder={copy.subject}
          disabled={pending}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? `${ids.subject}-error` : undefined}
          className={field}
        />
      </Field>

      <Field
        id={ids.message}
        label={copy.message}
        error={errors.message}
        className="mt-6"
      >
        <textarea
          id={ids.message}
          name="message"
          rows={6}
          placeholder={copy.message}
          disabled={pending}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${ids.message}-error` : undefined}
          className={field}
        />
      </Field>

      <div className="mt-8 flex items-start gap-3">
        {/* No `required`, and no `defaultChecked`. Both on purpose. */}
        <input
          id={ids.attribute}
          name="attribute"
          type="checkbox"
          disabled={pending}
          aria-describedby={`${ids.attribute}-hint`}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--fwd-accent)]"
        />
        <div>
          <label
            htmlFor={ids.attribute}
            className="text-[15px] leading-relaxed text-ink"
          >
            {copy.attribute}
          </label>
          <p
            id={`${ids.attribute}-hint`}
            className="mt-1 text-[13px] leading-relaxed text-ink-muted"
          >
            {copy.attributeHint}
          </p>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="mt-10 disabled:opacity-60"
      >
        {pending ? copy.submitting : copy.submit}
      </Button>

      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-ink">
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}

/**
 * A field and the label that comes back once it has been answered. Same shape
 * as the application form's, which is where the trick is explained in full: the
 * label is hung above the field rather than laid out in the flow, so nothing
 * moves as the form is filled in. See globals.css, `.fwd-float`.
 */
function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="fwd-float">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
