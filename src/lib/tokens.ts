/**
 * tokens.ts  (server only)
 * ---------------------------------------------------------------------------
 * Makes links that prove who they are for without needing anyone to sign in.
 *
 * Used for the unsubscribe link in every email, and later for event invitation
 * links, where someone must be able to look at the invitation without signing
 * in but the link must not be guessable.
 *
 * A token is the thing it refers to, plus an expiry, plus a signature made
 * with a secret only the server knows. Change one character of the link and
 * the signature stops matching, so a link cannot be forged or edited.
 */

import { createHmac, timingSafeEqual } from "node:crypto";

function secret(): string {
  const value = process.env.LINK_SECRET;
  if (!value) {
    throw new Error(
      "LINK_SECRET is not set. Unsubscribe and invitation links cannot be " +
        "created or checked without it. Add it to the environment.",
    );
  }
  return value;
}

export function isLinkSecretConfigured(): boolean {
  return Boolean(process.env.LINK_SECRET);
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(payload: string): string {
  return base64url(createHmac("sha256", secret()).update(payload).digest());
}

/**
 * @param purpose what this link is for, so an unsubscribe link can never be
 *   reused as an invitation link
 * @param subject what it refers to, such as an email address or an event id
 * @param ttlSeconds how long it stays valid
 */
export function createToken(
  purpose: string,
  subject: string,
  ttlSeconds: number,
): string {
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `${purpose}:${subject}:${expires}`;
  return `${base64url(payload)}.${sign(payload)}`;
}

export type TokenCheck =
  | { valid: true; subject: string }
  | { valid: false; reason: "malformed" | "bad-signature" | "expired" };

export function readToken(purpose: string, token: string): TokenCheck {
  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false, reason: "malformed" };

  const [encodedPayload, providedSignature] = parts;

  let payload: string;
  try {
    payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
  } catch {
    return { valid: false, reason: "malformed" };
  }

  const expected = sign(payload);
  const a = Buffer.from(providedSignature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { valid: false, reason: "bad-signature" };
  }

  // The subject can itself contain colons, so only the first and last parts
  // are fixed and everything between them is the subject.
  const segments = payload.split(":");
  const tokenPurpose = segments[0];
  const expires = Number(segments[segments.length - 1]);
  const subject = segments.slice(1, -1).join(":");

  if (tokenPurpose !== purpose) return { valid: false, reason: "bad-signature" };
  if (!Number.isFinite(expires)) return { valid: false, reason: "malformed" };
  if (expires < Math.floor(Date.now() / 1000)) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true, subject };
}
