import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { ApplyLink } from "@/components/apply-link";
import { HERO, IMAGERY } from "@/content/site";

/**
 * The hero.
 *
 * The photograph, and therefore this whole block, STAYS DARK in light mode as
 * well as dark mode. That is how the identity works and it is not a bug. Only
 * the page below it changes between the two modes.
 */
export function Hero() {
  return (
    <div id="hero" className="fwd-on-dark">
      <PhotoPlaceholder
        label={IMAGERY.hero}
        name="hero"
        priority
        sizes="100vw"
        ratio="fill"
        /* The hero is the first thing anybody sees, so it does not carry the
           "photograph goes here" caption that the smaller placeholders do. The
           shot it needs is still written down, in IMAGERY in content/site.ts. */
        showLabel={false}
        scrim={false}
        className="flex min-h-[92vh] flex-col"
      >
        {/* Centred over the photograph, following the approved artwork, rather
            than sitting in the bottom left corner. */}
        <div className="relative z-2 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
          {/* A soft radial scrim under the lockup, from the placement rules.
              The wash over the whole photograph has gone, so this is what keeps
              the mark holding its shape wherever the picture is busiest,
              without darkening the frame the way a flat overlay did. It is
              behind the lockup only: -z-1 puts it under the text, and the
              padding is what gives it something to fade across. */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="fwd-lockup-scrim absolute -inset-x-16 -inset-y-12 -z-1"
            />
            <Wordmark size="hero" heading align="center" />
          </div>

          {/* Clear space: the rules ask for at least the height of the "d"
              before the headline starts. The mark is 128px on a large screen
              and the d is about a third of that, so mt-14 (56px) clears it with
              room over. */}
          <p className="mt-14 max-w-xl font-body text-lg leading-relaxed text-photo-ink/85 sm:text-xl">
            {HERO.line}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ApplyLink variant="onDark" />
          </div>

          {/* THERE IS NO MEMBERS' DOOR HERE ANY MORE. There was a text link
              under the button, and it has gone along with every other mention
              of the member area on the public site. The House is not a feature
              of the website: members are sent there, by the code in a sign-in
              email or the link in an invitation, and a visitor has no reason
              to know it exists. /clubhouse/sign-in still works for anyone who
              has been given it. */}

          <p
            aria-hidden="true"
            className="fwd-cue absolute bottom-8 left-1/2 -translate-x-1/2 font-body text-[11px] tracking-[0.2em] text-photo-ink/70"
          >
            scroll
          </p>
        </div>
      </PhotoPlaceholder>
    </div>
  );
}
