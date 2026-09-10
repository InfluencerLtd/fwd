"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { EARLY_ACCESS_COOKIE } from "@/lib/site-config";
import type { EarlyAccessState } from "@/lib/form-state";

/**
 * Compares two strings without leaking, through how long the comparison takes,
 * how much of the password was correct. Ordinary `===` on secrets can be
 * measured; this cannot.
 */
function matches(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function unlockEarlyAccess(
  _previous: EarlyAccessState,
  formData: FormData,
): Promise<EarlyAccessState> {
  // Trimmed both sides: a value saved in Vercel's multi-line box with a
  // trailing Enter or space could never be typed. Ends are never the password.
  const expected = process.env.EARLY_ACCESS_PASSWORD?.trim();
  if (!expected) return { error: "Early access is switched off." };

  const given = String(formData.get("password") ?? "").trim();
  if (!matches(given, expected)) {
    return { error: "That password is not right." };
  }

  const jar = await cookies();
  jar.set(EARLY_ACCESS_COOKIE, "granted", {
    // The browser can read nothing about this cookie from JavaScript.
    httpOnly: true,
    // Only ever sent over an encrypted connection, once live.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // A month. Long enough that the team is not retyping it constantly.
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/");
}
