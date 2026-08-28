/**
 * check-hubspot.mts
 * ---------------------------------------------------------------------------
 * Proves the HubSpot connection works before an applicant depends on it.
 *
 * There is one failure mode here that is worth a whole script on its own.
 * `upsertHubspotContact` sends three custom properties, `fwd_member_group`,
 * `fwd_market` and `fwd_profile_link`. If any of them does not exist in the
 * portal, HubSpot does not ignore it: it rejects the ENTIRE record. So a
 * missing property does not lose one field, it loses every application, and it
 * does it quietly, because the application is still saved in our own database
 * first and the applicant is still told they are done. The only trace is
 * `hubspot_last_error` on a row nobody is looking at.
 *
 * This checks for that directly, by name and by type.
 *
 * BY DEFAULT NOTHING IS WRITTEN TO YOUR CRM. Creating a contact can trigger
 * whatever workflows the portal has set up, which is not something a check
 * should do behind your back. Pass --write to create one obviously fake contact
 * and archive it again, which is the only way to prove the token can write:
 *
 *   npm run check:hubspot
 *   npm run check:hubspot -- --write
 */

import { readFileSync } from "node:fs";

/** Next.js reads .env.local for the site. A script on its own does not. */
function loadEnvLocal() {
  let text: string;
  try {
    text = readFileSync(".env.local", "utf8");
  } catch {
    return;
  }
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvLocal();

const token = process.env.HUBSPOT_ACCESS_TOKEN;
const WRITE = process.argv.includes("--write");

let failures = 0;
let warnings = 0;
const pass = (l: string, d = "") => console.log(`  pass  ${l}${d ? `  ${d}` : ""}`);
const fail = (l: string, fix: string) => {
  failures += 1;
  console.log(`  FAIL  ${l}\n        ${fix}`);
};
const warn = (l: string, d: string) => {
  warnings += 1;
  console.log(`  note  ${l}\n        ${d}`);
};

if (!token) {
  console.log("\nHubSpot is not connected yet.\n");
  console.log("  Applications are still saved without it. They are recorded as");
  console.log("  waiting, and pushed once this exists, so nothing is lost.\n");
  console.log("  In HubSpot: Settings, Integrations, Private Apps, Create a");
  console.log("  private app. Give it crm.objects.contacts.read and");
  console.log("  crm.objects.contacts.write. Then add to .env.local:\n");
  console.log('    HUBSPOT_ACCESS_TOKEN="the token"\n');
  console.log("  SETUP.md section 3 has the whole thing, including the three");
  console.log("  custom properties that have to exist first.\n");
  process.exit(1);
}

const api = (path: string, init: RequestInit = {}) =>
  fetch(`https://api.hubapi.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(15_000),
  });

console.log("\nHubSpot\n");

console.log("The token:");
{
  if (token.startsWith("pat-")) pass("looks like a private app token", "pat-…");
  else
    warn(
      "does not start with pat-",
      "Private app tokens do. An older API key or an OAuth token may still work, but check it is the private app token.",
    );

  const response = await api("/crm/v3/objects/contacts?limit=1");
  if (response.ok) {
    pass("it works, and can read contacts");
  } else if (response.status === 401) {
    fail(
      "HubSpot rejected the token (401)",
      "It is wrong, or it has been rotated. Create a new one in Settings, Integrations, Private Apps.",
    );
  } else if (response.status === 403) {
    fail(
      "the token works but is not allowed to read contacts (403)",
      "In the private app's Scopes tab, tick crm.objects.contacts.read and crm.objects.contacts.write, then save.",
    );
  } else {
    fail(
      `HubSpot answered ${response.status}`,
      (await response.text()).slice(0, 200),
    );
  }
  if (!response.ok) {
    console.log("\nStopping here: nothing below can be checked.\n");
    process.exit(1);
  }
}

console.log("\nThe three custom properties every application depends on:");
{
  // Sent by src/lib/hubspot.ts. A missing one rejects the whole record.
  const REQUIRED = ["fwd_member_group", "fwd_market", "fwd_profile_link"];
  const response = await api("/crm/v3/properties/contacts");
  if (!response.ok) {
    fail(
      `could not list contact properties (${response.status})`,
      "The token needs crm.schemas.contacts.read, or at least contacts.read.",
    );
  } else {
    const body = (await response.json()) as {
      results: Array<{ name: string; type: string; label: string }>;
    };
    const byName = new Map(body.results.map((p) => [p.name, p]));
    for (const name of REQUIRED) {
      const found = byName.get(name);
      if (!found) {
        fail(
          `${name} does not exist`,
          "HubSpot rejects the whole contact when a property it is sent does not exist, so EVERY application would fail to sync. Create it in Settings, Properties, Create property, object type Contact, field type Single-line text, internal name exactly as above.",
        );
      } else if (found.type !== "string") {
        fail(
          `${name} exists but is a ${found.type}, not text`,
          "Change it to Single-line text, or the values we send will be refused.",
        );
      } else {
        pass(name, found.label);
      }
    }
  }
}

console.log("\nThe embedded application forms:");
{
  const portal = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const creator = process.env.NEXT_PUBLIC_HUBSPOT_FORM_CREATOR;
  const brand = process.env.NEXT_PUBLIC_HUBSPOT_FORM_BRAND;

  if (!portal && !creator && !brand) {
    warn(
      "not switched on, so the site uses its own form",
      "That is a perfectly good state to be in. The site's own form still creates the HubSpot contact through the API. See SETUP.md section 3 if you want HubSpot to own the form itself.",
    );
  } else if (!portal || !creator || !brand) {
    fail(
      "only some of the three form values are set",
      "All of NEXT_PUBLIC_HUBSPOT_PORTAL_ID, NEXT_PUBLIC_HUBSPOT_FORM_CREATOR and NEXT_PUBLIC_HUBSPOT_FORM_BRAND are needed. Half configured is treated as off, so the site is silently still using its own form.",
    );
  } else {
    for (const [label, id] of [
      ["creator", creator],
      ["brand", brand],
    ] as const) {
      const response = await api(`/marketing/v3/forms/${id}`);
      if (response.ok) {
        const form = (await response.json()) as { name?: string };
        pass(`the ${label} form exists`, form.name ?? id);
      } else if (response.status === 404) {
        fail(
          `the ${label} form id is not a form in this portal`,
          `Nothing would render where the form should be. Check ${id} against the embed code HubSpot gives you.`,
        );
      } else if (response.status === 403) {
        warn(
          `could not check the ${label} form`,
          "The token has no forms scope. Add crm.objects.contacts.read plus forms if you want this checked; the form itself may be perfectly fine.",
        );
      } else {
        warn(`could not check the ${label} form`, `HubSpot answered ${response.status}.`);
      }
    }
  }
}

if (WRITE) {
  console.log("\nWriting a fake contact, then archiving it:");
  const email = `check-hubspot-${Date.now()}@example.invalid`;
  const created = await api("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        email,
        firstname: "DELETE ME",
        lastname: "connection check",
        company: "nowhere",
        jobtitle: "automated check",
        fwd_member_group: "creator",
        fwd_market: "London",
        fwd_profile_link: "https://example.invalid",
      },
    }),
  });

  if (!created.ok) {
    fail(
      `could not create a contact (${created.status})`,
      (await created.text()).slice(0, 300),
    );
  } else {
    const { id } = (await created.json()) as { id: string };
    pass("created one, with all three custom properties accepted");
    const archived = await api(`/crm/v3/objects/contacts/${id}`, { method: "DELETE" });
    if (archived.ok) pass("archived it again, so nothing is left in your CRM");
    else
      fail(
        `created the contact but could not archive it (id ${id})`,
        `Delete ${email} by hand so it does not sit in your contacts.`,
      );
  }
} else {
  console.log("\nWriting:");
  warn(
    "not tested, because writing to your CRM can set workflows off",
    "Run `npm run check:hubspot -- --write` to create one obviously fake contact and archive it again. That is the only way to prove the token can write and that the three properties are accepted together.",
  );
}

console.log("");
if (failures > 0) {
  console.log(
    `${failures} thing${failures === 1 ? "" : "s"} to fix above. Until they are, applications save but do not reach HubSpot.\n`,
  );
  process.exit(1);
}
console.log(
  warnings > 0
    ? `HubSpot is connected. ${warnings} note${warnings === 1 ? "" : "s"} above.\n`
    : "HubSpot is connected.\n",
);
