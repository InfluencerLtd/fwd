"use server";

import { revalidatePath } from "next/cache";
import { getCurrentMember } from "@/lib/auth/session";
import { updateOwnProfile } from "@/lib/store/clubhouse";
import { PROFILE } from "@/content/clubhouse";
import type { ProfileState } from "@/lib/form-state";

/**
 * A member updates their own record.
 *
 * The id comes from the session and from nowhere else. There is no member id in
 * this form, hidden or otherwise, so there is nothing to tamper with: a member
 * can only ever edit themselves.
 */
export async function saveProfile(
  _previous: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const member = await getCurrentMember();
  if (!member) return { status: "error", message: "Please sign in again." };

  const text = (key: string) => String(formData.get(key) ?? "").trim();

  const name = text("name");
  if (!name) return { status: "error", message: PROFILE.required };

  const ok = await updateOwnProfile(member.id, {
    name,
    role: text("role"),
    company: text("company"),
    market: text("market"),
    bio: text("bio"),
    link: text("link") || null,
    newsletter_opt_in: formData.get("newsletter") === "on",
    introductions_opt_in: formData.get("introductions") === "on",
  });

  if (!ok) return { status: "error", message: PROFILE.error };

  revalidatePath("/clubhouse/profile");
  revalidatePath("/clubhouse/directory");
  return { status: "success" };
}
