/**
 * merch.ts  (server only)
 * ---------------------------------------------------------------------------
 * Members CLAIM merch. They do not buy it.
 *
 * There is no price, no checkout and no payment anywhere in this file, and
 * there should never be. If that ever changes it is a decision to take on
 * purpose, not something to add because a shop usually has one.
 *
 * The claims table holds home addresses of senior people at client companies.
 * It is the most sensitive thing in the project. Nothing here returns another
 * member's claim to a member: `listClaims` is for the admin only and says so.
 */

import { getServiceClient } from "@/lib/supabase";

export type MerchItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  sizes: string[];
  event_id: string | null;
  claim_limit: number | null;
  is_open: boolean;
  is_published: boolean;
  is_dummy: boolean;
};

export type MerchClaim = {
  id: string;
  item_id: string;
  member_id: string;
  size: string | null;
  recipient: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  country: string;
  note: string;
  status: "requested" | "sent" | "cancelled";
  created_at: string;
};

const ITEM_FIELDS =
  "id, slug, title, description, sizes, event_id, claim_limit, is_open, is_published, is_dummy";
const CLAIM_FIELDS =
  "id, item_id, member_id, size, recipient, address_1, address_2, city, postcode, country, note, status, created_at";

/* ========================================================================== */
/* What a member sees                                                         */
/* ========================================================================== */

export async function listMerchItems(): Promise<MerchItem[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("merch_items")
    .select(ITEM_FIELDS)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (data as MerchItem[]) ?? [];
}

export async function getMerchItem(slug: string): Promise<MerchItem | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("merch_items")
    .select(ITEM_FIELDS)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  return (data as MerchItem) ?? null;
}

/** One member's own claim on one item, or null. */
export async function getOwnClaim(
  itemId: string,
  memberId: string,
): Promise<MerchClaim | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("merch_claims")
    .select(CLAIM_FIELDS)
    .eq("item_id", itemId)
    .eq("member_id", memberId)
    .single();

  return (data as MerchClaim) ?? null;
}

/**
 * How many have been claimed. Cancelled ones do not count.
 *
 * This is a soft count used to close an item once the limit is reached. It does
 * not reserve anything, because without knowing how Bespokely handles orders
 * there is nothing real to reserve against.
 */
export async function countClaims(itemId: string): Promise<number> {
  const supabase = getServiceClient();
  if (!supabase) return 0;

  const { count } = await supabase
    .from("merch_claims")
    .select("id", { count: "exact", head: true })
    .eq("item_id", itemId)
    .neq("status", "cancelled");

  return count ?? 0;
}

/**
 * The address a member last gave us, so the form can be filled in for them.
 * Only ever their own.
 */
export async function lastAddressFor(
  memberId: string,
): Promise<Partial<MerchClaim> | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("merch_claims")
    .select("recipient, address_1, address_2, city, postcode, country")
    .eq("member_id", memberId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return (data as Partial<MerchClaim>) ?? null;
}

export type ClaimInput = {
  size: string | null;
  recipient: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  country: string;
  note: string;
};

export async function claimItem(
  itemId: string,
  memberId: string,
  input: ClaimInput,
): Promise<{ ok: boolean; reason?: string }> {
  const supabase = getServiceClient();
  if (!supabase) return { ok: false, reason: "not-configured" };

  const { error } = await supabase.from("merch_claims").upsert(
    {
      item_id: itemId,
      member_id: memberId,
      ...input,
      // Claiming again after cancelling puts it back to requested.
      status: "requested",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "item_id,member_id" },
  );

  return error ? { ok: false, reason: error.message } : { ok: true };
}

/** A member changing their mind. Their own claim only, checked by the caller. */
export async function cancelOwnClaim(
  itemId: string,
  memberId: string,
): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from("merch_claims")
    .update({ status: "cancelled", updated_at: new Date().toISOString() })
    .eq("item_id", itemId)
    .eq("member_id", memberId);

  return !error;
}

/* ========================================================================== */
/* Admin                                                                      */
/* ========================================================================== */

export async function listAllMerchItems(): Promise<MerchItem[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("merch_items")
    .select(ITEM_FIELDS)
    .order("created_at", { ascending: false });

  return (data as MerchItem[]) ?? [];
}

export async function saveMerchItem(input: {
  id?: string;
  slug: string;
  title: string;
  description: string;
  sizes: string[];
  claim_limit: number | null;
  is_open: boolean;
  is_published: boolean;
}): Promise<{ ok: boolean; reason?: string }> {
  const supabase = getServiceClient();
  if (!supabase) return { ok: false, reason: "not-configured" };

  const row = { ...input, updated_at: new Date().toISOString() };
  const { error } = input.id
    ? await supabase.from("merch_items").update(row).eq("id", input.id)
    : await supabase.from("merch_items").insert(row);

  return error ? { ok: false, reason: error.message } : { ok: true };
}

export type ClaimWithMember = MerchClaim & {
  member: { name: string; email: string } | null;
};

/**
 * The order list for the fwd. team.
 *
 * ADMIN ONLY. This returns delivery addresses. It must never be called from
 * anything a member can reach.
 */
export async function listClaims(
  itemId: string,
): Promise<ClaimWithMember[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("merch_claims")
    .select(`${CLAIM_FIELDS}, member:member_id ( name, email )`)
    .eq("item_id", itemId)
    .order("created_at", { ascending: true });

  return (data as unknown as ClaimWithMember[]) ?? [];
}

export async function setClaimStatus(
  claimId: string,
  status: "requested" | "sent" | "cancelled",
): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from("merch_claims")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", claimId);

  return !error;
}
