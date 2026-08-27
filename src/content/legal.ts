/**
 * legal.ts
 * ---------------------------------------------------------------------------
 * The privacy and cookie pages.
 *
 * >>> THIS IS NOT A PRIVACY POLICY. <<<
 *
 * Both pages are deliberately holding text. A privacy policy and a cookie
 * notice are legal documents. Writing plausible-sounding ones would be worse
 * than having none, because they would look finished and nobody would chase
 * the real thing.
 *
 * WHAT IS NEEDED: the approved privacy policy and cookie notice from whoever
 * handles this at influencer, adapted to name fwd. and to cover the data
 * this site actually collects, which is:
 *
 *   Holding page and waitlist: email address, consent, and the date given.
 *   Application form: name, email, role, company, group, market, an optional
 *     profile link, and the applicant's own note.
 *   Applicant records are also copied into HubSpot.
 *   The site sets one cookie of its own, only for the team's early access
 *     preview. There is no analytics or advertising cookie at present.
 *
 * Paste the approved text in below, replacing `holdingText`.
 */

export const PRIVACY = {
  heading: "privacy",
  holdingText: [
    "Our full privacy policy is being prepared and will be published here before fwd. opens.",
    "In the meantime, if you want to know what we hold about you, or you want it removed, write to us at the address below and we will deal with it.",
  ],
} as const;

export const COOKIES = {
  heading: "cookies",
  holdingText: [
    "Our full cookie notice is being prepared and will be published here before fwd. opens.",
    "This site does not currently use any advertising or analytics cookies. The only cookie it sets is one that remembers the fwd. team's early access preview, and your browser remembers your choice of light or dark mode on your own device.",
  ],
} as const;
