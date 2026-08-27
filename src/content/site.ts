/**
 * site.ts
 * ---------------------------------------------------------------------------
 * EVERY WORD ON THE PUBLIC SITE IS IN THIS FILE.
 *
 * You can edit any of it without touching anything that controls the layout.
 * Change the text between the quote marks, save, and the site updates.
 *
 * Two house rules the copy follows:
 *   - American English throughout.
 *   - No em dashes. Use commas, periods, or restructure the sentence.
 *
 * >>> EVERYTHING MARKED "DRAFT" BELOW IS MY WORDING, NOT APPROVED WORDING. <<<
 * The brief is explicit that taglines are not to be invented, so treat these as
 * a starting point to react to rather than as finished copy. While
 * COPY_APPROVED is false in src/lib/site-config.ts, a small marker sits in the
 * corner of the page so nobody mistakes this for signed-off text.
 */

export const HOLDING = {
  /** DRAFT. The one line under the wordmark. */
  line: "A private members' club for senior people across brands, creators, platforms and the wider industry.",

  /** DRAFT. The prompt above the email field. */
  capturePrompt: "Be the first to hear when applications open.",

  emailLabel: "Email address",
  emailPlaceholder: "you@company.com",
  submit: "Keep me posted",
  submitting: "Just a moment",

  /** DRAFT. Shown after a successful sign-up. */
  success: "Thank you. We will be in touch.",

  /** Shown if something goes wrong. Never blames the visitor. */
  error: "Something went wrong at our end. Please try again in a moment.",

  /** Shown when the email address is not a valid one. */
  invalidEmail: "That does not look like an email address. Please check it.",

  /**
   * Shown when the database is not connected yet. This is honest on purpose.
   * We never tell somebody we saved their details when we did not.
   */
  notReady:
    "Sign-ups are not switched on quite yet. Please try again shortly.",

  /** The consent line next to the checkbox. Required, and must stay honest. */
  consent:
    "I am happy to receive occasional email about the club. You can unsubscribe at any time.",

  consentRequired: "Please tick the box so we know we can email you.",
} as const;

export const FOOTER = {
  /** DRAFT. */
  privacy: "Privacy",
  cookies: "Cookies",
  signIn: "Member sign in",
} as const;

/** Used for the browser tab, search results, and link previews in email, WhatsApp and Slack. */
export const META = {
  /** DRAFT. */
  title: "fwd.",
  /** DRAFT. Keep under about 155 characters or search engines cut it off. */
  description:
    "A private members' club for senior people across brands, creators, platforms and the wider industry. By influencer.",
} as const;
