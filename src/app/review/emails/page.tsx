import type { Metadata } from "next";
import Link from "next/link";
import { EMAILS } from "@/content/emails";
import { renderEmail } from "@/lib/email";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${BRAND.markShort} email review`,
  robots: { index: false, follow: false },
};

/**
 * Shows the three emails exactly as they will arrive, so they can be read and
 * approved before anything is sent to a real person. Nothing here sends
 * anything, and the email service does not need to be connected to see them.
 */

// An obvious dummy. Deliberately not a real name or a client company.
const SAMPLE = { name: "Sample Applicant", email: "sample.applicant@example.com" };

const PREVIEWS = [
  {
    id: "received",
    title: "Sent as soon as an application arrives",
    template: EMAILS.received,
  },
  {
    id: "accepted",
    title: "Sent when an application is accepted",
    template: EMAILS.accepted,
  },
  {
    id: "declined",
    title: "Sent when an application is declined",
    template: EMAILS.declined,
  },
] as const;

export default function EmailReviewPage() {
  return (
    <main className="px-6 py-16 font-body">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/review"
          className="text-sm text-accent underline underline-offset-4"
        >
          Back to the design review
        </Link>

        <h1 className="mt-8 text-4xl sm:text-5xl">the emails</h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          The three emails the site sends, shown exactly as they will arrive.
          Nothing on this page sends anything. The wording is a draft and needs
          approving before a single one goes out, and the decline in particular
          is worth reading twice, because it goes to senior people at companies
          we work with.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          To change any of the wording, edit{" "}
          <code className="font-mono text-[13px] text-ink">
            src/content/emails.ts
          </code>
          . Nothing else needs touching.
        </p>

        <div className="mt-14 space-y-16">
          {PREVIEWS.map(({ id, title, template }) => {
            const { subject, html } = renderEmail(template, SAMPLE);
            return (
              <section key={id}>
                <h2 className="text-2xl">{title}</h2>
                <p className="mt-3 text-sm text-ink-muted">
                  Subject line:{" "}
                  <span className="text-ink">{subject}</span>
                </p>
                <div className="mt-5 overflow-hidden rounded-sm border border-border">
                  <iframe
                    title={`${title} preview`}
                    srcDoc={html}
                    className="h-[620px] w-full bg-white"
                  />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
