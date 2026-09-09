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
 * 2. SETTLED: the first item said "the club" and now says "what it is". The
 *    naming rule in src/lib/brand.ts won — it forbids the word anywhere a
 *    visitor can read — and the positioning document agreed from the other
 *    side, having rejected "The Social Club" for describing the format rather
 *    than the ambition.
 *
 * 3. THE FOUNDING PLACES FIGURE IS A NUMBER FROM A MOCK. Publishing it fixes a
 *    cap that the framework doc still has open. Set it to null and the strip
 *    shows the two dates instead, which is the state the brief itself
 *    recommends until somebody decides.
 */

export const HEADER_NAV: readonly { label: string; href: string | null }[] = [
  { label: "what it is", href: "/about" },
  { label: "membership", href: "/membership" },
  // The label says "events" and the page it opens still calls itself the
  // rooms, top to bottom — "the rooms", "a seat in the room", "five kinds of
  // room". Asked for as a label change only. If events is the word, the page
  // and the route want to follow it.
  { label: "events", href: "/rooms" },
  // REMOVED FROM THE NAVIGATION, NOT DELETED. /class-of-2026 still exists and
  // still works for anybody sent the link; it is off the bar until the cohort
  // is ready to be talked about publicly. Put this line back to restore it:
  //   { label: "the class of 2026", href: "/class-of-2026" },
  { label: "the briefing", href: "/briefing" },
];

/**
 * THE THREE FIGURES ALONG THE BOTTOM OF THE HERO.
 *
 * They describe the shape of the thing rather than its size, which is the only
 * honest register available to a club that has not held its first dinner. One
 * table, three kinds of people at it, four briefings a year.
 *
 * >>> "17 FOUNDING PLACES REMAINING" HAS GONE FROM HERE. <<< It was the only
 * urgency on the home page, and with the numbers section removed there is now
 * none at all. That may be right — scarcity you have to state is weaker than
 * scarcity somebody works out — but it was not a decision anybody took on
 * purpose, so it is written down. `foundingPlaces` is kept below and read by
 * nothing.
 */
export const HERO_STRIP = {
  figures: [
    { figure: "1", label: "table" },
    {
      figure: "3",
      label: "perspectives",
      /** The only one with a second line. See the note in hero-strip.tsx. */
      note: "Brands, creators, platforms",
    },
    /**
     * FOUR, NOT AN X. The brief for this line left the number open; the
     * briefing page has said "four times a year" since it was written, so this
     * is that number rather than a new claim.
     */
    { figure: "4", label: "briefings" },
  ] as readonly { figure: string; label: string; note?: string }[],

  /**
   * Not rendered. Kept because the figure itself is still contested — the
   * class of 2026 notes say fifty and this said seventeen — and deleting it
   * would quietly close an argument nobody has had.
   */
  foundingPlaces: 17 as number | null,
} as const;
