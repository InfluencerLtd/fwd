/**
 * Copy that may carry [[double brackets]], and a line that may end on the dot.
 *
 * THE DRAWN MARKS ARE GONE. The blue underlines and circles came out on
 * 10 September 2026: next to FiveTwoNine, whose signature is blue marker on
 * key words, they read as borrowed.
 *
 * IN THEIR PLACE, TWO THINGS NOBODY ELSE HAS.
 *
 * The bracketed words are set in the serif italic, the same italic the
 * endorsement uses under the wordmark. Emphasis by voice rather than by
 * decoration: a word said slightly differently, not a word pointed at.
 *
 * And a heading can end on the logo's full stop. `dot` colours the last full
 * stop in the brand blue, the dot that blinks on the holding page. The deep
 * blue on light grounds, the pale blue on dark ones, because the pale blue
 * is invisible on off-white (see .fwd-dot in globals.css).
 */
export function MarkedText({
  text,
  dot = false,
}: {
  text: string;
  /** Colour the closing full stop, if the line has one. */
  dot?: boolean;
}) {
  const ends = dot && text.endsWith(".");
  const body = ends ? text.slice(0, -1) : text;

  return (
    <>
      {body.split(/(\[\[[^\]]+\]\])/g).map((part, i) => {
        if (!part.startsWith("[[") || !part.endsWith("]]")) return part;
        // [[word]] or the older [[word|style]]: the style name is ignored now.
        const [word] = part.slice(2, -2).split("|");
        return (
          <em key={i} className="fwd-em">
            {word}
          </em>
        );
      })}
      {ends ? <span className="fwd-dot">.</span> : null}
    </>
  );
}

/**
 * The same string with its [[marks]] taken out, for anywhere that is not a
 * page — a search description, a link preview.
 */
export function plainText(text: string) {
  return text.replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1");
}

/**
 * THE ONE DRAWN MARK LEFT: a light blue circle round a whole phrase. Kept for
 * the three names on /about ("The brands." and the rest) at the owner's
 * request after the rest came out. One sweep round, overshooting rather than
 * meeting itself, drawn as the line arrives (see .fwd-mark in globals.css).
 */
export function Circled({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 72"
        preserveAspectRatio="none"
        fill="none"
        className="fwd-mark pointer-events-none absolute -left-[0.22em] -top-[0.05em] h-[calc(100%+0.10em)] w-[calc(100%+0.44em)]"
      >
        <path
          d="M150 8 C 108 -1, 40 1, 16 20 C -3 35, 14 58, 72 66 C 132 74, 192 62, 196 40 C 199 24, 178 13, 146 8 C 138 6.7, 129 5.6, 120 5"
          stroke="currentColor"
          strokeLinecap="round"
          // Same width all the way round, however far the box is stretched.
          vectorEffect="non-scaling-stroke"
          // A length of one, so the draw-on needs no measured dash length.
          pathLength={1}
        />
      </svg>
    </span>
  );
}
