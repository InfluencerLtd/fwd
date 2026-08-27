"use server";

/**
 * actions.ts
 * ---------------------------------------------------------------------------
 * Code that runs on the server when somebody submits a form. It never runs in
 * the visitor's browser, which is why it is safe for it to touch the database.
 */

import { HOLDING, APPLY } from "@/content/site";
import type { SignupState, ApplicationState } from "@/lib/form-state";
import { MEMBER_GROUPS, type MemberGroupId } from "@/lib/brand";
import { APPLICATIONS_OPEN } from "@/lib/site-config";
import { submitApplication } from "@/lib/store/applications";
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

/* ========================================================================== */
/* Membership applications                                                    */
/* ========================================================================== */

export async function submitMembershipApplication(
  _previous: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  // If applications are closed, the form on the page is a waitlist sign-up, so
  // nothing should be reaching this action. Refusing here as well means the
  // switch cannot be worked around by anyone posting to it directly.
  if (!APPLICATIONS_OPEN) {
    return {
      status: "error",
      message: APPLY.closed.intro,
      fieldErrors: {},
    };
  }

  const text = (key: string) => String(formData.get(key) ?? "").trim();

  const name = text("name");
  const email = normalizeEmail(formData.get("email"));
  const role = text("role");
  const company = text("company");
  const group = text("group");
  const market = text("market");
  const link = text("link");
  const reason = text("reason");
  const consented = formData.get("consent") === "on";

  const fieldErrors: Record<string, string> = {};

  if (!name) fieldErrors.name = APPLY.required;
  if (!email) fieldErrors.email = APPLY.required;
  else if (!looksLikeEmail(email)) fieldErrors.email = HOLDING.invalidEmail;
  if (!role) fieldErrors.role = APPLY.required;
  if (!company) fieldErrors.company = APPLY.required;
  if (!market) fieldErrors.market = APPLY.required;
  if (!reason) fieldErrors.reason = APPLY.required;

  // There are two forms. The creator one fixes the group in a hidden field, the
  // other offers the remaining three. Both are checked here rather than
  // trusted, so a group cannot be posted that the form would never have
  // offered: no creator application can arrive claiming to be a platform.
  const validGroup = MEMBER_GROUPS.some((g) => g.id === group);
  if (!validGroup) fieldErrors.group = APPLY.required;

  if (!consented) fieldErrors.consent = HOLDING.consentRequired;

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the fields marked below.",
      fieldErrors,
    };
  }

  const result = await submitApplication({
    name,
    email,
    role,
    company,
    group: group as MemberGroupId,
    market,
    link: link || null,
    reason,
  });

  if (result.status === "saved") {
    return { status: "success", message: APPLY.open.success };
  }

  if (result.status === "not-configured") {
    console.error(
      "[fwd.] An application was turned away because Supabase is not configured. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
    return { status: "error", message: HOLDING.notReady, fieldErrors: {} };
  }

  console.error("[fwd.] Application failed to save:", result.reason);
  return { status: "error", message: APPLY.error, fieldErrors: {} };
}
