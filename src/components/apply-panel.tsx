"use client";

import { useState } from "react";
import { ApplyForm, type ApplyPath } from "@/components/apply-form";
import { HubspotForm } from "@/components/hubspot-form";
import { areHubspotFormsConfigured } from "@/lib/hubspot-forms";
import { APPLY } from "@/content/site";

/**
 * The two application paths, and the form for whichever is chosen.
 *
 * On the membership page the form sits on the page rather than behind another
 * click. Somebody who has got this far has already said yes twice, on the home
 * page and by coming here, so asking again would be asking one time too many.
 *
 * Which form appears is decided by whether HubSpot's two forms are set up. If
 * they are, they are what gets filled in, and a copy of every submission is
 * written to our own database on the way past. If they are not, our own form
 * runs exactly as it always has. Nothing is lost either way, and the swap
 * needs no code change: see src/lib/hubspot-forms.ts.
 */
export function ApplyPanel() {
  const [path, setPath] = useState<ApplyPath | null>(null);

  if (path) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setPath(null)}
          className="fwd-underline font-body text-sm text-accent"
        >
          {APPLY.back}
        </button>
        <h3 className="mt-4 text-3xl">
          {path === "creator"
            ? APPLY.fields.creator.heading
            : APPLY.fields.brand.heading}
        </h3>
        <div className="mt-8">
          {/* Keyed on the path, so switching starts a clean form rather than
              carrying the other one's answers across. */}
          {areHubspotFormsConfigured() ? (
            <HubspotForm key={path} path={path} />
          ) : (
            <ApplyForm key={path} path={path} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-display text-2xl text-ink">{APPLY.choose.heading}</h3>
      <p className="mt-2 font-body text-[15px] leading-relaxed text-ink-muted">
        {APPLY.choose.lead}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {(
        [
          ["creator", APPLY.choose.creator],
          ["brand", APPLY.choose.brand],
        ] as const
      ).map(([id, option]) => (
        <button
          key={id}
          type="button"
          onClick={() => setPath(id)}
          className="rounded-2xl border border-border bg-surface-raised p-7 text-left font-body transition-colors duration-300 hover:border-ink/30"
        >
          <span className="block font-display text-2xl text-ink">
            {option.label}
          </span>
          <span className="mt-2 block text-[15px] leading-relaxed text-ink-muted">
            {option.hint}
          </span>
          </button>
        ))}
      </div>
    </div>
  );
}
