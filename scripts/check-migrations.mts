/**
 * Runs every file in supabase/migrations against a real Postgres engine, in
 * order, on an empty database. Run it with: npm run check:db
 *
 * This does not need Docker or an account. It runs Postgres compiled to
 * WebAssembly, so it is the same engine Supabase uses and it catches the things
 * that actually go wrong in SQL: a typo, a table referenced before it is
 * created, a column that two files disagree about.
 *
 * It also checks the thing that matters most about this schema: that every
 * table has row level security switched on. The member directory holds real
 * people's contact details, and a table without RLS is readable by anybody who
 * finds the public API address.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";

const DIR = path.join(process.cwd(), "supabase", "migrations");

const db = new PGlite();
let failures = 0;

function report(ok: boolean, label: string, detail = "") {
  if (!ok) failures++;
  console.log(`  ${ok ? "pass" : "FAIL"}  ${label}${detail ? `\n        ${detail}` : ""}`);
}

const files = (await readdir(DIR)).filter((f) => f.endsWith(".sql")).sort();

console.log("\nRunning the migrations in order, on an empty database:");
for (const file of files) {
  const sql = await readFile(path.join(DIR, file), "utf8");
  try {
    await db.exec(sql);
    report(true, file);
  } catch (error) {
    report(false, file, error instanceof Error ? error.message : String(error));
  }
}

// The example data has to load cleanly too, or the walkthrough cannot happen.
console.log("\nThe example data loads:");
try {
  await db.exec(await readFile(path.join(process.cwd(), "supabase", "seed-examples.sql"), "utf8"));
  report(true, "seed-examples.sql");
} catch (error) {
  report(false, "seed-examples.sql", error instanceof Error ? error.message : String(error));
}

const dummies = await db.query<{ n: number }>(
  `select count(*)::int as n from public.members where not is_dummy`,
);
report(
  dummies.rows[0].n === 0,
  "no example member is left looking like a real one",
  dummies.rows[0].n === 0 ? "" : `${dummies.rows[0].n} member(s) not flagged as examples`,
);

console.log("\nEvery table has row level security switched on:");
const tables = await db.query<{ tablename: string; rowsecurity: boolean }>(
  `select tablename, rowsecurity from pg_tables
   where schemaname = 'public' order by tablename`,
);
for (const row of tables.rows) {
  report(row.rowsecurity, `${row.tablename}`, row.rowsecurity ? "" : "RLS IS OFF");
}

console.log("\nNo table has an access policy (all access goes through the server):");
const policies = await db.query<{ tablename: string; policyname: string }>(
  `select tablename, policyname from pg_policies where schemaname = 'public'`,
);
report(
  policies.rows.length === 0,
  `${policies.rows.length} polic${policies.rows.length === 1 ? "y" : "ies"} found`,
  policies.rows.map((p) => `${p.tablename}.${p.policyname}`).join(", "),
);

console.log("\nThe constraints behave:");
async function expectFailure(label: string, sql: string) {
  try {
    await db.exec(sql);
    report(false, label, "it was allowed, and should not have been");
  } catch {
    report(true, label);
  }
}

await db.exec(`
  insert into public.members (id, email, name, group_type)
  values ('aaaaaaaa-0000-0000-0000-000000000001', 'a@example.com', 'A', 'brand'),
         ('aaaaaaaa-0000-0000-0000-000000000002', 'b@example.com', 'B', 'creator');
`);

await expectFailure(
  "the same email cannot be two members",
  `insert into public.members (email, name, group_type)
   values ('A@Example.com', 'Duplicate', 'brand')`,
);

await expectFailure(
  "nobody can ask to be introduced to themselves",
  `insert into public.intro_requests (requester_id, target_id, reason)
   values ('aaaaaaaa-0000-0000-0000-000000000001',
           'aaaaaaaa-0000-0000-0000-000000000001', 'why')`,
);

await expectFailure(
  "a member group has to be one of the four",
  `insert into public.members (email, name, group_type)
   values ('c@example.com', 'C', 'not-a-real-group')`,
);

await db.exec(`
  insert into public.events (id, slug, title, city, format, starts_at)
  values ('bbbbbbbb-0000-0000-0000-000000000001', 'an-event', 'An event',
          'London', 'dinner', now());
`);

await expectFailure(
  "the same slug cannot be two events",
  `insert into public.events (slug, title, city, format, starts_at)
   values ('an-event', 'Another', 'Paris', 'drinks', now())`,
);

await db.exec(`
  insert into public.rsvps (event_id, member_id, response)
  values ('bbbbbbbb-0000-0000-0000-000000000001',
          'aaaaaaaa-0000-0000-0000-000000000001', 'going');
`);
await expectFailure(
  "one member cannot RSVP twice to one event",
  `insert into public.rsvps (event_id, member_id, response)
   values ('bbbbbbbb-0000-0000-0000-000000000001',
           'aaaaaaaa-0000-0000-0000-000000000001', 'not_going')`,
);

console.log(
  failures === 0 ? "\nAll checks passed.\n" : `\n${failures} check(s) FAILED.\n`,
);
process.exit(failures === 0 ? 0 : 1);
