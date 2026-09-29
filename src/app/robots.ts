import type { MetadataRoute } from "next";
import { SITE_MODE } from "@/lib/site-config";
import { CONTACT } from "@/lib/brand";

/**
 * What search engines are allowed to do with the site.
 *
 * WHILE THE HOLDING PAGE IS UP, NOTHING. That is what SITE_MODE decides, so
 * this needs no separate switch and cannot be forgotten: the same word in
 * src/lib/site-config.ts that opens the site to visitors is the one that opens
 * it to Google.
 *
 * The reason to bother is that the site is live at a vercel.app address before
 * it is live at its own. Vercel marks *preview* deployments as noindex on its
 * own, but a production deployment on a vercel.app domain is fair game for a
 * crawler. Without this, a holding page could be indexed under an address
 * nobody wants found, and would then be competing with the real domain for the
 * club's own name once that exists.
 *
 * Individual private routes do not rely on this. The member area, the admin and
 * the early access gate each set `noindex` in their own metadata, which is the
 * instruction that actually binds. robots.txt is a request not to look;
 * `noindex` is a request not to list, and the directory holds real people's
 * details, so it gets both.
 */
export default function robots(): MetadataRoute.Robots {
  if (SITE_MODE === "holding") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Belt and braces alongside the noindex each of these already sets.
      // /early-access is not in this list any more: the password was deleted
      // on 29 September 2026, so that route is a 404 and there is nothing to
      // ask a crawler to stay away from.
      disallow: ["/clubhouse/", "/admin/", "/review/"],
    },
    // Where the list of pages is. Nothing links to this site from anywhere
    // else yet, so this is how a crawler finds anything past the home page.
    // See src/app/sitemap.ts.
    sitemap: `${CONTACT.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
