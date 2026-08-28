import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import { CONTACT } from "@/lib/brand";
import { FOOTER, NAV } from "@/content/site";

/**
 * The footer.
 *
 * IT USED TO BE ONE ROW: the lockup, then a line with the address, the light
 * and dark switch and three links crammed together. Three problems with that.
 * It was not navigable, because the only places it could take you were the
 * member area and two legal pages, so the three line menu was the only way
 * around the site. The address sat next to the appearance switch as though
 * they were the same kind of thing. And the address was not a link, which is
 * an odd thing to do to the only way of reaching us.
 *
 * Now it is three tiers, which is the least structure that lets each thing be
 * what it is: the lockup, then the places and the address as two labelled
 * groups, then a quiet bottom line for the legal pages and the switch.
 *
 * It sits on the dark photo ground so the lockup appears the same way it does
 * in the hero, with the pale blue where it belongs.
 */

const PLACES = [
  { href: "/", label: NAV.home },
  { href: "/membership", label: NAV.membership },
  { href: "/clubhouse", label: FOOTER.signIn },
] as const;

/** Small caps-ish label over each group. */
const GROUP_HEADING =
  "font-body text-[11px] tracking-[0.18em] text-photo-ink/60";

export function SiteFooter() {
  return (
    <footer className="fwd-on-dark bg-photo-ground">
      <div className="fwd-grain">
        <div className="relative z-1 mx-auto max-w-5xl px-6 py-16">
          <Wordmark size="footer" />

          <div className="mt-14 grid gap-10 border-t border-photo-ink/15 pt-10 sm:grid-cols-2">
            <nav aria-label={FOOTER.navHeading}>
              <h2 className={GROUP_HEADING}>{FOOTER.navHeading}</h2>
              {/* The padding is the tap target. A 15px line of text is about
                  21px tall, which is a small thing to hit with a thumb, and
                  the padding takes each link to 37 without changing how the
                  list looks. The gap between them stays big enough that a near
                  miss does not land on the wrong one. */}
              <ul className="mt-2.5 space-y-1">
                {PLACES.map((place) => (
                  <li key={place.href}>
                    <Link
                      href={place.href}
                      className="fwd-underline block py-2 font-body text-[15px] text-photo-ink"
                    >
                      {place.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className={GROUP_HEADING}>{FOOTER.contactHeading}</h2>
              {/* A link, not a line of text. It is the only way of reaching us
                  from this page, so it should be one press rather than a
                  select and a copy. */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="fwd-underline mt-2.5 inline-block py-2 font-body text-[15px] text-accent-on-dark"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* The bottom line. Legal pages and the appearance switch: the two
              things nobody comes here for and everybody should be able to
              find. */}
          <div className="mt-14 flex flex-col gap-5 border-t border-photo-ink/15 pt-8 font-body text-sm sm:flex-row-reverse sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {/* The light and dark switch lives here rather than on the hero,
                  so nothing sits on top of the photograph. */}
              <ThemeToggle className="border-photo-ink/25 text-photo-ink/70 hover:text-photo-ink" />
              <span className="text-[12px] text-photo-ink/60">
                {NAV.appearance}
              </span>
            </div>

            <nav
              aria-label={FOOTER.privacy}
              className="flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              <Link
                href="/privacy"
                className="fwd-underline -my-1.5 py-1.5 text-photo-ink/70"
              >
                {FOOTER.privacy}
              </Link>
              <Link
                href="/cookies"
                className="fwd-underline -my-1.5 py-1.5 text-photo-ink/70"
              >
                {FOOTER.cookies}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
