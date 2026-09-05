"use client";

import { useActionState, useId } from "react";
import { submitMembershipApplication } from "@/app/actions";
import { initialApplicationState } from "@/lib/form-state";
import { APPLY } from "@/content/site";
import { MEMBER_GROUPS } from "@/lib/brand";
import { Button } from "@/components/button";
import { fieldHint } from "@/lib/field-hint";

/**
 * The membership application.
 *
 * There are two of these, not one form with a dropdown, because the questions
 * worth asking a creator are not the questions worth asking somebody at a
 * brand. `path` says which. Both write to the same columns underneath: a
 * creator's answers go into the same role and company fields, with labels that
 * make sense for them, rather than adding columns that would sit empty for half
 * of every application.
 *
 * It is a real HTML form wired to a server action, so it still submits if
 * JavaScript is slow or fails. Every field has a visible label, every error is
 * attached to the field it belongs to and stated in words rather than only
 * shown in colour, and there is one summary at the top so a screen reader user
 * is told something is wrong without hunting for it.
 */
export type ApplyPath = "creator" | "brand";

export function ApplyForm({
  path,
  onDone,
}: {
  path: ApplyPath;
  /** Called once an application is in, so the panel can close itself. */
  onDone?: () => void;
}) {
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

  const shared = APPLY.fields.shared;
  const words = path === "creator" ? APPLY.fields.creator : APPLY.fields.brand;
  const errors = state.status === "error" ? state.fieldErrors : {};

  if (state.status === "success") {
    return (
      <div>
        <p
          role="status"
          aria-live="polite"
          className="max-w-xl font-body text-lg leading-relaxed text-ink"
        >
          {state.message}
        </p>
        {onDone ? (
          <Button type="button" size="lg" className="mt-8" onClick={onDone}>
            {APPLY.close}
          </Button>
        ) : null}
      </div>
    );
  }

  const fieldClass = (key: string) =>
    `fwd-field w-full border bg-surface-raised px-5 py-3 font-body text-base text-ink transition-colors duration-300 disabled:opacity-60 ${
      errors[key] ? "border-ink" : "border-border hover:border-ink/30"
    }`;

  return (
    <form action={formAction} className="font-body" noValidate>
      {/* The path is fixed by which form you opened, not chosen in a dropdown.
          On the creator path this is the whole answer; on the other one there
          is a smaller choice below. */}
      {path === "creator" ? (
        <input type="hidden" name="group" value="creator" />
      ) : null}

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
        <Field id={ids.name} label={shared.name} error={errors.name}>
          <input
            id={ids.name}
            name="name"
            placeholder={fieldHint(shared.name)}
            type="text"
            autoComplete="name"
            disabled={pending}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            className={fieldClass("name")}
          />
        </Field>

        <Field id={ids.email} label={shared.email} error={errors.email}>
          <input
            id={ids.email}
            name="email"
            placeholder={fieldHint(shared.email)}
            type="email"
            autoComplete="email"
            disabled={pending}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            className={fieldClass("email")}
          />
        </Field>

        <Field
          id={ids.role}
          label={words.role}
          hint={"roleHint" in words ? words.roleHint : undefined}
          error={errors.role}
        >
          <input
            id={ids.role}
            name="role"
            placeholder={fieldHint(words.role)}
            type="text"
            autoComplete={path === "brand" ? "organization-title" : "off"}
            disabled={pending}
            aria-invalid={errors.role ? true : undefined}
            aria-describedby={errors.role ? `${ids.role}-error` : undefined}
            className={fieldClass("role")}
          />
        </Field>

        <Field
          id={ids.company}
          label={words.company}
          hint={"companyHint" in words ? words.companyHint : undefined}
          error={errors.company}
        >
          <input
            id={ids.company}
            name="company"
            placeholder={fieldHint(words.company)}
            type="text"
            autoComplete={path === "brand" ? "organization" : "off"}
            disabled={pending}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? `${ids.company}-error` : undefined}
            className={fieldClass("company")}
          />
        </Field>

        {/* The group question runs across both columns. It is a question
            rather than a short answer, and in half a row the dropdown cut it
            off mid-word. */}
        {path === "brand" ? (
          <Field
            id={ids.group}
            label={APPLY.fields.brand.group}
            error={errors.group}
            className="sm:col-span-2"
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
                {APPLY.chooseOne}
              </option>
              {/* Creators have their own form, so they are not offered here. */}
              {MEMBER_GROUPS.filter((g) => g.id !== "creator").map((group) => (
                <option key={group.id} value={group.id}>
                  {group.label}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        <Field
          id={ids.market}
          label={shared.market}
          hint={shared.marketHint}
          error={errors.market}
        >
          <input
            id={ids.market}
            name="market"
            placeholder={fieldHint(shared.market)}
            type="text"
            disabled={pending}
            aria-invalid={errors.market ? true : undefined}
            aria-describedby={errors.market ? `${ids.market}-error` : undefined}
            className={fieldClass("market")}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field id={ids.link} label={words.linkLabel} optional error={errors.link}>
          <input
            id={ids.link}
            name="link"
            type="url"
            inputMode="url"
            placeholder={`${words.linkLabel} (https://)`}
            disabled={pending}
            className={fieldClass("link")}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field
          id={ids.reason}
          label={shared.reason}
          hint={shared.reasonHint}
          error={errors.reason}
        >
          <textarea
            id={ids.reason}
            name="reason"
            placeholder={shared.reason}
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

      <Button type="submit" size="lg" disabled={pending} className="mt-10 disabled:opacity-60">
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
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="fwd-float">
        {label}
        {optional ? <span className="text-ink-muted/70"> (optional)</span> : null}
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
