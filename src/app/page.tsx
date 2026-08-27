import { cookies } from "next/headers";
import {
  SITE_MODE,
  EARLY_ACCESS_ENABLED,
  EARLY_ACCESS_COOKIE,
} from "@/lib/site-config";
import { HoldingPage } from "@/components/holding-page";

/**
 * The home page decides what a visitor sees:
 *
 *   - While SITE_MODE is "holding", everyone gets the holding page, except
 *     anyone who has unlocked early access at /early-access.
 *   - Once SITE_MODE is "live", everyone gets the full public site.
 *
 * Both live side by side. Switching between them is one word in
 * src/lib/site-config.ts, and nothing is thrown away.
 */
export default async function Home() {
  if (SITE_MODE === "holding") {
    // Only look at cookies if early access is actually switched on. Skipping it
    // otherwise lets the holding page be served as a plain static file, which
    // is as fast as a page can be.
    if (!EARLY_ACCESS_ENABLED) return <HoldingPage />;

    const jar = await cookies();
    if (jar.get(EARLY_ACCESS_COOKIE)?.value !== "granted") {
      return <HoldingPage />;
    }
  }

  return <PublicSitePlaceholder />;
}

/**
 * TEMPORARY. Replaced by the full public site, which is the next thing to be
 * built. Kept deliberately plain so nobody mistakes it for a design.
 */
function PublicSitePlaceholder() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <p className="font-body text-sm text-ink-muted">
        The full public site is not built yet. This is where it will appear.
      </p>
    </main>
  );
}
