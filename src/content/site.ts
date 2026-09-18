import { BENEFITS } from "@/lib/brand";

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
  /**
   * The two lines under the wordmark: when, then what.
   *
   * IT NO LONGER SAYS WHAT FORWARD IS. It used to carry the positioning line —
   * "the home for the people shaping what\u2019s next in the creator economy" —
   * which explained the premise on a page that exists to tease it. This says
   * only that something is coming and roughly when, in the brand's own image:
   * the room, being set. The premise arrives with the site.
   *
   * POSITIONING is untouched and still feeds the search description, so a
   * search result still says what Forward is. Only the page stopped saying it.
   *
   * NO DATE. It said "Coming October 2026", which is a public promise on the
   * one page everybody sees first, and a date that could move. "Coming soon"
   * cannot be wrong on any day between now and launch. Stored in sentence
   * case; the eyebrow style sets it in capitals.
   */
  eyebrow: "Coming soon",
  line: "The table is being set.",

  emailLabel: "email address",
  submit: "request access",
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
  description: `${POSITIONING} By Influencer.`,
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
  headline: "Brands. Creators. Platforms.",
  /**
   * THE LINE UNDER THE THREE NOUNS. Her words, 15 September 2026. An earlier
   * attempt at this came off the page the day before for saying too little in
   * too many words; this one says what Forward is and who it is for, and the
   * first half is the part nobody else on this list could write.
   *
   * ONE SENTENCE. The second half named the three groups again, which the
   * line directly above it already does, so it came off on 15 September 2026.
   */
  plain:
    "Where the creator economy comes together to shape what happens\u00a0next.",

  /*
   * AN EARLIER, PLAINER SENTENCE SAT HERE AND CAME OFF. It was added on 14 September
   * 2026 for the first-impression critique — "the site never says what this
   * is" — and taken out again on 15 September: under the three nouns it made
   * the hero explain itself, which is not what this photograph is for. The
   * critique's point still stands and is unanswered on this page; if it comes
   * back it wants somewhere other than here, most likely the first band under
   * the fold.
   */
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
    /*
     * DIRECTIONAL WORKING COPY, from the consolidated review of
     * 17 September 2026. The three openings are the review's own positive
     * framing: brands create opportunity, platforms enable distribution,
     * creators inspire action.
     *
     * THE ENDING IS DELIBERATELY MISSING. The review's copy runs "That is
     * what Forward is for: [ending still to be written]" and says not to
     * invent it, so the paragraph stops on the full stop. When the ending
     * arrives it goes on the end of this line.
     */
    "Brands create opportunity. Platforms enable distribution. Creators inspire action.",
    "All three are building the industry, but they don\u2019t spend enough time together outside stages, panels and conferences with thousands of people watching.",
    "Those are not exactly the ideal conditions for candid conversations, debate and meaningful connections. That is what Forward is for.",
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
  /** DRAFT. An invitation rather than a description of the process. */
  heading: "Put your name forward",
  /** DRAFT. */
  /**
   * NOTHING IS DRAWN UNDER THE HEADING NOW. The line here answered the silent
   * question an applicant has — is this read, and will anybody reply
   * (first-impression critique, 14 September 2026) — and it came off the page
   * on 15 September. Kept, unrendered, because it is the plainest description
   * of how applications are handled that exists in this file, and the
   * membership page is where it would go if it goes anywhere.
   */
  note: "Every application is read by a person. We keep the room balanced, so not everyone gets in, and we answer either way.",
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
  /**
   * NOTHING RENDERS THIS. The large heading came off on 17 September 2026 at
   * the review's request: the section is the benefit list and the two lines
   * under it now.
   */
  heading: "A year of rooms, and the people in\u00a0them",

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
  /*
   * THE MEMBER BENEFITS, DIRECTLY. The review asked for the heading to go and
   * a direct benefit line in its place, covering dinners, roundtables, closed
   * briefings, one-off experiences, the network, sporting access and
   * merchandise. Directional, not the final list: "and more to come" carries
   * the benefits nobody has settled yet.
   *
   * THE SECOND LINE IS KEPT WORD FOR WORD, both sentences, which the review
   * asked for explicitly. "Meet someone you have wanted to meet" was the
   * third sentence and it has gone.
   */
  lead: [
    "Dinners, roundtables, closed briefings and one-off experiences, the network around them, access to sporting events, members\u2019 merchandise, and more to come.",
    "Hear what\u2019s coming before it becomes obvious. Share an idea with the person who can act on it.",
  ],

  /** Still used on the membership page, above the cards. */
  intro: "Some of it is access. Most of it is people.",

  /**
   * Over the list under the tiles. The tiles are names over photographs; this
   * is where each name is explained.
   */
  whatEachIs: "What each one is",

  /**
   * The eight things membership gets you.
   *
   * ONLY `id` AND `title` ARE ON THE SITE. They are the photograph and the
   * words on each tile at the top of the membership page.
   *
   * `summary` IS DRAWN AGAIN, UNDER THE TILES. The drifting band still says
   * names only — a line of copy moving past is too much to read — but the
   * list underneath it on the membership page now pairs every name with its
   * summary, because a first-time visitor cannot tell what "Ask the room" or
   * "Partner rooms" mean from the name alone (first-impression critique,
   * 14 September 2026).
   *
   * The long `detail` field that used to sit here has gone. Nothing ever
   * rendered it, this note used to say to delete it rather than leave copy
   * nobody would read, and the cards now come as a headline and a line rather
   * than as three levels.
   */
  /*
   * THE BRIEFING TILE CAME OUT ON 15 SEPTEMBER 2026. It was the pale blue
   * "coming soon" tile in the drifting band, and it read as the one thing on
   * the page that is not ready. The newsletter itself is untouched: it has its
   * own page, its own section there, and its name still comes from
   * BENEFITS.newsletterName.
   *
   * The entry, if it goes back:
   *
   *   { id: "newsletter", title: "The briefing",
   *     summary: "Quarterly, members only. What is actually changing, from
   *               people in a position to know.",
   *     comingSoon: "Coming soon" }
   *
   * THE CLUBHOUSE TILE WENT THE SAME WAY, minutes later, for the same reason:
   * two pale blue "coming soon" tiles in a band of photographs read as the
   * things that are not built yet. The members' area itself is unaffected, and
   * its name still comes from BRAND.memberArea.
   *
   * FOUNDING MEMBERS WENT TOO, on the same afternoon:
   *
   *   { id: "founding-members", title: "Founding members",
   *     summary: "The first people in the room, chosen before the doors
   *               opened." }
   *
   *   { id: "the-house", title: BRAND.memberArea,
   *     summary: "The members\u2019 area. Private, online, always open.",
   *     comingSoon: "Coming soon" }
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
      summary: "Closed sessions run with the platforms themselves.",
    },
    {
      id: "guest-passes",
      title: "Guest passes",
      summary: "Twice a year, bring the person who should be in the room.",
    },
    {
      id: "directory",
      title: "The directory",
      summary: "Every member, findable, and introduced through us.",
    },
    {
      id: "ask-the-room",
      title: "Ask the room",
      summary: "Put one question to the whole membership.",
    },
    {
      id: "digital-rooms",
      title: "Digital rooms",
      summary: "Webinars and small breakout sessions, wherever members are.",
    },
    {
      id: "merch",
      title: "Members\u2019 merch",
      summary: "Made in small numbers, for members only.",
    },
    {
      id: "nominate",
      title: "Nominate a member",
      summary: "One nomination a year, for somebody who should be here.",
    },
    {
      id: "global-access",
      /** PLACEHOLDER. The sheet had a headline and no line under it. */
      summary: "Rooms in London, New York and Cannes, and wherever members happen to be.",
      title: "Global access",
    },
  ],
} as const;

export const MEETING_OF_MINDS = {
  heading: "Meeting of minds",
  /** DRAFT. */
  standfirst: "The right introduction can [[change everything]].",
  // TWO PARAGRAPHS, NOT THREE. The middle one said what the third one says
  // better, so the promise and the mechanism now sit in one sentence each
  // (first-impression critique, 14 September 2026).
  body: [
    "Most networks hand you a directory and leave the rest to you. We work the other way around.",
    "Ask to meet any member and we make the introduction ourselves, with a reason attached for both sides. No contact details are shared until you both say yes.",
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
 * lowercased in globals.css, site-wide. It is the newsletter's name, which is
 * already lowercase — "the briefing" — so there is nothing for the stylesheet
 * to change.
 */
export const BRIEFING_SUBMIT = {
  // No eyebrow. It said "the briefing" over a heading about the briefing.
  // The newsletter's own name, read from brand.ts like the briefing page and
  // the navigation take it, so the three cannot drift apart.
  heading: BENEFITS.newsletterName,
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
  // Starts at "Built" rather than "The briefing is built": the heading above
  // is now the name, so the sentence under it no longer has to say it again.
  body: "Built from what is actually changing in the creator economy, from the people in a position to know it rather than the people quickest to write about it.\nFour issues released throughout the year, to members only. Written by Jenny Penich, Influencer’s chief revenue officer.",
  send: "If it is worth including, forward it to us",
  /**
   * THE SAME SECTION, ON THE BRIEFING PAGE. There it sat under an h1 already
   * reading "the briefing", with a paragraph restating the page's own lead,
   * so the page said both twice. This is the section's original heading and
   * body — the contribute pitch, which is what the section is actually for.
   */
  onBriefingPage: {
    heading: "Most of it comes from the room",
    body: "The briefing is built from what members are actually seeing. A shift in how a budget is being spent, a format that has stopped working, a question worth putting to the rest of the membership. If you have something, send it. Nothing is attributed without asking you first.",
  },

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
    heading: "Send something in",
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

/* ===========================================================================
   WHY THE NAME
   ---------------------------------------------------------------------------
   MOVED HERE FROM /about, WORD FOR WORD. It was the best paragraph on the site
   and it was on the second page (first-impression critique, 14 September
   2026). The name is what makes the brand stick, so the home page leads with
   it. It is not on /about any more — the same words on both pages is the thing
   we just finished taking out.
   =========================================================================== */

export const NAME_STORY = {
  heading: "Why Forward",
  /**
   * THE HEADWORD, because this section is set as a dictionary entry from
   * 17 September 2026 (the review's design direction for it). The word itself
   * is the thing being defined, so it is the largest thing in the section and
   * it is the lowercase word rather than the brand's name.
   *
   * >>> THERE IS NO DEFINITION LINE AND NO PART OF SPEECH. <<< A dictionary
   * entry normally opens with both, and writing either would mean inventing
   * the one sentence that says what Forward means, which the review explicitly
   * left to be written rather than generated. The two sentences below are
   * numbered as the senses instead, which is the entry's structure without any
   * words nobody has approved. When the definition arrives it goes here as
   * `definition` and renders between the headword and the senses.
   */
  headword: "forward",
  /**
   * THE ENTRY'S FURNITURE: the syllable break, how it is said, and what part
   * of speech it is. Asked for on 17 September 2026 to make the section read
   * as an actual dictionary entry rather than as a big word with sentences
   * under it.
   *
   * NONE OF THIS IS INVENTED COPY. They are facts about the English word:
   * "forward" breaks for-ward, the American pronunciation is respelled
   * fawr-werd (American English is the house rule, see the top of this file),
   * and both senses below describe the act of forwarding something, so it is
   * the verb. The sentence that says what Forward the community means is
   * still nobody's to write but the review's.
   *
   * \u00b7 is the middle dot dictionaries set syllable breaks with, written as
   * an escape because typed it is easily mistaken for a full stop and lost.
   */
  syllables: "for\u00b7ward",
  pronunciation: "[fawr-werd]",
  partOfSpeech: "verb",
  body: [
    "You see something good and you forward it. Not to everyone, just to a handful of people whose opinion you genuinely value.",
    "That is the idea: the right people, in one place, sharing what matters.",
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
    heading: "Apply for membership",
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
  cta: "Apply for membership",

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
   * THREE APPLICANTS, NOT TWO. Applying starts by saying which one you are.
   *
   * Brands, creators and platforms are the three groups Forward exists to put
   * in the same room, and they are the three groups the whole site names, so
   * the application asks the same way (review, 17 September 2026). Brand and
   * platform were one card reading "a brand or platform" until then, which
   * made a platform an afterthought on the one screen where somebody is
   * putting their name forward.
   *
   * ONE FORM EACH, from 17 September 2026. Typeform now holds three: the
   * questions worth asking a creator are not the ones worth asking somebody
   * at a brand, and neither set is what you would ask a platform. The three
   * ids are in apply-panel.tsx.
   */
  choose: {
    /**
     * DRAFT. Cut to its last sentence. It used to explain that the questions
     * worth asking a creator are not the ones worth asking somebody at a
     * brand, which is true and is not the reader's problem: the cards
     * underneath say what the choice is far faster than a sentence about why
     * the choice exists.
     */
    lead: "Pick the one that fits.",
    creator: {
      // [[brackets]] mark the words that carry the blue underline. One mark
      // per word, so a label that wraps on a phone still underlines cleanly.
      label: "a [[creator]]",
      heading: "apply, as a creator",
    },
    brand: {
      label: "a [[brand]]",
      heading: "apply, as a brand",
    },
    platform: {
      label: "a [[platform]]",
      heading: "apply, as a platform",
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
      market: "where you are based",
      /* Asked in full inside the box rather than in a line under it. The
         label above stays the short "market", which is what it is once it has
         been answered. */
      marketPlaceholder: "City or country",
      link: "LinkedIn or social profile",
      reason: "why do you want to be part of it",
    },
    creator: {
      heading: "apply, as a creator",
      role: "what you make",
      /**
       * ONE PLATFORM, NOT TWO. The Typeform this replaced required an
       * Instagram handle AND a TikTok handle, which bounced anybody whose
       * audience is on YouTube, LinkedIn, Substack or in a podcast feed
       * (15 September 2026). This asks where the audience actually is, once.
       *
       * It writes to the same `company` column a brand's company name does:
       * for a creator, where people find you is the equivalent answer.
       */
      company: "your main platform",
      platforms: [
        "Instagram",
        "TikTok",
        "YouTube",
        "LinkedIn",
        "Substack",
        "Podcast",
        "Somewhere else",
      ],
      linkLabel: "a link to where people find you",
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
  /**
   * The application's own consent box — which stays. It was sharing the
   * holding page's message, and that page's box is gone; this one is still a
   * request to email somebody about membership, and still needs the tick.
   */
  consentRequired: "Please tick the box so we know we can email you.",
  error: "Something went wrong at our end. Please try again in a moment.",
  /** Shown when this has been sent several times within the hour. */
  tooMany:
    "We have your application. If you have not heard back, write to us rather than sending it again.",
  consent:
    "I am happy to receive occasional email about Forward. You can unsubscribe at any time.",
} as const;

/* ===========================================================================
   FILM
   ---------------------------------------------------------------------------
   Two short, silent, looping films, and the frames standing in for them.

   ONE FILE EACH, AND NEITHER EXISTS YET. Set `src` to the path once the file
   is in public/film and the slot plays it; until then it shows the poster and
   the page looks finished rather than unfinished. The full brief — what to
   shoot, how to export it, what the safe areas are — is in
   public/film/README.md, which is written for whoever holds the camera.

   WHY ONLY TWO. The reference for this (mvemanagement.com, 18 September 2026)
   carries exactly one film on a five-thousand-pixel page: vertical, silent,
   no controls, beside a piece of copy about an event they threw. Restraint is
   the whole effect. Three would make this a showreel.
   =========================================================================== */

export const FILM = {
  /**
   * THE PROOF. It sits on the home page immediately after the case ends on
   * "That is what Forward is for", which is the moment somebody decides
   * whether to believe any of it. Everything else on the site describes rooms
   * in the future tense; this is one that happened.
   */
  room: {
    src: null as string | null,
    poster: "film-room",
    /** Standing in: the long table from the Tashca dinner, down the room. */
    brief:
      "A dinner in progress. The table, hands, a glass going up. Warm, low light, one shot. Held vertically.",
  },
  /**
   * THE REEL, beside the rooms copy on the membership page.
   *
   * BOTH FILMS ARE 9:16. Phone-shaped is not a compromise here: it is the
   * shape this industry actually films in, and it is why the home page's slot
   * is a centred reel rather than a band across the page.
   */
  reel: {
    /**
     * IN, 18 September 2026. Cannes: the Carlton, the activations, the
     * dinners. A cut montage rather than the held single shot the brief asks
     * for, so the loop jumps from its last frame back to its first.
     *
     * TRIMMED TO TAKE THE BURNED-IN TEXT OFF. The original opened on "this is
     * where the creator economy summers..." across its first three and a half
     * seconds, and closed on an "influencer CANNES LIONS 2026" end card from
     * 17.7s to the end. Neither is wording this site wrote, and both sat over
     * a film that plays silently with no controls, where anything written on
     * the picture reads as the page's own voice. The cut is 3.6s to 17.6s of
     * the original: fourteen seconds with nothing written over it.
     *
     * What is left is text inside the rooms themselves — stage graphics, a
     * TikTok sign, a Canva screen. That is the environment rather than an
     * overlay, and taking it out would mean taking the footage out.
     *
     * 720x1280, no audio track at all, 2.4MB, faststart. Cut and re-encoded
     * from the 5.3MB original with the settings in public/film/README.md.
     */
    src: "/film/reel.mp4",
    /** The cut's own first frame, so there is no jump when it starts. */
    poster: "film-reel",
    brief:
      "The same evening, held vertically. One shot, close, somebody mid-sentence and the table listening.",
  },
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
  home: "Home",
  membership: "membership",
  signIn: "sign in to The clubhouse",
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
  aboutClose:
    "The long table, full, from the end of the room. For the foot of the what it is page",
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
    // SHOT AND IN. Two members meeting on the pavement outside, one in a
    // white polo, a glass still in hand (Tashca shoot, 17 September 2026).
    "guest-passes": "Two people meeting outside, mid-greeting, drinks in hand",
    // SHOT AND IN. The long table down the room, everybody seated.
    directory: "The long table down the room, full, mid-conversation",
    "ask-the-room": "Two people leaning in over one phone, mid-answer",
    "the-house": "A phone on a table at a dinner, screen lit, nobody looking at it",
    "founding-members": "Waiting on what this card says. A first table, early, half laid",
    "digital-rooms": "A laptop open on a kitchen table at night, one face lit",
    newsletter: "Print on a table. Paper, a glass, a hand at the edge",
    merch: "One piece, folded, on a dark surface. No model",
    nominate: "Two people talking, one gesturing off to somebody else",
    // SHOT AND IN, and no longer waiting: it is the restaurant frontage in
    // New York with the doors open and a trio playing on the pavement, which
    // says "wherever members are" better than a skyline would.
    "global-access": "A restaurant front on the street, doors open, a trio playing outside",
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
    "Briefings",
    "Roundtables",
    "Introductions",
    "Dinners",
    "Guest lists",
    "Connections",
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
  heading: "Behind [[closed]] doors",

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
    heading: "Ready to apply?",
  },

  /**
   * The band under the header. This used to be the ask: a heading that said
   * "ready to apply?" and a button under it. The ask moved into the header, so
   * this says what membership is instead.
   */
  about: {
    /** DRAFT. */
    /** Spelled out, from the review: "Forward membership", not the mark. */
    heading: "Forward membership",
    /** DRAFT. */
    // Three marks, and the first is the odd one out on purpose: the swoosh
    // opens the list, the two plain underlines follow it. Naming the shape per
    // phrase rather than on the component is what lets one sentence do that.
    /*
     * ONE SENTENCE SHORTER. "Members get access to the rooms, people, and
     * ideas shaping the creator economy" came off on 17 September 2026: it is
     * the proposition again, and Home makes that argument. What is left is
     * retained for review rather than signed off.
     */
    note: "Connect through moments such as [[invite-only dinners]], [[private conversations|underline]], and [[industry briefings|underline]] with a network that extends far beyond the room.",
  },

  /** Shown instead of the form when applications are closed. */
  closed: {
    heading: "applications are closed",
    intro:
      "They open in windows rather than all year. Leave your address and we will tell you when the next one opens.",
  },
} as const;

/**
 * The page for an address that does not exist. The wordmark is shown without
 * its full stop, which is the whole message: something is missing here.
 */
export const NOT_FOUND = {
  title: "Not found",
  heading: "This page does not exist.",
  back: "Go to the home page",
} as const;
