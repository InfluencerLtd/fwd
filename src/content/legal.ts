/**
 * legal.ts
 * ---------------------------------------------------------------------------
 * The privacy and cookie pages.
 *
 * THE PRIVACY PAGE POINTS AT INFLUENCER'S NOTICE RATHER THAN CARRYING ITS OWN
 * COPY OF IT. fwd. is run by Influencer, so Influencer is the controller and
 * the group notice is the document that governs. Pasting those eighteen
 * sections in here would fork them: the moment legal updated theirs, this site
 * would be quietly publishing an old version of a legal document, and nobody
 * here would know. A link is always the current one.
 *
 * What this page does carry is the part the group notice cannot know: what THIS
 * site asks for and where it puts it. That is a description of what the code
 * does, kept true by the list below, not a second policy.
 *
 * >>> STILL TO BE CONFIRMED BY WHOEVER HANDLES DATA PROTECTION AT INFLUENCER.
 *
 * The group notice was last updated in December 2022 and does not mention
 * membership applications, a member directory, or the four processors this site
 * uses (Supabase for the database, Vercel for hosting, HubSpot for the CRM,
 * Resend for email). Somebody needs to confirm it stretches to cover them, or
 * have an annexe written, BEFORE the site takes applications from the public.
 */

export const PRIVACY = {
  heading: "privacy",
  body: [
    "Forward is run by Influencer. Your information is handled under Influencer’s privacy notice, which covers this site.",
    "What this site asks for: if you apply for membership, your name, email address, role, company, market, a profile link if you want to give one, and whatever you write in your own note. If you only ask to be kept up to date, your email address and nothing else. If you are a member, we also hold your member record and whether you said you were coming to an event.",
    "Where it goes: our own database, and a copy in HubSpot, which is the system Influencer uses to keep track of the people it works with. We do not sell it, and we do not pass it to anybody outside Influencer and the services that run this site.",
    "If you want to know what we hold about you, or you want it removed, write to us and we will deal with it.",
  ],
  link: {
    href: "https://www.influencer.com/privacy",
    label: "read Influencer’s full privacy notice",
  },
  /** The registered details, so the page stands on its own. */
  controller: [
    "Influencer Ltd is registered in England, company number 09589798.",
    "Floor 2, 51–53 Great Marlborough Street, London W1F 7JT.",
  ],
} as const;

export const COOKIES = {
  heading: "cookies",
  body: [
    "This site sets one cookie of its own. It remembers the Forward team’s early access preview, so they are not asked for the password on every page.",
    "It counts how many people visit, using Vercel’s analytics. That sets no cookie and does not follow anybody between sites: visitors are counted by a code that is thrown away every day, so there is nothing kept that could be tied back to a person.",
    "Your browser remembers whether you chose light or dark mode. That is stored on your own device and never sent to us.",
    "There is no advertising cookie, and nothing here is shared with an advertising network.",
  ],
  /**
   * Added to the list above ONLY while the embedded HubSpot application forms
   * are switched on. HubSpot's form script sets its own cookies, which the list
   * above does not account for, so the page says so rather than the two
   * contradicting each other. See src/components/legal-page.tsx.
   */
  hubspotText:
    "The membership application form is provided by HubSpot. Opening it loads HubSpot’s own script, which sets cookies on your device so a part-finished application is not lost and so a submission can be matched to an earlier visit. Nothing is loaded until you open the form.",
} as const;
