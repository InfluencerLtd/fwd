import type { Metadata } from "next";
import Link from "next/link";
import { readToken } from "@/lib/tokens";
import { unsubscribeEmail } from "@/lib/store/unsubscribe";
import { CONTACT } from "@/lib/brand";
import { FOOTER } from "@/content/site";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

/**
 * The unsubscribe link at the bottom of every email.
 *
 * It works in one click, with no sign-in and no "are you sure", because making
 * somebody work for it is both rude and, in the UK and EU, not really allowed.
 *
 * The link carries a signed token, so it can only unsubscribe the address it
 * was made for. Nobody can edit the link to unsubscribe somebody else.
 */
export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const outcome = await handle(t);

  return (
    <>
      {/* Solid from the top: no dark band on this page for the bar to sit
          over, and the extra padding clears the fixed header. */}
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 pb-24 pt-36">
      <div className="max-w-md text-center">
        <h1 className="text-3xl">{outcome.heading}</h1>
        <p className="mt-5 font-body text-base leading-relaxed text-ink-muted">
          {outcome.message}
        </p>
        {outcome.showContact ? (
          <p className="mt-5 font-body text-sm text-ink-muted">
            {CONTACT.email}
          </p>
        ) : null}
        <Link
          href="/"
          className="mt-8 inline-block font-body text-sm text-accent underline underline-offset-4"
        >
          {FOOTER.back}
        </Link>
      </div>
      </main>
    </>
  );
}

async function handle(token?: string) {
  if (!token) {
    return {
      heading: "unsubscribe",
      message:
        "This link is missing the part that identifies you. Use the link at the bottom of one of our emails, or write to us and we will take you off the list.",
      showContact: true,
    };
  }

  const check = readToken("unsubscribe", token);

  if (!check.valid) {
    return {
      heading: "that link did not work",
      message:
        check.reason === "expired"
          ? "This link has expired. Write to us and we will take you off the list straight away."
          : "This link is not one we recognise. Write to us and we will take you off the list straight away.",
      showContact: true,
    };
  }

  const result = await unsubscribeEmail(check.subject);

  if (result.status === "done") {
    return {
      heading: "done",
      message: `${check.subject} has been removed. You will not hear from fwd. again.`,
      showContact: false,
    };
  }

  console.error("[fwd.] Unsubscribe failed:", result);
  return {
    heading: "something went wrong",
    message:
      "We could not complete that just now, which is our fault rather than yours. Write to us and we will take you off the list by hand.",
    showContact: true,
  };
}
