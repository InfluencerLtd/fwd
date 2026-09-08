"use client";

import { useEffect, useRef, useState } from "react";
import { FORMATS, FORMATS_LABEL } from "@/content/formats";

/**
 * One tab's worth of body, faded in over 200ms.
 *
 * The fade is a transition rather than a keyframe on purpose: a keyframe would
 * have to live in globals.css, and globals.css is not something this module was
 * asked to touch. So the panel mounts at zero and an effect puts it to one on
 * the next tick, which is a transition the browser can run without anything
 * global being declared.
 *
 * `motion-reduce:transition-none` turns it into an instant swap for anybody who
 * has asked their computer for less movement. The opacity still ends at one, so
 * nothing disappears — it simply arrives without the fade.
 */
function Panel({
  format,
  photo,
}: {
  format: (typeof FORMATS)[number];
  photo: React.ReactNode;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    // On the next frame, not this one. Setting it straight away can be batched
    // into the same paint as the mount, and a browser given both ends of a
    // transition in one paint simply draws the second — no fade at all. Waiting
    // a frame guarantees there is something to transition from.
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      role="tabpanel"
      id={`format-panel-${format.id}`}
      aria-labelledby={`format-tab-${format.id}`}
      className={`mt-10 grid gap-10 transition-opacity duration-200 motion-reduce:transition-none md:grid-cols-[55fr_45fr] ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* The minimum height is on the text column rather than the section, so
          the page does not jump as the five different lengths come and go and
          the picture keeps its own proportions. */}
      <div className="min-h-[190px]">
        <p className="font-display text-3xl leading-tight text-accent-on-dark">
          {format.name}
        </p>
        <p className="mt-4 font-body text-[17px] leading-relaxed text-photo-ink/80">
          {format.description}
        </p>
        <p className="mt-6 font-body text-xs uppercase tracking-[0.16em] text-photo-ink/55">
          {format.size} people · {format.frequency}
        </p>
      </div>

      {photo}
    </div>
  );
}

/**
 * The five kinds of room, five descriptions in the space of one.
 *
 * IT IS TABS ON A SCREEN AND AN ACCORDION ON A PHONE, and those are two
 * different pieces of markup rather than one bent into both shapes. A row of
 * five tabs across 375px is five three-letter words nobody can hit; an
 * accordion down a desktop page is five clicks to read what would have fitted
 * side by side. Only one is ever in the document — the other is `display:none`,
 * which takes it out of the accessibility tree too, so a screen reader is not
 * offered the same five rooms twice.
 *
 * THE TABS FOLLOW THE ARIA PATTERN PROPERLY, which is the part that is easy to
 * fake and easy to get wrong. Left and right arrows move between them and wrap
 * at the ends, Home and End jump to the first and last, and the tab strip is a
 * single stop in the tab order rather than five — that is what the roving
 * tabindex below is doing. Anything less and a keyboard user has to press tab
 * five times to get past a control they did not want.
 *
 * THE PANEL HAS A MINIMUM HEIGHT because the five descriptions are different
 * lengths and the page must not jump as somebody clicks along the row. It is
 * set on the text column, not the section, so the picture is free to keep its
 * own proportions.
 *
 * The accordion is the browser's own <details>, so it opens, closes, takes a
 * keyboard and announces itself without any of that being written here.
 *
 * THE PHOTOGRAPHS ARE HANDED IN ALREADY RENDERED, from the server component in
 * formats.tsx, and that is not tidiness. PhotoPlaceholder looks on disk to see
 * whether a photograph has arrived yet, so it reaches for node:fs — and
 * importing it from a "use client" file drags node:fs towards the browser
 * bundle and fails the build outright. Rendered on the server and passed down
 * as a prop, the filesystem stays where it belongs.
 */
export function FormatTabs({ photos }: { photos: React.ReactNode[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const last = FORMATS.length - 1;
    const to =
      event.key === "ArrowRight"
        ? active === last
          ? 0
          : active + 1
        : event.key === "ArrowLeft"
          ? active === 0
            ? last
            : active - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (to === null) return;
    event.preventDefault();
    setActive(to);
    // Focus follows selection, which is the pattern for tabs whose panels are
    // already in the document: arrowing along the row should show each one, not
    // require a second press to open it.
    tabs.current[to]?.focus();
  }

  const current = FORMATS[active];

  return (
    <section
      aria-label={FORMATS_LABEL}
      className="fwd-on-dark bg-photo-ground"
    >
      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* ---------------------------------------------------- the tabs */}
        <div className="hidden sm:block">
          <div
            role="tablist"
            aria-label={FORMATS_LABEL}
            onKeyDown={onKeyDown}
            className="flex gap-8 border-b border-accent-on-dark/20"
          >
            {FORMATS.map((format, index) => {
              const selected = index === active;
              return (
                <button
                  key={format.id}
                  ref={(el) => {
                    tabs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`format-tab-${format.id}`}
                  aria-selected={selected}
                  aria-controls={`format-panel-${format.id}`}
                  // The unselected tabs are out of the tab order, so the whole
                  // strip is one stop and the arrows do the rest.
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`-mb-px border-b-2 pb-3 font-body text-sm transition-colors duration-300 ${
                    selected
                      ? "border-accent-on-dark text-accent-on-dark"
                      : "border-transparent text-photo-ink/50 hover:text-photo-ink/75"
                  }`}
                >
                  {format.name}
                </button>
              );
            })}
          </div>

          {/* The key remounts the panel when the tab changes, which is what
              starts the fade again rather than running it once on first
              paint. */}
          <Panel key={current.id} format={current} photo={photos[active]} />
        </div>

        {/* ----------------------------------------------- the accordion */}
        <div className="sm:hidden">
          {FORMATS.map((format, index) => (
            <details
              key={format.id}
              className="border-b border-accent-on-dark/20 first:border-t"
            >
              <summary className="cursor-pointer list-none py-4 font-body text-base text-photo-ink/75 marker:content-none">
                {format.name}
              </summary>
              <div className="pb-6">
                {photos[index]}
                <p className="mt-4 font-body text-[15px] leading-relaxed text-photo-ink/80">
                  {format.description}
                </p>
                <p className="mt-4 font-body text-xs uppercase tracking-[0.16em] text-photo-ink/55">
                  {format.size} people · {format.frequency}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
