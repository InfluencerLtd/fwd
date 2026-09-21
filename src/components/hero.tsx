import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ApplyLink } from "@/components/apply-link";
import { HostedBy } from "@/components/hosted-by";
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
        /* The lights in this photograph flicker: a second, brighter copy of it
           blended so only its own highlights lift, fading in and out on an
           uneven fourteen-second rhythm. See .fwd-photo-twinkle in
           globals.css — it follows whatever photograph is here rather than
           being placed against this one. */
        twinkle
        /* fwd-photo-breathe scales the photograph from 1 to 1.06 and back
           across forty seconds — see the note over the keyframes in
           globals.css. It is the one thing moving at the top of the page, it
           is slower than anything else on the site, and it does not move at
           all for somebody who has asked for reduced motion. */
        className="fwd-photo-breathe flex min-h-[92vh] flex-col"
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
        {/* z-0 RATHER THAN z-1, so the twinkle layer above it at z-1 is not
            being darkened by it. It is still above the photograph, which is
            first in the DOM and unpositioned in the stack, and still under the
            words at z-2 — which is all this wash needs to be. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-black/[0.58]"
        />
        <div className="relative z-2 flex w-full flex-1 flex-col items-center px-6 pb-0 pt-28 text-center">
          {/* The 10px is padding rather than a margin: the block is centred
              with `my-auto`, and an auto margin has no room left to give once
              the content nearly fills the screen — which is exactly when the
              button ends up against the rule. Padding is not negotiable in the
              same way, so the gap holds at every height. */}
          <div className="my-auto flex flex-col items-center pb-[10px]">
            {/* THE BIG CENTRAL LOCKUP HAS GONE. It was the mark at hero
                size with "by Influencer" under it, over a radial scrim. The
                review of 17 September 2026 called it redundant against the
                mark in the top left corner, and it was: two lockups on one
                screen, one of them four times the size of the other.

                What it leaves behind is room. The three nouns, the line and
                the button now sit in the middle of the photograph rather than
                below the middle, which is the other thing the review asked
                for. The header keeps the endorsement on this page now, so the
                signature is not lost: see `signature` in site-header.tsx. */}

            {/* Clear space: at least the height of the "d" before anything
                else starts. That ascender in Instrument Serif is about three
                quarters of the font size, so at the desktop lockup it is a
                little over a hundred pixels rather than the fifty-six this
                used to be. */}
            {/* ONE LINE. It was two — "Brands. Creators. Platforms." and then
                "One table." in the pale blue as the answer to it. The answer
                went; the three nouns stand on their own. */}
            <p className="font-body text-xl leading-[1.5] text-photo-ink sm:text-[26px] lg:text-[32px]">
              {HERO.headline}
            </p>

            {/* What it is, under the three nouns and over the button. Smaller
                and quieter than the line above it: the mood is the headline's
                job and this is here so nobody has to guess. */}
            <p className="mx-auto mt-3 max-w-[46ch] font-body text-[15px] leading-relaxed text-photo-ink/70 sm:text-base">
              {HERO.plain}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ApplyLink variant="onDark" />
            </div>

            {/* WHO IS BEHIND IT, where somebody arrives. The subtle version of
                the Sport Beach model, chosen on 21 September 2026 over putting
                a full hosted lockup above the headline: the hero keeps its
                own composition and Influencer still appears, as itself, on the
                first screen. See `hostedBy` in src/lib/brand.ts. */}
            <HostedBy size="md" className="mt-8 text-photo-ink/80" />

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
