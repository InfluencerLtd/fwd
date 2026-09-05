# The mark, as it arrived

`lockup-source.svg` and `lockup-source.png` are the approved artwork, kept here
unchanged so there is always something to check the site against.

They are **not** what the site draws. Despite the extension, the SVG is a Canva
export: a 186x147 bitmap in an SVG wrapper, not outlines. It would have gone
soft the moment it was shown larger than a favicon, and it could not be
recoloured, so the shape was traced back into real vector paths at the half-way
alpha level.

What the site actually uses:

| Where | What it is |
| --- | --- |
| `src/components/mark.tsx` | The outlines, inline, taking `currentColor`. Every appearance on the site |
| `public/logo.svg` | The same outlines with the pale blue baked in. The browser tab, the share image, and anyone outside the project who asks for "the logo" |
| `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` | The glyph on the header's near-black, rounded. A pale blue on nothing disappears into a light browser tab strip |

These files sit outside `public/` on purpose: nothing here is served, and the
originals should not be reachable at a URL.
