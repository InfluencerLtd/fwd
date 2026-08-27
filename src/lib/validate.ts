/**
 * validate.ts
 * ---------------------------------------------------------------------------
 * Checks on what people type into forms. Deliberately forgiving: the job is to
 * catch genuine mistakes, not to lecture anyone about the shape of their email
 * address.
 */

/** Trims, lowercases, and collapses stray whitespace. */
export function normalizeEmail(input: unknown): string {
  return typeof input === "string" ? input.trim().toLowerCase() : "";
}

/**
 * A pragmatic email check. There is no regular expression that matches exactly
 * the set of valid email addresses, and strict ones reject real addresses. This
 * checks the shape and leaves the rest to the confirmation email.
 */
export function looksLikeEmail(email: string): boolean {
  if (email.length < 6 || email.length > 254) return false;
  if (/\s/.test(email)) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || !domain) return false;
  if (!domain.includes(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;
  if (domain.includes("..")) return false;
  return true;
}
