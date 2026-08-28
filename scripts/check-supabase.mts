/**
 * check-supabase.mts
 * ---------------------------------------------------------------------------
 * Proves the real Supabase project is set up correctly.
 *
 * This is a different job from `npm run check:db`, which runs the migrations
 * against a throwaway Postgres in memory and proves the SQL is right. This one
 * connects to the actual project and proves that the SQL was actually run, that
 * the keys work, and that nothing is exposed that should not be.
 *
 * It writes one obviously fake sign-up and deletes it again, because keys that
 * parse are not the same as a database you can write to.
 *
 * Run it right after pasting the keys into .env.local:
 *
 *   npm run check:supabase
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

/**
 * Reads .env.local.
 *
 * Next.js does this for the site automatically, but a script run on its own
 * does not, and this is deliberately not pulling in a package to do fifteen
 * lines of work. Anything already in the environment wins, so a value can still
 * be passed on the command line.
 */
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
    // Strip one matching pair of quotes, which is how SETUP.md tells people to
    // write these.
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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let failures = 0;
let warnings = 0;

function pass(label: string, detail = "") {
  console.log(`  pass  ${label}${detail ? `  ${detail}` : ""}`);
}
function fail(label: string, fix: string) {
  failures += 1;
  console.log(`  FAIL  ${label}`);
  console.log(`        ${fix}`);
}
function warn(label: string, detail: string) {
  warnings += 1;
  console.log(`  note  ${label}`);
  console.log(`        ${detail}`);
}

if (!url || !serviceKey) {
  console.log("\nSupabase is not connected yet.\n");
  console.log("  Add these two lines to .env.local, then run this again:\n");
  console.log('    NEXT_PUBLIC_SUPABASE_URL="https://YOURPROJECT.supabase.co"');
  console.log('    SUPABASE_SERVICE_ROLE_KEY="the service_role key"\n');
  console.log("  Both are in Supabase under Project Settings, then API keys.");
  console.log("  SETUP.md section 1 has the whole thing.\n");
  process.exit(1);
}

// The service_role key is a JWT with its role in the payload. Pasting the anon
// key here instead is the single most common mistake, and it fails later in a
// way that looks like a permissions problem rather than a wrong key.
function roleOf(jwt: string): string | null {
  try {
    const payload = JSON.parse(
      Buffer.from(jwt.split(".")[1], "base64").toString("utf8"),
    );
    return typeof payload.role === "string" ? payload.role : null;
  } catch {
    return null;
  }
}

const db = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Every table the six migrations create. */
const TABLES = [
  "signups",
  "applications",
  "members",
  "login_codes",
  "events",
  "invitations",
  "rsvps",
  "intro_requests",
  "newsletter_issues",
  "content_items",
  "merch_items",
  "merch_claims",
] as const;

console.log("\nSupabase\n");

console.log("The keys:");
{
  const role = roleOf(serviceKey);
  if (role === "service_role") {
    pass("the key is a service_role key");
  } else if (role === "anon") {
    fail(
      "SUPABASE_SERVICE_ROLE_KEY is the anon key, not the service_role key",
      "In Supabase: Project Settings, API keys. Copy the one labelled service_role, not anon.",
    );
  } else if (role) {
    fail(
      `the key says its role is "${role}", which is neither anon nor service_role`,
      "Copy the service_role key from Project Settings, API keys.",
    );
  } else {
    // Supabase's newer publishable/secret keys are not JWTs, so an unreadable
    // payload is not by itself wrong.
    warn(
      "could not read the key's role",
      "Not a JWT, so this is probably one of the newer secret keys. The checks below still tell you whether it works.",
    );
  }

  try {
    const host = new URL(url).host;
    pass("the project URL parses", host);
  } catch {
    fail(
      "NEXT_PUBLIC_SUPABASE_URL is not a URL",
      'It should look like "https://abcdefgh.supabase.co", with no path on the end.',
    );
  }
}

console.log("\nReaching the project:");
{
  // Distinguishes "cannot get there at all" from "got there, tables missing".
  // Without this, an unreachable project reports all twelve tables as missing,
  // which sends you to re-run migrations that were never the problem.
  let reachable = false;
  let why = "";
  try {
    const response = await fetch(`${url}/rest/v1/`, {
      headers: { apikey: serviceKey },
      signal: AbortSignal.timeout(15_000),
    });
    reachable = response.status < 500;
    if (!reachable) why = `the project answered ${response.status}`;
  } catch (error) {
    why = error instanceof Error ? error.message : String(error);
  }

  if (reachable) {
    pass("the project answered");
  } else {
    fail(
      `could not reach ${url}`,
      `${why}. Check the project URL is right and that the project is not paused. A free Supabase project pauses itself after a week with no traffic; open it in the dashboard to wake it.`,
    );
    console.log("\nStopping here: nothing below can be checked without a connection.\n");
    process.exit(1);
  }
}

console.log("\nThe tables the migrations create:");
{
  const missing: string[] = [];
  for (const table of TABLES) {
    const { error } = await db.from(table).select("*", { head: true, count: "exact" });
    if (error) missing.push(table);
  }
  if (missing.length === 0) {
    pass(`all ${TABLES.length} exist and can be read`);
  } else {
    fail(
      `${missing.length} missing or unreadable: ${missing.join(", ")}`,
      "Run the files in supabase/migrations in number order in the SQL editor. SETUP.md step 4.",
    );
  }
}

console.log("\nWriting, then deleting again:");
{
  // Obviously fake, and on a domain reserved by the RFCs for exactly this, so
  // it can never collide with a real person's address.
  const address = `check-supabase-${Date.now()}@example.invalid`;
  const { error: writeError } = await db
    .from("signups")
    .insert({ email: address, source: "holding", consented: false });

  if (writeError) {
    fail(
      "could not write a row",
      `${writeError.message}. If this says permission denied, the key is probably the anon key rather than service_role.`,
    );
  } else {
    const { data } = await db
      .from("signups")
      .select("email")
      .eq("email", address)
      .maybeSingle();
    if (data?.email === address) pass("wrote a row and read it back");
    else fail("wrote a row but could not read it back", "Check the service_role key.");

    const { error: deleteError } = await db
      .from("signups")
      .delete()
      .eq("email", address);
    if (deleteError) {
      fail(
        `could not delete the test row ${address}`,
        "Delete it by hand in the table editor so it does not sit in your sign-ups.",
      );
    } else {
      pass("deleted it again, so nothing was left behind");
    }
  }
}

console.log("\nWhat the public can reach:");
{
  // The brief is explicit: nothing in the directory may be publicly reachable.
  // Row level security with no policies is what enforces that, and the way to
  // prove it is to try, with the key a browser would have.
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!anonKey) {
    warn(
      "the anon key is not set, so this could not be tested from the outside",
      'Optional: add NEXT_PUBLIC_SUPABASE_ANON_KEY="the anon key" to .env.local and run this again. Nothing on the site needs it; it is only used to prove the members table is unreachable.',
    );
  } else {
    const pub = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const exposed: string[] = [];
    for (const table of TABLES) {
      const { data, error } = await pub.from(table).select("*").limit(1);
      // Reachable rows with no error means row level security is not doing its
      // job. An error, or an empty result under RLS, is what we want.
      if (!error && data && data.length > 0) exposed.push(table);
    }
    if (exposed.length === 0) {
      pass("no table returns rows to an anonymous caller");
    } else {
      fail(
        `these return rows to anyone with the anon key: ${exposed.join(", ")}`,
        "Row level security is off, or a policy is allowing it. Re-run the migrations: every table is created with RLS enabled and no policies.",
      );
    }
  }
}

console.log("\nThe library bucket:");
{
  const { data, error } = await db.storage.listBuckets();
  if (error) {
    fail(`could not list buckets: ${error.message}`, "Check the service_role key.");
  } else {
    const library = data?.find((b) => b.name === "library");
    if (!library) {
      fail(
        "there is no bucket called library",
        'In Supabase: Storage, New bucket, name it exactly "library", and leave Public bucket OFF. SETUP.md step 6.',
      );
    } else if (library.public) {
      fail(
        "the library bucket is public",
        "Every white paper in it would have a permanent web address anyone could forward. Open the bucket's settings and switch Public off.",
      );
    } else {
      pass("exists and is private");
    }
  }
}

console.log("\nSeed data:");
{
  const { count } = await db
    .from("members")
    .select("*", { head: true, count: "exact" })
    .eq("is_dummy", true);
  const { count: real } = await db
    .from("members")
    .select("*", { head: true, count: "exact" })
    .eq("is_dummy", false);

  if ((count ?? 0) > 0) {
    pass(`${count} example members present`, "all tagged EXAMPLE in the member area");
  } else {
    warn(
      "no example members",
      "Optional. Run supabase/seed-examples.sql to look at the member area before there are real members in it.",
    );
  }
  if ((real ?? 0) > 0) {
    pass(`${real} real members`);
  }
}

console.log("");
if (failures > 0) {
  console.log(
    `${failures} thing${failures === 1 ? "" : "s"} to fix above. Nothing will save until they are.\n`,
  );
  process.exit(1);
}

// A reminder rather than a check: this file must never be committed. Matches
// the patterns that actually cover it, including a bare `.env*`.
const gitignore = readFileSync(".gitignore", "utf8");
const ignoresEnvLocal = gitignore
  .split("\n")
  .map((line) => line.trim())
  .some((line) => line === ".env*" || line === ".env*.local" || line === ".env.local");
if (!ignoresEnvLocal) {
  console.log(
    "WARNING: .env.local does not look like it is in .gitignore. The service_role key must never be committed.\n",
  );
  process.exit(1);
}

console.log(
  warnings > 0
    ? `Supabase is connected. ${warnings} optional note${warnings === 1 ? "" : "s"} above.\n`
    : "Supabase is connected.\n",
);
