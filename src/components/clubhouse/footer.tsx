import Link from "next/link";
import { NAV } from "@/content/clubhouse";
import { FOOTER } from "@/content/site";

/**
 * A quiet line at the bottom of the member area.
 *
 * It exists so The House is not a room with no door. Signing out was the
 * only way back to the public site, which is a strange thing to have to do just
 * to read the club's own page.
 */
export function ClubhouseFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-7 gap-y-2 px-6 py-6 font-body text-[13px] text-ink-muted">
        <Link href="/" className="fwd-underline hover:text-ink">
          {NAV.publicSite}
        </Link>
        <Link href="/privacy" className="fwd-underline hover:text-ink">
          {FOOTER.privacy}
        </Link>
        <Link href="/cookies" className="fwd-underline hover:text-ink">
          {FOOTER.cookies}
        </Link>
      </div>
    </footer>
  );
}
