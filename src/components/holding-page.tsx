import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoScrim } from "@/components/photo-scrim";
import { Wordmark } from "@/components/wordmark";
import { MarkedText } from "@/components/marked";
import { SignupForm } from "@/components/signup-form";
import { HOLDING, IMAGERY } from "@/content/site";

/**
 * The pre-launch holding page.
 *
 * This is what sits at the address from the moment the domain is registered,
 * until SITE_MODE in src/lib/site-config.ts is switched to "live". It is not
 * deleted at launch, so it can be brought back at any time.
 *
 * WHAT IT IS ALLOWED TO SAY. The name, one line about who it is for, and a
 * field to leave an address in. Nothing about the format, the membership, the
 * cost or the calendar — somebody who hears about this early should be able to
 * catch the premise and register interest, and should not be able to work out
 * the whole offering from a page that exists to tease it.
 *
 * IT IS THE HERO OF THE FULL SITE, MINUS THE SITE. That is deliberate rather
 * than lazy: the launch page is the piece of this identity everybody responds
 * to, and somebody who sees this page in September should recognise it as the
 * same thing when the site opens. Same photograph, same centred lockup on the
 * same radial scrim, same flat wash over the frame, same blue on the button.
 * The only thing that replaces the "apply for membership" pill is the field.
 *
 * It was left-aligned and anchored to the bottom of the frame, which was the
 * earlier hero's composition and is no longer anybody's. Centred now, like the
 * one it is meant to rhyme with.
 *
 * It is dark throughout, and there is no light/dark toggle. The toggle belongs
 * on the full site, where there are light surfaces to toggle.
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
        /* The placeholder's own wash is off; the two layers below do it, the
           same way the hero does. */
        scrim={false}
        className="flex min-h-screen flex-1 flex-col"
      >
        {/* A FLAT WASH ACROSS THE WHOLE FRAME, at the hero's 0.58. This
            photograph is a lit room with pale faces in it, and the type over
            the lower half of it — a line, a prompt, a field, a consent line —
            is smaller than anything the hero carries. The wash is what puts a
            floor under all of it; the radial pool below does the mark. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1 bg-black/[0.58]"
        />

        <div className="relative z-2 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 pb-20 pt-28 text-center">
          <div className="my-auto flex w-full flex-col items-center">
            {/* THE SIGNATURE IS ON, unlike the site's hero. There the header
                lockup at the top of the same screen carries the endorsement;
                here there is no header, so this is the only place it can be —
                and this is the page that has to say whose it is. */}
            <div className="relative">
              <PhotoScrim size="lockup" />
              <Wordmark size="heroLarge" heading align="center" />
            </div>

            {/* Clear space: at least the height of the "d" before anything
                else starts, the same rule the hero follows. */}
            <p className="fwd-enter mt-12 max-w-2xl font-body text-lg leading-[1.5] text-photo-ink sm:mt-16 sm:text-[22px] lg:mt-[88px]">
              <MarkedText text={HOLDING.line} />
            </p>

            {/* NO RULE ACROSS THE MIDDLE. There was one, separating the line
                from the form, and on a photograph a hairline drawn edge to
                edge reads as a scratch on the picture. The space does it. */}
            {/* NO PROMPT OVER THE FIELD. It said "Be the first to hear when
                applications open." above a box asking for an email address,
                which is the box saying it twice. The field's own placeholder
                and the button carry it. */}
            <div className="fwd-enter mt-14 w-full sm:mt-16">
              {/* THE BLOCK IS CENTRED AND THE FORM INSIDE IT IS NOT. A centred
                  heading is a heading; centred field labels, error messages
                  and a consent line are just hard to read, because the eye has
                  no fixed left edge to return to. So the form keeps its own
                  alignment inside a column that sits in the middle of the
                  page. */}
              <div className="mx-auto max-w-md text-left">
                <SignupForm source="holding" />
              </div>
            </div>
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
