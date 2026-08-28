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

/*
 * supabase/all-migrations.sql is the same six files joined together, so the
 * database can be set up in one paste rather than six. It is generated, and a
 * generated file that has drifted from its source is worse than no file: it
 * would build a database quietly missing whatever was added last.
 *
 * So it is built on a second empty database here and the two are compared,
 * table for table and column for column.
 */
console.log("\nThe one-paste file builds the same database:");
{
  const combined = new PGlite();
  const SHAPE = `select table_name, column_name, data_type
                 from information_schema.columns
                 where table_schema = 'public'
                 order by table_name, column_name`;
  try {
    await combined.exec(
      await readFile(path.join(process.cwd(), "supabase", "all-migrations.sql"), "utf8"),
    );
    report(true, "all-migrations.sql runs");

    const a = await db.query<{ table_name: string; column_name: string; data_type: string }>(SHAPE);
    const b = await combined.query<{ table_name: string; column_name: string; data_type: string }>(SHAPE);
    const key = (r: { table_name: string; column_name: string; data_type: string }) =>
      `${r.table_name}.${r.column_name}:${r.data_type}`;
    const fromFiles = a.rows.map(key);
    const fromCombined = b.rows.map(key);
    const missing = fromFiles.filter((k) => !fromCombined.includes(k));
    const extra = fromCombined.filter((k) => !fromFiles.includes(k));
    report(
      missing.length === 0 && extra.length === 0,
      `identical schema, ${fromFiles.length} columns across ${new Set(a.rows.map((r) => r.table_name)).size} tables`,
      missing.length || extra.length
        ? `missing: ${missing.join(", ") || "none"}; unexpected: ${extra.join(", ") || "none"}. Run: npm run build:sql`
        : "",
    );
  } catch (error) {
    report(
      false,
      "all-migrations.sql runs",
      `${error instanceof Error ? error.message : String(error)}. Run: npm run build:sql`,
    );
  }
  await combined.close();
}

// The example data has to load cleanly too, or the walkthrough cannot happen.
console.log("\nThe example data loads:");
try {
  await db.exec(await readFile(path.join(process.cwd(), "supabase", "seed-examples.sql"), "utf8"));
  report(true, "seed-examples.sql");
} catch (error) {
  report(false, "seed-examples.sql", error instanceof Error ? error.message : String(error));
}

for (const table of ["members", "content_items", "merch_items"]) {
  const stray = await db.query<{ n: number }>(
    `select count(*)::int as n from public.${table} where not is_dummy`,
  );
  report(
    stray.rows[0].n === 0,
    `no example ${table.replaceAll("_", " ")} row is left looking real`,
    stray.rows[0].n === 0 ? "" : `${stray.rows[0].n} row(s) not flagged as examples`,
  );
}

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

/*
 * THE CHECK THAT WAS MISSING.
 *
 * The app never inserts. It upserts, so that applying twice updates the first
 * application rather than failing. Postgres only accepts a conflict target
 * that matches a real unique index on exactly those columns, and an index on
 * lower(email) does not match a conflict target of (email).
 *
 * Every migration passed for weeks with that mismatch in place, because
 * running the SQL and running the app's actual write are different things.
 * This closes that gap: for every upsert in src/lib/store, the same conflict
 * target is tried here.
 */
console.log("\nEvery upsert the app makes has an index to conflict on:");
{
  const UPSERTS: Array<{ table: string; target: string; row: string }> = [
    { table: "signups", target: "email", row: `('a@example.com', 'holding')`.replace(/^/, "") },
    { table: "applications", target: "email", row: "" },
    { table: "members", target: "email", row: "" },
    { table: "rsvps", target: "event_id, member_id", row: "" },
    { table: "invitations", target: "event_id, member_id", row: "" },
    { table: "merch_claims", target: "item_id, member_id", row: "" },
  ];

  for (const { table, target } of UPSERTS) {
    // Asking Postgres directly whether a unique index exists whose columns are
    // exactly the conflict target. Cheaper and clearer than building a valid
    // row for every table just to watch the insert fail.
    const wanted = target.split(",").map((c) => c.trim());
    const found = await db.query<{ cols: string }>(
      `select string_agg(a.attname, ',' order by k.ord) as cols
         from pg_index i
         join pg_class c on c.oid = i.indrelid
         join lateral unnest(i.indkey) with ordinality as k(attnum, ord) on true
         join pg_attribute a on a.attrelid = c.oid and a.attnum = k.attnum
        where c.relname = $1 and i.indisunique
        group by i.indexrelid`,
      [table],
    );
    const matches = found.rows.some(
      (r) =>
        r.cols &&
        r.cols.split(",").length === wanted.length &&
        wanted.every((w) => r.cols.split(",").includes(w)),
    );
    report(
      matches,
      `${table}: on conflict (${target})`,
      matches
        ? ""
        : `No unique index on exactly (${target}). Indexes present: ${
            found.rows.map((r) => r.cols).filter(Boolean).join(" | ") || "none"
          }. An index on an expression such as lower(email) does not count, and the upsert fails at runtime with 42P10.`,
    );
  }
}

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

await db.exec(`
  insert into public.merch_items (id, slug, title)
  values ('cccccccc-0000-0000-0000-000000000001', 'an-item', 'An item');
  insert into public.merch_claims (item_id, member_id, recipient, address_1)
  values ('cccccccc-0000-0000-0000-000000000001',
          'aaaaaaaa-0000-0000-0000-000000000001', 'A Person', '1 A Street');
`);
await expectFailure(
  "one member cannot claim the same item twice",
  `insert into public.merch_claims (item_id, member_id, recipient, address_1)
   values ('cccccccc-0000-0000-0000-000000000001',
           'aaaaaaaa-0000-0000-0000-000000000001', 'A Person', '1 A Street')`,
);

// The instruction is that merch has no payment, no checkout and no pricing.
// This makes that structural rather than a thing somebody has to remember.
const priceColumns = await db.query<{ table_name: string; column_name: string }>(
  `select table_name, column_name from information_schema.columns
   where table_schema = 'public'
     and (column_name ilike '%price%' or column_name ilike '%cost%'
          or column_name ilike '%amount%' or column_name ilike '%payment%')`,
);
console.log("\nNothing in the database has a price on it:");
report(
  priceColumns.rows.length === 0,
  "no price, cost, amount or payment column anywhere",
  priceColumns.rows.map((r) => `${r.table_name}.${r.column_name}`).join(", "),
);

console.log(
  failures === 0 ? "\nAll checks passed.\n" : `\n${failures} check(s) FAILED.\n`,
);
process.exit(failures === 0 ? 0 : 1);
