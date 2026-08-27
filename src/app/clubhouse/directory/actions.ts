"use server";

import { getCurrentMember } from "@/lib/auth/session";
import { getMember, requestIntroduction } from "@/lib/store/clubhouse";
import { INTRO } from "@/content/clubhouse";
import type { IntroState } from "@/lib/form-state";

export async function askForIntroduction(
  _previous: IntroState,
  formData: FormData,
): Promise<IntroState> {
  const requester = await getCurrentMember();
  if (!requester) {
    return { status: "error", message: "Please sign in again." };
  }

  const targetId = String(formData.get("targetId") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();

  if (!reason) return { status: "error", message: INTRO.required };
  if (targetId === requester.id) {
    return { status: "error", message: INTRO.error };
  }

  // Checked on the server as well as hidden in the interface, so somebody
  // cannot bypass an opt-out by posting to this action directly.
  const target = await getMember(targetId);
  if (!target) return { status: "error", message: INTRO.error };
  if (!target.introductions_opt_in) {
    return { status: "error", message: INTRO.optedOut };
  }

  const ok = await requestIntroduction(requester.id, targetId, reason);
  if (!ok) return { status: "error", message: INTRO.error };

  return { status: "success" };
}
