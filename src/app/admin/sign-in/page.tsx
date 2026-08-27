import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_ENABLED, ADMIN_COOKIE } from "@/lib/site-config";
import { AdminSignInForm } from "../sign-in-form";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminSignInPage() {
  if (!ADMIN_ENABLED) notFound();

  const jar = await cookies();
  if (jar.get(ADMIN_COOKIE)?.value === "granted") redirect("/admin");

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl">admin</h1>
        <p className="mt-3 font-body text-sm text-ink-muted">
          For the fwd. team.
        </p>
        <AdminSignInForm />
        <p className="mt-8 border-t border-border pt-6 font-body text-sm">
          <Link href="/" className="fwd-underline text-accent">
            Back to the fwd. site
          </Link>
        </p>
      </div>
    </main>
  );
}
