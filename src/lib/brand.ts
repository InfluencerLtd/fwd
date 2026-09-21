/**
 * brand.ts
 * ---------------------------------------------------------------------------
 * Every appearance of the name, the endorsement line and the member
 * area name is read from this file. Nothing is typed by hand anywhere else.
 *
 * If a name changes, change it here once and it changes across the whole site.
 *
 * NAMING RULES (these are not style preferences, they are the identity):
 *
 *   THE NAME IS FORWARD. THE MARK IS fwd. They are not alternatives and they
 *   are not interchangeable — each has a job:
 *
 *     - In prose, the club is called `Forward`. "Forward brings together brands,
 *       creators and cultural tastemakers." "Welcome to Forward." Spoken, it is
 *       always "Forward", never "eff-double-you-dee".
 *     - In logos, graphics, social assets and branded headings, it is `fwd.` —
 *       lowercase, always with the full stop. Never FWD, Fwd, FWD. or forward.
 *     - `by Influencer` is the endorsement, used where the relationship with
 *       Influencer needs to be clear: "Forward by Influencer", or the lock-up
 *       `fwd. by Influencer`.
 *     - On first introduction to an audience that does not know the brand:
 *       "Forward (fwd.) by Influencer", or the lock-up beside copy naming
 *       Forward. Once they know it, `fwd.` may stand alone.
 *
 *   Never alternate between the two arbitrarily inside one piece of writing.
 *   - `by influencer` is a signature, not a logo. It always sits apart from the
 *     mark in the layout and is always visually quieter. Never join the two into
 *     a single phrase in a sentence.
 *   - The member area is `The clubhouse`. Never "portal", never "dashboard".
 *   - The word "club" is not used anywhere a visitor or member can read,
 *     except in that one name.
 *     Where a name works, use the mark. Where a common noun is needed, the
 *     copy says "the room", which is already its central image.
 */

export const BRAND = {
  /** THE MARK. For logos, graphics and branded headings. Never in prose. */
  markShort: "fwd.",
  /** THE NAME. For prose, and for anything anybody says out loud. */
  markLong: "Forward",
  /**
   * Endorsement signature.
   *
   * CAPITAL I, matching the delivered artwork and the naming rules above. It
   * was lowercase for the life of the project, from a stand-in lockup set in
   * italic serif. The real mark sets it in a sans, tucked under the right of
   * the word, and spells Influencer with a capital.
   */
  endorsement: "by Influencer",
  /**
   * THE HOSTED LINE: "Hosted by" followed by Influencer's own logo.
   *
   * Added on 21 September 2026, after feedback that Influencer's ownership of
   * Forward should be more prominent without Forward losing its own identity.
   * The model is Sport Beach at Cannes, "hosted by Stagwell": the property
   * keeps its name, mark and look, and the parent signs underneath in its own
   * logo rather than in the property's type.
   *
   * It is a different thing from `endorsement` above. That is the signature
   * inside the fwd. lockup, in our sans; this is Influencer appearing as
   * Influencer. It appears where somebody arrives (under the hero's button),
   * where they leave (the footer, on every page) and where they commit (the
   * apply dialog), and never twice on one screen. See hosted-by.tsx.
   */
  hostedBy: "Hosted by",
  host: "Influencer",
  /** The gated member area. */
  memberArea: "The clubhouse",
} as const;

export const BENEFITS = {
  /** Confirmed signature member benefit. Wording may still be polished. */
  signature: "Meeting of Minds",
  /**
   * Jenny's quarterly members-only newsletter.
   *
   * It is the same words as the navigation item and the page it lives on, so
   * the thing and the link to it are not two different names.
   */
  newsletterName: "the briefing",
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
/**
 * Where the site lives, as an absolute address with no trailing slash.
 *
 * THIS USED TO BE `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"`
 * AND IT BROKE THE FIRST DEPLOYMENT.
 *
 * `??` only falls back on null or undefined. An environment variable that is
 * present but empty is an empty string, and an empty string is neither, so the
 * fallback never ran. `new URL("")` throws, and because that happens inside
 * `metadataBase` in the root layout, the whole build died with:
 *
 *     Failed to collect configuration for /_not-found
 *     [cause]: TypeError: Invalid URL
 *
 * Which points nowhere near the actual cause. Hence this.
 *
 * It also strips a trailing slash. Every use of this concatenates a path onto
 * it, so `https://fwd.example/` would have produced `https://fwd.example//unsubscribe`
 * in every email that goes out.
 */
function resolveSiteUrl(): string {
  const FALLBACK = "http://localhost:3000";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK;

  try {
    // Throws on anything that is not a real absolute URL, which is the whole
    // point: catching it here means one wrong value is a warning in the log
    // rather than a build that fails somewhere unrelated.
    const parsed = new URL(raw);
    return parsed.origin + parsed.pathname.replace(/\/+$/, "");
  } catch {
    console.warn(
      `[fwd.] NEXT_PUBLIC_SITE_URL is not a valid absolute URL (${JSON.stringify(raw)}). ` +
        `Falling back to ${FALLBACK}. Links in emails and social share images will be wrong ` +
        `until it is set to something like "https://fwd.example".`,
    );
    return FALLBACK;
  }
}

export const CONTACT = {
  domain: "fwd.influencer.com",
  email: "fwd@influencer.com",
  /** Absolute, no trailing slash. Used for links in emails and share images. */
  siteUrl: resolveSiteUrl(),
} as const;

/** The four groups the membership spans. Order is deliberate. */
export const MEMBER_GROUPS = [
  { id: "brand", label: "brands" },
  { id: "creator", label: "creators" },
  { id: "platform", label: "platforms" },
  { id: "industry", label: "industry" },
] as const;

export type MemberGroupId = (typeof MEMBER_GROUPS)[number]["id"];
