import { BENEFITS, BRAND } from "@/lib/brand";

/**
 * pages.ts
 * ---------------------------------------------------------------------------
 * The two pages the header navigation needed and the site did not have.
 *
 * >>> BOTH ARE DRAFTS. <<<
 *
 * They are written from the notes supplied rather than invented, and three
 * things in those notes are deliberately NOT on the page:
 *
 *   THE NUMBER. The notes say "potentially 50 founding members". Potentially is
 *   not a number you print, and it does not agree with the 17 in the hero strip
 *   either — one of those two is wrong and neither is settled. The page says the
 *   cohort is small and does not say how small.
 *
 *   THE CURATORS. Stuart Flint for the UK and Tara for the US. Naming two real
 *   people as judges on a public page is their decision to make before it is
 *   ours, so the page says the lists are built market by market and leaves the
 *   names for when they have said yes.
 *
 *   EVERYTHING ELSE IN THE NOTES was internal — who manages the initiative, and
 *   how the advisors are feeling about the pace. None of that belongs on a
 *   website.
 */

export const CLASS_OF_2026 = {
  title: "the class of 2026",
  /**
   * Built from BRAND.markShort rather than typed out, so the mark here cannot
   * drift from the mark everywhere else — it was briefly "FWD." and the rule
   * in src/lib/brand.ts is explicit that it never is. Read from the one place
   * the name lives, it cannot go wrong again.
   *
   * "Founding Class" rather than "The Forward Class": it agrees with the hero
   * strip, which counts founding places.
   */
  heading: `${BRAND.markShort} Founding Class 2026`,
  /** DRAFT. */
  lead: [
    "Forward does not open its doors and see who walks in. The first cohort is chosen, one name at a time, and the people in it are the room everybody else joins later.",
    "It is built market by market rather than as one list, because the rooms are in different cities and the people who should be in them are not the same people.",
    "Creators, brands and platforms, in a deliberate balance. A founding cohort that is mostly one of the three is not a room, it is an audience.",
  ],
  whatYouGet: {
    heading: "what the first cohort gets",
    /** DRAFT. */
    items: [
      "A founding member's place, which is not offered again.",
      "A box, sent when the class is announced.",
      "Something to post with, so the people who should know that you are in it find out from you.",
    ],
  },
  closing: {
    heading: "applications are open",
    /** DRAFT. */
    note: "The class closes when it is full rather than on a date. Applying does not put you in it; it puts you in front of the people building it.",
  },
} as const;

export const BRIEFING = {
  title: "the briefing",
  /** Named in src/lib/brand.ts, so the page and the navigation cannot drift. */
  heading: BENEFITS.newsletterName,

  /**
   * The masthead row under the name — the facts a reader wants before they
   * read a word of description: how often, who gets it, how long it takes.
   * The next-issue date came out; a date nobody had committed to was the one
   * thing on the page that could be wrong.
   */
  masthead: [
    { label: "issues", value: "Four times a year" },
    { label: "who gets it", value: "Members only" },
    { label: "read in", value: "Under ten minutes" },
  ],
  /** DRAFT. */
  lead: [
    "Four times a year, to members only. What is actually changing in the creator economy, from the people in a position to know it rather than the people quickest to write about it.",
  ],
  inside: {
    heading: "What is in it",
    /** DRAFT. Four pillars, in the shape of the reference site's. */
    items: [
      {
        name: "What changed",
        line: "The two or three shifts that will still matter in three months, and what they mean for the people in the room.",
      },
      {
        name: "From the rooms",
        line: "What was said at the dinners and roundtables, with the names taken off.",
      },
      {
        name: "Worth knowing",
        line: "Platform changes, moves, numbers that are real rather than announced.",
      },
      {
        name: "Who to meet",
        line: "A handful of members worth an introduction, and why.",
      },
    ],
  },
  /** Members only, so the page cannot end in a sign-up form. It ends in the ask. */
  closing: {
    heading: "Members only",
  },
} as const;

export const ABOUT_PAGE = {
  /**
   * "what it is", not "the club".
   *
   * The naming rule in src/lib/brand.ts has always said the word club is not
   * used anywhere a visitor can read. The navigation broke it, and the
   * positioning document settles the argument from the other direction too:
   * The Social Club was rejected for describing the format rather than the
   * ambition. So the item says what the page contains.
   */
  title: "what it is",
  /**
   * DRAFT. Written from the material already on the site — the positioning
   * line, the membership section, Meeting of Minds — rather than invented, but
   * these are new sentences and nobody has signed them off.
   */
  lead: [
    // The three short sentences are held together with non-breaking spaces.
    // Without them the line wrapped mid-phrase — "The" was left at the end of
    // one line and "creators." began the next, which reads as a stumble. Now
    // each pair drops whole to the line below rather than splitting.
    // ONE SENTENCE. "The brands. The creators. The platforms." was the second
    // half of this and it has gone — with it went the line break that held the
    // three together and the circles that were briefly drawn round them.
    //
    // TWO MARKS, ON "the people" AND "future", and the swoosh that was under
    // "shaping" has gone rather than making a third. Both are the plain
    // underline: the same shape twice in one sentence reads as one hand
    // marking two words, where two different shapes would read as two
    // different kinds of emphasis nobody could explain.
    // THE INVITE'S LINE, WORD FOR WORD: "The people building, challenging
    // and shaping what comes next." The site said "something to say, build,
    // change or start next", which the invite's feedback asked to lose, so the
    // two now say the same thing.
    //
    // ONE MARK, A SWOOSH UNDER "challenging" — the one of the three verbs no
    // other networking pitch would use. "next" is left alone: the claim further
    // down already ends on a double-underlined "next".
    "The people building, [[challenging|swoosh]] and shaping what comes next.",
    "Membership unlocks a year-round program of intimate dinners, private conversations, industry briefings and experiences alongside a network that extends far beyond the room.",
    "Meet someone you\u2019ve wanted to meet. Hear what\u2019s coming before it becomes obvious. Share an idea with the person who can make it happen.",
  ],
  /**
   * The line the two paragraphs above are the detail of, set at heading size
   * over them.
   *
   * IT WAS THE LAST OF THE FOUR PARAGRAPHS AND IT WAS BURIED. Three paragraphs
   * of the same size, in one narrow column, with the conclusion at the bottom
   * in the same voice as everything above it — nothing on the page said which
   * of them was the point. It is the point, so it is now the size of one.
   */
  statement:
    // "shape what" is held together with a non-breaking space so "what" sits at
    // the end of the line above rather than opening the last line. The mark is
    // on the last word alone: it is what the sentence is about, and a mark
    // under three words at this size is a rule rather than a pen line. Gone
    // over twice, which is the heaviest of the four shapes and the only one
    // that reads at the end of a sentence this size.
    "This is where the creator economy [[comes together|circle]] to shape\u00a0what happens [[next|double]].",
  how: {
    heading: "How it works",
    /** DRAFT. */
    items: [
      {
        name: "The guest list is balanced by hand",
        line: "Membership is by application, and every guest list is put together deliberately. When one group dominates, everybody else is just an audience.",
      },
      {
        name: "The introductions are made for you",
        line: "Ask to meet any member and we make the introduction properly, with a reason attached for both sides. Never a name passed along.",
      },
      {
        name: "It does not stop when dinner does",
        line: "A members' area, The Briefing four times a year, and a directory of everyone else in the room. Membership runs all year, not around one date in the diary.",
      },
    ],
  },
  /**
   * WHY IT IS CALLED FORWARD.
   *
   * Taken from the positioning document, in its own words. It is the one piece
   * of writing about this brand that explains the name, and nothing on the
   * site said it — a visitor met the mark on every page and was never told
   * what it meant.
   *
   * IT ALSO CARRIES THE WIDER FRAME, and this is the only page that does. The
   * home page and the meta description stay on the creator economy, which is
   * specific, searchable and what the first cohort actually is. The ambition —
   * culture, creativity, media and influence — lives here, where somebody has
   * clicked through because they want to know what this is.
   */
  ambition: {
    heading: "Why Forward",
    /** From the positioning document. */
    body: [
      "You see something good and you forward it. Not to everyone, just to the handful of people whose take you actually want on it.",
      "That is the whole idea. A small group of people worth forwarding things to, in the same place.",
      "It is a space designed to move the industry forward — the people shaping culture, creativity, media and influence, in a room together to exchange ideas, challenge thinking and make connections that matter.",
      "Somewhere to step outside the day to day, have the conversations that are hard to have anywhere else, and work out where this is all going next.",
    ],
    /** The three it is built around. From the document. */
    pillars: [
      "Off the record",
      "Fresh perspectives",
      "A meeting of minds",
    ],
  },

  /**
   * THE THREE, EACH IN ITS OWN COLUMN WITH A CIRCLE ROUND IT.
   *
   * They were briefly a single line over the photograph at the top of this
   * page, with three circles drawn along it, and the three marks ran into one
   * another at the width where the line fit — one long loop rather than three.
   * A column each is what the device wanted all along: nothing is next to
   * anything, so every circle is its own mark.
   *
   * IT USED TO LIVE UNDER `closing`, WHICH HAS GONE WITH THE SECTION. The page
   * ended on "who it is for" over a paragraph saying who it is for, three
   * sections after these three columns answered the same question, so the
   * close was deleted and this came up here.
   *
   * DRAFT lines. Each says what that third of the room actually does, in one
   * sentence, without telling any of them how important they are.
   */
  forWhom: [
    {
      name: "The\u00a0brands.",
      line: "The people spending the budget, and answering for where it went.",
    },
    // The creators in the middle, with the other two either side of them.
    {
      name: "The\u00a0creators.",
      line: "The people who built the audience, and decide what gets made for it.",
    },
    {
      name: "The\u00a0platforms.",
      line: "The people who set the rules the other two work inside.",
    },
  ],
  /** The close at the foot of the page. A sentence, so it keeps its capital. */
  closing: {
    heading: "Put yourself forward",
  },
} as const;

export const ROOMS = {
  title: "rooms",
  /**
   * A sentence now, not a name, so it keeps its capital and its full stop (the
   * page sets it normal-case). "no" carries the circle — see marked.tsx.
   */
  heading: "There is [[no|circle]] fixed programme.",
  lead: [
    "A dinner in London one month. A closed conversation in New York the next. Drinks in Cannes because the whole industry has gathered there. Cocktail hour in Texas, a conversation in Los Angeles, or an unexpected gathering wherever our members happen to be.",
    "Forward goes where the members are, and happens when and where there is reason.",
  ],
  /** The big line, set like the case on the home page. */
  claim: "Every gathering is curated [[by hand]].",
  formatsHeading: "What that can look like",
  /**
   * Not a sequence, so not numbered. The last one is the open door, and its
   * line is also the page's closing heading.
   */
  formats: [
    { name: "Dinners", line: "A seat at the table and a subject worth exploring" },
    { name: "Roundtables", line: "One question, and a small group of people with different answers" },
    { name: "Drinks", line: "Members in the same city, with no agenda beyond being together" },
    { name: "Closed sessions", line: "Off-the-record conversations, often in partnership with the platforms shaping the industry" },
    { name: "Offline", line: "The conversations that are better had in the room" },
    { name: "Online", line: "For the weeks nobody can travel" },
    { name: "On the road", line: "Taking Forward into the places and moments where the industry is already moving" },
    { name: "And whatever comes next", line: "The format follows the conversation, not the other way around" },
  ],
  closing: {
    /** A sentence, so the close keeps its capital: see `sentence` on PageClose. */
    heading: "The format follows the conversation, not the other way around.",
  },
} as const;
