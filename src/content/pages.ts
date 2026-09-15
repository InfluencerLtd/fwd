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
    heading: "What the first cohort gets",
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
    { label: "who features", value: "You" },
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
  /** The page heading, at the same size as every other page's. The full
   * sentence it comes from sits under it, as the first line of `lead`. */
  headline: "What comes next.",
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
    "This is where the creator economy [[comes together|circle]] to shape\u00a0what happens [[next|double]]",
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
    /**
     * IT WAS "WHY FORWARD" AND THE HOME PAGE HAS THAT NOW, with the name
     * story under it (NAME_STORY in src/content/site.ts). Two pages with the
     * same heading over different copy is its own kind of confusing, so this
     * section is named for what is left in it: what the room is for.
     */
    heading: "What it is for",
    /** From the positioning document. */
    /**
     * THE NAME STORY HAS MOVED TO THE HOME PAGE, word for word, as
     * NAME_STORY in src/content/site.ts (first-impression critique,
     * 14 September 2026). It was the strongest writing on the site and it was
     * on the second page. It is not repeated here: two pages carrying the
     * same paragraph is what the same critique took out of the offer copy.
     */
    body: [
      "It is a space designed to move the industry forward — the people shaping culture, creativity, media and influence, in a room together to exchange ideas, challenge thinking and make connections that matter.",
      "Somewhere to step outside the day to day, have the conversations that are hard to have anywhere else, and work out where this is all going next.",
    ],
  /**
   * NOTHING RENDERS THIS NOW. It was on the page for one day, 14 to 15
   * September 2026, and came off at Sophie's request. Kept because the
   * question it answers — who is Influencer, for a visitor who has never
   * heard of either name — is still unanswered anywhere on the site, and
   * because the wording here is the wording their own homepage uses.
   *
   * WHO IS BEHIND IT, IN ONE LINE. "by Influencer" was a wordmark and nothing
   * else, so the agency's credibility was doing no work for a visitor who has
   * never heard of either name (first-impression critique, 14 September 2026).
   * IT USES INFLUENCER.COM'S OWN WORDING, not the expansion brief's. The
   * brief called them "the biggest independent creator marketing specialist";
   * their own site says "a global marketing agency with creators at its
   * core" and claims no superlative anywhere, and two sites making different
   * claims about the same company is the kind of thing a competitor notices.
   * What survives is the part a creator actually weighs: founded by creators.
   *
   * `madeByLink` is the word that carries the link out to influencer.com.
   */
    madeBy:
      "Forward is made by Influencer, a global marketing agency founded by creators.",
    madeByLink: "Influencer",

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
  heading: "There is [[no|circle]] fixed program.",
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
  /**
   * PROOF THAT A ROOM HAS EVER HAPPENED. The page described rooms in the
   * future tense and showed no evidence any had taken place, which reads as
   * aspiration (first-impression critique, 14 September 2026).
   *
   * ONLY WHAT IS ON THE RECORD. Cannes Lions 2026 is where Forward started,
   * and the dinners there happened. No headcounts, no dates and no partner
   * names until somebody hands them over and they are cleared, because a
   * number nobody can stand behind is worse than no number.
   */
  origin: {
    heading: "Where this started",
    body: "Forward began at Cannes Lions 2026, as a collective identity and a handful of private dinners: brands, creators and platforms around the same table, off the record, while the rest of the industry was on stage.",
  },

  closing: {
    /** A sentence, so the close keeps its capital: see `sentence` on PageClose. */
    heading: "The format follows the conversation, not the other way around.",
  },
} as const;/* ===========================================================================
   FORWARD THINKERS
   ---------------------------------------------------------------------------
   THE INAUGURAL LIST. Written 15 September 2026 from the note that went to the
   two people being asked to curate it, which is the newest and most reliable
   account of the idea:

     - around thirty people driving the industry forward, across platforms,
       brands and creators
     - the list launches at the beginning of October, with fwd. itself
     - the people chosen are invited to take a Forward membership and are
       named in the launch announcement
     - recognition only: no commitment is asked of them, and they can be as
       involved as they want to be
     - suggestions come from industry figures, weighted by market, roughly ten
       names each

   NOBODY IS NAMED HERE, AND THAT IS THE RULE. The two curators had not said
   yes when this was written, and no Thinker has accepted. The same rule the
   class page follows: no real person appears on the public site until they
   have agreed to it.

   IT SUPERSEDES THE CLASS OF 2026. That earlier version of the same idea said
   around fifty people, curated by two named markets, revealed in January 2027.
   Every one of those numbers has moved. See CLASS_OF_2026 below, which is
   still in this file and still behind its own flag.
   =========================================================================== */

export const FORWARD_THINKERS = {
  title: "forward thinkers",
  description:
    "The inaugural Forward Thinkers: around thirty people driving the creator economy forward, across platforms, brands and creators.",
  /** NOTHING RENDERS THIS. Taken off the page on 15 September 2026. */
  eyebrow: "The inaugural list",
  heading: "The people moving the industry [[forward]].",
  /**
   * ONE PARAGRAPH. The second line said when the list is published, "at the
   * beginning of October", and came off on 15 September 2026: the page does
   * not need to date itself, and a date that slips is worse than no date.
   * `rest` in the page component handles an empty second line, so putting one
   * back is a line here and nothing else.
   */
  lead: [
    "Forward Thinkers is the first list: around thirty people driving the creator economy forward, across platforms, brands and creators.",
  ],

  /**
   * WHO CHOOSES. Asked for on 15 September 2026: the section that was "how the
   * list is made" is now the three people curating it.
   *
   * >>> THIS NAMES THREE REAL PEOPLE. <<< Sophie asked for them by name. The
   * rule the rest of this file follows is that nobody appears on the public
   * site until they have agreed to it, and the note asking Stuart and Tara to
   * curate went out on 15 September, so their yes may not be in writing yet.
   *
   * NO EMPLOYER TITLES ON TWO OF THEM. The expansion deck has Stuart at
   * DoubleVerify and Tara formerly at Google, and the meeting notes instead
   * associate Stuart with YouTube and Tara with TikTok. Two sources disagree,
   * so neither is published: what is here is the market each one is curating,
   * which is the only part that matters to a reader. Caspar's line is his
   * public role at Influencer.
   *
   * Spelling: "Tara Walpert Levy", no hyphen, as in the expansion deck.
   */
  curators: {
    heading: "Curated by",
    lead: "The list is not ours alone. Three people who know the industry put the names forward, market by market.",
    /** The shot each portrait wants, for whoever asks them for one. */
    photoBrief: "A portrait they already have. Head and shoulders, plain background",
    people: [
      {
        name: "Caspar Lee",
        line: "Co-founder and CVO of Influencer.",
        /** public/photography/curator-caspar-lee.jpg, when it arrives. */
        photo: "curator-caspar-lee",
      },
      {
        name: "Stuart Flint",
        line: "Curating the United Kingdom and Europe.",
        photo: "curator-stuart-flint",
      },
      {
        name: "Tara Walpert Levy",
        line: "Curating the United States.",
        photo: "curator-tara-walpert-levy",
      },
    ],
  },

  /**
   * THE THIRTY, AS A WALL OF FACES. Asked for on 15 September 2026: a small
   * portrait, the name, the job title, and one sentence on hover saying why
   * they are a Forward Thinker.
   *
   * THE NAMES ARE NOT IN. The curators were asked for around ten each on
   * 15 September, so `people` is empty and the page draws `slots` blank
   * portraits instead, labelled, which shows the shape of the finished section
   * without anybody inventing a Forward Thinker.
   *
   * Filling it is the whole job. Each entry takes:
   *
   *   name   as they would write it themselves
   *   title  role and company, one line, their wording
   *   why    ONE sentence, what they did that earned the place. This is the
   *          line on hover, and it is the only editorial judgment on the page,
   *          so it says what somebody did rather than how good they are
   *   photo  optional: a file name in public/photography, no extension. A
   *          missing file draws the warm placeholder rather than breaking
   *
   * PORTRAITS, NOT LOGOS. The shot brief for each is a head and shoulders in
   * the same low warm light as the rest of the site, so thirty of them sit
   * together as one wall rather than thirty different photographers.
   */
  list: {
    heading: "The first thirty",
    empty: "The names are with the curators. The list is published at launch.",
    /** How many blank portraits to draw while the names are out. */
    slots: 5,
    slotLabel: "To be announced",
    photoBrief: "Head and shoulders, low warm light, the room behind them",
    people: [] as readonly {
      name: string;
      title: string;
      why: string;
      photo?: string;
    }[],
  },

  /**
   * WHAT THINKERS GET. Nothing renders this: the section it filled is now the
   * list itself (15 September 2026). Kept because it is the only written
   * record of what somebody on the list is actually offered, and it is what
   * the invitation will have to say.
   */
  comes: {
    heading: "What it comes with",
    items: [
      {
        name: "The recognition",
        line: "Named in the launch announcement as a Forward Thinker in the creator economy.",
      },
      {
        name: "A membership",
        line: "An invitation to Forward, with the rooms, the introductions and The Briefing that come with it.",
      },
      {
        name: "Something to share",
        line: "Assets for anybody who wants to say so publicly.",
      },
      {
        name: "No commitment",
        line: "Thinkers can be as involved as they like, including not at all.",
      },
    ],
  },

  /** NOTHING RENDERS THIS. The close came off the page on 15 September 2026. */
  closing: { heading: "Put yourself forward" },
} as const;


