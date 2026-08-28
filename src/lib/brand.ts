/**
 * brand.ts
 * ---------------------------------------------------------------------------
 * Every appearance of the name, the endorsement line and the member
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
 *   - The member area is `The House`. Never "portal", never "dashboard".
 *   - The word "club" is not used anywhere a visitor or member can read.
 *     Where a name works, use the mark. Where a common noun is needed, the
 *     copy says "the room", which is already its central image.
 */

export const BRAND = {
  /** Primary mark. Lowercase, with the full stop. */
  markShort: "fwd.",
  /** Long form, for prose. */
  markLong: "Forward",
  /** Endorsement signature. Set in italic serif, always quieter than the mark. */
  endorsement: "by influencer",
  /** The gated member area. */
  memberArea: "The House",
} as const;

export const BENEFITS = {
  /** Confirmed signature member benefit. Wording may still be polished. */
  signature: "Meeting of Minds",
  /** Jenny's quarterly members-only newsletter. Name not decided yet. */
  newsletterName: "[NEWSLETTER NAME]",
} as const;

/**
 * The address the site publishes, and the domain it will live on.
 *
 * `email` is now a real one and appears in the footer, on the legal pages, in
 * the unsubscribe flow and inside every email that goes out, so anything sent
 * to it needs somebody reading it.
 *
 * `domain` is still a placeholder and renders as visible placeholder text so it
 * cannot ship unnoticed. Replace it when the domain is registered.
 */
export const CONTACT = {
  domain: "[DOMAIN NOT YET REGISTERED]",
  email: "fwd@influencer.com",
  /** Used for absolute URLs in social share images. Update at launch. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** The four groups the membership spans. Order is deliberate. */
export const MEMBER_GROUPS = [
  { id: "brand", label: "brands" },
  { id: "creator", label: "creators" },
  { id: "platform", label: "platforms" },
  { id: "industry", label: "industry" },
] as const;

export type MemberGroupId = (typeof MEMBER_GROUPS)[number]["id"];
