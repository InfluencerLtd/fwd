import { BENEFITS, BRAND } from "@/lib/brand";

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
    "I am happy to receive occasional email about Forward. You can unsubscribe at any time.",

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
  /**
   * The parent company, and the way to it.
   *
   * IT KEEPS ITS CAPITAL AND ITS DOMAIN. Everything else in this footer is
   * lowercase, and this is not styling — it is a name, and the naming rules in
   * src/lib/brand.ts spell the endorsement "by Influencer" with a capital I.
   * Written as the address rather than the word because that is what it is:
   * somewhere else to go, not a page of this site.
   */
  parent: { label: "Influencer.com", href: "https://www.influencer.com" },
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
  /**
   * THE NAME, NOT THE MARK. This was "fwd." — which is the wordmark, and a
   * wordmark in a search result tells somebody who has never heard of us
   * nothing at all. The naming rule covers exactly this case: on first
   * introduction to a new audience, write Forward (fwd.) by Influencer. A
   * search result, a browser tab and a link preview in somebody's inbox are
   * the definition of a first introduction.
   *
   * The mark is still the first thing on the page itself, at the top left of
   * every screen, which is where a wordmark belongs.
   */
  title: "Forward (fwd.) by Influencer",
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
   * THE HERO SAYS THIS INSTEAD, and POSITIONING above is untouched on purpose:
   * the same sentence is still the holding page's line and still the page's
   * meta description, and neither of those wants percussion.
   *
   * Two lines that must never become one. The full stops are the device — they
   * are what turns a list into three beats — and the second line is the answer
   * to the first, which only works if it lands on its own.
   *
   * The stops break the guideline that titles carry no punctuation. Recorded
   * here rather than left for marketing to find.
   */
  headline: { one: "Brands. Creators. Platforms.", two: "One table." },
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

/**
 * The line the whole thing rests on.
 *
 * >>> NOT RENDERED ANYWHERE. <<< It was on the home page under the case for a
 * few hours and has been taken off again. Kept because it is the sharpest
 * sentence written for this brand and somewhere will want it — an email, the
 * deck, the invitation — but nothing on the site reads it today.
 */
export const STATEMENT = {
  /** DRAFT. Our own words, not a testimonial. */
  line: "The room is the product. Everything else follows from who is in it.",
} as const;

/* ===========================================================================
   THE CASE
   ---------------------------------------------------------------------------
   The argument, before the offer.

   The home page used to open with the picture and go straight to what
   membership unlocks. A visitor who did not already agree that the industry
   has a problem was being sold a solution to a problem nobody had named.

   The structure is deliberately the oldest one there is: the situation, what
   is wrong with it, what we did about it. The first paragraph is three
   sentences in the same shape, because parallel construction is what makes a
   list of facts read as an argument.

   WHY IT SAYS "NOBODY IS ON A STAGE" TWICE OVER THE PAGE. Once here, as the
   objection to how the industry currently meets, and once as a number further
   down. It is the whole differentiator, and a differentiator stated once is a
   detail.
   =========================================================================== */

export const CASE = {
  /** DRAFT. */
  /**
   * [[double brackets]] mark a word for the drawn emphasis line. See
   * src/components/marked.tsx — the mark is chosen here, in the writing,
   * rather than in the component.
   */
  heading: "Everyone sees a [[different]] part of the same picture.",
  /** DRAFT. */
  body: [
    "Brands have agencies. Platforms have roadmaps. Creators have audiences. All three are building the same industry and almost never sit in the same room.",
    "When they do meet it is on a stage, on a panel, or at a conference with four thousand other people in it. Those are the worst possible conditions for the conversation that actually matters.",
    "So we make the room instead. Small, off the record, nobody selling anything, and a guest list put together by hand.",
  ],
} as const;

/* ===========================================================================
   THE WAY IN
   ---------------------------------------------------------------------------
   The last thing before the footer.

   The page used to end on a section about a newsletter, which is a strange
   note to leave somebody on when the only thing we want them to do is apply.
   =========================================================================== */

export const WAY_IN = {
  /** DRAFT. */
  heading: "the way in is an application",
  /** DRAFT. */
  note: "Every application is reviewed personally, with membership intentionally curated.",
} as const;

export const MEMBERSHIP = {
  /**
   * DRAFT, AND A REWRITE. It was "Membership unlocks what's next in the
   * creator economy", which is the positioning line with the word membership
   * in front of it — it described fwd. rather than describing membership, and
   * it did so three sections after the page had already said it twice.
   *
   * This one names the only two things membership actually is.
   */
  heading: "A year of rooms, and the people in\u00a0them.",

  /**
   * DRAFT. On the home page this is the whole of it: a heading, this, and the
   * ask. The eight cards are not here any more. They are on the membership
   * page, which is where somebody who wants the detail is going anyway.
   *
   * So this has to do the cards' job in prose.
   *
   * IT USED TO BE FIVE PARAGRAPHS AND IS NOW TWO. Three of the five said the
   * positioning line again in different words — what fwd. brings together, who
   * is in it, and that this is where the industry shapes what happens next.
   * That argument is made properly one section above now, at full size, so
   * repeating it here made the page say the same thing three times and then
   * ask for an application. What is left is the only part that was ever about
   * membership rather than about fwd.
   */
  lead: [
    "Membership unlocks a year-round program of intimate dinners, private conversations, industry briefings and experiences — alongside a network that extends well beyond the events.",
    "Meet someone you’ve wanted to meet. Hear what’s coming before it becomes obvious. Share an idea with the person who can act on it.",
  ],

  /** Still used on the membership page, above the cards. */
  intro: "Some of it is access. Most of it is people.",

  /**
   * The eight things membership gets you.
   *
   * ONLY `id` AND `title` ARE ON THE SITE. They are the photograph and the
   * words on each tile at the top of the membership page.
   *
   * `summary` is not drawn anywhere now. It is the line under each headline,
   * kept because it is the only written record of what each benefit actually
   * is, and because the tiles say almost nothing on their own.
   *
   * The long `detail` field that used to sit here has gone. Nothing ever
   * rendered it, this note used to say to delete it rather than leave copy
   * nobody would read, and the cards now come as a headline and a line rather
   * than as three levels.
   */
  cards: [
    {
      id: "meeting-of-minds",
      title: "Meeting of Minds",
      summary:
        "Introductions made properly, with a reason attached, not a name passed along.",
    },
    {
      id: "seats",
      title: "A seat in the room",
      summary:
        "Dinners, roundtables and gatherings, on a guest list built by hand.",
    },
    {
      id: "partner-rooms",
      title: "Partner rooms",
      summary: "Closed sessions with the platforms.",
    },
    {
      id: "guest-passes",
      title: "Guest passes",
      summary: "Twice a year, bring someone who should be here.",
    },
    {
      id: "directory",
      title: "The directory",
      summary: "Who else is in the room, and what they actually do.",
    },
    {
      id: "ask-the-room",
      title: "Ask the room",
      summary:
        "Put a question to the membership and hear from people who have already solved it.",
    },
    {
      /**
       * THE SHEET THIS CAME FROM CALLED THIS ONE "The Clubhouse", and it is
       * "The House" here on purpose. src/lib/brand.ts sets two naming rules
       * that it would break: the member area is always The House, and the word
       * "club" is not used anywhere a visitor or member can read. Calling it
       * something else on this one card would give the same room two names on
       * the same site. If the name really is changing, change it in brand.ts
       * and it changes everywhere, including here.
       */
      id: "the-house",
      title: BRAND.memberArea,
      summary: "The members\u2019 area. Private, online, always open.",
    },
    {
      id: "founding-members",
      /** PLACEHOLDER. The sheet had a headline and no line under it. */
      summary: "[FOUNDING MEMBERS: this card has no line yet]",
      title: "Founding members",
    },
    {
      id: "digital-rooms",
      title: "Digital rooms",
      summary: "Webinars and small breakout sessions.",
    },
    {
      id: "newsletter",
      title: BENEFITS.newsletterName,
      summary:
        "Quarterly, members only. What is actually changing, from people in a position to know.",
    },
    {
      id: "merch",
      title: "Members\u2019 merch",
      summary: "Made in small numbers just for our members.",
    },
    {
      id: "nominate",
      title: "Nominate a member",
      summary: "Once a year.",
    },
    {
      id: "global-access",
      /** PLACEHOLDER. The sheet had a headline and no line under it. */
      summary: "[GLOBAL ACCESS: this card has no line yet]",
      title: "Global access",
    },
  ],
} as const;

export const MEETING_OF_MINDS = {
  heading: "meeting of minds",
  /** DRAFT. */
  standfirst: "The right introduction can [[change everything]].",
  body: [
    "Most networks hand you a list and leave the rest to you. This one works the other way around.",
    "We make the introduction ourselves, and we tell both sides why it is worth making.",
    "Ask for an introduction to any member. Your details stay with us, and so do theirs.",
  ],
} as const;

/**
 * The ask that is not "apply".
 *
 * Every other section on this page ends in the application. This one ends in a
 * contribution, which is the only thing on the public site a person who is
 * already a member has any reason to press.
 *
 * THE HEADING KEEPS ITS CAPITAL HERE AND LOSES IT ON THE PAGE. Headings are
 * lowercased in globals.css, site-wide, so this renders as "what is actually
 * changing?". The string is stored as it was written so the copy is reviewable
 * against the brief rather than against the stylesheet.
 */
export const BRIEFING_SUBMIT = {
  // No eyebrow. It said "the briefing" over a heading about the briefing.
  heading: "What is actually changing?",
  /** DRAFT. */
  /**
   * >>> THIS NAMES A REAL PERSON. <<< "our CRO, Jenny" is the only name on the
   * public site, and the rule the rest of the copy follows — see the note over
   * CLASS_OF_2026 in src/content/pages.ts, which keeps the curators unnamed
   * until they have said yes — applies here too. Asked for directly, so it is
   * written; it wants her agreement and probably a surname before launch.
   */
  // The \n is a line break inside the paragraph, not a new paragraph, and it is
  // rendered because the section sets whitespace-pre-line. It falls where the
  // copy turns: what the briefing is, then the facts about it.
  body: "The briefing is built from what is actually changing in the creator economy, from the people in a position to know it rather than the people quickest to write about it.\nFour issues released throughout the year, to members only. Written by our CRO, Jenny.",
  send: "send something in",

  /**
   * The panel behind "send something in".
   *
   * READ `attribute` AND `attributeHint` TOGETHER. The box is not ticked when
   * the form opens and it is not required, so leaving it alone is a complete
   * and valid answer: off the record is what happens by default rather than
   * something anybody has to ask for. The hint says so out loud, because a
   * promise a person cannot see is not a promise.
   */
  form: {
    heading: "send something in",
    /** DRAFT. */
    intro:
      "For members. A shift you have noticed, something that has stopped working, or a question worth putting to the rest of the room.",
    name: "your name",
    email: "your email",
    subject: "what it is about",
    message: "what you have",
    attribute: "you can attribute this to me",
    attributeHint:
      "Leave this unticked and nothing is put in your name. Off the record is the default, not the favour.",
    submit: "send it",
    submitting: "sending",
    required: "Needed.",
    success:
      "Thank you. It has landed with the people writing the next briefing, and nobody will attribute it without asking you first.",
    error: "That did not send. Please try again.",
    notReady: "We cannot take submissions just now. Please try again shortly.",
    tooMany: "That is a few in a row. Please try again a little later.",
  },
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
      /* Asked in full inside the box rather than in a line under it. The
         label above stays the short "market", which is what it is once it has
         been answered. */
      marketPlaceholder: "Where are you based",
      link: "LinkedIn or social profile",
      reason: "why do you want to be part of it",
    },
    creator: {
      heading: "apply, as a creator",
      role: "what you make",
      company: "where people find you",
      linkLabel: "your biggest platform",
    },
    brand: {
      heading: "apply",
      role: "role",
      company: "company",
      group: "which best describes you",
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
    "I am happy to receive occasional email about Forward. You can unsubscribe at any time.",
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
  roomsClose:
    "A table at the end of the night. Empty chairs, glasses still out, one lamp on. For the foot of the rooms page",
  aboutOpening:
    "A wide room mid-conversation, shot from the edge of it. Warm, low light, nobody looking at the camera. For the top of the what it is page",
  briefingClose:
    "Someone reading, alone, after the room has emptied. Low light, close crop, face optional. For the foot of the briefing page",
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
    "partner-rooms": "A small closed room, screen glow, a handful of chairs",
    "guest-passes": "A door held open, one person arriving behind another",
    directory: "A room from above, groups forming and re-forming",
    "ask-the-room": "Two people leaning in over one phone, mid-answer",
    "the-house": "A phone on a table at a dinner, screen lit, nobody looking at it",
    "founding-members": "Waiting on what this card says. A first table, early, half laid",
    "digital-rooms": "A laptop open on a kitchen table at night, one face lit",
    newsletter: "Print on a table. Paper, a glass, a hand at the edge",
    merch: "One piece, folded, on a dark surface. No model",
    nominate: "Two people talking, one gesturing off to somebody else",
    "global-access": "Waiting on what this card says. A city at night from a window",
  },

  /**
   * DRAFT, ALL EIGHT. The words across the band.
   *
   * These are mine, not yours: there was no caption copy for this band, only
   * the shot briefs below, which are notes to a photographer. They are what a
   * member actually does here rather than adjectives about it, and they are
   * short because the band moves. Overwrite them.
   *
   * They deliberately do not repeat the benefit tiles further down the
   * membership page. Saying "the directory" in both places would make the two
   * bands read as the same list twice.
   */
  /** Names the band for a screen reader. Not printed. */
  bandLabel: "what happens in the room",
  bandCaptions: [
    "Dinners",
    "Roundtables",
    "Introductions",
    "Briefings",
    "Guest lists",
    "Lasting conversations",
    "Small rooms",
    "People worth meeting",
  ],

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
   * The page's name, over the photograph, the way every other page names
   * itself there. The wordmark used to sit in that spot and say nothing about
   * where you had landed. It is still the link home, in the header, on this
   * page and on all the others.
   */
  /**
   * NOT THE PAGE'S NAME ANY MORE. It said "membership" over the photograph
   * and "fwd. membership" in the heading directly under it, which named the
   * page twice in one screen. This says something instead, and the h1 below
   * still does the naming.
   */
  heading: "behind [[closed]] doors",

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
    "Membership of Forward is by application. What it gets you, what we will ask, and how to apply.",

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
    note: "Members get access to the rooms, people, and ideas shaping the creator economy. Connect through [[invite-only dinners]], private conversations, and industry briefings with a network that extends far beyond the room.",
  },

  /** Shown instead of the form when applications are closed. */
  closed: {
    heading: "applications are closed",
    intro:
      "They open in windows rather than all year. Leave your address and we will tell you when the next one opens.",
  },
} as const;
