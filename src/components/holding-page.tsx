import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { SignupForm } from "@/components/signup-form";
import { HOLDING, IMAGERY } from "@/content/site";

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
        /* The same photograph the full site opens on, and the same brief, so
           the holding page and launch day are one continuous image rather than
           two different first impressions. */
        label={IMAGERY.hero}
        name="hero"
        priority
        sizes="100vw"
        ratio="fill"
        showLabel={false}
        /* Heavier than the hero's 50%. Everything on this page below the
           wordmark is small and sits low on the frame, where this photograph
           is brightest. See washClassName in PhotoPlaceholder. */
        washClassName="bg-photo-ground/70"
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

          {/* NOTHING BELOW THE FORM.
              This used to carry the address and a sign in link for members who
              exist before the full site opens. Both are gone: the page is the
              wordmark, one line and one thing to do, and a footer of small grey
              links was the only thing on it that was not that.

              The consequence, written down so it is a decision rather than an
              oversight: while the holding page is up there is no way in to The
              House from the address, and no way to reach us except the form.
              Members sign in at /clubhouse, which still works, but they have to
              be told the address. */}
        </div>
      </PhotoPlaceholder>

    </main>
  );
}
