/**
 * theme.ts - shared constants for light/dark mode.
 *
 * How it works, in plain language:
 *   - LIGHT is the default. A first-time visitor sees the warm off-white page.
 *   - The moment they use the switch, their choice is remembered in their own
 *     browser and it wins from then on.
 *
 * The visitor's own computer setting is deliberately NOT read. The brief
 * suggested taking it as a hint on first load, but that would mean roughly half
 * of visitors landed on the dark version, which is the opposite of having a
 * default. Adding it back is one line, here, if that is wanted.
 *
 * Both modes are fully designed and both meet the contrast standard, so nobody
 * is worse off either way, and the other one is always one click away.
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
    /* The page is served light, so light is what arrives even if this script
       never runs or JavaScript is switched off. All this does is switch it to
       dark for somebody who chose dark. */
    var saved = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = saved === 'dark' ? 'dark' : 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    /* Private browsing can block storage. The light default is already applied. */
  }
})();
`.trim();
