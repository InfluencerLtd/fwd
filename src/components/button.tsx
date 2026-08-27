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

type Variant = "primary" | "onDark" | "outlineOnDark" | "quiet" | "soft";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  /** Filled, for light grounds. */
  primary: "bg-accent text-white hover:bg-ink",
  /** Filled, for dark grounds and over photography. */
  onDark: "bg-accent-on-dark text-photo-ground hover:bg-photo-ink",
  /** Outlined, for dark grounds where a filled button would shout. */
  outlineOnDark:
    "border border-accent-on-dark text-accent-on-dark hover:bg-accent-on-dark hover:text-photo-ground",
  /** Outlined, for light grounds. */
  quiet: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-surface",
  /**
   * The pale ice blue, filled, with dark text, on a LIGHT ground.
   *
   * The border is not decoration. The pale blue measures 1.12:1 against the
   * warm sand and 1.27:1 against the off-white page, so without an edge the
   * button has no visible shape at all and reads as dark text floating on the
   * page. The border is the near-black at 60%, which measures 4.61:1 against
   * the sand and clears the 3:1 minimum a control's outline has to meet.
   *
   * The label itself is fine either way: near-black on the pale blue is
   * 13.74:1.
   */
  soft: "border border-ink/60 bg-accent-on-dark text-ink hover:bg-ink hover:text-accent-on-dark hover:border-ink",
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
