import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { listAllMerchItems, countClaims } from "@/lib/store/merch";
import { saveMerchEntry } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Merch" };

const field =
  "fwd-field w-full border border-border bg-surface-raised px-4 py-2.5 font-body text-[15px] text-ink";

export default async function AdminMerchPage() {
  await requireAdmin();
  const items = await listAllMerchItems();

  const taken = items
    ? Object.fromEntries(
        await Promise.all(
          items.map(async (i) => [i.id, await countClaims(i.id)] as const),
        ),
      )
    : {};

  return (
    <main className="flex-1 px-6 py-12 font-body">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl">merch</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          Members claim these. There is no payment, no checkout and no price
          anywhere, by instruction.
        </p>

        <section className="mt-10 rounded-2xl border border-border bg-surface-raised p-6">
          <h2 className="text-2xl">Add an item</h2>
          <form action={saveMerchEntry} className="mt-6 grid gap-4 sm:grid-cols-2">
            <input name="title" placeholder="Name" required className={field} />
            <input name="slug" placeholder="Short name for the address" required className={field} />
            <textarea name="description" rows={3} placeholder="Description" className={`${field} sm:col-span-2`} />
            <label className="text-[13px] text-ink-muted">
              Sizes, separated by commas. Leave empty if it has none.
              <input name="sizes" placeholder="S, M, L, XL" className={`${field} mt-1`} />
            </label>
            <label className="text-[13px] text-ink-muted">
              How many there are. Leave empty for no limit.
              <input name="claim_limit" type="number" min="1" className={`${field} mt-1`} />
            </label>
            <label className="flex items-center gap-3 text-[15px] text-ink">
              <input type="checkbox" name="is_open" defaultChecked className="h-5 w-5 accent-[var(--fwd-accent)]" />
              Open for claims
            </label>
            <label className="flex items-center gap-3 text-[15px] text-ink">
              <input type="checkbox" name="is_published" className="h-5 w-5 accent-[var(--fwd-accent)]" />
              Show to members
            </label>
            <button type="submit" className="fwd-btn bg-accent px-6 py-2.5 text-[15px] text-white hover:bg-ink sm:col-span-2 sm:justify-self-start">
              Save
            </button>
          </form>
        </section>

        {items === null ? (
          <p className="mt-10 rounded-2xl border border-border bg-surface-raised p-6 text-[15px] text-ink">
            The database is not connected, so there is nothing to show.
          </p>
        ) : items.length === 0 ? (
          <p className="mt-10 text-[15px] text-ink-muted">Nothing yet.</p>
        ) : (
          <ul className="mt-10 space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface-raised px-6 py-4"
              >
                <div>
                  <p className="text-[15px] text-ink">
                    {item.title}
                    {item.is_published ? null : (
                      <span className="ml-2 text-[12px] text-ink-muted">
                        (not shown to members)
                      </span>
                    )}
                  </p>
                  <p className="text-[13px] text-ink-muted">
                    {taken[item.id] ?? 0} claimed
                    {item.claim_limit ? ` of ${item.claim_limit}` : ""}
                    {item.sizes.length ? ` · ${item.sizes.join(", ")}` : " · no sizes"}
                    {item.is_open ? "" : " · closed"}
                  </p>
                </div>
                <Link
                  href={`/admin/merch/${item.id}`}
                  className="fwd-btn border border-border px-5 py-2 text-[13px] text-ink hover:border-ink"
                >
                  Order list
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
