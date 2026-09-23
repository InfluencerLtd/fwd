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
        {/* LEFT-ALIGNED AND LARGE, from 21 September 2026, after a reference
            layout: the three nouns stacked one to a line at statement size,
            the line under them, the button, and "Hosted by" at the foot of
            the frame on its own. It was one centred line at 32px with
            everything stacked under it in the middle of the photograph.

            THE LEFT EDGE IS THE MARK'S. 37px on a phone and 45px from 640px
            up, inside the same 1152px measure as the bar, which is exactly
            where the "fwd." in the pill above starts — so the headline hangs
            off the logo rather than off an arbitrary margin.

            THE HOSTED LINE SITS AT THE FOOT, pinned there by the main block's
            my-auto taking the space above it. It is still where somebody
            arrives; it just no longer competes with the button for the same
            spot. Influencer's own logo stays in it: see hosted-by.tsx. */}
        <div className="relative z-2 mx-auto flex w-full max-w-6xl flex-1 flex-col px-[37px] pb-10 pt-32 sm:px-[45px] sm:pb-14">
          {/* The 10px is padding rather than a margin: the block is centred
              with `my-auto`, and an auto margin has no room left to give once
              the content nearly fills the screen. Padding holds at every
              height. */}
          <div className="my-auto flex flex-col items-start pb-[10px] text-left">
            {/* THE SITE'S STATEMENT TYPE, from 21 September 2026. For a day this
                was set in the sans, after a reference layout, and it was the
                one opening statement on the site that was not in the serif:
                every other page opens on .fwd-statement in Instrument Serif,
                which is what the brand guidelines reserve headlines for. It
                takes the same class now, so the size, leading and tracking are
                the ones "Behind closed doors" and "The briefing" use.

                AND IT IS THE PAGE'S h1. The home page had none; every other
                page's opening statement is one. normal-case! because the
                unlayered h1 rule would otherwise lowercase it.

                One noun to a line, as the reference had it. The content is
                still the one sentence in HERO.headline, split on its spaces
                here so the words stay editable in one place. The last full
                stop is the brand's, in the pale blue, as it is at the end of
                every other statement on a dark ground. */}
            <h1 className="fwd-statement normal-case! text-photo-ink">
              {HERO.headline.split(" ").map((word, index, words) =>
                index === words.length - 1 && word.endsWith(".") ? (
                  <span key={word} className="block">
                    {word.slice(0, -1)}
                    <span className="fwd-dot">.</span>
                  </span>
                ) : (
                  <span key={word} className="block">
                    {/* The trailing space is never drawn, since it falls at
                        the end of a line, but a screen reader needs it or it
                        reads "Brands.Creators.Platforms." as one word. */}
                    {`${word} `}
                  </span>
                ),
              )}
            </h1>

            {/* What it is, in the standfirst every other page opening uses
                under its statement: the serif, a size down. */}
            <p className="fwd-standfirst mt-8 max-w-[34ch] text-photo-ink/80">
              {HERO.plain}
            </p>

            <div className="mt-10">
              <ApplyLink variant="onDark" />
            </div>

            {/* WHO IS BEHIND IT, where somebody arrives. See `hostedBy` in
                src/lib/brand.ts.

                WHITE, NOT A FADED ONE (21 September 2026). It was the off-white
                at 60%, and over the busy lower half of this photograph that was
                hard to read. The off-white at full strength is the same colour
                the headline is set in, so the two read as one voice.

                UNDER THE BUTTON, NOT AT THE FOOT OF THE SCREEN (23 September
                2026). It used to sit outside this block, pinned near the bottom
                of the photograph, which put most of a screen between the ask
                and who is behind it and left it reading as small print. It is
                part of the opening statement now: the same left edge, a step
                larger, and close enough to the button to be read with it. */}
            <HostedBy size="lg" className="mt-7 text-photo-ink" />

            {/* NO MEMBERS' DOOR HERE. The member area is not a feature of the
                website; nothing on a public page says it exists. */}
          </div>
        </div>
      </PhotoPlaceholder>
    </div>
  );
}
