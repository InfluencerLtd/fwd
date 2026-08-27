"use server";

import { redirect } from "next/navigation";
import { endSession, startSession } from "@/lib/auth/session";
import { requestSignInCode, verifySignInCode } from "@/lib/auth/codes";
import { safeNextPath } from "@/lib/invitations";
import { looksLikeEmail, normalizeEmail } from "@/lib/validate";
import { SIGN_IN } from "@/content/clubhouse";
import type { SignInState } from "@/lib/form-state";

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/");
}

/**
 * Step one: ask for a code.
 *
 * Note what this does NOT do. Whether or not the address belongs to a member,
 * it returns the same thing and shows the same screen. Anything else would turn
 * this form into a way of finding out who is in the club.
 */
export async function requestCode(
  _previous: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = normalizeEmail(formData.get("email"));
  const next = safeNextPath(String(formData.get("next") ?? ""));

  if (!looksLikeEmail(email)) {
    return { step: "email", email: "", next, error: SIGN_IN.invalidEmail };
  }

  const result = await requestSignInCode(email);

  if (result.status === "rate-limited") {
    return { step: "email", email, next, error: SIGN_IN.rateLimited };
  }
  if (result.status === "not-configured") {
    return { step: "email", email, next, error: SIGN_IN.notReady };
  }
  if (result.status === "failed") {
    console.error("[fwd.] Could not issue a sign-in code:", result.reason);
    return { step: "email", email, next, error: SIGN_IN.notReady };
  }

  // "sent" and "not-a-member" both land here, on purpose.
  return { step: "code", email, next, error: null };
}

/** Step two: check the code, and land them where they were going. */
export async function submitCode(
  previous: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = normalizeEmail(formData.get("email"));
  const code = String(formData.get("code") ?? "");
  const next = safeNextPath(String(formData.get("next") ?? ""));

  const result = await verifySignInCode(email, code);

  if (result.status === "ok") {
    await startSession(result.memberId);
    redirect(next);
  }

  const error =
    result.status === "too-many-attempts"
      ? SIGN_IN.tooManyAttempts
      : result.status === "not-configured"
        ? SIGN_IN.notReady
        : SIGN_IN.wrongCode;

  return { ...previous, step: "code", email, next, error };
}
