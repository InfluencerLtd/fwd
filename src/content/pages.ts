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
   * read a word of description: how often, who gets it, when the next one is,
   * how long it takes.
   *
   * >>> `next` IS A DATE NOBODY HAS COMMITTED TO. <<< It is the only thing on
   * this page that could be wrong on a Tuesday. Set it to null and the row
   * shows three columns instead of four.
   */
  masthead: [
    { label: "cadence", value: "Four times a year" },
    { label: "who gets it", value: "Members only" },
    { label: "next issue", value: "11.26" as string | null },
    { label: "read in", value: "Under ten minutes" },
  ],
  /** DRAFT. */
  lead: [
    "Four times a year, to members only. What is actually changing in the creator economy, from the people in a position to know it rather than the people quickest to write about it.",
    "It is short. It is not a roundup, it does not chase the news cycle, and nothing in it is written to be shared.",
  ],
  inside: {
    heading: "what is in it",
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
    heading: "members only",
    /** DRAFT. */
    note: "There is no public list and no free version. It goes to members, and the way to read it is to be one.",
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
    // The \n is a line break inside the paragraph, not a new paragraph. It is
    // rendered because the club page sets whitespace-pre-line; spaces still
    // collapse, so nothing else in these strings changes.
    // The three short sentences are held together with non-breaking spaces.
    // Without them the line wrapped mid-phrase — "The" was left at the end of
    // one line and "creators." began the next, which reads as a stumble. Now
    // each pair drops whole to the line below rather than splitting.
    "Forward brings together the people shaping the future of the creator economy. The\u00a0brands. The\u00a0creators. The\u00a0platforms.\nThe people with something to say, build, change or start next.",
    "Membership unlocks a year-round program of intimate dinners, private conversations, industry briefings and experiences alongside a network that extends far beyond the room.",
    "Meet someone you\u2019ve wanted to meet. Hear what\u2019s coming before it becomes obvious. Share an idea with the person who can make it happen.",
    "This is where the creator economy comes together to shape what happens next.",
  ],
  how: {
    heading: "how it works",
    /** DRAFT. */
    items: [
      {
        name: "It is chosen, not open",
        line: "Membership is by application, and the room is kept balanced on purpose. A room that is mostly one kind of person is not a room, it is an audience.",
      },
      {
        name: "The introductions are made",
        line: "Ask to meet any member and we make it properly, with a reason attached to both sides. Never a name passed along.",
      },
      {
        name: "It carries on between the rooms",
        line: "A members' area, a quarterly briefing, and a directory of who else is in it — so the year is not four dinners and eleven months of nothing.",
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
    heading: "why forward",
    /** From the positioning document. */
    body: [
      "The name is directional on purpose. It suggests movement, momentum and looking ahead rather than simply bringing people together socially.",
      "It is a space designed to move the industry forward — the people shaping culture, creativity, media and influence, in a room together to exchange ideas, challenge thinking and make connections that matter.",
      "Somewhere to step outside the day-to-day, have the conversations that are hard to have anywhere else, and work out where this is all going next.",
    ],
    /** The three it is built around. From the document. */
    pillars: [
      "Progressive discussion",
      "Fresh perspectives",
      "A meeting of minds",
    ],
  },

  closing: {
    heading: "who it is for",
    /** DRAFT. */
    note: "People with something to say and somewhere to take it. If that is a description of you, the way in is an application rather than an introduction.",
  },
} as const;

export const ROOMS = {
  title: "rooms",
  heading: "The rooms",
  /** DRAFT. */
  lead: [
    "Five kinds of room, and the same rule in all of them: small enough that everybody can hear everybody, and a guest list put together on purpose.",
    "Some are hosted with the platforms, some are ours. What they have in common is that nobody is on a stage.",
  ],
  closing: {
    heading: "a seat in the room",
    /** DRAFT. */
    note: "Rooms are for members. Invitations come by email, and the way to get one is to be in the room in the first place.",
  },
} as const;
