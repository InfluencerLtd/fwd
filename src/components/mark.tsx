/**
 * The mark: the arrow glyph that sits with "fwd." in the lockup.
 *
 * IT IS DRAWN HERE RATHER THAN LOADED FROM A FILE, on purpose. Inline it takes
 * `currentColor`, so it is the same pale blue as the type beside it without
 * anybody keeping two colours in step, and it changes with the type when the
 * ground changes. It also costs no second request, which matters because this
 * is in the hero, above the fold, on the first page anybody sees.
 *
 * The outlines came from the approved artwork. That file was a Canva export,
 * which sounds like a vector but was a 186x147 bitmap in an SVG wrapper: it
 * would have gone soft the moment it was shown larger than a favicon, and it
 * could not be recoloured. The shape was traced back into real paths at the
 * half-way alpha level, so this scales to any size and takes any colour.
 *
 * IT IS TILTED FIVE DEGREES ANTICLOCKWISE, and the tilt is in these
 * coordinates rather than in a CSS transform. A transform would have reached
 * only the mark this component draws: logo.svg, the browser tab icon and the
 * share image would all have stayed upright, and the mark would have had two
 * different angles depending on where you met it. Turning the geometry means
 * there is one shape and it is the same everywhere.
 *
 * The viewBox was measured again after the turn. Keeping the upright one would
 * have left the shape off centre inside a box cut for a different angle.
 *
 * public/logo.svg is the same outlines with the pale blue baked in, for the
 * places that need a file rather than a component: the browser tab icon, and
 * anybody outside the project who asks for "the logo".
 *
 * The `height` is in em so the mark scales with the type it sits beside rather
 * than being set in pixels at every size.
 */
export function Mark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 165.32 132.18"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={`w-auto shrink-0 ${className}`}
    >
      <path d="M136.97 1.53 L129.06 2.99 L120.15 4.32 L113.25 5.78 L110.26 6.04 L109.29 6.41 L108.71 7.05 L108.31 8.09 L108.34 9.09 L108.68 10.07 L109.29 11.02 L111.29 12.85 L111.98 13.79 L113.74 16.65 L114.51 18.59 L114.95 21.57 L114.65 25.61 L113.90 29.69 L113.33 31.75 L110.92 36.97 L109.15 43.15 L106.99 48.36 L106.07 51.45 L104.69 54.59 L104.02 56.65 L99.61 67.87 L98.59 71.18 L97.09 77.33 L96.62 80.39 L96.52 87.42 L97.22 93.38 L98.08 97.32 L98.99 100.26 L101.48 106.06 L103.85 109.87 L105.96 112.70 L113.37 121.91 L121.19 130.97 L122.27 131.85 L123.30 132.18 L124.26 131.60 L125.02 130.10 L128.73 120.74 L130.32 115.58 L134.96 103.13 L137.24 96.47 L140.52 88.05 L145.02 75.15 L147.26 69.93 L149.31 63.73 L151.32 58.54 L153.03 53.37 L154.36 50.24 L156.44 44.03 L158.36 39.55 L159.89 34.70 L161.98 29.50 L162.90 26.40 L164.40 22.26 L164.76 20.92 L165.19 18.17 L165.32 16.16 L165.02 13.17 L164.62 11.20 L163.70 8.72 L162.52 6.75 L161.39 5.33 L159.22 3.50 L156.89 1.83 L154.98 0.83 L152.91 0.15 L151.89 0.00 L145.89 0.26 Z" />
      <path d="M94.57 10.28 L81.74 12.82 L70.91 15.25 L67.94 15.72 L64.01 16.63 L61.03 17.01 L57.11 18.08 L53.14 18.64 L45.26 20.39 L41.89 20.93 L37.38 22.08 L33.95 22.63 L29.50 23.83 L21.60 25.27 L14.72 26.98 L6.82 28.42 L0.91 29.78 L0.00 30.62 L0.04 31.62 L1.16 33.53 L2.38 35.04 L16.37 50.27 L18.94 52.27 L22.12 54.22 L26.32 56.26 L28.98 57.19 L33.52 58.25 L36.56 58.63 L40.59 58.80 L44.59 58.62 L52.51 57.31 L63.35 55.04 L69.28 53.97 L74.19 52.76 L82.08 51.13 L85.07 50.91 L88.10 51.12 L91.20 52.07 L93.31 53.30 L94.71 54.45 L95.70 55.37 L97.74 57.98 L98.76 58.17 L99.73 57.74 L100.64 56.74 L102.31 52.79 L104.07 46.61 L106.32 40.39 L108.15 34.21 L110.27 29.11 L111.13 24.91 L111.09 21.90 L110.40 18.95 L109.16 16.05 L108.60 15.09 L106.88 13.30 L102.66 10.94 L101.89 10.66 L98.56 10.05 L96.56 10.04 Z" />
      <path d="M53.41 79.14 L51.45 79.61 L49.50 80.28 L46.62 81.82 L45.25 82.87 L44.17 83.97 L42.06 87.00 L40.37 90.64 L39.89 92.38 L39.35 95.44 L39.34 98.45 L40.01 102.40 L42.02 107.25 L43.25 109.15 L44.86 111.01 L45.86 111.93 L47.35 113.08 L49.47 114.37 L52.59 115.63 L54.65 116.24 L56.69 116.57 L58.70 116.62 L60.69 116.42 L65.60 115.19 L67.54 114.40 L68.14 114.00 L71.28 111.30 L73.98 108.47 L75.39 106.34 L76.22 104.26 L76.79 102.20 L77.36 98.13 L77.22 95.13 L76.54 92.18 L75.37 89.17 L73.72 86.41 L70.07 82.71 L67.62 80.84 L66.07 80.05 L63.95 79.23 L60.01 78.57 L58.37 78.44 L56.37 78.54 Z" />
    </svg>
  );
}
