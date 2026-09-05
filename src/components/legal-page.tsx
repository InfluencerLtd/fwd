import Link from "next/link";
import { CONTACT } from "@/lib/brand";
import { FOOTER } from "@/content/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteMenu } from "@/components/site-menu";

/** Shared layout for the privacy and cookie pages. */
export function LegalPage({
  heading,
  body,
  link,
  smallPrint,
}: {
  heading: string;
  body: readonly string[];
  /**
   * A document held somewhere else that governs this page.
   *
   * The privacy page uses it for Influencer's notice. It opens in a new tab
   * because it leaves the site, and it carries rel="noreferrer" for the same
   * reason every outbound link here does.
   */
  link?: { href: string; label: string };
  /** Registered details and the like. Quieter than the body, and last. */
  smallPrint?: readonly string[];
}) {
  return (
    <>
      <SiteMenu />
      <main className="flex-1 px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="fwd-underline font-body text-sm text-accent"
          >
            {FOOTER.back}
          </Link>
          <h1 className="mt-8 text-4xl sm:text-5xl">{heading}</h1>
          <div className="mt-8 space-y-5">
            {body.map((line) => (
              <p
                key={line}
                className="font-body text-lg leading-relaxed text-ink-muted"
              >
                {line}
              </p>
            ))}
          </div>

          {link ? (
            <p className="mt-8">
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="fwd-underline font-body text-lg text-accent"
              >
                {link.label}
              </a>
            </p>
          ) : null}

          {/* A link, not a line to copy out: this is the address somebody is
              told to write to, on the page telling them to write to it. */}
          <p className="mt-10 font-body text-sm">
            <a
              href={`mailto:${CONTACT.email}`}
              className="fwd-underline text-accent"
            >
              {CONTACT.email}
            </a>
          </p>

          {smallPrint ? (
            <div className="mt-8 space-y-1 border-t border-border pt-6">
              {smallPrint.map((line) => (
                <p key={line} className="font-body text-sm text-ink-muted">
                  {line}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
