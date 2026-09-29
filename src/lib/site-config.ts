/**
 * site-config.ts
 * ---------------------------------------------------------------------------
 * The switches the fwd. team flips. All of them are in this one file.
 * Changing one of these changes how the site behaves. No code knowledge needed,
 * just change the word or the true/false and save.
 */

type SiteMode = "holding" | "live";

/**
 * WHAT THE PUBLIC SEES AT THE ADDRESS.
 *
 *   "holding" - the pre-launch page: the wordmark, one line, and an email
 *               capture.
 *   "live"    - the full public site.
 *
 * IT IS LIVE FROM 29 SEPTEMBER 2026. fwd.influencer.com answers with the home
 * page, and search engines are allowed in for the first time — see
 * src/app/robots.ts, which reads this same word.
 *
 * The holding page is not deleted by that. It is still at
 * src/components/holding-page.tsx and still whole; changing this word back to
 * "holding" puts it in front of the site again, along with the early access
 * gate at /early-access for anybody who needs to see past it.
 */
const DEFAULT_SITE_MODE: SiteMode = "live";

/**
 * A way to look at the full site without changing the line above.
 *
 * NEXT_PUBLIC_SITE_MODE in `.env.local` (or in Vercel) overrides the line
 * above for one place without changing it for everywhere else. Now that the
 * default is "live", the useful direction is the other one: set it to
 * "holding" to see the pre-launch page again.
 *
 * This is also how it will work once the site is online: the real address can
 * be showing the holding page while a preview address shows the full site, with
 * no code change and nothing to remember to undo.
 */
const OVERRIDE = process.env.NEXT_PUBLIC_SITE_MODE;

export const SITE_MODE: SiteMode =
  OVERRIDE === "live" || OVERRIDE === "holding" ? OVERRIDE : DEFAULT_SITE_MODE;

/*
 * THERE IS NO APPLICATIONS_OPEN SWITCH ANY MORE. It flipped the membership
 * page between the application and a waitlist sign-up, and there is no
 * waitlist: applications are the only way in, so the page has one state. If a
 * closed period is ever wanted, it is a new decision rather than a flag left
 * lying here for it.
 */

/**
 * The password for the early access route, used by the team to preview the
 * real site while the holding page is up. Set EARLY_ACCESS_PASSWORD in the
 * environment. If it is not set, early access is switched off entirely rather
 * than falling back to a guessable default.
 */
export const EARLY_ACCESS_ENABLED = Boolean(process.env.EARLY_ACCESS_PASSWORD);
export const EARLY_ACCESS_COOKIE = "fwd-early-access";

/**
 * The admin area, where the fwd. team reads applications and accepts or
 * declines them.
 *
 * Phase 1 protects it with a shared password, set as ADMIN_PASSWORD in the
 * environment. That is deliberately simple and deliberately temporary: proper
 * per-person sign in arrives with The House in Phase 2, and this gate is
 * replaced by it. If no password is set, the admin area does not exist.
 */
export const ADMIN_ENABLED = Boolean(process.env.ADMIN_PASSWORD);
export const ADMIN_COOKIE = "fwd-admin";

/**
 * THE FORWARD THINKERS PAGE IS PRIVATE UNTIL THE LIST IS ANNOUNCED.
 *
 * The list is curated, not applied for. While this is false /forward-thinkers
 * answers with the 404 page, so neither the concept nor the wording can be
 * read before the names are agreed. One word here puts it live.
 *
 * IT WAS PUBLIC FROM 15 TO 29 SEPTEMBER 2026 and is private again by request,
 * to come back another day. Everything it needs is still here: the page at
 * src/app/forward-thinkers, its copy in FORWARD_THINKERS in
 * src/content/pages.ts (Ben Jeffries and the curators included), and the
 * navigation line, commented out in src/content/hero-modules.ts. Bringing it
 * back is this word and that line.
 */
export const FORWARD_THINKERS_PUBLIC = false;

/**
 * THE CLASS OF 2026 PAGE IS PRIVATE UNTIL IT IS REVEALED.
 *
 * The founding group is curated, not applied for, and it is announced as its
 * own campaign in January 2027. Until then /class-of-2026 answers with the 404
 * page. Set this to true on the day of the reveal.
 */
export const CLASS_OF_2026_PUBLIC = false;
