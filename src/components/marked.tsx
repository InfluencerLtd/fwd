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
 *
 * AND THE SHAPE CAN BE CHOSEN THERE TOO: [[a word|swoosh]] takes that style
 * instead of the block's. One paragraph can then carry two different marks,
 * which is the difference between a hand that marked a proof and a template
 * that stamped the same arc on every emphasis it found.
 */

type Style = "underline" | "double" | "swoosh" | "circle";

/*
 * EVERY BOX SETS AN EXPLICIT WIDTH RATHER THAN LEFT AND RIGHT WITH width:auto.
 *
 * That is the obvious way to stretch an absolutely positioned element between
 * two offsets, and it does not work here: an <svg> is a replaced element, so
 * `width: auto` takes its intrinsic size instead of the distance between the
 * offsets. The swoosh came out 68px wide inside a 145px phrase — underlining
 * the first word and stopping.
 */

/**
 * Both drawn with `preserveAspectRatio="none"` so one path stretches to any
 * word. An ellipse stretched is still an ellipse and a line stretched is still
 * a line, so nothing distorts in a way the eye can catch.
 */
const PATHS: Record<Style, { d: string; viewBox: string; box: string }> = {
  /**
   * One stroke under the word. The quiet one, for a phrase inside body copy.
   *
   * IT USED TO READ AS UNFINISHED. The old path started at 4 and stopped at
   * 196 inside a box the exact width of the word, so it fell short at both
   * ends, and it climbed from 10.5 to 4.6 — a rise of well over a third of
   * the box — so the right end lifted away from the last letter and looked
   * like a stroke that had been abandoned rather than completed.
   *
   * Now it runs the full width with a little overshoot either side, the way a
   * hand drawing under a word starts before it and finishes after it, and the
   * climb is half what it was. Still not level: a perfectly flat line is a
   * text-decoration, and the whole point of this device is that somebody drew
   * it.
   */
  underline: {
    d: "M1 9.8 C 32 5.6, 84 4.2, 128 5.4 S 174 7.8, 199 6.6",
    viewBox: "0 0 200 14",
    box: "absolute -left-[0.05em] w-[calc(100%+0.10em)] -bottom-[0.06em] h-[0.26em]",
  },
  /** Gone over twice, the second pass not quite tracking the first. */
  double: {
    d: "M4 8 C 40 3, 92 2, 134 4 S 178 7, 196 3.4 M10 12.4 C 46 8.6, 96 7.4, 138 9 S 180 11.6, 192 9.2",
    viewBox: "0 0 200 16",
    box: "absolute left-0 right-0 -bottom-[0.09em] h-[0.30em] w-full",
  },
  /** Runs past the end of the word and flicks up, the way a hand leaves. */
  swoosh: {
    d: "M3 9 C 38 3.6, 96 2.4, 142 4.6 C 170 6, 188 8.4, 197 6 C 200 5.2, 198 3.4, 193 2.2",
    viewBox: "0 0 200 14",
    box: "absolute left-0 w-[calc(100%+0.10em)] -bottom-[0.07em] h-[0.28em]",
  },
  /** One sweep round, overshooting rather than meeting itself. */
  circle: {
    d: "M150 8 C 108 -1, 40 1, 16 20 C -3 35, 14 58, 72 66 C 132 74, 192 62, 196 40 C 199 24, 178 13, 146 8 C 138 6.7, 129 5.6, 120 5",
    viewBox: "0 0 200 72",
    /* MEASURED, NOT GUESSED. Three attempts by eye were all wrong: the
       statement type sets leading to 0.9, so the box is very nearly the ink
       and the instinct to overhang generously put half a circle in empty
       space below the baseline. */
    box: "absolute -left-[0.22em] w-[calc(100%+0.44em)] -top-[0.05em] -bottom-[0.05em]",
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
  /** The shape for any mark that does not name its own. */
  style = "underline",
}: {
  text: string;
  style?: Style;
}) {
  return (
    <>
      {text.split(/(\[\[[^\]]+\]\])/g).map((part, i) => {
        if (!part.startsWith("[[") || !part.endsWith("]]")) return part;

        /* [[word]] or [[word|swoosh]]. An unknown name after the pipe falls
           back to the block's style rather than throwing: the copy is edited
           by people, and a typo in a content file should cost a mark that
           looks like its neighbours, not a page that will not render. */
        const [word, named] = part.slice(2, -2).split("|");
        const chosen = named && named in PATHS ? (named as Style) : style;

        return (
          <Marked key={i} style={chosen}>
            {word}
          </Marked>
        );
      })}
    </>
  );
}
