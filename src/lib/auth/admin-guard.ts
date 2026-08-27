/**
 * admin-guard.ts  (server only)
 * ---------------------------------------------------------------------------
 * The check every admin page runs before it does anything else.
 *
 * WHY THIS EXISTS, AND WHY THE LAYOUT ALONE WAS NOT ENOUGH:
 *
 * The gate used to live only in the admin layout, which rendered a password
 * form instead of the page when nobody was signed in. That looked right and was
 * not: a layout and the page inside it are rendered at the same time, so the
 * page still ran, still queried the database, and its output was still sent
 * down in the response even though the browser drew the password form. With a
 * database connected, an unauthenticated request to /admin/members would have
 * carried the member list.
 *
 * Redirecting from inside the PAGE stops the page rendering at all, which is
 * the only thing that actually prevents its data being fetched and sent. This
 * is the same shape as `requireMember` in The House, which was always right
 * for the same reason.
 */

import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { ADMIN_ENABLED, ADMIN_COOKIE } from "@/lib/site-config";

export async function requireAdmin(): Promise<void> {
  if (!ADMIN_ENABLED) notFound();

  const jar = await cookies();
  if (jar.get(ADMIN_COOKIE)?.value !== "granted") {
    redirect("/admin/sign-in");
  }
}
