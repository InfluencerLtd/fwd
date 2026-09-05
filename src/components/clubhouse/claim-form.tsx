"use client";

import { useActionState, useId } from "react";
import { submitClaim, cancelClaim } from "@/app/clubhouse/merch/actions";
import { initialClaimState } from "@/lib/form-state";
import { MERCH } from "@/content/clubhouse";
import { Button } from "@/components/button";
import type { MerchClaim } from "@/lib/store/merch";
import { fieldHint } from "@/lib/field-hint";

/**
 * Claiming an item.
 *
 * There is no price, no basket and no payment step here on purpose. A member
 * says they want it and where to send it, and that is the whole transaction.
 */
export function ClaimForm({
  slug,
  sizes,
  existing,
  prefill,
}: {
  slug: string;
  sizes: string[];
  existing: MerchClaim | null;
  /** Their own last delivery address, so they do not retype it. */
  prefill: Partial<MerchClaim> | null;
}) {
  const [state, action, pending] = useActionState(submitClaim, initialClaimState);

  const ids = {
    size: useId(),
    recipient: useId(),
    address1: useId(),
    address2: useId(),
    city: useId(),
    postcode: useId(),
    country: useId(),
    note: useId(),
  };

  const claimed = state.status === "success" || existing?.status === "requested";
  const sent = existing?.status === "sent";

  const field =
    "fwd-field mt-2 w-full border border-border bg-surface-raised px-5 py-3 font-body text-base text-ink transition-colors duration-300 hover:border-ink/30 disabled:opacity-60";
  const label = "sr-only";

  const source = existing ?? prefill;

  return (
    <div className="font-body">
      {sent ? (
        <p className="rounded-2xl border border-border bg-surface-raised p-6 text-[15px] text-ink">
          {MERCH.claimedStatusSent}
        </p>
      ) : claimed ? (
        <p
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-border bg-surface-raised p-6 text-[15px] text-ink"
        >
          {MERCH.claimed}
        </p>
      ) : null}

      <form action={action} className={claimed || sent ? "mt-8" : ""} noValidate>
        <input type="hidden" name="slug" value={slug} />

        {sizes.length > 0 ? (
          <div className="max-w-xs">
            <label htmlFor={ids.size} className={label}>
              {MERCH.sizeLabel}
            </label>
            <select
              id={ids.size}
              name="size"
              defaultValue={existing?.size ?? ""}
              disabled={pending}
              className={field}
            >
              <option value="" disabled>
                {MERCH.sizePick}
              </option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="mt-6">
          <label htmlFor={ids.recipient} className={label}>
            {MERCH.recipientLabel}
          </label>
          <input
            id={ids.recipient}
            name="recipient"
            placeholder={fieldHint(MERCH.recipientLabel)}
            autoComplete="name"
            defaultValue={source?.recipient ?? ""}
            disabled={pending}
            className={field}
          />
        </div>

        <div className="mt-6">
          <label htmlFor={ids.address1} className={label}>
            {MERCH.address1Label}
          </label>
          <input
            id={ids.address1}
            name="address_1"
            placeholder={fieldHint(MERCH.address1Label)}
            autoComplete="address-line1"
            defaultValue={source?.address_1 ?? ""}
            disabled={pending}
            className={field}
          />
        </div>

        <div className="mt-4">
          <label htmlFor={ids.address2} className={label}>
            {MERCH.address2Label}{" "}
            <span className="text-ink-muted/70">({MERCH.optional})</span>
          </label>
          <input
            id={ids.address2}
            name="address_2"
            placeholder={fieldHint(MERCH.address2Label)}
            autoComplete="address-line2"
            defaultValue={source?.address_2 ?? ""}
            disabled={pending}
            className={field}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor={ids.city} className={label}>{MERCH.cityLabel}</label>
            <input id={ids.city} name="city" placeholder={fieldHint(MERCH.cityLabel)} autoComplete="address-level2" defaultValue={source?.city ?? ""} disabled={pending} className={field} />
          </div>
          <div>
            <label htmlFor={ids.postcode} className={label}>{MERCH.postcodeLabel}</label>
            <input id={ids.postcode} name="postcode" placeholder={fieldHint(MERCH.postcodeLabel)} autoComplete="postal-code" defaultValue={source?.postcode ?? ""} disabled={pending} className={field} />
          </div>
          <div>
            <label htmlFor={ids.country} className={label}>{MERCH.countryLabel}</label>
            <input id={ids.country} name="country" placeholder={fieldHint(MERCH.countryLabel)} autoComplete="country-name" defaultValue={source?.country ?? ""} disabled={pending} className={field} />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor={ids.note} className={label}>
            {MERCH.noteLabel}{" "}
            <span className="text-ink-muted/70">({MERCH.optional})</span>
          </label>
          <textarea id={ids.note} name="note" rows={3} placeholder={MERCH.noteLabel} defaultValue={source?.note ?? ""} disabled={pending} className={field} />
          <p className="mt-1.5 text-[13px] text-ink-muted/80">{MERCH.noteHint}</p>
        </div>

        <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-ink-muted">
          {MERCH.addressNote}
        </p>

        <Button type="submit" size="lg" disabled={pending} className="mt-8">
          {pending ? MERCH.claiming : claimed || sent ? MERCH.update : MERCH.claim}
        </Button>

        <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm text-ink">
          {state.status === "error" ? state.message : ""}
        </p>
      </form>

      {claimed && !sent ? (
        <form action={cancelClaim} className="mt-2">
          <input type="hidden" name="slug" value={slug} />
          <button type="submit" className="fwd-underline text-sm text-ink-muted hover:text-ink">
            {MERCH.cancel}
          </button>
        </form>
      ) : null}
    </div>
  );
}
