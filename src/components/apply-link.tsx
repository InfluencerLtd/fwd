import { ApplyDialog } from "@/components/apply-dialog";
import { buttonClass, type Variant } from "@/components/button";
import { APPLY } from "@/content/site";

/**
 * The ask, wherever it appears.
 *
 * IT OPENS THE FORM RATHER THAN GOING TO A PAGE THAT HAS ONE. Until
 * 15 September 2026 this was a link to /membership: somebody who pressed
 * "apply for membership" on the home page landed on another page and had to
 * find and press a second button with the same words on it. Now every one of
 * them opens the chooser where it stands, which is one step instead of three.
 *
 * The label lives in one constant so none of them can drift apart.
 */
export function ApplyLink({
  variant = "primary",
  size = "lg",
  className = "",
}: {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <ApplyDialog
      label={APPLY.cta}
      className={buttonClass(variant, size, className)}
    />
  );
}
