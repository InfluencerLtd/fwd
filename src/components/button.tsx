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

type Variant = "primary" | "onDark" | "outlineOnDark" | "quiet";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  /**
   * Filled with the pale ice blue, dark text, for LIGHT grounds.
   *
   * The border is not decoration. The pale blue measures 1.12:1 against the
   * warm sand and 1.27:1 against the off-white page, so a filled button with no
   * edge has no visible shape at all: it reads as dark text floating on the
   * page. The border is the near-black at 60%, measuring 4.61:1 on sand and
   * 4.81:1 on off-white, which clears the 3:1 minimum a control's outline has
   * to meet. The label was never the problem, at 13.74:1.
   *
   * This is the pale-blue-on-light trap in a different hat: the colour is fine
   * as a fill under dark text, and invisible as an edge.
   *
   * EVERY COLOUR HERE IS A FIXED ONE, and that is the important part. The fill
   * does not change between light and dark mode, so the label must not either.
   * Using `ink` for the text looked right in light mode and gave near-white on
   * pale blue in dark mode, at 1.21:1. The version before this one used plain
   * white and was worse, at 1.38:1. `photo-ground` is the same warm near-black
   * in both modes and measures 13.42:1 on the fill.
   *
   * In dark mode the border does nothing, because the fill alone is 13.67:1
   * against the dark page and the shape is already obvious. It is harmless
   * there, and it is doing the work on every light ground.
   */
  primary:
    "border border-photo-ground/60 bg-accent-on-dark text-photo-ground hover:border-photo-ground hover:bg-photo-ground hover:text-accent-on-dark",
  /** Filled, for dark grounds and over photography. */
  onDark: "bg-accent-on-dark text-photo-ground hover:bg-photo-ink",
  /** Outlined, for dark grounds where a filled button would shout. */
  outlineOnDark:
    "border border-accent-on-dark text-accent-on-dark hover:bg-accent-on-dark hover:text-photo-ground",
  /** Outlined, for light grounds. */
  quiet: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-surface",
};

const SIZES: Record<Size, string> = {
  md: "px-6 py-2.5 text-[15px]",
  lg: "px-8 py-3.5 text-base",
};

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
