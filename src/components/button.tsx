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
  /** Filled, for light grounds. */
  primary: "bg-accent text-white hover:bg-ink",
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
