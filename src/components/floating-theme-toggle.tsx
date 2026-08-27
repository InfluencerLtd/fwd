"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * The light and dark switch, following you down the page.
 *
 * It deliberately does NOT appear over the hero. Nothing sits on top of that
 * photograph, which is why the header was taken off it. This fades in only once
 * the hero has scrolled away, so the switch is reachable from anywhere on the
 * page without cluttering the first thing anybody sees.
 *
 * The switch in the footer stays as well, for anyone who reaches the bottom.
 *
 * If the hero is not on the page, or this script never runs, nothing appears
 * and the footer switch is still there. Nothing depends on this working.
 */
export function FloatingThemeToggle({ watch }: { watch: string }) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watch);
    if (!target) return;

    // The callback fires once immediately with the current state, so there is
    // no need to set anything up front.
    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [watch]);

  return (
    <div
      className={`fixed right-5 top-5 z-40 transition-opacity duration-500 ${
        past ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      // Hidden from screen readers and from the keyboard while it is invisible,
      // so nobody can land on a control they cannot see.
      aria-hidden={!past}
      inert={!past}
    >
      <ThemeToggle className="border-border bg-surface/85 backdrop-blur-sm" />
    </div>
  );
}
