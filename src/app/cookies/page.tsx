import type { Metadata } from "next";
import { COOKIES } from "@/content/legal";
import { LegalPage } from "@/components/legal-page";
import { areHubspotFormsConfigured } from "@/lib/hubspot-forms";

export const metadata: Metadata = { title: "Cookies" };

export default function CookiesPage() {
  /**
   * The page says HubSpot sets cookies only while HubSpot's forms are actually
   * switched on. Written as a condition rather than a sentence somebody has to
   * remember to add, because the alternative is a cookie notice that is wrong
   * for however long it takes anyone to notice.
   */
  const body = areHubspotFormsConfigured()
    ? [...COOKIES.holdingText, COOKIES.hubspotText]
    : COOKIES.holdingText;

  return <LegalPage heading={COOKIES.heading} body={body} />;
}
