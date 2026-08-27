"use server";

import { revalidatePath } from "next/cache";
import { getCurrentMember } from "@/lib/auth/session";
import { setRsvp } from "@/lib/store/clubhouse";
import type { RsvpState } from "@/lib/form-state";

/**
 * Saving an RSVP.
 *
 * The member comes from the session, never from the form. Without that, anybody
 * could RSVP as anybody else simply by editing a hidden field.
 */
export async function saveRsvp(
  previous: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const member = await getCurrentMember();
  if (!member) return { ...previous, error: "Please sign in again." };

  const eventId = String(formData.get("eventId") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const response = String(formData.get("response") ?? "");

  if (response !== "going" && response !== "not_going") {
    return { ...previous, error: "Something went wrong. Please try again." };
  }

  const ok = await setRsvp(eventId, member.id, response);
  if (!ok) {
    return { ...previous, error: "We could not save that just now. Please try again." };
  }

  revalidatePath(`/clubhouse/events/${slug}`);
  revalidatePath("/clubhouse/events");
  revalidatePath("/clubhouse");
  return { response, error: null };
}
