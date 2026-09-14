"use client";

import { useEffect } from "react";

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
