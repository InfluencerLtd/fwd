/**
 * A seating plan, drawn.
 *
 * WHY THIS AND NOT AN ILLUSTRATION. The space beside the writing on this page
 * was empty on purpose, and the easiest way to fill it would have been a
 * decorative shape that means nothing. This means something: it is the whole
 * proposition drawn as an object. One table, small enough that everybody can
 * hear everybody, with the three kinds of member mixed around it on purpose
 * rather than sitting in their own groups — which is the argument the page
 * spends three paragraphs making.
 *
 * AND ONE SEAT IS EMPTY. That is the joke, and it is also the ask. Nothing
 * points at it and no copy mentions it; somebody either notices or they do
 * not, and noticing is better than being told.
 *
 * A REAL SEATING PLAN RATHER THAN A DIAGRAM. No arrows, no Venn, no labels
 * floating on leader lines. Those read as a consultancy explaining itself.
 * This reads as a thing that was printed and put on a table, which is what the
 * club actually does.
 *
 * The legend under it is real text, not part of the drawing, so it is readable
 * and selectable and a screen reader gets it. The SVG itself is decorative and
 * hidden: everything it says is said by the legend and by the writing beside
 * it, so announcing it twice would only be noise.
 *
 * Every colour is a token. The two accents are on small shapes only — thirteen
 * pixels across — which is what the ember rule in globals.css asks for, and all
 * three measure well clear of the 3:1 a graphic has to meet on this ground:
 * ink 17.5:1, accent 6.61:1, ember 5.51:1.
 */

/** Who is in which seat. Deliberately not a repeating pattern. */
const SEATS = [
  "brand",
  "creator",
  "platform",
  "creator",
  "brand",
  "platform",
  "creator",
  "brand",
  "empty",
  "platform",
  "creator",
  "brand",
] as const;

const FILL: Record<string, string> = {
  brand: "var(--fwd-ink)",
  creator: "var(--fwd-accent)",
  platform: "var(--fwd-ember)",
};

const LEGEND = [
  { kind: "brand", label: "brands" },
  { kind: "creator", label: "creators" },
  { kind: "platform", label: "platforms" },
] as const;

const CENTRE = 160;
const TABLE = 88;
const ORBIT = 128;
const SEAT = 13;

export function TablePlan() {
  return (
    <figure className="fwd-reveal m-0">
      <svg
        viewBox="0 0 320 320"
        aria-hidden="true"
        className="block w-full max-w-[320px]"
      >
        {/* The table. A hairline, because it is the thing everything else is
            arranged around rather than the subject itself. */}
        <circle
          cx={CENTRE}
          cy={CENTRE}
          r={TABLE}
          fill="none"
          stroke="var(--fwd-ink)"
          strokeOpacity="0.18"
        />

        {SEATS.map((kind, index) => {
          // Twelve seats, evenly spaced, first one at the top.
          const angle = ((index * 360) / SEATS.length - 90) * (Math.PI / 180);
          const cx = CENTRE + ORBIT * Math.cos(angle);
          const cy = CENTRE + ORBIT * Math.sin(angle);

          if (kind === "empty") {
            return (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r={SEAT}
                fill="none"
                stroke="var(--fwd-ink)"
                strokeOpacity="0.35"
                strokeDasharray="3 3"
              />
            );
          }

          return <circle key={index} cx={cx} cy={cy} r={SEAT} fill={FILL[kind]} />;
        })}
      </svg>

      <figcaption className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
        {LEGEND.map((item) => (
          <span key={item.kind} className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: FILL[item.kind] }}
            />
            <span className="fwd-eyebrow text-ink-muted">{item.label}</span>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
