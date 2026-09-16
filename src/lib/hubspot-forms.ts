/**
 * hubspot-forms.ts
 * ---------------------------------------------------------------------------
 * WHICH HUBSPOT FORMS THE APPLY SECTION EMBEDS.
 *
 * This is the embedded form, which is a different thing from `hubspot.ts` next
 * to it. That file pushes an applicant into HubSpot through the API after we
 * have saved them. This file is about HubSpot's own form being what somebody
 * fills in.
 *
 * There are two, because there are two paths in: one for creators, one for
 * brands, platforms and the wider industry. They are separate forms in HubSpot
 * so marketing can change either without touching the site.
 *
 * These are NEXT_PUBLIC_ on purpose. A portal id and a form id are not secrets:
 * they are visible in the page source of every HubSpot embed on the internet.
 * The access token in `hubspot.ts` is the secret, and it never comes near the
 * browser.
 *
 * UNTIL THESE ARE SET, THE SITE USES ITS OWN FORM. Nothing breaks and nothing
 * is lost while the forms are still being built in HubSpot. Set the three
 * values and the embeds take over on the next deploy.
 */

export type ApplyPath = "creator" | "brand";

/**
 * THE REAL IDS, IN THE CODE. Given on 16 September 2026.
 *
 * They are written here rather than left to environment variables because a
 * portal id and a form id are not secrets: they are visible in the page source
 * of every HubSpot embed on the internet, and the two forms are the same on
 * every deployment. Writing them down means the forms work on a preview, in
 * production and on anybody's laptop with nothing to set up.
 *
 * The environment variables still win if they are set, so a different portal
 * can be pointed at for a test without touching this file.
 */
const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "8236210";

const FORM_IDS: Record<ApplyPath, string | undefined> = {
  creator:
    process.env.NEXT_PUBLIC_HUBSPOT_FORM_CREATOR ??
    "7f88f35a-60a9-4cc7-bfd4-f72e31a315d1",
  brand:
    process.env.NEXT_PUBLIC_HUBSPOT_FORM_BRAND ??
    "f5f2c148-ecea-4439-a0e1-4b389b62fc78",
};

/**
 * The region the portal lives in. European portals need "eu1" here or the form
 * never loads. Defaults to the North American value, which is what most
 * portals are.
 */
const REGION = process.env.NEXT_PUBLIC_HUBSPOT_REGION ?? "na1";

export type HubspotFormConfig = {
  portalId: string;
  formId: string;
  region: string;
};

export function hubspotFormConfig(path: ApplyPath): HubspotFormConfig | null {
  const formId = FORM_IDS[path];
  if (!PORTAL_ID || !formId) return null;
  return { portalId: PORTAL_ID, formId, region: REGION };
}

/**
 * True only when BOTH forms are set.
 *
 * Deliberately all or nothing. One path embedding a HubSpot form while the
 * other shows ours would mean two different looking forms, two different sets
 * of validation messages and two different places the answers land, decided by
 * which button somebody pressed. Half configured is treated as not configured.
 */
export function areHubspotFormsConfigured(): boolean {
  return Boolean(hubspotFormConfig("creator") && hubspotFormConfig("brand"));
}

/**
 * WHAT EACH OF OUR FIELDS IS CALLED IN HUBSPOT.
 *
 * The embedded form is built in HubSpot, so its fields are named by whoever
 * built it. This is the translation back to the names our own database uses,
 * and it is the one thing here that has to be checked against the real forms.
 *
 * Each entry is a list of names to try, in order. The first one present in the
 * submission wins. HubSpot's own default property names are included, so a form
 * built out of standard contact properties works with no changes at all.
 *
 * IF A FIELD IN HUBSPOT IS RENAMED, ADD THE NEW NAME HERE.
 */
export const FIELD_NAMES: Record<string, readonly string[]> = {
  name: ["name", "full_name", "fullname"],
  firstName: ["firstname", "first_name"],
  lastName: ["lastname", "last_name"],
  email: ["email"],
  role: ["role", "jobtitle", "job_title"],
  company: ["company", "company_name"],
  group: ["group", "group_type", "member_group", "membership_group"],
  market: ["market", "country", "city", "region"],
  link: ["link", "website", "profile_link", "profile"],
  reason: ["reason", "why", "message", "why_join"],
  consent: [
    "consent",
    "gdpr_consent",
    "legal_consent_subscription",
    "LEGAL_CONSENT.subscription_type_1",
  ],
} as const;
