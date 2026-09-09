import { ButtonLink } from "@/components/button";
import { APPLY } from "@/content/site";

/**
 * The ask. It appears three times down the home page and they all lead to the
 * same place, the membership page, where the form is.
 *
 * The label lives in one constant so the three cannot drift apart, and it
 * changes by itself when applications close.
 */
export function ApplyLink({
  variant = "primary",
  className = "",
}: {
  variant?: "primary" | "onDark" | "outlineOnDark" | "quiet";
  className?: string;
}) {
  return (
    <ButtonLink href="/membership" variant={variant} size="lg" className={className}>
      {APPLY.cta}
    </ButtonLink>
  );
}
