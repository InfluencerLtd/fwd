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
  // AN ANCHOR, NOT A PAGE. /about has gone (review, 17 September 2026): its
  // statement, the three groups and How it works are a section of the home
  // page now, and this scrolls to it. /about itself redirects to the same
  // place, so every link anybody has ever sent still works.
  { label: "About", href: "/#about" },
  { label: "Membership", href: "/membership" },
  // THE ROOMS IS OFF THE BAR, AND THE PAGE HAS GONE WITH IT (review,
  // 17 September 2026). Four items is the nav now: About, Membership,
  // ForwardThinkers, The briefing. What the page was actually for — where the
  // rooms happen and the shapes they take — is a section of /membership at
  // #rooms, and /rooms redirects there. Put it back as a fifth item with:
  //   { label: "The rooms", href: "/membership#rooms" },
  // REMOVED FROM THE NAVIGATION, NOT DELETED. /class-of-2026 still exists and
  // still works for anybody sent the link; it is off the bar until the cohort
  // is ready to be talked about publicly. Put this line back to restore it:
  //   { label: "the class of 2026", href: "/class-of-2026" },
  // The inaugural list, live from 15 September 2026. It sits before the
  // briefing because it is the launch moment, and after the rooms because
  // somebody has to know what Forward is before a list of its people means
  // anything.
  { label: "ForwardThinkers", href: "/forward-thinkers" },
  { label: "The briefing", href: "/briefing" },
];

