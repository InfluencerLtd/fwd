/**
 * hero-modules.ts
 * ---------------------------------------------------------------------------
 * The header navigation and the strip of figures along the bottom of the hero.
 *
 * >>> THREE THINGS IN HERE ARE NOT AGREED. <<<
 *
 * 1. FOUR OF THE FIVE NAV ITEMS HAVE NO PAGE. Only membership exists. The
 *    others are rendered as plain text rather than as links, because a link
 *    that goes nowhere is worse than a label that never claimed to: it is
 *    something a visitor presses and is punished for. Give each one a href
 *    below and it becomes a link.
 *
 * 2. "the club" BREAKS A NAMING RULE. src/lib/brand.ts says the word club is
 *    not used anywhere a visitor or member can read, and that where a common
 *    noun is needed the copy says "the room". It is here because it is in the
 *    mock. One of the two has to give.
 *
 * 3. THE FOUNDING PLACES FIGURE IS A NUMBER FROM A MOCK. Publishing it fixes a
 *    cap that the framework doc still has open. Set it to null and the strip
 *    shows the two dates instead, which is the state the brief itself
 *    recommends until somebody decides.
 */

export const HEADER_NAV = [
  { label: "the club", href: null },
  { label: "membership", href: "/membership" },
  { label: "rooms", href: null },
  { label: "the class of 2026", href: null },
  { label: "the briefing", href: null },
] as const;

export const HERO_STRIP = {
  /** Set to null to drop the figure entirely rather than show a placeholder. */
  foundingPlaces: 17 as number | null,
  foundingPlacesLabel: "founding places remaining",

  firstRoom: "21.10",
  firstRoomLabel: "the first room, London",

  newYork: "02.27",
  newYorkLabel: "New York opens",
} as const;
