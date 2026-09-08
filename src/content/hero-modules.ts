/**
 * hero-modules.ts
 * ---------------------------------------------------------------------------
 * The header navigation and the strip of figures along the bottom of the hero.
 *
 * >>> THREE THINGS IN HERE ARE NOT AGREED. <<<
 *
 * 1. EVERY ITEM HAS A PAGE OF ITS OWN. Two of them were anchors into writing
 *    that already existed; they are pages now. An item with a null href renders
 *    as plain text rather than as a link that punishes you for pressing it,
 *    which is what four of these were before the pages existed.
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

export const HEADER_NAV: readonly { label: string; href: string | null }[] = [
  { label: "the club", href: "/club" },
  { label: "membership", href: "/membership" },
  { label: "rooms", href: "/rooms" },
  { label: "the class of 2026", href: "/class-of-2026" },
  { label: "the briefing", href: "/briefing" },
];

export const HERO_STRIP = {
  /** Set to null to drop the figure entirely rather than show a placeholder. */
  foundingPlaces: 17 as number | null,
  foundingPlacesLabel: "founding places remaining",

  firstRoom: "21.10",
  firstRoomLabel: "the first room, London",

  newYork: "02.27",
  newYorkLabel: "New York opens",
} as const;
