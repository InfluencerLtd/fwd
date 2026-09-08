/**
 * formats.ts
 * ---------------------------------------------------------------------------
 * The five kinds of room, for the tabbed module on the membership page.
 *
 * >>> EVERY DESCRIPTION, SIZE AND FREQUENCY BELOW IS TEST COPY. <<<
 *
 * The five names are real. They are the formats an event can actually be — the
 * `event_format` enum in supabase/migrations/0004_clubhouse.sql — so the tabs
 * match what the calendar will hold rather than inventing a taxonomy beside it.
 *
 * Everything else was written to give the module something to hold. No size and
 * no frequency here has been agreed by anybody, and each one is a public claim
 * about how often fwd. does something and how many people are in the room.
 * Replace them before this page is shown to anyone outside the team.
 */
export const FORMATS = [
  {
    id: "dinner",
    name: "Dinners",
    /** TEST COPY. */
    description:
      "A table, a host and a subject. No panel and no lectern: the whole point is that everyone at it can hear everyone else.",
    size: "10 to 14",
    frequency: "monthly",
  },
  {
    id: "drinks",
    name: "Drinks",
    /** TEST COPY. */
    description:
      "The looser one. A room, a bar and whoever is in town, with no agenda beyond being in the same place at the same time.",
    size: "40 to 60",
    frequency: "quarterly",
  },
  {
    id: "roundtable",
    name: "Roundtables",
    /** TEST COPY. */
    description:
      "One question, and eight people who have each answered it differently. Closed, unrecorded, and built around a problem rather than a speaker.",
    size: "8 to 10",
    frequency: "monthly",
  },
  {
    id: "webinar",
    name: "Webinars",
    /** TEST COPY. */
    description:
      "Online and members only, for the people who cannot be in the room that week. Recorded, and in the library afterwards.",
    size: "no limit",
    frequency: "monthly",
  },
  {
    id: "conference",
    name: "Conferences",
    /** TEST COPY. */
    description:
      "Where fwd. takes a room inside somebody else's week. Cannes, Ad Week, and the handful of others worth the flights.",
    size: "varies",
    frequency: "three a year",
  },
] as const;

/** Names the module for a screen reader. Not printed. */
export const FORMATS_LABEL = "the kinds of room";
