import { HERO_STRIP } from "@/content/hero-modules";

/**
 * Three figures along the bottom of the hero.
 *
 * INSIDE THE HERO RATHER THAN UNDER IT, which is the whole point of putting it
 * here. Below the photograph it was a second section and a second scroll; on
 * the picture it means the first screen carries a fact as well as a mood, and
 * somebody who never scrolls has still been told something true.
 *
 * IT READS AS FACT, NOT AS A COUNTDOWN. No counting up, no clock, no hours or
 * minutes, nothing that moves as a date approaches. A figure that animates is
 * asking to be believed.
 *
 * THE MIDDLE ONE HAS A THIRD LINE and the others do not. The three kinds of
 * member are the only figure here that means nothing without naming them —
 * "3 perspectives" on its own is a claim about arithmetic. The items align at
 * the top rather than the bottom so the extra line hangs below the row instead
 * of pushing its neighbours up.
 *
 * WHAT DROPS AT WHICH WIDTH. Three across a phone is three columns of about a
 * hundred pixels, which is not enough for a label and a note. So below 700px
 * they stack, and below 500px the third goes entirely.
 */
export function HeroStrip() {
  return (
    <div className="relative z-2 w-full">
      {/* The gradient is part of the strip rather than part of the picture, so
          the figures are legible whatever photograph is behind them. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[230px] bg-gradient-to-t from-black/[0.82] to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 pb-[26px] pt-[22px] text-center min-[700px]:flex-row min-[700px]:items-start min-[700px]:justify-between min-[700px]:gap-4">
          {HERO_STRIP.figures.map((item, index) => (
            <div
              key={item.label}
              className={index === 2 ? "hidden min-[500px]:block" : undefined}
            >
              <p className="font-display text-[40px] leading-none text-accent-on-dark">
                {item.figure}
              </p>
              <p className="mt-2 font-body text-[10.5px] uppercase tracking-[0.16em] text-photo-ink/60">
                {item.label}
              </p>
              {item.note ? (
                <p className="mt-1.5 font-body text-[11px] leading-snug text-photo-ink/45">
                  {item.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
