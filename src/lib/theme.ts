/**
 * theme.ts - shared constants for light/dark mode.
 *
 * How it works, in plain language:
 *   - DARK is the default. A first-time visitor sees the dark page.
 *   - The moment they use the switch, their choice is remembered in their own
 *     browser and it wins from then on.
 *
 * Note this is a deliberate reversal of the original brief, which said light was
 * the default and that a visitor's computer setting should be taken as a hint on
 * first load. Dark is now the club's default look for everybody, so the computer
 * setting is no longer read: taking it as a hint would mean half of visitors saw
 * one thing and half the other, which is not a house style.
 *
 * Both modes are fully designed and both meet the contrast standard, so nobody
 * is worse off, and anyone who prefers light is one click away from it.
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
    /* The page is SERVED with the dark class already on it, so dark is what
       arrives even if this script never runs or JavaScript is switched off.
       All this does is take it off again for somebody who chose light. */
    var saved = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = saved === 'light' ? 'light' : 'dark';
    if (theme === 'light') document.documentElement.classList.remove('dark');
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    /* Private browsing can block storage. The dark default is already applied. */
  }
})();
`.trim();
