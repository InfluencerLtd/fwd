import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Wordmark } from "@/components/wordmark";
import { PhotoScrim } from "@/components/photo-scrim";
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
    <div id="hero" data-hero className="fwd-on-dark">
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
            than sitting in the bottom left corner.

            `justify-center` on a flex column that also holds the strip would
            centre both together and push the lockup up; the strip is pinned to
            the bottom by `mt-auto` instead, so the middle stays the middle. */}
        {/* A FLAT WASH ACROSS THE WHOLE FRAME, added when the photograph
            changed. The previous hero was a dark, close-cropped shot and the
            radial scrim under the mark was enough on its own. This one is a
            lit room with pale faces and festoon lights through the middle of
            it, and measured against it the tagline sat at 1.64:1 — white type
            you cannot read — with the mark itself only scraping 3.05.

            The radial pool still does the work under the mark. This puts a
            floor under everything else, including the line the pool does not
            reach.

            0.45 cleared the numbers at 6.98 and 4.90. This is 0.58, which is
            not about clearing them: the type reads as sitting on the picture
            rather than fighting it. Mark 8.80:1, tagline 7.12:1. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1 bg-black/[0.58]"
        />
        <div className="relative z-2 flex w-full flex-1 flex-col items-center px-6 pb-0 pt-28 text-center">
          {/* The 10px is padding rather than a margin: the block is centred
              with `my-auto`, and an auto margin has no room left to give once
              the content nearly fills the screen — which is exactly when the
              button ends up against the rule. Padding is not negotiable in the
              same way, so the gap holds at every height. */}
          <div className="my-auto flex flex-col items-center pb-[10px]">
            {/* A soft radial scrim under the lockup, from the placement rules.
                The wash over the whole photograph has gone, so this is what
                keeps the mark holding its shape wherever the picture is
                busiest, without darkening the frame the way a flat overlay
                did. It is behind the lockup only: -z-1 puts it under the text,
                and the padding is what gives it something to fade across. */}
            <div className="relative">
              <PhotoScrim size="lockup" />
              {/* THE SIGNATURE IS HERE, and only here, on this page. The bar
                  at the top of the homepage is the mark on its own; every
                  other page keeps the endorsement up there in the corner
                  because it has nothing this size to put it on. See the
                  `signature` prop in wordmark.tsx.

                  The width is unchanged, so the "fwd." is exactly the size it
                  was — the lockup adds its height underneath rather than
                  shrinking the mark to make room. */}
              <Wordmark size="heroLarge" heading align="center" />
            </div>

            {/* Clear space: at least the height of the "d" before anything
                else starts. That ascender in Instrument Serif is about three
                quarters of the font size, so at the desktop lockup it is a
                little over a hundred pixels rather than the fifty-six this
                used to be. */}
            <p className="mt-12 font-body text-lg leading-[1.5] text-photo-ink sm:mt-16 sm:text-[22px] lg:mt-[104px] lg:text-[27px]">
              {/* Two lines, never one. Each is its own block, so no width can
                  reflow them together and no width can break either in half:
                  the second line is the answer to the first and it has to land
                  on its own. */}
              <span className="block">{HERO.headline.one}</span>
              <span className="block text-accent-on-dark">
                {HERO.headline.two}
              </span>
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ApplyLink variant="onDark" />
            </div>

            {/* NO MEMBERS' DOOR HERE EITHER. The mock puts one under the
                button and it is left out for the same reason it is left out of
                the header: the member area is not a feature of the website.
                Nothing on a public page says it exists. */}

          </div>

        </div>
      </PhotoPlaceholder>
    </div>
  );
}
