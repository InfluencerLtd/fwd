/**
 * theme.ts - shared constants for light/dark mode.
 *
 * How it works, in plain language:
 *   - Light is the default. A first-time visitor sees the warm off-white page.
 *   - If their computer is set to dark mode, we take that as a HINT on the very
 *     first visit only.
 *   - The moment they use the toggle, their choice is remembered in their own
 *     browser and it wins from then on, whatever their computer is set to.
 */

export const THEME_STORAGE_KEY = "fwd-theme";
export type Theme = "light" | "dark";

/**
 * This runs as the first thing in the page, before anything is drawn, so the
 * page never flashes white and then jump to dark. It is deliberately small and
 * written without any framework so it can run immediately.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = saved === 'light' || saved === 'dark'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    /* Private browsing can block storage. Fall back to the light default. */
  }
})();
`.trim();
