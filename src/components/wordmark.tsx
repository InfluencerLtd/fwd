import { BRAND } from "@/lib/brand";

/**
 * The lockup: the supplied artwork, not type set to look like it.
 *
 * IT USED TO BE LIVE TEXT — "fwd." in the display face with "by influencer"
 * beside it in italic. That was a good stand-in and it is not the logo. The
 * delivered mark differs in three ways that type could not have guessed: the
 * signature is a sans rather than an italic serif, it reads "by Influencer"
 * with a capital I, and it sits tucked under the right of the mark rather than
 * beside it on the baseline.
 *
 * IT IS A MASK, NOT AN IMAGE, so the artwork carries no colour of its own and
 * `tone` still works exactly as it did. See `.fwd-logo` in globals.css for why
 * that matters more than it sounds.
 *
 * THE SHAPE IS FIXED NOW, which changes what some of these props can mean. The
 * old component could restack the signature under the mark at hero size and
 * put it beside the mark in a bar; the artwork has one arrangement and that is
 * the point of artwork. `size` is a width rather than a font size, and the
 * height follows from the aspect ratio.
 *
 * THE LOCKUP IS ALSO TALLER THAN IT WAS RELATIVE TO ITS WIDTH — 1.66:1 against
 * roughly 4:1 for the old inline pair — because the signature is underneath
 * rather than alongside. Every bar it sits in had to be checked rather than
 * assumed.
 */
export function Wordmark({
  size = "hero",
  heading = false,
  align = "left",
  signature = true,
  tone = "onDark",
}: {
  size?: "hero" | "heroLarge" | "page" | "large" | "footer" | "small";
  /**
   * Makes the mark the page's main heading. Every page needs exactly one, and
   * the name of the thing is the right thing for it to be.
   */
  heading?: boolean;
  align?: "left" | "center";
  /**
   * Whether the "by Influencer" signature is part of it.
   *
   * On by default, and it should stay on almost everywhere: the endorsement is
   * the point of the lockup. Off on the hero, where the mark stands alone at
   * full size and the endorsement is carried by the header lockup at the top
   * of the same screen.
   *
   * This switches to a second file rather than hiding an element, because the
   * mark is drawn artwork and its signature is part of the drawing.
   */
  signature?: boolean;
  /**
   * Which of the three colours the lockup is set in. It follows the ground.
   *
   * `onDark` is the pale ice blue and the default, because almost everywhere
   * the lockup sits on a photograph or on the near-black. It is 13.42:1 there
   * and it is the identity. IT MUST NEVER GO ON A LIGHT GROUND: on the
   * off-white it is about 1.3:1, a colour you can see is there and cannot read.
   *
   * `brand` is the dark blue from the influencer guidelines, 6.61:1 on the
   * off-white. The sign-in page, where the lockup is the only branding on
   * screen and can carry the colour.
   *
   * `ink` is the near-black, 16.7:1. For a light ground where the lockup is one
   * thing among several and the blue would be the loudest thing in the panel —
   * the menu, where it sits directly above the navigation it belongs to.
   *
   * `brand` and `ink` are both tokens rather than colours written out, so they
   * follow the page into dark mode.
   */
  tone?: "onDark" | "brand" | "ink";
}) {
  /**
   * A WIDTH, not a font size, and the height comes from the aspect ratio.
   *
   * The hero is a fraction of the window rather than a list of fixed sizes,
   * which is what "roughly a third of the viewport" actually asks for: it
   * holds the same proportion at widths nobody thought to write a breakpoint
   * for. The floor stops it disappearing on a narrow phone; the ceiling stops
   * it filling a cinema display.
   */
  const widthClass =
    size === "heroLarge"
      ? "w-[clamp(190px,32vw,560px)]"
      : size === "hero"
        ? "w-[clamp(170px,26vw,420px)]"
        : size === "large"
          ? "w-[150px]"
          : size === "page"
            ? "w-[124px]"
            : size === "footer"
              ? "w-[84px]"
              : "w-[68px]";

  const inkClass =
    tone === "onDark"
      ? "text-accent-on-dark"
      : tone === "brand"
        ? "text-accent"
        : "text-ink";

  /**
   * THE SIGNATURE IS DROPPED BELOW A SIZE IT CAN BE READ AT, whatever the
   * caller asked for.
   *
   * In the artwork "by Influencer" is about a eighth of the lockup's height.
   * In a header bar the lockup is 68px wide and 41px tall, which puts the
   * signature at roughly 5px with a cap height near 3. That is not a small
   * endorsement, it is a smudge — and a smudge of the parent company's name is
   * worse than no endorsement at all.
   *
   * Enforced here rather than left to the call sites, because it is a fact
   * about the artwork rather than a decision about a page: four bars ask for
   * the small size and all four would have to remember.
   */
  const readableSignature = signature && size !== "small" && size !== "footer";

  const Tag = heading ? "h1" : "span";

  return (
    <div className={align === "center" ? "flex justify-center" : "flex"}>
      {/* The name is on the wrapper and the artwork is hidden from the
          accessibility tree. A mask has no alt text and no glyphs to read: to
          a screen reader it is an empty box unless something says what it is.
          Nothing about it is lowercased or restyled, so this is the one place
          the two halves of the name appear as a single phrase — see the naming
          rules in src/lib/brand.ts, which allow it in the lock-up and forbid
          it in running text. */}
      <Tag className={`${widthClass} ${inkClass}`}>
        <span className="sr-only">
          {`${BRAND.markShort} ${BRAND.endorsement}`}
        </span>
        <span
          aria-hidden="true"
          className={`fwd-logo w-full ${
            readableSignature ? "fwd-logo-lockup" : "fwd-logo-mark"
          }`}
        />
      </Tag>
    </div>
  );
}
