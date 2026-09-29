import Link from "next/link";

/**
 * Every button and button-shaped link on the site.
 *
 * They are lozenge shaped, which is set once in globals.css rather than on each
 * button, so the shape cannot drift from one page to the next.
 *
 * The variant says which ground the button is sitting on, because the two blues
 * are not interchangeable: the brand dark blue is unreadable on a dark ground
 * and the pale ice blue is unreadable on a light one.
 */

export type Variant = "primary" | "brand" | "onDark" | "outlineOnDark" | "quiet" | "chosen";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  /**
   * Filled with the pale ice blue, dark text, for LIGHT grounds.
   *
   * NO EDGE, from 29 September 2026. Asked for directly: the near-black line
   * around it was seen as a black outline on the lozenge, and it is off.
   *
   * WHAT THAT COSTS, WRITTEN DOWN SO NOBODY HAS TO MEASURE IT AGAIN. The pale
   * blue is 1.10:1 against the warm grey band and 1.27:1 against the off-white
   * page, so on a light ground the fill on its own is very nearly invisible and
   * the button reads as dark text floating on the page. The border was the
   * near-black at 60%, 3.73:1 on the grey and 4.81:1 on off-white, which is
   * what cleared the 3:1 a control's outline is meant to meet. The label was
   * never the problem, at 13.74:1, so the words are as readable as they were;
   * it is the shape around them that has gone quiet.
   *
   * If the shape is wanted back without a line, the two ways that do not
   * involve one are the `brand` variant, which is the dark blue and is 6.61:1
   * on its own, or a soft shadow under this one.
   *
   * EVERY COLOUR HERE IS A FIXED ONE, and that is the important part. The fill
   * does not change between light and dark mode, so the label must not either.
   * Using `ink` for the text looked right in light mode and gave near-white on
   * pale blue in dark mode, at 1.21:1. The version before this one used plain
   * white and was worse, at 1.38:1. `photo-ground` is the same warm near-black
   * in both modes and measures 13.42:1 on the fill.
   *
   * On a dark ground and over photography the fill alone is 13.67:1, so the
   * shape was always obvious there and nothing changes.
   */
  primary:
    "bg-accent-on-dark text-photo-ground hover:bg-photo-ground hover:text-accent-on-dark",
  /**
   * Filled with the brand dark blue, for LIGHT grounds.
   *
   * Where `primary` needs a border to have a shape at all, this one is the
   * shape: #004ad5 against the off-white page is 6.61:1 on its own, so there is
   * nothing for an edge to add.
   *
   * BOTH COLOURS MOVE TOGETHER BETWEEN LIGHT AND DARK MODE, which is the whole
   * reason it is `accent` and `surface` rather than a blue and a white written
   * out. `--fwd-accent` is the dark blue on a light page and becomes the pale
   * ice blue on a dark one, because the dark blue is only 2.69:1 against
   * near-black. `--fwd-surface` moves the opposite way, so the label is the
   * off-white on the dark blue and the near-black on the pale blue. Measured:
   * 6.61:1 in light mode, 13.91:1 in dark. A fixed white label would have been
   * 1.34:1 the moment somebody switched the site to dark.
   *
   * Hover swaps the two over: the label colour becomes the fill and the fill
   * becomes the label. `ink` and `surface` are already opposites of each other
   * in whichever mode you are in, so it is near-black on off-white in light and
   * near-white on near-black in dark, and there is no arrangement of the four
   * that comes out illegible.
   */
  brand: "bg-accent text-surface hover:bg-ink hover:text-surface",
  /** Filled, for dark grounds and over photography. */
  onDark: "bg-accent-on-dark text-photo-ground hover:bg-photo-ink",
  /** Outlined, for dark grounds where a filled button would shout. */
  outlineOnDark:
    "border border-accent-on-dark text-accent-on-dark hover:bg-accent-on-dark hover:text-photo-ground",
  /** Outlined, for light grounds. */
  quiet: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-surface",
  /**
   * The one already chosen, out of a set where every option is `primary`.
   *
   * It is the primary button inverted: the near-black becomes the fill and the
   * pale blue becomes the label. Two buttons that are both pale blue cannot say
   * which one you picked, and a choice you have already made should not look
   * identical to the one you did not. 13.42:1 either way round.
   */
  chosen:
    "border border-photo-ground bg-photo-ground text-accent-on-dark hover:bg-ink",
};

/*
 * HEIGHTS, NOT VERTICAL PADDING. The sizes were padding, so a 1px border made
 * a bordered button 2px taller than an unbordered one of the same size — and
 * the dialog's trigger set its own px-9 py-4 on top — which is how the same
 * "apply for membership" came out 52, 54 and 58px tall on one page. A fixed
 * height with box-sizing: border-box includes the border, so every button of a
 * size is that size: 32, 44, 52.
 */
const SIZES: Record<Size, string> = {
  /**
   * For a button that should be findable rather than persuasive: the members'
   * door beside a heading, where the ask itself is somewhere else entirely.
   *
   * About half the area of `lg`, and still 32px tall, which clears the 24px
   * minimum a target has to meet. It should not go smaller than this.
   */
  sm: "h-8 px-5 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-base",
};

/**
 * The class list for a button, without a button around it.
 *
 * Exported because a couple of things on the site are shaped like a button and
 * cannot be one of these: the trigger for a <dialog> is its own component, and
 * it should not have to keep a hand-copied version of the variant in step with
 * this file. Anything that can be a Button or a ButtonLink still should be.
 */
export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  className = "",
) {
  return classes(variant, size, className);
}

function classes(variant: Variant, size: Size, className: string) {
  return `fwd-btn font-body ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  // An anchor for jumping down the same page, a Link for going elsewhere.
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes(variant, size, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return <button className={classes(variant, size, className)} {...props} />;
}
