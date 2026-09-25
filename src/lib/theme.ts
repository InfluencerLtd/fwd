/**
 * theme.ts - shared constants for light/dark mode.
 *
 * THE SWITCH IS OFF THE SITE from 25 September 2026: the menu no longer
 * carries it, so every visitor gets the light palette and nothing is
 * remembered. Everything here still works and /review still renders the
 * toggle; see the script below for the two lines that bring it back.
 *
 * How it worked, in plain language:
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
    /* THE SWITCH HAS GONE FROM THE MENU (25 September 2026), so this no
       longer reads a saved choice: it clears it. Anybody who chose dark
       while the switch existed would otherwise have been left in it with
       nothing on the page to change it back. Restoring the switch means
       putting the two lines under this one back — they are right here. */
    localStorage.removeItem('${THEME_STORAGE_KEY}');
    document.documentElement.dataset.theme = 'light';
    /* var saved = localStorage.getItem('${THEME_STORAGE_KEY}');
       if (saved === 'dark') document.documentElement.classList.add('dark'); */
  } catch (e) {
    /* Private browsing can block storage. The light default is already applied. */
  }
})();
`.trim();
