"use client";

import { useEffect, useRef, useState } from "react";
import { mirrorHubspotApplication } from "@/app/actions";
import {
  FIELD_NAMES,
  hubspotFormConfig,
  type ApplyPath,
} from "@/lib/hubspot-forms";
import { APPLY } from "@/content/site";

/**
 * One of HubSpot's own forms, embedded.
 *
 * HubSpot owns the fields, the validation and the thank-you message. We own
 * where it sits and what it looks like, and we take a copy of every submission
 * on its way past so the admin and the accept and decline emails carry on
 * working. See mirrorHubspotApplication in actions.ts for why that matters.
 *
 * THE SCRIPT IS ONLY FETCHED WHEN SOMEBODY CHOOSES A PATH. It is a third party
 * script on the critical path of a page that has to stay fast, so nothing is
 * requested until an applicant has actually asked for a form. Somebody who
 * reads the membership page and leaves never loads it at all.
 */

type HubspotWindow = Window & {
  hbspt?: {
    forms: {
      create(options: Record<string, unknown>): void;
    };
  };
};

/** Reads one of our fields out of a HubSpot submission, trying each alias. */
function pick(values: Record<string, unknown>, key: string): string {
  for (const name of FIELD_NAMES[key] ?? []) {
    const found = values[name];
    if (typeof found === "string" && found.trim()) return found.trim();
    if (typeof found === "boolean") return found ? "true" : "";
  }
  return "";
}

/** Everything the form holds, by field name, however HubSpot hands it over. */
function readSubmission(
  form: HTMLFormElement | null,
  data: unknown,
): Record<string, unknown> {
  const values: Record<string, unknown> = {};

  // Newer embeds pass the values straight to the callback.
  const submitted = (data as { submissionValues?: Record<string, unknown> })
    ?.submissionValues;
  if (submitted && typeof submitted === "object") Object.assign(values, submitted);

  // Older ones do not, so the form itself is read instead. Anything already
  // found above wins, because it is the value HubSpot itself reported.
  if (form) {
    for (const el of Array.from(form.elements)) {
      const field = el as HTMLInputElement;
      if (!field.name || field.name in values) continue;
      if (field.type === "checkbox") values[field.name] = field.checked;
      else if (field.type === "radio") {
        if (field.checked) values[field.name] = field.value;
      } else values[field.name] = field.value;
    }
  }

  return values;
}

export function HubspotForm({ path }: { path: ApplyPath }) {
  const config = hubspotFormConfig(path);
  const target = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!config || !target.current) return;
    const el = target.current;
    let cancelled = false;

    const create = () => {
      const w = window as HubspotWindow;
      if (cancelled || !w.hbspt) return;
      w.hbspt.forms.create({
        portalId: config.portalId,
        formId: config.formId,
        region: config.region,
        target: `#${el.id}`,
        // HubSpot's own stylesheet is not loaded. The form inherits the page,
        // which is the only way it can look like the rest of the site. See
        // .fwd-hs-form in globals.css for what dresses it.
        cssRequired: "",
        cssClass: "fwd-hs-form",

        /**
         * Runs once HubSpot has accepted the submission, so a copy is only
         * ever taken of something that really was submitted.
         *
         * Nothing here can fail in a way the applicant sees. HubSpot has
         * already told them they are done, and they are: their answers are in
         * HubSpot whatever happens next.
         */
        onFormSubmitted: (form: HTMLFormElement, data: unknown) => {
          try {
            const values = readSubmission(form, data);
            const first = pick(values, "firstName");
            const last = pick(values, "lastName");
            const consent = pick(values, "consent");

            void mirrorHubspotApplication({
              // HubSpot usually splits the name in two. Either shape works.
              name: pick(values, "name") || [first, last].filter(Boolean).join(" "),
              email: pick(values, "email"),
              role: pick(values, "role"),
              company: pick(values, "company"),
              // The creator form has one answer and does not ask. The other
              // one covers three groups, so it has to.
              group: path === "creator" ? "creator" : pick(values, "group"),
              market: pick(values, "market"),
              link: pick(values, "link"),
              reason: pick(values, "reason"),
              // Only true if the HubSpot form actually asked and they agreed.
              // Never assumed: this column is the proof of consent.
              consented: consent === "true",
            });
          } catch {
            // Swallowed on purpose. A copy failing is not the applicant's
            // problem and must not turn their finished application into an
            // error on screen.
          }
        },
      });
    };

    const w = window as HubspotWindow;
    if (w.hbspt) {
      create();
      return () => {
        cancelled = true;
      };
    }

    const SRC = "https://js.hsforms.net/forms/embed/v2.js";
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SRC}"]`,
    );
    if (!script) {
      script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", create);
    script.addEventListener("error", () => setFailed(true));

    return () => {
      cancelled = true;
      script?.removeEventListener("load", create);
    };
  }, [config, path]);

  if (!config) return null;

  return (
    <div>
      {/* An id, because HubSpot takes a selector rather than an element. */}
      <div id={`fwd-hs-${path}`} ref={target} className="fwd-hs-form-host" />
      {failed ? (
        <p
          role="status"
          className="font-body text-[15px] leading-relaxed text-ember"
        >
          {APPLY.embedUnavailable}
        </p>
      ) : null}
    </div>
  );
}
