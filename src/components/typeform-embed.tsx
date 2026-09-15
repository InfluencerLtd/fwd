"use client";

import { useEffect } from "react";
import { buttonClass } from "@/components/button";

const SRC = "https://embed.typeform.com/next/embed.js";

declare global {
  interface Window {
    tf?: { load?: () => void };
  }
}

/**
 * A Typeform "live" embed: the form as it is set up in Typeform, inline.
 *
 * The script is loaded on first use rather than on every page, since it is
 * only needed behind the apply button. It scans the page for `data-tf-live`
 * when it loads, so the second time the form opens (the script already there)
 * it is asked to scan again with `tf.load()` — the div it needs did not exist
 * when it first looked.
 *
 * Submissions go to Typeform, not to our database: this path has no copy of
 * its own the way the HubSpot one does.
 */
export function TypeformEmbed({ id }: { id: string }) {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SRC}"]`,
    );
    if (existing) {
      window.tf?.load?.();
      return;
    }
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [id]);

  // Held open while the form loads, so the dialog does not jump from a
  // thumb's height to the full form.
  //
  // ITS OWN BOX, CLIPPED. The Typeform header was seen overlapping the
  // dialog's own heading while the form loaded (first-impression critique,
  // 14 September 2026): the embed positions elements of its own, and without
  // a clipping box and a stacking context of its own they can be drawn over
  // whatever sits above them. `isolate` keeps its z-indexes inside itself and
  // `overflow-hidden` keeps its furniture inside this box, so the worst a
  // slow load can now do is show an empty rounded panel.
  return (
    <div className="relative isolate min-h-[560px] overflow-hidden rounded-2xl" >
      <div data-tf-live={id} className="min-h-[560px]" />
    </div>
  );
}

/**
 * The same form, opened over the page instead of set into it.
 *
 * WHY A POPUP AND NOT THE INLINE EMBED. Inline, the form arrives as a white
 * panel in the middle of a near-black page, on Typeform's own theme: a second
 * company's design in the one place this page has nothing else to look at.
 * As a popup, the page keeps a single button in the brand's own colour and
 * the form only appears once somebody asks for it (asked for on 15 September
 * 2026).
 *
 * `data-tf-popup` is read by the same embed script as `data-tf-live`, so this
 * is one attribute on a button we style ourselves. The size and opacity are
 * Typeform's own options: full-height, fully opaque.
 */
export function TypeformPopupButton({
  id,
  label,
  className = "",
}: {
  id: string;
  label: string;
  className?: string;
}) {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SRC}"]`,
    );
    if (existing) {
      window.tf?.load?.();
      return;
    }
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [id]);

  return (
    <button
      type="button"
      data-tf-popup={id}
      data-tf-opacity="100"
      data-tf-size="100"
      className={buttonClass("primary", "lg", className)}
    >
      {label}
    </button>
  );
}
