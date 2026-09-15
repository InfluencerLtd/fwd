"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A row of cards you move along, with two arrows under it.
 *
 * IT HOLDS THE CARDS RATHER THAN DRAWING THEM. The cards come in as children,
 * already rendered on the server, because the photographs are drawn by
 * PhotoPlaceholder and that reads public/photography from the filesystem to
 * decide whether a real picture exists. A client component cannot do that: it
 * is bundled for the browser, and the build fails on `node:fs`. So this file
 * owns the scrolling and the buttons, and nothing else.
 *
 * IT IS A SCROLLING LIST FIRST AND A CAROUSEL SECOND. The track is a plain
 * horizontal scroller with snap points, so a trackpad, a phone swipe,
 * shift-wheel and the keyboard all work with no script at all. The arrows only
 * call scrollBy on it. The hard parts — momentum, snapping, where a swipe
 * lands — stay the browser's, and if this script never loads the row still
 * works.
 *
 * THE ARROWS DISABLE AT THE ENDS RATHER THAN LOOPING. A loop hides where a
 * list begins and ends, and thirty is a number somebody may want to get to the
 * end of.
 */
export function ThinkersCarousel({
  previousLabel,
  nextLabel,
  children,
}: {
  previousLabel: string;
  nextLabel: string;
  children: React.ReactNode;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // The arrows' state is read off the scroller rather than counted in here, so
  // a swipe and a click can never disagree about where the row is.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const read = () => {
      // A pixel or two of slack: a snapped row rarely lands on exactly zero.
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
    };
    read();
    el.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      el.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  // A press moves by most of a screenful rather than one card, which is what
  // makes thirty of them tolerable, and lands on a snap point either way.
  const move = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 font-body text-base leading-none text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-surface disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <ul
        ref={track}
        className="fwd-scroll-row -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-2"
      >
        {children}
      </ul>

      {/* Under the row and on the left, where the reading eye already is. The
          row is reachable without them. */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={atStart}
          aria-label={previousLabel}
          className={arrow}
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={atEnd}
          aria-label={nextLabel}
          className={arrow}
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
