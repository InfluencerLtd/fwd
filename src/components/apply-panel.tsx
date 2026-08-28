"use client";

import { useState } from "react";
import { ApplyForm, type ApplyPath } from "@/components/apply-form";
import { APPLY } from "@/content/site";

/**
 * The two application paths, and the form for whichever is chosen.
 *
 * On the membership page the form sits on the page rather than behind another
 * click. Somebody who has got this far has already said yes twice, on the home
 * page and by coming here, so asking again would be asking one time too many.
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
          <ApplyForm key={path} path={path} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
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
  );
}
