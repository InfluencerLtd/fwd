import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ADMIN_ENABLED, ADMIN_COOKIE } from "@/lib/site-config";
import { AdminSignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * The gate on the whole admin area.
 *
 * Putting it in the layout rather than in each page means a page added later
 * cannot accidentally be left unprotected. Every page under /admin is behind
 * this, without having to remember anything.
 *
 * The actions those pages call check the cookie again for themselves, because a
 * server action can be called directly and does not go through this layout.
 */
export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  if (!ADMIN_ENABLED) notFound();

  const jar = await cookies();
  if (jar.get(ADMIN_COOKIE)?.value !== "granted") {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl">admin</h1>
          <p className="mt-3 font-body text-sm text-ink-muted">
            For the club team.
          </p>
          <AdminSignInForm />
        </div>
      </main>
    );
  }

  const tabs = [
    { href: "/admin", label: "Applications" },
    { href: "/admin/members", label: "Members" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/introductions", label: "Introductions" },
  ] as const;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-border bg-surface-raised">
        <nav
          aria-label="Admin"
          className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 font-body text-sm"
        >
          <span className="font-display text-2xl text-ink">admin</span>
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="fwd-underline text-ink-muted hover:text-ink"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
