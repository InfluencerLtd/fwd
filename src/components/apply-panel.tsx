"use client";

import { useState } from "react";
import { type ApplyPath } from "@/components/apply-form";
import { TypeformEmbed } from "@/components/typeform-embed";
import { APPLY } from "@/content/site";

/*
 * THE CREATOR PATH IS THE TYPEFORM AGAIN. Asked for on 16 September 2026.
 *
 * It has been three things in five days: this Typeform, then our own form
 * (because the Typeform requires both an Instagram and a TikTok handle, which
 * turns away creators on YouTube, LinkedIn, Substack or in a podcast feed),
 * then HubSpot's creator form (which requires all three handles). Back here.
 *
 * The handle requirement lives inside Typeform, so if it needs relaxing it is
 * changed there rather than in this file.
 *
 * The brand path is unaffected: it is HubSpot's form when the two forms are
 * configured, which they now are, and ours if they ever are not.
 */
const CREATOR_TYPEFORM_ID = "01M25VECYTDKJP4AHS58KNBPWE";

/*
 * AND THE BRAND PATH IS A TYPEFORM TOO, from 16 September 2026. It was
 * HubSpot's own embedded form for a few hours this morning.
 *
 * SO BOTH APPLICATIONS NOW LIVE IN TYPEFORM. Nothing is written to our own
 * database any more, which means the admin at /admin and the accept and
 * decline emails do not see applications: they are read in Typeform instead.
 * HubspotForm and its configuration are untouched in the repo, and swapping
 * either path back is one line here.
 */
const BRAND_TYPEFORM_ID = "01M2MWYZQVW19E0R443CJGVS3Y";

import { MarkedText } from "@/components/marked";

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
        {/* Padded out to a thumb-sized target, pulled back out of the layout
            so nothing moves. Bare, a 14px line of text is 22px tall. */}
        <button
          type="button"
          onClick={() => setPath(null)}
          className="fwd-underline -my-2 py-2 font-body text-sm text-accent"
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
          <TypeformEmbed
            id={path === "creator" ? CREATOR_TYPEFORM_ID : BRAND_TYPEFORM_ID}
          />
        </div>
      </div>
    );
  }

  // THE CHOICE IS THE WHOLE STEP. No heading over it and no line under each
  // card: the two labels say what the choice is faster than anything about
  // it. Each card carries a pale blue arrow on the same line as its label, so
  // the cards are only as tall as the label, and each takes a tint of the same
  // blue on hover, so the dialog belongs to the site.
  return (
    <div>
      <p className="fwd-eyebrow text-ink-muted">{APPLY.choose.lead}</p>
      <div
        role="group"
        aria-label={APPLY.choose.lead}
        className="mt-5 grid gap-4 sm:grid-cols-2"
      >
        {(
          [
            ["creator", APPLY.choose.creator],
            ["brand", APPLY.choose.brand],
          ] as const
        ).map(([id, option]) => (
          <button
            key={id}
            type="button"
            // Focus opens on the first choice, not on the close button the
            // dialog would otherwise land on. The panel only ever renders
            // inside the apply dialog, so this never pulls a page about.
            autoFocus={id === "creator"}
            onClick={() => setPath(id)}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface-raised p-6 text-left font-body transition-colors duration-300 hover:border-accent-on-dark hover:bg-accent-on-dark/25 focus-visible:border-accent-on-dark"
          >
            <span className="block font-display text-[26px] leading-[1.1] text-ink">
              <MarkedText text={option.label} />
            </span>
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-on-dark text-lg text-photo-ground transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
