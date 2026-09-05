"use client";

import { useActionState, useId } from "react";
import { saveProfile } from "@/app/clubhouse/profile/actions";
import { initialProfileState } from "@/lib/form-state";
import { PROFILE } from "@/content/clubhouse";
import { Button } from "@/components/button";
import type { Member } from "@/lib/auth/session";
import { fieldHint } from "@/lib/field-hint";

export function ProfileForm({ member }: { member: Member }) {
  const [state, action, pending] = useActionState(
    saveProfile,
    initialProfileState,
  );

  const ids = {
    name: useId(),
    role: useId(),
    company: useId(),
    market: useId(),
    bio: useId(),
    link: useId(),
    newsletter: useId(),
    introductions: useId(),
  };

  const field =
    "fwd-field w-full border border-border bg-surface-raised px-5 py-3 font-body text-base text-ink transition-colors duration-300 hover:border-ink/30 disabled:opacity-60";
  const label = "fwd-float";

  return (
    <form action={action} className="mt-10 font-body" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className={label}>{PROFILE.nameLabel}</label>
          <input id={ids.name} name="name" placeholder={fieldHint(PROFILE.nameLabel)} defaultValue={member.name} disabled={pending} className={field} />
        </div>
        <div>
          <label htmlFor={ids.role} className={label}>{PROFILE.roleLabel}</label>
          <input id={ids.role} name="role" placeholder={fieldHint(PROFILE.roleLabel)} defaultValue={member.role} disabled={pending} className={field} />
        </div>
        <div>
          <label htmlFor={ids.company} className={label}>{PROFILE.companyLabel}</label>
          <input id={ids.company} name="company" placeholder={fieldHint(PROFILE.companyLabel)} defaultValue={member.company} disabled={pending} className={field} />
        </div>
        <div>
          <label htmlFor={ids.market} className={label}>{PROFILE.marketLabel}</label>
          <input id={ids.market} name="market" placeholder={fieldHint(PROFILE.marketLabel)} defaultValue={member.market} disabled={pending} className={field} />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={ids.bio} className={label}>{PROFILE.bioLabel}</label>
        <textarea id={ids.bio} name="bio" rows={4} placeholder={PROFILE.bioLabel} defaultValue={member.bio} disabled={pending} className={field} />
        <p className="mt-1.5 text-[13px] text-ink-muted/80">{PROFILE.bioHint}</p>
      </div>

      <div className="mt-6">
        <label htmlFor={ids.link} className={label}>{PROFILE.linkLabel}</label>
        <input id={ids.link} name="link" type="url" placeholder={`${PROFILE.linkLabel} (https://)`} defaultValue={member.link ?? ""} disabled={pending} className={field} />
      </div>

      {/* The boxes are 24px square rather than 20. That is the smallest a
          thing should be to hit with a thumb, and these two were the last
          controls on the site under it. The labels are joined to them by
          htmlFor, so the words are a target as well as the box. */}
      <fieldset className="mt-9">
        <legend className="block font-body text-sm text-ink-muted">{PROFILE.contactPreferences}</legend>

        <div className="mt-4 flex items-center gap-3">
          <input
            id={ids.newsletter}
            name="newsletter"
            type="checkbox"
            defaultChecked={member.newsletter_opt_in}
            disabled={pending}
            className="h-6 w-6 shrink-0 accent-[var(--fwd-accent)]"
          />
          <label htmlFor={ids.newsletter} className="text-[15px] leading-relaxed text-ink">
            {PROFILE.newsletterLabel}
          </label>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <input
            id={ids.introductions}
            name="introductions"
            type="checkbox"
            defaultChecked={member.introductions_opt_in}
            disabled={pending}
            className="h-6 w-6 shrink-0 accent-[var(--fwd-accent)]"
          />
          <label htmlFor={ids.introductions} className="text-[15px] leading-relaxed text-ink">
            {PROFILE.introsLabel}
          </label>
        </div>
      </fieldset>

      <p className="mt-9 text-[13px] text-ink-muted">
        <span className="text-ink">{PROFILE.photoLabel}. </span>
        {PROFILE.photoHint}
      </p>

      <Button type="submit" size="lg" disabled={pending} className="mt-8">
        {pending ? PROFILE.saving : PROFILE.save}
      </Button>

      <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm text-ink">
        {state.status === "success" ? PROFILE.saved : ""}
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
