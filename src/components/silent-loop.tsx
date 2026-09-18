"use client";

import { useEffect, useRef } from "react";

/**
 * A short film of a room, playing silently on a loop.
 *
 * WHAT THIS IS FOR, AND WHAT IT IS NOT. It is texture and proof: a few seconds
 * of a dinner actually happening, behind or beside words that describe one. It
 * has no sound, no controls and no play button, because it is not something a
 * visitor is asked to watch — it is something they notice. The moment a film
 * has anything to say out loud it stops being this and needs controls, a real
 * poster and a caption, which is a different component.
 *
 * IT IS A PHOTOGRAPH UNTIL THE FILM EXISTS. With no `src` it renders the
 * poster frame and nothing else, so the slot is finished and the page is not
 * waiting on a shoot. Dropping the file into public/film and naming it in
 * FILM (src/content/site.ts) is the whole job.
 *
 * HOW IT BEHAVES
 *   - Muted, looping, inline. Muted is not a preference: a browser will refuse
 *     to autoplay anything else, and rightly.
 *   - Nothing is fetched until it is nearly on screen. `preload="none"` plus a
 *     source added only when the observer first sees it, so somebody who never
 *     scrolls this far pays nothing for it.
 *   - It plays when it is on screen and pauses when it is not, so a film out
 *     of sight is not burning a laptop battery.
 *   - REDUCED MOTION IS THE POSTER. Somebody who has asked their computer for
 *     less movement gets a still, which is exactly what the site's own motion
 *     rules say: no piece may carry information that exists only in movement.
 */
export function SilentLoop({
  src,
  poster,
  ratioClass,
  objectPosition,
  className = "",
}: {
  /** The film, e.g. "/film/rooms.mp4". Null or undefined until it exists. */
  src?: string | null;
  /** The frame to show before it plays, and instead of it when it cannot. */
  poster: string;
  /** The shape of the slot, as a Tailwind aspect class. */
  ratioClass: string;
  /** Where to crop from, when the middle is the wrong place. */
  objectPosition?: string;
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element || !src) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          /* FIRST SIGHT IS WHEN THE FILE IS ASKED FOR. The src is set here
             rather than in the markup, which is what makes preload="none"
             mean anything: somebody who never scrolls this far never fetches
             it at all.

             src AND THEN load(). A <video> that has never had a source sits
             in NETWORK_EMPTY, and giving it one is not enough on its own —
             without load() it will happily stay empty and never play. This
             was a <source> child added by React on first sight, and it did
             exactly that: rendered, and then nothing. */
          if (!element.currentSrc) {
            element.src = src;
            element.load();
          }
          // play() rejects on its own if the browser is not ready or the tab
          // is hidden. Nothing to recover from, and nothing to report.
          void element.play().catch(() => {});
        } else {
          element.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [src]);

  const fit = "h-full w-full object-cover";
  const style = objectPosition ? { objectPosition } : undefined;

  return (
    <div
      className={`fwd-photo fwd-grain relative overflow-hidden ${ratioClass} ${className}`}
    >
      {src ? (
        <video
          ref={video}
          className={fit}
          style={style}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          // Decorative, like the photography: the words carry the meaning.
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : (
        // No film yet. The poster is the slot, and nothing about the page
        // says a video is missing.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className={fit} style={style} loading="lazy" />
      )}
    </div>
  );
}
