"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { ADMIN_COOKIE } from "@/lib/site-config";
import { decideApplication, type Decision } from "@/lib/store/decisions";
import type { AdminState } from "@/lib/form-state";
import {
  addMember,
  setMemberStatus,
  saveEvent,
  recordInvitation,
  markIntroHandled,
} from "@/lib/store/admin";
import { MEMBER_GROUPS, type MemberGroupId } from "@/lib/brand";
import { invitationUrl } from "@/lib/invitations";
import { sendEmail } from "@/lib/email";
import { EMAILS } from "@/content/emails";
import {
  saveLibraryItem,
  uploadLibraryFile,
  attachFile,
  listAllLibraryItems,
} from "@/lib/store/library";
import { isKnownKind } from "@/lib/library-kinds";
import { saveMerchItem, setClaimStatus } from "@/lib/store/merch";

function matches(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function signInToAdmin(
  _previous: AdminState,
  formData: FormData,
): Promise<AdminState> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { error: "The admin area is switched off." };

  if (!matches(String(formData.get("password") ?? ""), expected)) {
    return { error: "That password is not right." };
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Shorter than early access, because this one can read applicant data.
    maxAge: 60 * 60 * 12,
  });

  revalidatePath("/admin");
  return { error: null };
}

export async function decide(formData: FormData): Promise<void> {
  // Checked here as well as on the page, so the action cannot be called
  // directly by someone who has not signed in.
  const jar = await cookies();
  if (jar.get(ADMIN_COOKIE)?.value !== "granted") return;

  const id = String(formData.get("id") ?? "");
  const decision = String(formData.get("decision") ?? "") as Decision;
  if (!id || (decision !== "accepted" && decision !== "declined")) return;

  await decideApplication(id, decision, "admin");
  revalidatePath("/admin");
}

/* ========================================================================== */
/* Members, events, invitations and introductions                             */
/* ========================================================================== */

/**
 * Every action below re-checks the admin cookie for itself.
 *
 * The layout gate protects the PAGES. A server action is a web address of its
 * own and can be called without ever loading a page, so it has to check too.
 */
async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === "granted";
}

export async function createMember(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const text = (key: string) => String(formData.get(key) ?? "").trim();
  const group = text("group");
  if (!MEMBER_GROUPS.some((g) => g.id === group)) return;

  await addMember({
    name: text("name"),
    email: text("email"),
    role: text("role"),
    company: text("company"),
    market: text("market"),
    group: group as MemberGroupId,
  });
  revalidatePath("/admin/members");
}

export async function changeMemberStatus(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (status !== "active" && status !== "paused" && status !== "removed") return;

  await setMemberStatus(id, status);
  revalidatePath("/admin/members");
}

export async function createOrUpdateEvent(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const text = (key: string) => String(formData.get(key) ?? "").trim();
  const starts = text("starts_at");
  if (!text("slug") || !text("title") || !starts) return;

  await saveEvent({
    id: text("id") || undefined,
    slug: text("slug"),
    title: text("title"),
    city: text("city"),
    format: text("format") || "dinner",
    description: text("description"),
    starts_at: new Date(starts).toISOString(),
    ends_at: text("ends_at") ? new Date(text("ends_at")).toISOString() : null,
    is_confirmed: formData.get("is_confirmed") === "on",
    is_published: formData.get("is_published") === "on",
  });
  revalidatePath("/admin/events");
}

/**
 * Sends one invitation.
 *
 * The link in the email is signed and tied to both the event and the person, so
 * they can open the invitation without signing in, and their link is not a
 * general key to the event.
 */
export async function sendInvitation(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const eventId = String(formData.get("eventId") ?? "");
  const memberId = String(formData.get("memberId") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const title = String(formData.get("title") ?? "");
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  if (!eventId || !memberId) return;

  const url = invitationUrl(slug, eventId, memberId);

  const sent = await sendEmail(
    {
      subject: EMAILS.invitation.subject.replace("{event}", title),
      body: EMAILS.invitation.body.map((line) =>
        line.replace("{event}", title).replace("{name}", name),
      ),
      action: { label: EMAILS.invitation.action.label, url },
    },
    { name, email },
  );

  if (!sent.sent) {
    console.error("[fwd.] Invitation email failed for", email, sent.reason);
    return;
  }

  await recordInvitation(eventId, memberId);
  revalidatePath(`/admin/events/${eventId}`);
}

export async function handleIntroRequest(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  await markIntroHandled(String(formData.get("id") ?? ""));
  revalidatePath("/admin/introductions");
}

/* ========================================================================== */
/* The library                                                                */
/* ========================================================================== */

export async function saveLibraryEntry(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const text = (key: string) => String(formData.get(key) ?? "").trim();

  const slug = text("slug");
  const kind = text("kind");
  if (!slug || !text("title")) return;
  // An unrecognised kind would still work, but it is almost always a typo, so
  // it is refused here rather than quietly stored.
  if (!isKnownKind(kind)) return;

  const saved = await saveLibraryItem({
    id: text("id") || undefined,
    kind,
    slug,
    title: text("title"),
    summary: text("summary"),
    body: text("body"),
    category: text("category"),
    is_published: formData.get("is_published") === "on",
  });

  if (!saved.ok) {
    console.error("[fwd.] Could not save a library item:", saved.reason);
    return;
  }

  // The file is optional, and a failed upload must not lose the item itself,
  // which has already been saved above.
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    const uploaded = await uploadLibraryFile(slug, file);
    if (!uploaded.ok || !uploaded.path) {
      console.error("[fwd.] Could not upload a library file:", uploaded.reason);
    } else {
      const items = await listAllLibraryItems();
      const item = items?.find((i) => i.slug === slug);
      if (item) await attachFile(item.id, uploaded.path, file.name, file.size);
    }
  }

  revalidatePath("/admin/library");
  revalidatePath("/clubhouse/library");
}

/* ========================================================================== */
/* Merch                                                                      */
/* ========================================================================== */

export async function saveMerchEntry(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const text = (key: string) => String(formData.get(key) ?? "").trim();
  const slug = text("slug");
  if (!slug || !text("title")) return;

  // Sizes are typed as one line, "S, M, L, XL", because that is how a person
  // thinks about them. Empty means the item has no sizes and members are not
  // asked.
  const sizes = text("sizes")
    .split(",")
    .map((size) => size.trim())
    .filter(Boolean);

  const limitText = text("claim_limit");
  const limit = limitText ? Number(limitText) : null;

  await saveMerchItem({
    id: text("id") || undefined,
    slug,
    title: text("title"),
    description: text("description"),
    sizes,
    claim_limit: Number.isFinite(limit) && limit !== null && limit > 0 ? limit : null,
    is_open: formData.get("is_open") === "on",
    is_published: formData.get("is_published") === "on",
  });

  revalidatePath("/admin/merch");
  revalidatePath("/clubhouse/merch");
}

export async function updateClaimStatus(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const claimId = String(formData.get("claimId") ?? "");
  const itemId = String(formData.get("itemId") ?? "");
  const status = String(formData.get("status") ?? "");
  if (status !== "requested" && status !== "sent" && status !== "cancelled") return;

  await setClaimStatus(claimId, status);
  revalidatePath(`/admin/merch/${itemId}`);
}
