/**
 * hubspot.ts  (server only)
 * ---------------------------------------------------------------------------
 * Pushes an applicant into HubSpot so marketing keeps its records and its
 * workflows keep working.
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE: an application is never lost because
 * HubSpot was down. The application is already saved in our own database before
 * anything here runs. If any of this fails, it reports the failure, the failure
 * is recorded against the application, and a retry can pick it up later. The
 * applicant is never shown an error for something that is not their problem.
 */

const HUBSPOT_API = "https://api.hubapi.com/crm/v3/objects/contacts";

export type HubspotContact = {
  email: string;
  name: string;
  role: string;
  company: string;
  group: string;
  market: string;
  link?: string | null;
};

export type HubspotResult =
  | { ok: true }
  /** No token set. Expected until the HubSpot account is connected. */
  | { ok: false; reason: string; configured: false }
  | { ok: false; reason: string; configured: true };

export function isHubspotConfigured(): boolean {
  return Boolean(process.env.HUBSPOT_ACCESS_TOKEN);
}

/**
 * HubSpot has no single "create or update" call, so: try to update the contact
 * by email, and if there is no such contact, create it.
 */
export async function upsertHubspotContact(
  contact: HubspotContact,
): Promise<HubspotResult> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return {
      ok: false,
      configured: false,
      reason: "HUBSPOT_ACCESS_TOKEN is not set",
    };
  }

  // HubSpot stores first and last name separately. Splitting a full name is
  // never perfectly right, so everything after the first space becomes the last
  // name and the whole thing is kept too.
  const [firstName, ...rest] = contact.name.trim().split(/\s+/);
  const lastName = rest.join(" ");

  const properties: Record<string, string> = {
    email: contact.email,
    firstname: firstName ?? "",
    lastname: lastName,
    company: contact.company,
    jobtitle: contact.role,
    // Custom properties. These must exist in the HubSpot account or HubSpot
    // rejects the whole request, so they are listed in the README.
    fwd_member_group: contact.group,
    fwd_market: contact.market,
  };
  if (contact.link) properties.fwd_profile_link = contact.link;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    // Give up rather than hanging the applicant's page on a slow third party.
    const signal = AbortSignal.timeout(8000);

    const update = await fetch(
      `${HUBSPOT_API}/${encodeURIComponent(contact.email)}?idProperty=email`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ properties }),
        signal,
      },
    );

    if (update.ok) return { ok: true };

    if (update.status === 404) {
      const create = await fetch(HUBSPOT_API, {
        method: "POST",
        headers,
        body: JSON.stringify({ properties }),
        signal: AbortSignal.timeout(8000),
      });
      if (create.ok) return { ok: true };
      return {
        ok: false,
        configured: true,
        reason: `create failed: ${create.status} ${await safeText(create)}`,
      };
    }

    return {
      ok: false,
      configured: true,
      reason: `update failed: ${update.status} ${await safeText(update)}`,
    };
  } catch (error) {
    return {
      ok: false,
      configured: true,
      reason: error instanceof Error ? error.message : "unknown network error",
    };
  }
}

/** Reads an error body without letting that throw and mask the real problem. */
async function safeText(response: Response): Promise<string> {
  try {
    return (await response.text()).slice(0, 300);
  } catch {
    return "(no body)";
  }
}
