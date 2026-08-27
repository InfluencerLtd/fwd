import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { SignupForm } from "@/components/signup-form";
import Link from "next/link";
import { HOLDING, FOOTER } from "@/content/site";
import { CONTACT } from "@/lib/brand";

/**
 * The pre-launch holding page.
 *
 * This is what sits at the address from the moment the domain is registered,
 * until SITE_MODE in src/lib/site-config.ts is switched to "live". It is not
 * deleted at launch, so it can be brought back at any time.
 *
 * It is dark throughout, because it is essentially all hero: the photograph
 * fills the screen and the wordmark sits on it. That is the approved treatment,
 * and it is why there is no light/dark toggle here. The toggle belongs on the
 * full site, where there are light surfaces to toggle.
 */
export function HoldingPage() {
  return (
    <main className="fwd-on-dark flex min-h-screen flex-col">
      <PhotoPlaceholder
        label="placeholder for the hero photograph"
        className="flex min-h-screen flex-1 flex-col justify-end"
      >
        <div className="relative z-1 mx-auto flex w-full max-w-5xl flex-col px-6 pb-20 pt-40">
          <Wordmark size="hero" heading />

          <p className="mt-12 max-w-xl font-body text-lg leading-relaxed text-photo-ink/85 sm:text-xl">
            {HOLDING.line}
          </p>

          <div className="mt-14 border-t border-photo-ink/15 pt-10">
            <p className="mb-5 font-body text-base text-photo-ink">
              {HOLDING.capturePrompt}
            </p>
            <SignupForm source="holding" />
          </div>

          {/* Members exist before the full site launches, so the holding page
              cannot be the only thing at the address with no way in for them. */}
          <footer className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 pb-6 font-body text-[13px] text-photo-ink/45">
            <span>{CONTACT.email}</span>
            <Link
              href="/clubhouse"
              className="fwd-underline text-photo-ink/70 hover:text-photo-ink"
            >
              {FOOTER.signIn}
            </Link>
          </footer>
        </div>
      </PhotoPlaceholder>

    </main>
  );
}
