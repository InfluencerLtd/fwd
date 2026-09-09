/**
 * A drawn emphasis mark under or around a word.
 *
 * >>> THE EXECUTION IS THE WHOLE POINT, because the device is not ours. <<<
 * The reference for this is FiveTwoNine's, where a fat marker scribbles blue
 * circles over key words. Copying that would be recognised instantly by anyone
 * who has seen both sites, and it would be wrong here anyway: their mark reads
 * as a person scrawling on a printout, which suits a brand selling access to a
 * crowd. This one is a pen line, not a marker — thin, single-stroke, drawn
 * once and not gone over. Closer to an editor marking a proof than a hand
 * highlighting a slide.
 *
 * IT NEVER SITS BEHIND THE TEXT. Underline and circle only, never a filled
 * highlight, so the letters keep their contrast against the page and nothing
 * has to be re-measured when the mark moves.
 *
 * THE MARK IS CHOSEN IN THE COPY, NOT HERE. Wrap a word in [[double brackets]]
 * in the content file and it gets marked. Emphasis is a writing decision, so
 * it belongs where the writing is — and moving it is an edit to a sentence
 * rather than a change to a component.
 */

type Style = "underline" | "circle";

/**
 * Both drawn with `preserveAspectRatio="none"` so one path stretches to any
 * word. An ellipse stretched is still an ellipse and a line stretched is still
 * a line, so nothing distorts in a way the eye can catch.
 */
const PATHS: Record<Style, { d: string; viewBox: string; box: string }> = {
  underline: {
    // Rises very slightly to the right and settles, the way a hand does. A
    // dead-level line reads as a border, which is what this is not.
    d: "M4 10.5 C 34 5.4, 86 3.6, 132 5.4 S 176 8.6, 196 4.6",
    viewBox: "0 0 200 14",
    box: "absolute left-0 right-0 -bottom-[0.06em] h-[0.26em] w-full",
  },
  circle: {
    // One sweep, overshooting past where it began rather than meeting itself,
    // because a circle drawn in a single movement never quite closes.
    d: "M150 8 C 108 -1, 40 1, 16 20 C -3 35, 14 58, 72 66 C 132 74, 192 62, 196 40 C 199 24, 178 13, 146 8 C 138 6.7, 129 5.6, 120 5",
    viewBox: "0 0 200 72",
    /* MEASURED, NOT GUESSED. Three attempts at this by eye were all wrong,
       because the statement type sets leading to 0.9 and the intuition that
       a circle should overhang the line box badly overshoots: measured on the
       rendered page, the letters of a marked word run from 287px to 380px
       while the box around them runs 280 to 389. The ink and the box are very
       nearly the same thing, so the mark barely overhangs at all — an earlier
       version hung 49px of empty circle below the baseline. */
    box: "absolute -left-[0.22em] -right-[0.22em] -top-[0.05em] -bottom-[0.05em] w-auto",
  },
};

export function Marked({
  children,
  style = "underline",
}: {
  children: React.ReactNode;
  style?: Style;
}) {
  const mark = PATHS[style];
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        viewBox={mark.viewBox}
        preserveAspectRatio="none"
        fill="none"
        className={`fwd-mark pointer-events-none ${mark.box}`}
      >
        <path
          d={mark.d}
          stroke="currentColor"
          strokeLinecap="round"
          /* WITHOUT THIS THE PEN CHANGES WIDTH AS IT GOES ROUND. The box is
             stretched to fit whatever word it wraps, and `preserveAspectRatio:
             none` stretches the stroke with it — so the sides of a circle came
             out fat and the top and bottom came out thin, which reads as a
             shape rather than as a line somebody drew. This takes the stroke
             out of the scaling, so the width is the same all the way round and
             the same on a short word as a long one. */
          vectorEffect="non-scaling-stroke"
          /* NORMALISES THE PATH TO A LENGTH OF ONE, so the draw-on animation
             does not have to know how long each shape is. It did before, from
             a single fixed dash length, and the circle is longer than that
             number — so the last third of it was the gap in the dash pattern
             and simply never drew. The word looked underlined by an arc. */
          pathLength={1}
        />
      </svg>
    </span>
  );
}

/**
 * Renders a string, turning [[bracketed]] runs into marks.
 *
 * Copy in this project is plain strings in the content files, so the
 * alternative was splitting each sentence into three props at the call site,
 * which puts half a sentence in a component and makes the content file no
 * longer the place the copy lives.
 */
export function MarkedText({
  text,
  style = "underline",
}: {
  text: string;
  style?: Style;
}) {
  return (
    <>
      {text.split(/(\[\[[^\]]+\]\])/g).map((part, i) =>
        part.startsWith("[[") && part.endsWith("]]") ? (
          <Marked key={i} style={style}>
            {part.slice(2, -2)}
          </Marked>
        ) : (
          part
        ),
      )}
    </>
  );
}
