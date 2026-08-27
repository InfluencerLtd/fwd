"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { ADMIN_COOKIE } from "@/lib/site-config";
import { decideApplication, type Decision } from "@/lib/store/decisions";
import type { AdminState } from "@/lib/form-state";

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
