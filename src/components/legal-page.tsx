import Link from "next/link";
import { CONTACT } from "@/lib/brand";
import { FOOTER } from "@/content/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteMenu } from "@/components/site-menu";

/** Shared layout for the privacy and cookie pages. */
export function LegalPage({
  heading,
  body,
}: {
  heading: string;
  body: readonly string[];
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
          <p className="mt-10 font-body text-sm text-ink-muted">
            {CONTACT.email}
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
