/**
 * site-config.ts
 * ---------------------------------------------------------------------------
 * The switches the club team flips. All of them are in this one file.
 * Changing one of these changes how the site behaves. No code knowledge needed,
 * just change the word or the true/false and save.
 */

type SiteMode = "holding" | "live";

/**
 * WHAT THE PUBLIC SEES AT THE ADDRESS.
 *
 *   "holding" - the pre-launch page: the wordmark, one line, and an email
 *               capture. This is what should be live from the moment the
 *               domain is registered.
 *   "live"    - the full public site.
 *
 * The holding page is never deleted when the site launches. Switch back to
 * "holding" at any point and it returns exactly as it was.
 *
 * This is the setting the real website uses. Leave it as "holding" until
 * launch day.
 */
const DEFAULT_SITE_MODE: SiteMode = "holding";

/**
 * A way to look at the full site without changing the line above.
 *
 * Put NEXT_PUBLIC_SITE_MODE="live" in `.env.local` and the site on your own
 * computer shows the full page, while the real website carries on showing the
 * holding page. Delete that line to go back.
 *
 * This is also how it will work once the site is online: the real address can
 * be showing the holding page while a preview address shows the full site, with
 * no code change and nothing to remember to undo.
 */
const OVERRIDE = process.env.NEXT_PUBLIC_SITE_MODE;

export const SITE_MODE: SiteMode =
  OVERRIDE === "live" || OVERRIDE === "holding" ? OVERRIDE : DEFAULT_SITE_MODE;

/**
 * WHETHER APPLICATIONS ARE OPEN.
 *
 *   true  - the application form is shown.
 *   false - a waitlist sign-up is shown instead, with different wording.
 *
 * The plan is a two-week open window at launch, then waitlist, so this gets
 * used. Nothing else needs changing when it does.
 */
export const APPLICATIONS_OPEN = true;

/**
 * WHETHER THE COPY HAS BEEN SIGNED OFF.
 *
 * While this is false, a small "draft copy" marker sits in the corner of every
 * page, so nobody can mistake unapproved wording for finished wording. Set it
 * to true once the words have been agreed, and the marker disappears.
 */
export const COPY_APPROVED = false;

/**
 * The password for the early access route, used by the team to preview the
 * real site while the holding page is up. Set EARLY_ACCESS_PASSWORD in the
 * environment. If it is not set, early access is switched off entirely rather
 * than falling back to a guessable default.
 */
export const EARLY_ACCESS_ENABLED = Boolean(process.env.EARLY_ACCESS_PASSWORD);
export const EARLY_ACCESS_COOKIE = "fwd-early-access";

/**
 * The admin area, where the club team reads applications and accepts or
 * declines them.
 *
 * Phase 1 protects it with a shared password, set as ADMIN_PASSWORD in the
 * environment. That is deliberately simple and deliberately temporary: proper
 * per-person sign in arrives with The Clubhouse in Phase 2, and this gate is
 * replaced by it. If no password is set, the admin area does not exist.
 */
export const ADMIN_ENABLED = Boolean(process.env.ADMIN_PASSWORD);
export const ADMIN_COOKIE = "fwd-admin";
