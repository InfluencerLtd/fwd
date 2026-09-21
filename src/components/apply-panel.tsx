"use client";

import { useState } from "react";
import { TypeformEmbed } from "@/components/typeform-embed";
import { MarkedText } from "@/components/marked";
import { HostedBy } from "@/components/hosted-by";
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

/*
 * AND PLATFORMS HAVE A FORM OF THEIR OWN, from 17 September 2026.
 *
 * This is what the three cards were waiting for. Brand and platform shared
 * the brand form for a few hours this afternoon, told apart only by a hidden
 * field, which was the honest stopgap rather than the answer. Now each of the
 * three applicant types opens the questions written for it.
 */
const PLATFORM_TYPEFORM_ID = "01M2QZ6MQFBJFDVDVZB7XFVZDT";

/**
 * The three kinds of applicant, in the order the whole site names them.
 *
 * BRAND AND PLATFORM ARE NOT ONE CHOICE. They were a single card reading "a
 * brand or platform" until 17 September 2026, when the review asked for three
 * distinct types: a platform deciding whether to put its name forward should
 * not have to read itself as the second half of somebody else's label.
 */
type ApplicantType = "creator" | "brand" | "platform";

/**
 * WHICH FORM EACH TYPE OPENS. One form each, and nothing shared.
 *
 * The hidden `type` field that used to keep brand and platform apart on one
 * form has gone with the reason for it: three cards, three form ids, and an
 * application arrives in the Typeform written for that kind of applicant.
 */
const FORMS: Record<
  ApplicantType,
  { id: string; label: string; heading: string }
> = {
  creator: {
    id: CREATOR_TYPEFORM_ID,
    label: APPLY.choose.creator.label,
    heading: APPLY.choose.creator.heading,
  },
  brand: {
    id: BRAND_TYPEFORM_ID,
    label: APPLY.choose.brand.label,
    heading: APPLY.choose.brand.heading,
  },
  platform: {
    id: PLATFORM_TYPEFORM_ID,
    label: APPLY.choose.platform.label,
    heading: APPLY.choose.platform.heading,
  },
};

const TYPES: readonly ApplicantType[] = ["creator", "brand", "platform"];

/**
 * The three application paths, and the form for whichever is chosen.
 *
 * On the membership page the form sits on the page rather than behind another
 * click. Somebody who has got this far has already said yes twice, on the home
 * page and by coming here, so asking again would be asking one time too many.
 */
export function ApplyPanel() {
  const [type, setType] = useState<ApplicantType | null>(null);

  if (type) {
    const form = FORMS[type];
    return (
      <div>
        {/* Padded out to a thumb-sized target, pulled back out of the layout
            so nothing moves. Bare, a 14px line of text is 22px tall. */}
        <button
          type="button"
          onClick={() => setType(null)}
          className="fwd-underline -my-2 py-2 font-body text-sm text-accent"
        >
          {APPLY.back}
        </button>
        <h3 className="mt-4 text-3xl">{form.heading}</h3>
        <div className="mt-8">
          {/* Keyed on the type, so switching starts a clean form rather than
              carrying the other one's answers across. */}
          <TypeformEmbed key={type} id={form.id} />
        </div>
      </div>
    );
  }

  // THE CHOICE IS THE WHOLE STEP. No heading over it and no line under each
  // card: the labels say what the choice is faster than anything about it.
  // Each card carries a pale blue arrow on the same line as its label, so the
  // cards are only as tall as the label, and each takes a tint of the same
  // blue on hover, so the dialog belongs to the site.
  //
  // THREE ACROSS ON A WIDE SCREEN, ONE PER ROW ON A PHONE. It was a two-column
  // grid, which left a third card sitting alone on its own row.
  return (
    <div>
      <p className="fwd-eyebrow text-ink-muted">{APPLY.choose.lead}</p>
      <div
        role="group"
        aria-label={APPLY.choose.lead}
        className="mt-5 grid gap-4 sm:grid-cols-3"
      >
        {TYPES.map((id) => (
          <button
            key={id}
            type="button"
            // Focus opens on the first choice, not on the close button the
            // dialog would otherwise land on. The panel only ever renders
            // inside the apply dialog, so this never pulls a page about.
            autoFocus={id === "creator"}
            onClick={() => setType(id)}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface-raised p-5 text-left font-body transition-colors duration-300 hover:border-accent-on-dark hover:bg-accent-on-dark/25 focus-visible:border-accent-on-dark"
          >
            {/* NOWRAP, AND A SIZE DOWN FROM THE TWO-CARD VERSION. Three cards
                across a dialog leave each one a third of the width, and "a
                platform" broke over two lines in its card while the other two
                sat on one, so the row read as uneven rather than as three of
                the same thing. */}
            <span className="block whitespace-nowrap font-display text-[22px] leading-[1.1] text-ink sm:text-[24px]">
              <MarkedText text={FORMS[id].label} />
            </span>
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-on-dark text-base text-photo-ground transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </button>
        ))}
      </div>

      {/* WHO IS ASKING, at the moment somebody hands over their details.
          Influencer runs the applications and is the data controller in the
          privacy policy, so this is where "who is behind this?" matters most
          (21 September 2026). See `hostedBy` in src/lib/brand.ts. */}
      <HostedBy size="sm" className="mt-7 text-ink-muted" />
    </div>
  );
}
