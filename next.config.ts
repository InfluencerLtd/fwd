import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Hides the floating Next.js indicator in the corner of the screen.
   *
   * It is a development tool, not part of the site: it never appears on the
   * real website, only on your own computer while `npm run dev` is running.
   * Off because it sits over the page and ends up in every screenshot, which
   * makes it look like something the design has to answer for.
   *
   * Compile and runtime errors are still reported. This hides the badge, not
   * the warnings.
   */
  devIndicators: false,

  /**
   * ADDRESSES THAT NO LONGER HAVE A PAGE BEHIND THEM.
   *
   * Two pages were folded into others on 17 September 2026 at the review's
   * request, and both had been linked to from the navigation for weeks, so
   * every old address still has to land somewhere sensible rather than on the
   * 404.
   *
   *   /about   the statement, the three groups and How it works are a section
   *            of the home page now, so this goes to that section
   *   /rooms   where the rooms happen and the shapes they take are a section
   *            of the membership page now
   *   /club    the page that became /about, kept from an earlier round: the
   *            word club is forbidden anywhere a visitor can read it (see
   *            src/lib/brand.ts), and this points at the same place /about
   *            does rather than through it, so it is one hop not two
   *
   * Permanent, so a search engine moves the ranking across rather than keeping
   * a page that is not there.
   */
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/club", destination: "/#about", permanent: true },
      { source: "/rooms", destination: "/membership#rooms", permanent: true },
    ];
  },
};

export default nextConfig;
