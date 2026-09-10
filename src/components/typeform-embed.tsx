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
  return <div data-tf-live={id} className="min-h-[520px]" />;
}
