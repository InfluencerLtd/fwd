import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { CONTACT, BRAND } from "@/lib/brand";
import { FOOTER } from "@/content/site";

/**
 * The footer. Carries the lockup, the way to get in touch, and the way for an
 * existing member to sign in to The Clubhouse.
 *
 * It sits on the dark photo ground so the lockup appears the same way it does
 * in the hero, with the pale blue where it belongs.
 */
export function SiteFooter() {
  return (
    <footer className="fwd-on-dark bg-photo-ground">
      <div className="fwd-grain">
        <div className="relative z-1 mx-auto max-w-5xl px-6 py-16">
          <Wordmark size="footer" />

          <div className="mt-12 flex flex-col gap-6 border-t border-photo-ink/15 pt-8 font-body text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-photo-ink/50">{CONTACT.email}</p>

            <nav
              aria-label="Footer"
              className="flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              <Link
                href="/clubhouse"
                className="-my-1.5 py-1.5 text-accent-on-dark underline-offset-4 hover:underline"
              >
                {FOOTER.signIn}
              </Link>
              <Link
                href="/privacy"
                className="-my-1.5 py-1.5 text-photo-ink/70 underline-offset-4 hover:underline"
              >
                {FOOTER.privacy}
              </Link>
              <Link
                href="/cookies"
                className="-my-1.5 py-1.5 text-photo-ink/70 underline-offset-4 hover:underline"
              >
                {FOOTER.cookies}
              </Link>
            </nav>
          </div>

          <p className="mt-10 font-body text-xs text-photo-ink/35">
            {BRAND.markLong}. {BRAND.endorsement}.
          </p>
        </div>
      </div>
    </footer>
  );
}
