/**
 * check-email.mts
 * ---------------------------------------------------------------------------
 * Proves email works before a member depends on it.
 *
 * This is the one service the site genuinely cannot do without. There are no
 * passwords anywhere in fwd.: signing in IS an email. If sending is broken then
 * no member can get into The House, no applicant hears back, and no invitation
 * arrives — and every one of those fails quietly, because the site's own part
 * worked fine.
 *
 * Four things are checked, and the last two are the ones that actually catch
 * people out:
 *
 *   The key works.
 *   The address emails come FROM is on a domain Resend has verified. An
 *     unverified domain does not warn, it refuses every send.
 *   The links inside the emails point at the real site. NEXT_PUBLIC_SITE_URL is
 *     what builds them, so if it is missing or still says localhost, the emails
 *     send perfectly and every link in them is broken for the person who got it.
 *   All five emails still render with nothing left unfilled.
 *
 * BY DEFAULT NOTHING IS SENT.
 *
 *   npm run check:email
 *   npm run check:email -- --send you@example.com
 *
 * The second sends one real sign-in email to the address you name, which is the
 * only way to prove the whole chain rather than each link of it.
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

// BEFORE the modules below are loaded, not after. src/lib/brand.ts reads
// NEXT_PUBLIC_SITE_URL the moment it is imported, so a static import at the top
// of this file would read it before .env.local had been opened and every link
// would be reported as localhost. Hence the dynamic imports further down.
loadEnvLocal();

const key = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM;

const sendIndex = process.argv.indexOf("--send");
const sendTo = sendIndex > -1 ? process.argv[sendIndex + 1] : undefined;

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

if (!key || !from) {
  console.log("\nEmail is not connected yet.\n");
  console.log("  NOTHING CAN BE SENT UNTIL IT IS. There are no passwords in");
  console.log("  fwd., so signing in is an email: without this, no member can");
  console.log("  get into The House, no applicant hears back, and no");
  console.log("  invitation arrives.\n");
  console.log("  At resend.com: make an account, add the domain emails will");
  console.log("  come from and verify it (this needs whoever runs the DNS),");
  console.log("  then create an API key. Add to .env.local:\n");
  console.log('    RESEND_API_KEY="the key"');
  console.log('    EMAIL_FROM="fwd. <hello@yourdomain>"\n');
  console.log("  SETUP.md section 2 has the whole thing.\n");
  process.exit(1);
}

const api = (path: string, init: RequestInit = {}) =>
  fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(15_000),
  });

console.log("\nEmail\n");

console.log("The key:");
{
  if (key.startsWith("re_")) pass("looks like a Resend key", "re_…");
  else
    warn(
      "does not start with re_",
      "Resend's keys do. It may still work, but check you have not pasted something else.",
    );
}

/** The bare domain out of `fwd. <hello@example.com>` or `hello@example.com`. */
const address = from.match(/<([^>]+)>/)?.[1] ?? from;
const domain = address.split("@")[1]?.trim().toLowerCase();

console.log("\nThe address emails come from:");
{
  if (!address.includes("@") || !domain) {
    fail(
      `EMAIL_FROM does not contain an email address: ${from}`,
      'It should be either hello@yourdomain or a name and one in angle brackets: "fwd. <hello@yourdomain>".',
    );
  } else {
    pass("EMAIL_FROM parses", address);
  }
}

console.log("\nThe domain, as Resend sees it:");
{
  const response = await api("/domains");
  const body = response.ok ? "" : await response.text();
  // Resend says 400 for a key that is the wrong shape and 401 for one that is
  // the right shape and not real. Both mean the same thing to whoever is
  // reading this, so they get the same sentence.
  if ([400, 401, 403].includes(response.status) && /api key/i.test(body)) {
    fail(
      `Resend rejected the key (${response.status})`,
      "It is wrong, or it has been revoked. Make a new one at resend.com, API Keys.",
    );
  } else if (!response.ok) {
    fail(`Resend answered ${response.status}`, body.slice(0, 200));
  } else {
    pass("the key works");
    const listed = (await response.json()) as {
      data?: Array<{ name: string; status: string }>;
    };
    const domains = listed.data ?? [];

    if (domain === "resend.dev") {
      warn(
        "sending from resend.dev, which is Resend's own test domain",
        "It only delivers to the address the Resend account was opened with. Everyone else gets nothing. Fine for a first look, useless for members. Add the real domain before anybody else depends on it.",
      );
    } else if (domains.length === 0) {
      fail(
        "no domain has been added to Resend at all",
        `Nothing can be sent from ${domain}. At resend.com, Domains, Add Domain, then give the DNS records it shows you to whoever runs the domain.`,
      );
    } else {
      const found = domains.find((d) => d.name.toLowerCase() === domain);
      if (!found) {
        fail(
          `${domain} is not one of the domains in this Resend account`,
          `Resend has ${domains.map((d) => d.name).join(", ")}. Either EMAIL_FROM is on the wrong domain, or that domain has not been added yet. Every send will be refused until they match.`,
        );
      } else if (found.status !== "verified") {
        fail(
          `${domain} is in Resend but its status is "${found.status}", not verified`,
          "Resend refuses every send from an unverified domain. The DNS records Resend shows for it need adding by whoever runs the domain, and verification can take a little while after that.",
        );
      } else {
        pass(`${domain} is verified`);
      }
    }
  }
}

console.log("\nWhere the links inside the emails point:");
{
  // Imported here, not at the top: see the note by loadEnvLocal.
  const { CONTACT } = await import("../src/lib/brand.js");
  const url = CONTACT.siteUrl;
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    fail(
      `NEXT_PUBLIC_SITE_URL is not set, so links fall back to ${url}`,
      "Every sign-in link, invitation and unsubscribe link in a real email would point at a machine nobody else can reach. Set it to the site's real address, here AND in Vercel.",
    );
  } else if (url.includes("localhost") || url.includes("127.0.0.1")) {
    fail(
      `links would point at ${url}`,
      "That is your own computer. Emails would send perfectly and every link in them would be broken for whoever received it.",
    );
  } else if (!url.startsWith("https://")) {
    fail(`links would point at ${url}`, "It needs to be an https address.");
  } else {
    pass("the real site", url);
  }
}

console.log("\nThe five emails, rendered:");
{
  const { renderEmail } = await import("../src/lib/email.js");
  const { EMAILS } = await import("../src/content/emails.js");
  const to = { name: "Example Person", email: "someone@example.com" };

  for (const [name, template] of Object.entries(EMAILS)) {
    // Two placeholders are filled by the caller rather than by renderEmail, so
    // they are filled here the same way, or every template would look broken.
    const filled = {
      ...template,
      subject: template.subject.replace("{event}", "An example event"),
      body: template.body.map((line) =>
        line.replace("{code}", "000000").replace("{event}", "An example event"),
      ),
    };
    const { subject, html, text } = renderEmail(filled, to);
    // A leftover {placeholder} means a template gained a variable that nothing
    // fills, and it would go out to a real person exactly like that.
    const leftover = [...`${subject} ${text}`.matchAll(/\{[a-zA-Z]+\}/g)].map((m) => m[0]);
    if (leftover.length > 0) {
      fail(
        `${name}: ${[...new Set(leftover)].join(", ")} is never filled in`,
        "It would be sent to a real person with the braces still in it. Either fill it where the email is sent, or take it out of src/content/emails.ts.",
      );
    } else if (!html.includes("<!doctype html>") || text.trim() === "") {
      fail(`${name}: rendered empty or malformed`, "Look at src/lib/email.ts.");
    } else {
      pass(name, subject);
    }
  }
}

if (sendTo) {
  console.log(`\nSending one real email to ${sendTo}:`);
  const { renderEmail } = await import("../src/lib/email.js");
  const { EMAILS } = await import("../src/content/emails.js");
  const template = {
    ...EMAILS.signIn,
    body: EMAILS.signIn.body.map((line) => line.replace("{code}", "000000")),
  };
  const { subject, html, text } = renderEmail(template, {
    name: "Connection check",
    email: sendTo,
  });

  const response = await api("/emails", {
    method: "POST",
    body: JSON.stringify({ from, to: [sendTo], subject, html, text }),
  });

  if (response.ok) {
    const { id } = (await response.json()) as { id?: string };
    pass("Resend accepted it", id ?? "");
    console.log(
      "\n  Now go and look. Accepted is not delivered: check it arrived, that it\n" +
        "  did not land in spam, and that the links in it work.",
    );
  } else {
    fail(
      `Resend refused it (${response.status})`,
      (await response.text()).slice(0, 400),
    );
  }
} else {
  console.log("\nSending:");
  warn(
    "not tested, because that would put a real email in somebody's inbox",
    "Run `npm run check:email -- --send you@example.com` to send one sign-in email to an address you can read. Everything above can pass and delivery still fail, so this is worth doing once.",
  );
}

console.log("");
if (failures > 0) {
  console.log(
    `${failures} thing${failures === 1 ? "" : "s"} to fix above. Until they are, no member can sign in.\n`,
  );
  process.exit(1);
}
console.log(
  warnings > 0
    ? `Email is connected. ${warnings} note${warnings === 1 ? "" : "s"} above.\n`
    : "Email is connected.\n",
);
