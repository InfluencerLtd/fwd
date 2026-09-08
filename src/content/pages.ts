import { BENEFITS } from "@/lib/brand";

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
  heading: "The Forward Class of 2026",
  /** DRAFT. */
  lead: [
    "fwd. does not open its doors and see who walks in. The first cohort is chosen, one name at a time, and the people in it are the room everybody else joins later.",
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

export const CLUB = {
  title: "the club",
  heading: "The club",
  /**
   * DRAFT. Written from the material already on the site — the positioning
   * line, the membership section, Meeting of Minds — rather than invented, but
   * these are new sentences and nobody has signed them off.
   */
  lead: [
    "fwd. is a community rather than a series of events. It runs all year, in person and online, and it spans brands, creators, platforms and the wider industry.",
    "It exists because the people shaping the creator economy mostly meet each other on stage, on panels, or not at all. Those are the worst possible conditions for the conversation that actually matters.",
    "So the rooms are small, the guest list is built by hand, and nobody is presenting at anybody.",
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
