import type { MetadataRoute } from "next";
import { CONTACT } from "@/lib/brand";
import { SITE_MODE, FORWARD_THINKERS_PUBLIC } from "@/lib/site-config";

/**
 * The list of pages, for search engines.
 *
 * WHY IT EXISTS. The site went live on 29 September 2026 and nothing links to
 * it from anywhere else yet, so a crawler has no way of finding the pages under
 * the home page. This is the list, and robots.txt points at it — it is also the
 * file to hand to Google Search Console.
 *
 * WHAT IS IN IT: the pages a stranger is meant to read. The member area, the
 * admin, the review pages and anything behind a flag are not here, and each of
 * them sets `noindex` of its own besides.
 *
 * It follows the same switches the rest of the site does rather than being a
 * second list to keep in step: while SITE_MODE is "holding" there is only the
 * holding page, and ForwardThinkers appears only when it is public again.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = CONTACT.siteUrl.replace(/\/$/, "");
  const now = new Date();

  if (SITE_MODE === "holding") {
    return [{ url: base, lastModified: now, priority: 1 }];
  }

  const pages = [
    { path: "", priority: 1 },
    { path: "/membership", priority: 0.8 },
    { path: "/briefing", priority: 0.8 },
    ...(FORWARD_THINKERS_PUBLIC
      ? [{ path: "/forward-thinkers", priority: 0.8 }]
      : []),
    { path: "/privacy", priority: 0.3 },
    { path: "/cookies", priority: 0.3 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    priority,
  }));
}
