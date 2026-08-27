"use client";

import { useActionState, useId } from "react";
import { submitMembershipApplication } from "@/app/actions";
import { initialApplicationState } from "@/lib/form-state";
import { APPLY } from "@/content/site";
import { MEMBER_GROUPS } from "@/lib/brand";
import { Button } from "@/components/button";

/**
 * The membership application.
 *
 * Built into the site rather than embedded from a form service, so it matches
 * everything around it and so nothing about it is outside our control.
 *
 * It is a real HTML form wired to a server action, which means it still submits
 * if JavaScript is slow or fails. Every field has a visible label, every error
 * is attached to the field it belongs to, and errors are announced rather than
 * only shown in colour.
 */
export function ApplyForm() {
  const [state, formAction, pending] = useActionState(
    submitMembershipApplication,
    initialApplicationState,
  );
  const ids = {
    name: useId(),
    email: useId(),
    role: useId(),
    company: useId(),
    group: useId(),
    market: useId(),
    link: useId(),
    reason: useId(),
    consent: useId(),
    summary: useId(),
  };

  const errors = state.status === "error" ? state.fieldErrors : {};

  if (state.status === "success") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="fwd-reveal mt-10 max-w-xl font-body text-lg leading-relaxed text-ink"
      >
        {state.message}
      </p>
    );
  }

  const fieldClass = (key: string) =>
    `fwd-field mt-2 w-full border bg-surface-raised px-5 py-3 font-body text-base text-ink transition-colors duration-300 disabled:opacity-60 ${
      errors[key] ? "border-ink" : "border-border hover:border-ink/30"
    }`;

  return (
    <form action={formAction} className="mt-12 max-w-2xl font-body" noValidate>
      {/* One summary at the top, so somebody using a screen reader hears that
          something is wrong without having to hunt for it. */}
      {state.status === "error" && state.message ? (
        <p
          id={ids.summary}
          role="alert"
          className="mb-8 rounded-2xl border border-ink/20 bg-surface-raised px-5 py-3 text-sm text-ink"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={ids.name} name="name" label={APPLY.fields.name} error={errors.name}>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            disabled={pending}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            className={fieldClass("name")}
          />
        </Field>

        <Field id={ids.email} name="email" label={APPLY.fields.email} error={errors.email}>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            disabled={pending}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            className={fieldClass("email")}
          />
        </Field>

        <Field id={ids.role} name="role" label={APPLY.fields.role} error={errors.role}>
          <input
            id={ids.role}
            name="role"
            type="text"
            autoComplete="organization-title"
            disabled={pending}
            aria-invalid={errors.role ? true : undefined}
            aria-describedby={errors.role ? `${ids.role}-error` : undefined}
            className={fieldClass("role")}
          />
        </Field>

        <Field
          id={ids.company}
          name="company"
          label={APPLY.fields.company}
          error={errors.company}
        >
          <input
            id={ids.company}
            name="company"
            type="text"
            autoComplete="organization"
            disabled={pending}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? `${ids.company}-error` : undefined}
            className={fieldClass("company")}
          />
        </Field>

        <Field
          id={ids.group}
          name="group"
          label={APPLY.fields.group}
          error={errors.group}
        >
          <select
            id={ids.group}
            name="group"
            defaultValue=""
            disabled={pending}
            aria-invalid={errors.group ? true : undefined}
            aria-describedby={errors.group ? `${ids.group}-error` : undefined}
            className={fieldClass("group")}
          >
            <option value="" disabled>
              choose one
            </option>
            {MEMBER_GROUPS.map((group) => (
              <option key={group.id} value={group.id}>
                {group.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={ids.market}
          name="market"
          label={APPLY.fields.market}
          hint={APPLY.fields.marketHint}
          error={errors.market}
        >
          <input
            id={ids.market}
            name="market"
            type="text"
            disabled={pending}
            aria-invalid={errors.market ? true : undefined}
            aria-describedby={errors.market ? `${ids.market}-error` : undefined}
            className={fieldClass("market")}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field
          id={ids.link}
          name="link"
          label={APPLY.fields.link}
          optional
          error={errors.link}
        >
          <input
            id={ids.link}
            name="link"
            type="url"
            inputMode="url"
            placeholder="https://"
            disabled={pending}
            className={fieldClass("link")}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field
          id={ids.reason}
          name="reason"
          label={APPLY.fields.reason}
          hint={APPLY.fields.reasonHint}
          error={errors.reason}
        >
          <textarea
            id={ids.reason}
            name="reason"
            rows={5}
            disabled={pending}
            aria-invalid={errors.reason ? true : undefined}
            aria-describedby={errors.reason ? `${ids.reason}-error` : undefined}
            className={fieldClass("reason")}
          />
        </Field>
      </div>

      <div className="mt-8 flex items-start gap-3">
        <input
          id={ids.consent}
          name="consent"
          type="checkbox"
          disabled={pending}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? `${ids.consent}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--fwd-accent)]"
        />
        <div>
          <label
            htmlFor={ids.consent}
            className="text-[13px] leading-relaxed text-ink-muted"
          >
            {APPLY.consent}
          </label>
          {errors.consent ? (
            <p id={`${ids.consent}-error`} className="mt-1 text-[13px] text-ink">
              {errors.consent}
            </p>
          ) : null}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        variant="soft"
        disabled={pending}
        className="mt-10 disabled:opacity-60"
      >
        {pending ? APPLY.open.submitting : APPLY.open.submit}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-ink-muted">
        {label}
        {optional ? (
          <span className="text-ink-muted/70"> (optional)</span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="mt-1.5 text-[13px] text-ink-muted/80">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
