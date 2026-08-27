import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { listAllMerchItems, listClaims } from "@/lib/store/merch";
import { updateClaimStatus } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Order list" };

/**
 * The order list for one item.
 *
 * This page shows delivery addresses. It is behind the admin gate and is the
 * only screen in the project that shows one member's address to anybody else.
 */
export default async function AdminMerchItemPage({
  params,
}: PageProps<"/admin/merch/[id]">) {
  await requireAdmin();
  const { id } = await params;

  const items = await listAllMerchItems();
  if (items === null) {
    return (
      <main className="flex-1 px-6 py-12 font-body">
        <p className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface-raised p-6 text-[15px] text-ink">
          The database is not connected, so there is nothing to show.
        </p>
      </main>
    );
  }

  const item = items.find((i) => i.id === id);
  if (!item) notFound();

  const claims = (await listClaims(id)) ?? [];
  const live = claims.filter((c) => c.status !== "cancelled");

  return (
    <main className="flex-1 px-6 py-12 font-body">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin/merch" className="fwd-underline text-sm text-accent">
          All merch
        </Link>

        <h1 className="mt-6 text-4xl">{item.title}</h1>
        <p className="mt-2 text-[15px] text-ink-muted">
          {live.length} to send
          {item.claim_limit ? ` · limit ${item.claim_limit}` : ""}
        </p>

        {live.length > 0 ? (
          <a
            href={`/admin/merch/${item.id}/orders.csv`}
            className="fwd-btn mt-6 inline-flex border border-border px-5 py-2.5 text-[13px] text-ink hover:border-ink"
          >
            Download the order list
          </a>
        ) : null}

        <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-ink-muted">
          The order list is a spreadsheet of names and delivery addresses, ready
          to hand to whoever is posting these. Treat the file the way you would
          treat the addresses themselves.
        </p>

        {claims.length === 0 ? (
          <p className="mt-10 text-[15px] text-ink-muted">Nobody has claimed this yet.</p>
        ) : (
          <ul className="mt-10 space-y-3">
            {claims.map((claim) => (
              <li
                key={claim.id}
                className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-border bg-surface-raised px-6 py-4"
              >
                <div className="min-w-0">
                  <p className="text-[15px] text-ink">
                    {claim.member?.name ?? "Unknown member"}
                    {claim.size ? (
                      <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-[11px] text-ink-muted">
                        {claim.size}
                      </span>
                    ) : null}
                    {claim.status === "cancelled" ? (
                      <span className="ml-2 text-[12px] text-ink-muted">(cancelled)</span>
                    ) : null}
                    {claim.status === "sent" ? (
                      <span className="ml-2 text-[12px] text-ink-muted">(sent)</span>
                    ) : null}
                  </p>
                  <p className="text-[13px] text-ink-muted">{claim.member?.email}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink">
                    {claim.recipient}
                    <br />
                    {[claim.address_1, claim.address_2, claim.city, claim.postcode, claim.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  {claim.note ? (
                    <p className="mt-2 text-[13px] text-ink-muted">{claim.note}</p>
                  ) : null}
                </div>

                <form action={updateClaimStatus} className="flex items-center gap-2">
                  <input type="hidden" name="claimId" value={claim.id} />
                  <input type="hidden" name="itemId" value={item.id} />
                  <select
                    name="status"
                    defaultValue={claim.status}
                    className="fwd-field border border-border bg-surface px-4 py-2 text-[13px] text-ink"
                  >
                    <option value="requested">To send</option>
                    <option value="sent">Sent</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button type="submit" className="fwd-btn border border-border px-4 py-2 text-[13px] text-ink hover:border-ink">
                    Save
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
