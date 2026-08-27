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
 * a starting point to react to rather than as finished copy.
 *
 * There used to be a marker in the corner of every page saying so. It has been
 * taken off, so nothing on the site itself now shows which words are settled
 * and which are not. These DRAFT notes are the only record. Search for "DRAFT"
 * across this folder to see everything still waiting on a decision.
 */

export const HOLDING = {
  /** DRAFT. The one line under the wordmark. */
  line: "An invitation-only community for senior people across brands, creators, platforms and the wider industry.",

  /** DRAFT. The prompt above the email field. */
  capturePrompt: "Be the first to hear when applications open.",

  emailLabel: "email address",
  emailPlaceholder: "you@company.com",
  submit: "keep me posted",
  submitting: "just a moment",

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
    "I am happy to receive occasional email about fwd. You can unsubscribe at any time.",

  consentRequired: "Please tick the box so we know we can email you.",
} as const;

export const FOOTER = {
  /** The way back to the home page from privacy and cookies. */
  back: "back",
  /** DRAFT. */
  privacy: "privacy",
  cookies: "cookies",
  signIn: "member sign in",
} as const;

/** Used for the browser tab, search results, and link previews in email, WhatsApp and Slack. */
export const META = {
  /** DRAFT. */
  title: "fwd.",
  /** DRAFT. Keep under about 155 characters or search engines cut it off. */
  description:
    "An invitation-only community for senior people across brands, creators, platforms and the wider industry. By influencer.",
} as const;

/* ===========================================================================
   THE FULL PUBLIC SITE
   ---------------------------------------------------------------------------
   The sections run in this order down the page:
     hero, about, membership, meeting of minds, why, apply, footer.
   =========================================================================== */

export const HERO = {
  /** DRAFT. One line, under the wordmark. */
  line: "An ongoing community for the people building what comes next across brands, creators, platforms and the wider industry.",
  /** DRAFT. One call to action, kept restrained on purpose. */
  cta: "apply for membership",
  ctaWaitlist: "join the waitlist",
  /** DRAFT. The second button, which scrolls down to what fwd. is. */
  secondaryCta: "learn more",
  /**
   * The quiet way in for people who are already members. Deliberately not a
   * button: applying is the point of this page, signing in is a convenience.
   */
  memberSignIn: "already a member? sign in",
} as const;

export const ABOUT = {
  heading: "what fwd. is",
  /** DRAFT. */
  body: [
    "fwd. is a community, not a series of events. It runs all year, in person and online, and it spans brands, creators, platforms and the wider industry.",
    "There is no permanent space, and that is deliberate. It lives through the rooms it puts together, the conversations it starts and the introductions it makes.",
    "Members are global. Membership is by application.",
  ],
} as const;

export const MEMBERSHIP = {
  heading: "what membership includes",
  /** DRAFT. */
  intro: "Some of it is access. Most of it is people.",
  /**
   * These open to reveal the detail, so the section stays scannable but the
   * substance is there for anyone who wants it.
   */
  cards: [
    {
      id: "meeting-of-minds",
      /** DRAFT. */
      title: "Meeting of Minds",
      summary: "Introductions made properly.",
      detail:
        "The signature benefit. When two members should know each other, the introduction comes with context and a clear reason for it, to both people. Never a name passed along, never a cold forward. You can request an introduction to any member, and the fwd. team makes it.",
    },
    {
      id: "seats",
      title: "A seat in the room",
      summary: "Dinners, roundtables and gatherings, on a chosen guest list.",
      detail:
        "Small rooms and conversations that do not happen at a conference. Some are hosted with platforms, some are ours. The guest list is the product, so it is put together carefully every time.",
    },
    {
      id: "the-house",
      title: "The House",
      summary: "The members-only area, online and always open.",
      detail:
        "Where members find each other, see what is coming up, reserve a place and keep their own profile current. Signed in, and members only.",
    },
    {
      id: "network",
      title: "The member network",
      summary: "Who else is in the room, and how to reach them.",
      detail:
        "A directory of members with their role, company, market and focus, searchable so you can find the right person rather than the nearest one.",
    },
    {
      id: "profile",
      title: "Your member profile",
      summary: "How the rest of the room finds you.",
      detail:
        "Your own page in the directory. You decide what it says, and you can change it whenever you like.",
    },
    {
      id: "newsletter",
      title: "The quarterly newsletter",
      summary: "[NEWSLETTER NAME], from Jenny. Four times a year, members only.",
      detail:
        "What is actually changing in the industry, from someone whose read on it is worth having. Written for members, not for an audience.",
    },
    {
      id: "events",
      title: "Events and RSVP",
      summary: "What is coming up, and a place if you want one.",
      detail:
        "Invitations arrive by email and link straight to the event, which you can look at without signing in. Signing in is only needed to reserve or change your place.",
    },
    {
      id: "perks",
      title: "Member perks",
      /**
       * PLACEHOLDER. I do not know what these are and will not invent them.
       * Needed: what the perks actually are, and who provides them.
       */
      summary: "[MEMBER PERKS: I need the detail for this card]",
      detail:
        "[PLACEHOLDER. This card needs real content: what the perks are, who provides them, and whether they vary by market. Nothing invented here on purpose.]",
    },
  ],
} as const;

export const MEETING_OF_MINDS = {
  heading: "meeting of minds",
  /** DRAFT. */
  standfirst: "The introduction is the point.",
  body: [
    "Most networks hand you a list and leave the rest to you. This one works the other way around.",
    "When two members should know each other, we say why, to both of them, with enough context that the first conversation starts somewhere useful.",
    "You can ask for an introduction to any member. The request comes to the fwd. team, never to them.",
  ],
} as const;

export const WHY = {
  heading: "why it exists",
  /** DRAFT. Outward facing. About the room, never about the business case. */
  body: [
    "This industry moves faster than the people running it can compare notes. Brands, creators and platforms each see a different part of the same picture, and they rarely get to put it together in one place.",
    "Forward exists to make that room, regularly, off the record, with nobody selling anything.",
    "What members get from it is straightforward: a shorter route to the person who has already worked out the thing you are working on.",
  ],
} as const;

export const APPLY = {
  open: {
    heading: "apply",
    /** DRAFT. */
    intro:
      "Membership is by application. Tell us who you are and why you want to be in the room. Every application is read.",
    submit: "send application",
    submitting: "sending",
    success:
      "Thank you. Your application is with us and we will be in touch.",
  },
  closed: {
    heading: "join the waitlist",
    /** DRAFT. */
    intro:
      "Applications are closed at the moment. Leave your details and we will let you know when they open again.",
    submit: "join the waitlist",
    submitting: "sending",
    success: "Thank you. You are on the list and we will be in touch.",
  },
  fields: {
    name: "full name",
    email: "email address",
    role: "role",
    company: "company",
    group: "which best describes you",
    market: "market",
    marketHint: "Where you are based.",
    link: "LinkedIn or social profile",
    reason: "why do you want to be part of it",
    reasonHint: "A few lines is plenty.",
  },
  /** Shown when a required field is empty. */
  required: "Please fill this in.",
  error: "Something went wrong at our end. Please try again in a moment.",
  consent:
    "I am happy to receive occasional email about fwd. You can unsubscribe at any time.",
} as const;

export const NAV = {
  /**
   * The first thing a keyboard or screen reader user reaches, letting them jump
   * past the hero into the page.
   */
  skipToContent: "skip to content",
} as const;

/* ===========================================================================
   THE PHOTOGRAPHY BRIEF
   ---------------------------------------------------------------------------
   Every photograph the site needs, and what each one should be. This doubles as
   the brief for whoever shoots or sources them, so it is written for a person
   rather than for the code.

   The direction throughout: warm, low light, shallow depth of field, close
   crops. Hands, glasses, gestures, rooms. Faces optional. Never bright, evenly
   lit conference or corporate photography.

   Until a real image exists, each of these renders as a warm labelled
   placeholder so it is obvious what is missing.
   =========================================================================== */

export const IMAGERY = {
  hero: "The approved hero shot. Warm, dimly lit, close-cropped, people in frame",
  aboutWide: "Hands and glasses across a table. Candlelight, close crop",
  aboutTall: "A room mid-conversation. Low light, shallow focus, faces optional",
  aboutDetail: "A small detail. A place card, a glass, a hand on the table",
  meetingOfMinds: "Two people in conversation, close, warm, slightly obscured",
  statement: "A wide room at night. Amber light, figures out of focus",
  why: "Detail shot. A gesture mid-sentence, or a table after dinner",
  /** The band that drifts sideways. Eight in total, all portrait or square. */
  band: [
    "Dinner table from above, candlelight",
    "A guest laughing, close crop, out of focus",
    "Hands passing something across a table",
    "A room filling up, shot from the doorway",
    "Glasses catching the light",
    "Two people talking, shot from behind",
    "A quiet corner of the room",
    "Someone speaking, lit from one side",
  ],
} as const;

export const STATEMENT = {
  /** DRAFT. The pull quote on the dark band. Not a testimonial, our own words. */
  line: "The room is the product. Everything else follows from who is in it.",
} as const;
