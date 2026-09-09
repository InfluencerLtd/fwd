/**
 * A script that runs while the browser is still parsing the HTML.
 *
 * WHY IT IS NOT JUST A <script> TAG. React never executes a script tag it
 * renders on the client — a script inserted by a DOM update does nothing — and
 * since Next 16 it says so in the console every time it renders one:
 *
 *   "Encountered a script tag while rendering React component. Scripts inside
 *    React components are never executed when rendering on the client."
 *
 * The warning is right about the general case and wrong about this one. The
 * theme script has to run during parsing, before the first paint, which is the
 * one thing React's own lifecycle cannot do — see the note in src/lib/theme.ts
 * and the "Preventing flash before hydration" guide in
 * node_modules/next/dist/docs/01-app/02-guides.
 *
 * SO THE TAG IS ONLY A SCRIPT ON THE SERVER. Rendered into the HTML document
 * it is `text/javascript` and the browser runs it. Rendered again in the
 * browser — a client navigation, a dev remount — it is `text/plain`, which is
 * inert and is what stops the warning. `suppressHydrationWarning` covers the
 * difference between the two, which is the only thing React would otherwise
 * complain about.
 *
 * This is the helper the Next guide prescribes for exactly this, copied rather
 * than invented.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
