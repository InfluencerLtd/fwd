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
  // The label says "what\u2019s on" and the page it opens still calls itself
  // the rooms, top to bottom — "the events" at the top, then "a seat in the
  // room", "five kinds of room". Asked for as a label change only. If what\u2019s
  // on is the word, the page and the route want to follow it.
  { label: "what\u2019s on", href: "/rooms" },
  // REMOVED FROM THE NAVIGATION, NOT DELETED. /class-of-2026 still exists and
  // still works for anybody sent the link; it is off the bar until the cohort
  // is ready to be talked about publicly. Put this line back to restore it:
  //   { label: "the class of 2026", href: "/class-of-2026" },
  { label: "the briefing", href: "/briefing" },
];

