/**
 * emails.ts
 * ---------------------------------------------------------------------------
 * EVERY EMAIL THE SITE SENDS IS WRITTEN HERE.
 *
 * You can rewrite any of these without touching the code that sends them. The
 * bits in {curly braces} are filled in automatically:
 *
 *   {name}         the person's first name
 *   {signInUrl}    the link into The Clubhouse
 *   {clubEmail}    the club's email address
 *   {memberArea}   "The Clubhouse"
 *   {unsubscribe}  the unsubscribe link
 *
 * House rules: American English, and no em dashes.
 *
 * >>> ALL THREE ARE DRAFTS AND NEED APPROVAL BEFORE ANYTHING IS SENT. <<<
 * A decline email in particular goes to senior people at client companies, so
 * the wording matters more than usual.
 */

export type EmailTemplate = {
  subject: string;
  /** Each string is one paragraph. */
  body: string[];
  /** Optional button at the end. */
  action?: { label: string; url: string };
};

export const EMAILS = {
  /** Sent when an application is accepted. */
  accepted: {
    subject: "Welcome to fwd.",
    body: [
      "Hello {name},",
      "Your application has been accepted. Welcome to the club.",
      "{memberArea} is where everything happens between events. Sign in with the link below, add a line or two to your profile so other members know what you are working on, and have a look at what is coming up.",
      "Invitations will come by email from here on. If you ever want an introduction to another member, ask us and we will make it properly.",
      "We are glad you are in.",
    ],
    action: { label: "Sign in to {memberArea}", url: "{signInUrl}" },
  },

  /** Sent when an application is declined. Short, warm, and not a lecture. */
  declined: {
    subject: "Your fwd. application",
    body: [
      "Hello {name},",
      "Thank you for applying to fwd., and for taking the time to tell us about your work.",
      "We are not able to offer you a place at the moment. Membership is kept deliberately small and balanced across brands, creators, platforms and the wider industry, so this is far more about the shape of the room than about you.",
      "We would be glad to hear from you again. If anything changes on your side, or if you would like us to keep you in mind, just reply to this message.",
    ],
  },

  /** Sent as soon as an application is received. */
  received: {
    subject: "We have your fwd. application",
    body: [
      "Hello {name},",
      "Thank you. Your application is with us and someone will read it properly.",
      "We will come back to you either way. If you need anything in the meantime, reply to this message and it will reach us.",
    ],
  },
} as const satisfies Record<string, EmailTemplate>;

export const EMAIL_FOOTER = {
  /** Appears at the bottom of every email. The unsubscribe link is required. */
  lines: ["fwd., by influencer", "{clubEmail}"],
  unsubscribeLabel: "Unsubscribe from club email",
} as const;
