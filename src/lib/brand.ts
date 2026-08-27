/**
 * brand.ts
 * ---------------------------------------------------------------------------
 * Every appearance of the club's name, the endorsement line and the member
 * area name is read from this file. Nothing is typed by hand anywhere else.
 *
 * If a name changes, change it here once and it changes across the whole site.
 *
 * NAMING RULES (these are not style preferences, they are the identity):
 *   - The short mark is always `fwd.` - lowercase, always with the full stop.
 *     Never FWD. Never Fwd. Never fwd without the stop.
 *   - `Forward` is the long form, used in prose where the full word reads better.
 *   - `by influencer` is a signature, not a logo. It always sits apart from the
 *     mark in the layout and is always visually quieter. Never join the two into
 *     a single phrase in a sentence.
 *   - The member area is `The Clubhouse`. Never "portal", never "dashboard".
 */

export const BRAND = {
  /** Primary mark. Lowercase, with the full stop. */
  markShort: "fwd.",
  /** Long form, for prose. */
  markLong: "Forward",
  /** Endorsement signature. Set in italic serif, always quieter than the mark. */
  endorsement: "by influencer",
  /** The gated member area. */
  memberArea: "The Clubhouse",
} as const;

export const BENEFITS = {
  /** Confirmed signature member benefit. Wording may still be polished. */
  signature: "Meeting of Minds",
  /** Jenny's quarterly members-only newsletter. Name not decided yet. */
  newsletterName: "[NEWSLETTER NAME]",
} as const;

/**
 * PLACEHOLDERS - not yet registered. Replace when the domain and mailbox exist.
 * They render as visible placeholder text so they cannot ship unnoticed.
 */
export const CONTACT = {
  domain: "[DOMAIN NOT YET REGISTERED]",
  email: "[CLUB EMAIL NOT YET REGISTERED]",
  /** Used for absolute URLs in social share images. Update at launch. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** The four groups the membership spans. Order is deliberate. */
export const MEMBER_GROUPS = [
  { id: "brand", label: "Brands" },
  { id: "creator", label: "Creators" },
  { id: "platform", label: "Platforms" },
  { id: "industry", label: "Industry" },
] as const;

export type MemberGroupId = (typeof MEMBER_GROUPS)[number]["id"];
