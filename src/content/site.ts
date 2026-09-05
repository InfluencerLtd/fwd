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

/**
 * DRAFT. What fwd. is, in one line.
 *
 * The hero, the holding page and the link preview all read this, so there is a
 * single place to change the positioning and it cannot drift between them.
 * Drift is exactly what happened before: three descriptions written as
 * siblings, and two of them left behind when the third was rewritten.
 *
 * \u00a0 is a non-breaking space, so "creator economy" never splits across two
 * lines. It is written as an escape rather than typed, because typed it looks
 * exactly like an ordinary space and the next person to edit this line would
 * lose it without ever seeing it.
 */
export const POSITIONING =
  "The home for the people shaping what\u2019s next in the creator\u00a0economy.";

export const HOLDING = {
  /** The one line under the wordmark, the same one the hero carries. */
  line: POSITIONING,

  /** DRAFT. The prompt above the email field. */
  capturePrompt: "Be the first to hear when applications open.",

  emailLabel: "email address",
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

  /**
   * Shown when the same address, or the same connection, has sent this several
   * times in an hour. It does not accuse anybody of anything: by far the most
   * likely person to see it is somebody who was not sure it had worked.
   */
  tooMany:
    "We have that already. If you have not heard anything, write to us instead.",
} as const;

export const FOOTER = {
  /** The way back to the home page from privacy and cookies. */
  back: "back",
  /** DRAFT. */
  privacy: "privacy",
  cookies: "cookies",
  signIn: "member sign in",
  /**
   * Not printed. The footer's columns carry no visible headings, because there
   * are eight words in the whole footer and a heading over each pair would be
   * more furniture than content. These name the two lists for a screen reader,
   * which still gets the structure without the eye being given more to read.
   */
  navHeading: "site",
  legalHeading: "legal",
} as const;

/** Used for the browser tab, search results, and link previews in email, WhatsApp and Slack. */
export const META = {
  /** DRAFT. */
  title: "fwd.",
  /**
   * Keep under about 155 characters or search engines cut it off. This one is
   * 84, so there is room if the positioning line ever grows.
   */
  description: `${POSITIONING} By influencer.`,
} as const;

/* ===========================================================================
   THE FULL PUBLIC SITE
   ---------------------------------------------------------------------------
   The sections run in this order down the page:
     hero, about, membership, meeting of minds, why, apply, footer.
   =========================================================================== */

export const HERO = {
  /** One line, under the wordmark. */
  line: POSITIONING,
  /**
   * The hero has ONE button and its label lives in APPLY.cta, because the same
   * button appears three times down the page and they must not drift apart.
   * cta, ctaWaitlist and secondaryCta used to live here and nothing read them.
   */
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
  /**
   * The two \u00a0 keep "the creator economy" together, which is what sets the
   * line break: everything before it goes on the first line, and the phrase
   * drops whole onto the second. See POSITIONING above.
   */
  heading:
    "Membership unlocks what\u2019s next in the\u00a0creator\u00a0economy.",

  /**
   * DRAFT. On the home page this is the whole of it: a heading, this, and the
   * ask. The eight cards are not here any more. They are on the membership
   * page, which is where somebody who wants the detail is going anyway.
   *
   * So this has to do the cards' job in prose. Four paragraphs, no lists.
   */
  lead: [
    "fwd. brings together the people shaping the future of the creator economy. The brands. The creators. The platforms.\nThe people with something to say, build, change or start next.",
    "Membership unlocks a year-round program of intimate dinners, private conversations, industry briefings and experiences alongside a network that extends far beyond the room.",
    "Meet someone you’ve wanted to meet. Hear what’s coming before it becomes obvious. Share an idea with the person who can make it happen.",
    "This is where the creator economy comes together to shape what happens next.",
  ],

  /** Still used on the membership page, above the cards. */
  intro: "Some of it is access. Most of it is people.",

  /**
   * The eight things membership gets you.
   *
   * ONLY `id` AND `summary` ARE ON THE SITE at the moment. They are the caption
   * and the photograph on each tile at the top of the membership page.
   *
   * `title` and `detail` are not shown anywhere. They were the written out
   * version underneath the tiles, which has been taken off the page. They are
   * kept because they are the only written record of what each benefit
   * actually is, and because the tiles say almost nothing on their own. If
   * they are never going back on the page, delete them rather than leaving
   * copy here that nobody will ever read.
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
  standfirst: "The right introduction can change everything.",
  body: [
    "Most networks hand you a list and leave the rest to you. This one works the other way around.",
    "We make the introduction ourselves, and we tell both sides why it is worth making.",
    "Ask for an introduction to any member. Your details stay with us, and so do theirs.",
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
    /**
     * The dialog's title, and the name a screen reader announces when it
     * opens. The same words as the button that opened it, so the two match.
     */
    heading: "apply for membership",
    /** DRAFT. */
    intro: "Memberships are by application only.",
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
  /**
   * The button on the home page and on the membership page's dark top. Both
   * lead to the membership page, so it names the destination.
   */
  cta: "apply for membership",

  /**
   * The button that opens the form itself, at the bottom of the membership
   * page. Different words from `cta` on purpose: by this point somebody has
   * already pressed "apply for membership" to get here, and pressing the same
   * words again would look like it had not worked. This one is the action.
   */
  start: "start application",

  /**
   * Shown only if the embedded HubSpot form cannot be reached, which usually
   * means an ad blocker or a corporate network rather than anything wrong at
   * either end. It gives them somewhere to go rather than an empty space, and
   * it never claims the application was received.
   */
  embedUnavailable:
    "The application form could not load, which is usually a blocker or a work network rather than anything you have done. Write to us and we will send it to you directly.",

  /**
   * Applying starts by saying which of the two you are, because the questions
   * worth asking a creator are not the questions worth asking somebody at a
   * brand. There are two forms behind this, not one form with a dropdown.
   */
  choose: {
    heading: "first, which are you?",
    /**
     * DRAFT. Cut to its last sentence. It used to explain that the questions
     * worth asking a creator are not the ones worth asking somebody at a
     * brand, which is true and is not the reader's problem: the two cards
     * underneath say what the choice is far faster than a sentence about why
     * the choice exists.
     */
    lead: "Pick the one that fits.",
    creator: {
      label: "a creator",
      hint: "You make the work, whatever the platform.",
    },
    brand: {
      label: "a brand, a platform, or industry",
      hint: "You work at a company in or around the creator economy.",
    },
  },
  back: "back",
  close: "close",

  /**
   * The fields, per path.
   *
   * Both paths write to the same three columns underneath. A creator's answers
   * go into the same `role` and `company` fields a brand's do, with labels that
   * make sense for them, rather than adding columns that would sit empty for
   * half of every application.
   */
  fields: {
    shared: {
      name: "full name",
      email: "email address",
      market: "market",
      marketHint: "Where you are based.",
      link: "LinkedIn or social profile",
      reason: "why do you want to be part of it",
      reasonHint: "A few lines is plenty.",
    },
    creator: {
      heading: "apply, as a creator",
      role: "what you make",
      roleHint: "The kind of work, in a few words.",
      company: "where people find you",
      companyHint: "Your main handle or channel.",
      linkLabel: "your biggest platform",
    },
    brand: {
      heading: "apply",
      role: "role",
      company: "company",
      group: "which best describes your company",
      linkLabel: "LinkedIn or social profile",
    },
  },
  /** The unchosen state of the group dropdown. The label sits above it. */
  chooseOne: "choose one",
  /** Shown when a required field is empty. */
  required: "Please fill this in.",
  error: "Something went wrong at our end. Please try again in a moment.",
  /** Shown when this has been sent several times within the hour. */
  tooMany:
    "We have your application. If you have not heard back, write to us rather than sending it again.",
  consent:
    "I am happy to receive occasional email about fwd. You can unsubscribe at any time.",
} as const;

export const NAV = {
  /**
   * The first thing a keyboard or screen reader user reaches, letting them jump
   * past the hero into the page.
   */
  skipToContent: "skip to content",

  /** The three-line button, and the panel it opens. */
  menu: "menu",
  menuClose: "close",
  home: "home",
  membership: "membership",
  signIn: "sign in to The House",
  appearance: "light or dark",
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
  membership: "A room mid-conversation. Low light, faces optional. For the top of the membership page",
  /**
   * DRAFT. The tiles on the membership page, one per benefit, keyed by the card
   * id in MEMBERSHIP.cards so the two cannot drift apart. Landscape, because
   * they sit in two rows that drift sideways and a portrait crop would make the
   * rows twice as tall for the same amount of picture.
   *
   * The caption on each tile is the card's own summary, so there is nothing to
   * write here beyond what the shot should be.
   */
  benefits: {
    "meeting-of-minds": "Two people mid-introduction, a third half out of frame",
    seats: "A long table at its fullest, shot down the length of it",
    "the-house": "A phone on a table at a dinner, screen lit, nobody looking at it",
    network: "A room from above, groups forming and re-forming",
    profile: "One person, three-quarter, warm light, at ease",
    newsletter: "Print on a table. Paper, a glass, a hand at the edge",
    events: "A doorway with people arriving, coats still on",
    perks: "A detail on a table. Waiting on what the perks actually are",
  },

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

/* ===========================================================================
   THE MEMBERSHIP PAGE
   ---------------------------------------------------------------------------
   Where every "apply for membership" button on the home page leads. It follows
   the shape of a good membership page: what it is, what it gets you, which of
   the two you are, what you will need to hand, then the form itself.

   The form is on the page rather than behind another click. Somebody who has
   come this far has already said yes twice.
   =========================================================================== */

export const MEMBERSHIP_PAGE = {
  /**
   * Not printed anywhere. It names the row of benefit tiles for a screen
   * reader, which otherwise meets eight sentences with nothing saying what
   * they are a list of. It used to be a visible heading over a written out
   * version of the same list.
   */
  benefitsLabel: "what membership gets you",

  /**
   * What search engines and link previews show. Kept separate from the
   * standfirst above, which is now too short to describe the page to somebody
   * who has not seen it.
   */
  description:
    "Membership of fwd. is by application. What it gets you, what we will ask, and how to apply.",

  /**
   * The last thing on the page. The ask again, after the pictures, so anybody
   * persuaded by them has a button in front of them rather than a scroll back
   * up to the header. It used to be a door for existing members, which the
   * log in button in the header now covers.
   */
  closing: {
    heading: "ready to apply?",
  },

  /**
   * The band under the header. This used to be the ask: a heading that said
   * "ready to apply?" and a button under it. The ask moved into the header, so
   * this says what membership is instead.
   */
  about: {
    /** DRAFT. */
    heading: "fwd. membership",
    /** DRAFT. */
    note: "Members get access to the rooms, people and ideas shaping the creator economy from invite-only dinners and private conversations to industry briefings, experiences and a network that extends far beyond the room.",
  },

  /** Shown instead of the form when applications are closed. */
  closed: {
    heading: "applications are closed",
    intro:
      "They open in windows rather than all year. Leave your address and we will tell you when the next one opens.",
  },
} as const;
