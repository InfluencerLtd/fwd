import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { ButtonLink } from "@/components/button";
import { HERO, IMAGERY } from "@/content/site";
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
        /* The hero is the first thing anybody sees, so it does not carry the
           "photograph goes here" caption that the smaller placeholders do. The
           shot it needs is still written down, in IMAGERY in content/site.ts. */
        showLabel={false}
        className="flex min-h-[92vh] flex-col"
      >
        {/* Centred over the photograph, following the approved artwork, rather
            than sitting in the bottom left corner. */}
        <div className="relative z-2 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
          <Wordmark size="hero" heading align="center" />

          <p className="mt-14 max-w-xl font-body text-lg leading-relaxed text-photo-ink/85 sm:text-xl">
            {HERO.line}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="#apply" variant="onDark" size="lg">
              {APPLICATIONS_OPEN ? HERO.cta : HERO.ctaWaitlist}
            </ButtonLink>
            <ButtonLink href="#about" variant="outlineOnDark" size="lg">
              {HERO.secondaryCta}
            </ButtonLink>
          </div>

          {/* The quiet way in for existing members. Deliberately a text link
              rather than a third button, and part of this block rather than a
              bar sitting on top of the photograph. */}
          <p className="mt-9 font-body text-sm text-photo-ink/60">
            <Link
              href="/clubhouse"
              className="fwd-underline text-photo-ink/75 hover:text-photo-ink"
            >
              {HERO.memberSignIn}
            </Link>
          </p>

          <p
            aria-hidden="true"
            className="fwd-cue absolute bottom-8 left-1/2 -translate-x-1/2 font-body text-[11px] tracking-[0.2em] text-photo-ink/40"
          >
            scroll
          </p>
        </div>
      </PhotoPlaceholder>
    </div>
  );
}
