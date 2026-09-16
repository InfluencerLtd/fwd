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
 * THE NEW EMBED, NOT hbspt.forms.create. This used the v2 script and built the
 * form in JavaScript; on 16 September 2026 it moved to the embed HubSpot now
 * hands out, which is a per-portal script plus a div it finds by itself:
 *
 *   <script src="https://js.hsforms.net/forms/embed/8236210.js" defer></script>
 *   <div class="hs-form-frame" data-region data-form-id data-portal-id></div>
 *
 * That matters because forms built in HubSpot's current editor do not reliably
 * render through the old API, and both of these were built there.
 *
 * THE SCRIPT IS ONLY FETCHED WHEN SOMEBODY CHOOSES A PATH. It is a third party
 * script on a page that has to stay fast, so nothing is requested until an
 * applicant has actually asked for a form. Somebody who reads the membership
 * page and leaves never loads it at all.
 */

/** Reads one of our fields out of a HubSpot submission, trying each alias. */
function pick(values: Record<string, unknown>, key: string): string {
  for (const name of FIELD_NAMES[key] ?? []) {
    const found = values[name];
    if (typeof found === "string" && found.trim()) return found.trim();
    if (typeof found === "boolean") return found ? "true" : "";
  }
  return "";
}

/**
 * What HubSpot posts up when somebody finishes a form.
 *
 * The new embed runs the form in an iframe and reports back with
 * window.postMessage rather than a callback, so this is the only place a copy
 * can be taken from. The shape has been stable for years: a message whose type
 * is "hsFormCallback", an eventName, and the submitted values keyed by field
 * name.
 */
type HubspotMessage = {
  type?: string;
  eventName?: string;
  id?: string;
  data?: {
    formGuid?: string;
    submissionValues?: Record<string, unknown>;
  };
};

export function HubspotForm({ path }: { path: ApplyPath }) {
  const config = hubspotFormConfig(path);
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  // The form itself: one script per portal, and a div it fills in.
  useEffect(() => {
    if (!config) return;
    const src = `https://js.hsforms.net/forms/embed/${config.portalId}.js`;
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );
    if (existing) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.addEventListener("error", () => setFailed(true));
    document.body.appendChild(script);
  }, [config]);

  // The copy of the submission. Only ever taken for a message that names this
  // form, so the creator path cannot record a brand's answers or the reverse.
  useEffect(() => {
    if (!config) return;
    const onMessage = (event: MessageEvent) => {
      const message = event.data as HubspotMessage;
      if (!message || message.type !== "hsFormCallback") return;
      if (message.eventName !== "onFormSubmitted") return;
      const guid = message.data?.formGuid ?? message.id;
      if (guid && guid !== config.formId) return;

      const values = message.data?.submissionValues ?? {};
      try {
        const first = pick(values, "firstName");
        const last = pick(values, "lastName");
        const consent = pick(values, "consent");

        void mirrorHubspotApplication({
          // HubSpot usually splits the name in two. Either shape works.
          name: pick(values, "name") || [first, last].filter(Boolean).join(" "),
          email: pick(values, "email"),
          role: pick(values, "role"),
          company: pick(values, "company"),
          // The creator form has one answer and does not ask. The other one
          // covers three groups, so it has to.
          group: path === "creator" ? "creator" : pick(values, "group"),
          market: pick(values, "market"),
          link: pick(values, "link"),
          reason: pick(values, "reason"),
          // Only true if the HubSpot form actually asked and they agreed.
          // Never assumed: this column is the proof of consent.
          consented: consent === "true",
        });
      } catch {
        // Swallowed on purpose. A copy failing is not the applicant's problem
        // and must not turn their finished application into an error on
        // screen: HubSpot has already told them they are done, and they are.
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [config, path]);

  if (!config) return null;

  return (
    <div>
      {/* HubSpot finds this by class and fills it in. The wrapper carries our
          own class so globals.css can dress whatever arrives. */}
      <div ref={host} className="fwd-hs-form-host fwd-hs-form">
        <div
          className="hs-form-frame"
          data-region={config.region}
          data-form-id={config.formId}
          data-portal-id={config.portalId}
        />
      </div>
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
