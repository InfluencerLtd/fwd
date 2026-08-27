import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ADMIN_ENABLED, ADMIN_COOKIE } from "@/lib/site-config";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * The frame around the admin. It draws the navigation, and nothing more.
 *
 * >>> THIS IS NOT THE GATE. <<<
 *
 * A layout cannot be the gate. A layout and the page inside it render at the
 * same time, so a layout that draws a password form instead of the page does
 * not stop that page running: it still queries the database and its output is
 * still sent in the response. That was a real hole here, and it is why the gate
 * is `requireAdmin()` at the top of every admin page instead, which redirects
 * and so stops the page rendering at all.
 *
 * The actions those pages call check the cookie again for themselves too,
 * because a server action is its own address and does not go through any of
 * this.
 */
export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  if (!ADMIN_ENABLED) notFound();

  // The navigation is only drawn once somebody is signed in. This is NOT the
  // gate: see the comment above, and requireAdmin in every page.
  const jar = await cookies();
  const signedIn = jar.get(ADMIN_COOKIE)?.value === "granted";
  if (!signedIn) return <>{children}</>;

  const tabs = [
    { href: "/admin", label: "Applications" },
    { href: "/admin/members", label: "Members" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/library", label: "Library" },
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
