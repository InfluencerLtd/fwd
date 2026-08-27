"use server";

import { revalidatePath } from "next/cache";
import { getCurrentMember } from "@/lib/auth/session";
import {
  getMerchItem,
  getOwnClaim,
  countClaims,
  claimItem,
  cancelOwnClaim,
} from "@/lib/store/merch";
import { MERCH } from "@/content/clubhouse";
import type { ClaimState } from "@/lib/form-state";

/**
 * Claiming an item.
 *
 * The member comes from the session, never from the form, so nobody can claim
 * on somebody else's behalf. Everything else is re-checked here rather than
 * trusted from the page: whether the item is open, whether the limit has been
 * reached, and whether the chosen size is one the item actually has.
 */
export async function submitClaim(
  _previous: ClaimState,
  formData: FormData,
): Promise<ClaimState> {
  const member = await getCurrentMember();
  if (!member) return { status: "error", message: "Please sign in again." };

  const slug = String(formData.get("slug") ?? "");
  const item = await getMerchItem(slug);
  if (!item) return { status: "error", message: MERCH.error };
  if (!item.is_open) return { status: "error", message: MERCH.closed };

  const text = (key: string) => String(formData.get(key) ?? "").trim();

  const size = item.sizes.length > 0 ? text("size") : null;
  if (item.sizes.length > 0) {
    if (!size) return { status: "error", message: MERCH.sizeRequired };
    // A size not on the item would otherwise sail straight through.
    if (!item.sizes.includes(size)) {
      return { status: "error", message: MERCH.sizeRequired };
    }
  }

  const recipient = text("recipient");
  const address_1 = text("address_1");
  if (!recipient || !address_1) {
    return { status: "error", message: MERCH.required };
  }

  // Checked here, at the last moment, rather than only when the page was drawn.
  // Somebody could have taken the last one while this form was being filled in.
  const existing = await getOwnClaim(item.id, member.id);
  if (item.claim_limit !== null && !existing) {
    const taken = await countClaims(item.id);
    if (taken >= item.claim_limit) {
      return { status: "error", message: MERCH.gone };
    }
  }

  const saved = await claimItem(item.id, member.id, {
    size,
    recipient,
    address_1,
    address_2: text("address_2"),
    city: text("city"),
    postcode: text("postcode"),
    country: text("country"),
    note: text("note"),
  });

  if (!saved.ok) {
    console.error("[fwd.] Could not save a merch claim:", saved.reason);
    return { status: "error", message: MERCH.error };
  }

  revalidatePath(`/clubhouse/merch/${slug}`);
  revalidatePath("/clubhouse/merch");
  return { status: "success" };
}

export async function cancelClaim(formData: FormData): Promise<void> {
  const member = await getCurrentMember();
  if (!member) return;

  const slug = String(formData.get("slug") ?? "");
  const item = await getMerchItem(slug);
  if (!item) return;

  // Only ever their own claim: both ids are fixed by the server.
  await cancelOwnClaim(item.id, member.id);
  revalidatePath(`/clubhouse/merch/${slug}`);
  revalidatePath("/clubhouse/merch");
}
