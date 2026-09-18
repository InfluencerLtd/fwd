"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * A navigation link that lands on a section, every single time.
 *
 * WHY THIS EXISTS. "About" is an anchor into the home page (/#about) rather
 * than a page of its own, and a plain link to a hash has two holes in it:
 *
 *   1. YOU ARE ALREADY THERE. Press About while the hash is already #about and
 *      the browser does nothing at all, because nothing about the address has
 *      changed. Somebody who has scrolled away and pressed it again — the
 *      obvious thing to do — sits exactly where they were.
 *
 *   2. THE SECTION IS NOT THERE YET. Coming from another page, the browser
 *      looks for the element the moment the address changes, and in an app
 *      that renders on the client the section can be a frame or two behind.
 *      When it loses that race it gives up silently and leaves you at the top.
 *
 * So the link does the scrolling itself rather than asking the browser to.
 * On the page already, it scrolls and rewrites the hash without adding a
 * history entry, so Back still goes where the visitor expects. Arriving from
 * elsewhere, it lets Next navigate and then waits — briefly, and only for as
 * long as it takes — for the section to exist before scrolling to it.
 *
 * It is still a real <a> with a real href underneath all of that: middle
 * click, open in a new tab, copy link address and a crawler all behave
 * exactly as they did.
 */
export function HashLink({
  href,
  className,
  onNavigate,
  children,
}: {
  /** A path with a hash in it, like "/#about". */
  href: string;
  className?: string;
  /** Called once the press has been handled. The menu uses it to close. */
  onNavigate?: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [path, id] = href.split("#");
  const target = path || "/";

  function scrollTo(id: string) {
    const section = document.getElementById(id);
    if (!section) return false;
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    // replaceState rather than assigning location.hash: the same scroll, and
    // no second entry in the history for a move down one page.
    window.history.replaceState(null, "", href);
    return true;
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        onNavigate?.();
        if (!id) return;

        if (pathname === target) {
          // Already on the page the section lives on. Take the press
          // ourselves, because the browser will not act on a hash it is
          // already sitting on.
          event.preventDefault();
          scrollTo(id);
          return;
        }

        // Coming from another page: let Next do the navigation, then look for
        // the section. Up to a second, giving up quietly rather than fighting
        // a page that never renders it.
        const deadline = Date.now() + 1000;
        const look = () => {
          if (scrollTo(id) || Date.now() > deadline) return;
          requestAnimationFrame(look);
        };
        requestAnimationFrame(look);
      }}
    >
      {children}
    </Link>
  );
}
