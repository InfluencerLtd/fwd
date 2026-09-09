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
   * /club was the page now at /about. The word club has gone from the site —
   * brand.ts forbids it anywhere a visitor can read — but the old address may
   * already be in an email or a message, and a permanent redirect costs
   * nothing and keeps whatever link equity the page has.
   */
  async redirects() {
    return [{ source: "/club", destination: "/about", permanent: true }];
  },
};

export default nextConfig;
