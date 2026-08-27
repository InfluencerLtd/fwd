import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/button";
import { HERO, NAV, IMAGERY } from "@/content/site";
import { APPLICATIONS_OPEN } from "@/lib/site-config";

/**
 * The hero.
 *
 * The photograph, and therefore this whole block, STAYS DARK in light mode as
 * well as dark mode. That is how the identity works and it is not a bug. Only
 * the page below it changes between the two modes.
 */
export function Hero() {
  return (
    <div className="fwd-on-dark">
      <PhotoPlaceholder
        label={IMAGERY.hero}
        ratio="fill"
        labelPosition="left-6 top-20 sm:top-6"
        className="flex min-h-[92vh] flex-col"
      >
        {/* The header sits on the photograph, so everything in it is styled for
            a dark ground rather than for the page below. */}
        <header className="relative z-2 flex items-center justify-end gap-6 px-6 pt-6">
          <a
            href="#apply"
            className="fwd-underline -my-2 py-2 font-body text-sm text-photo-ink/80"
          >
            {APPLICATIONS_OPEN ? NAV.apply : HERO.ctaWaitlist}
          </a>
          <ThemeToggle className="border-photo-ink/25 text-photo-ink/70 hover:text-photo-ink" />
        </header>

        <div className="relative z-2 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-end px-6 pb-14 pt-24">
          <Wordmark size="hero" heading />

          <p className="mt-12 max-w-xl font-body text-lg leading-relaxed text-photo-ink/85 sm:text-xl">
            {HERO.line}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="#apply" variant="onDark" size="lg">
              {APPLICATIONS_OPEN ? HERO.cta : HERO.ctaWaitlist}
            </ButtonLink>
            <ButtonLink href="#about" variant="outlineOnDark" size="lg">
              {NAV.about}
            </ButtonLink>
          </div>

          <p
            aria-hidden="true"
            className="fwd-cue mt-14 font-body text-[11px] tracking-[0.2em] text-photo-ink/40"
          >
            scroll
          </p>
        </div>
      </PhotoPlaceholder>
    </div>
  );
}
