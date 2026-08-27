"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/**
 * The light/dark switch.
 *
 * The single source of truth for "which mode are we in" is the `dark` class on
 * the <html> element, which the inline script in the layout sets before the page
 * is drawn. This button reads that class rather than keeping its own copy, so
 * the two can never disagree.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** On the server there is no document, and light is the default. */
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function apply(next: Theme) {
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Private browsing can block storage. The toggle still works this visit. */
    }
  }

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => apply(theme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition-colors duration-300 hover:text-ink ${className}`}
    >
      <span aria-hidden="true" className="text-[13px] leading-none">
        {theme === "dark" ? "☾" : "☀"}
      </span>
    </button>
  );
}
