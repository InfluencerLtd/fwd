"use server";

/**
 * actions.ts
 * ---------------------------------------------------------------------------
 * Code that runs on the server when somebody submits a form. It never runs in
 * the visitor's browser, which is why it is safe for it to touch the database.
 */

import { HOLDING } from "@/content/site";
import type { SignupState } from "@/lib/form-state";
import { recordSignup, type SignupSource } from "@/lib/store/signups";
import { looksLikeEmail, normalizeEmail } from "@/lib/validate";

export async function signUpForUpdates(
  _previous: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const email = normalizeEmail(formData.get("email"));
  const consented = formData.get("consent") === "on";
  const source = (formData.get("source") as SignupSource) ?? "holding";

  if (!looksLikeEmail(email)) {
    return { status: "error", message: HOLDING.invalidEmail };
  }
  if (!consented) {
    return { status: "error", message: HOLDING.consentRequired };
  }

  const result = await recordSignup(email, source);

  if (result.status === "saved") {
    return { status: "success", message: HOLDING.success };
  }

  if (result.status === "not-configured") {
    // Loud, because this means somebody put the page live before creating the
    // database and every sign-up is being turned away.
    console.error(
      "[fwd.] A sign-up was turned away because Supabase is not configured. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
    return { status: "error", message: HOLDING.notReady };
  }

  console.error("[fwd.] Sign-up failed to save:", result.reason);
  return { status: "error", message: HOLDING.error };
}
