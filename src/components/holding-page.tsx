import { Wordmark } from "@/components/wordmark";
import { SignupForm } from "@/components/signup-form";
import { HOLDING } from "@/content/site";

/**
 * The pre-launch holding page.
 *
 * This is what sits at the address from the moment the domain is registered,
 * until SITE_MODE in src/lib/site-config.ts is switched to "live". It is not
 * deleted at launch, so it can be brought back at any time.
 *
 * WHAT IT IS ALLOWED TO SAY. The name, when, one line, and a field to leave an
 * address in. Nothing about the format, the membership, the cost or the
 * calendar — somebody who hears about this early should catch that something
 * is coming and ask for a way in, and should not be able to work out the whole
 * offering from a page that exists to tease it.
 *
 * IT IS A BLACK PAGE. It used to carry the full site's hero photograph under a
 * wash and a scrim, so that the holding page and launch day would be one
 * continuous image. The reference it now follows is plainer and better for it:
 * a lit room behind "the room is being set" is the room already set, and the
 * line says it is not yet. Nothing on the page competes with the mark now,
 * which is the point of a page that is mostly the mark.
 *
 * The ground is the site's near-black rather than #000 — the same warm black
 * as the footer and every dark section, so the page and the site that follows
 * it are the same colour.
 *
 * It is dark throughout, and there is no light/dark toggle.
 */
export function HoldingPage() {
  return (
    <main className="fwd-on-dark flex min-h-screen flex-col bg-photo-ground">
      {/* LESS PADDING ON A SHORT SCREEN. pt-28 / pb-20 came from the site's
          hero, where the top padding clears a fixed header — and this page has
          no header. On a 320x640 phone the 192px of padding pushed the page
          past one screen, so it scrolled. 64 / 48 there, the old 112 / 80 from
          sm up, and the content is still centred by my-auto either way. */}
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 pb-12 pt-16 text-center sm:pb-20 sm:pt-28">
        <div className="fwd-holding my-auto flex w-full flex-col items-center">
          {/* THE SIGNATURE IS ON. There is no header on this page to carry
              the endorsement, so this is the only place it can be — and this
              is the page that has to say whose it is.

              THE FULL STOP BLINKS. It is the one moving thing on the page:
              the cursor at the end of a sentence nobody has finished writing
              yet, which is what "coming soon" is. See `blinkDot` in
              wordmark.tsx for how the dot is lifted out of the artwork. */}
          <Wordmark size="holding" heading align="center" blinkDot />

          {/* Clear space: at least the height of the "d" before anything
              else starts, the same rule the hero follows.

              WHEN, THEN WHAT. The date is set small and spaced in the sans,
              so it reads as a label rather than a headline; the line under it
              is the one thing on the page in the serif italic, which is what
              makes it read as a voice rather than a caption. */}
          <div className="fwd-holding-lede fwd-enter mt-12 flex flex-col items-center sm:mt-16 lg:mt-[88px]">
            {/* THE LINE STEPS UP AT md, NOT sm, so it is never wider than the
                mark above it: 28px (about 213px wide) until 768, when the mark
                is already 338px; 40px from there, 46px from 1024. */}
            {/* LARGER AND WIDER-SPACED THAN THE SITE'S EYEBROW, following the
                reference: there the date runs nearly the width of the line
                under it, which is what lets two lines of such different sizes
                read as one block. */}
            <p className="fwd-eyebrow text-[13px] tracking-[0.32em] text-photo-ink/70 sm:text-[15px]">
              {HOLDING.eyebrow}
            </p>
            <p className="mt-6 font-display text-[28px] italic leading-[1.1] text-photo-ink sm:mt-7 md:text-[40px] lg:text-[46px]">
              {HOLDING.line}
            </p>
          </div>

          {/* AFTER SIGNING UP THE PAGE SAYS ONE THING. The date and the line go,
              and the thank-you moves up into the place the date held — the
              page has told them what it had to tell them, and repeating "the
              room is being set" at somebody who has just asked to be let in is
              the page not listening. Done in CSS off the success message rather
              than by lifting the form's state up here, so this stays a server
              component; see .fwd-holding in globals.css. */}
          {/* THE FIELD AND THE BUTTON, AND NOTHING UNDER THEM. The consent line
              and its box have gone — see signUpForUpdates in app/actions.ts
              for what that changes about what these addresses may be used for.

              The block is centred and the form inside it keeps its own left
              edge, so an error message still has somewhere to start from. */}
          <div className="fwd-holding-form fwd-enter mx-auto mt-14 w-full max-w-md text-left sm:mt-16">
            <SignupForm source="holding" />
          </div>
        </div>

        {/* NOTHING BELOW THE FORM. No address, no sign-in link, no footer.
            While the holding page is up there is no way in to The House from
            the address; members sign in at /clubhouse, which still works, but
            they have to be told it. */}
      </div>
    </main>
  );
}
