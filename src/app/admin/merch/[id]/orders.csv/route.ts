import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_ENABLED, ADMIN_COOKIE } from "@/lib/site-config";
import { listAllMerchItems, listClaims } from "@/lib/store/merch";

/**
 * The order list as a spreadsheet, ready to hand to whoever posts these.
 *
 * THIS FILE CONTAINS HOME ADDRESSES. It checks the admin cookie itself, because
 * a route like this is its own web address and nothing else stands in front of
 * it. It is also marked no-store, so it is not left sitting in a cache.
 */

/** Escapes a value so a comma or a quote in an address cannot break the file. */
function cell(value: string | null | undefined): string {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!ADMIN_ENABLED) return new NextResponse("Not found", { status: 404 });

  const jar = await cookies();
  if (jar.get(ADMIN_COOKIE)?.value !== "granted") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { id } = await params;

  const items = await listAllMerchItems();
  const item = items?.find((i) => i.id === id);
  if (!item) return new NextResponse("Not found", { status: 404 });

  const claims = (await listClaims(id)) ?? [];
  const toSend = claims.filter((claim) => claim.status !== "cancelled");

  const rows = [
    [
      "Member", "Email", "Item", "Size", "Send to",
      "Address 1", "Address 2", "City", "Postcode", "Country",
      "Note", "Status", "Claimed",
    ],
    ...toSend.map((claim) => [
      claim.member?.name ?? "",
      claim.member?.email ?? "",
      item.title,
      claim.size ?? "",
      claim.recipient,
      claim.address_1,
      claim.address_2,
      claim.city,
      claim.postcode,
      claim.country,
      claim.note,
      claim.status,
      claim.created_at,
    ]),
  ];

  const csv = rows.map((row) => row.map(cell).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${item.slug}-orders.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
