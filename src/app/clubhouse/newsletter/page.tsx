import { requireMember } from "@/lib/auth/guard";
import { listNewsletterIssues } from "@/lib/store/clubhouse";
import { NotConnected } from "@/components/clubhouse/not-connected";
import { NEWSLETTER } from "@/content/clubhouse";

export default async function NewsletterPage() {
  await requireMember("/clubhouse/newsletter");
  const issues = await listNewsletterIssues();

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">{NEWSLETTER.heading}</h1>
        <p className="mt-5 font-body text-[17px] leading-relaxed text-ink-muted">
          {NEWSLETTER.intro}
        </p>

        {issues === null ? (
          <NotConnected />
        ) : issues.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-border bg-surface-raised p-6 font-body text-[15px] leading-relaxed text-ink-muted">
            {NEWSLETTER.empty}
          </p>
        ) : (
          <ol className="mt-12 space-y-5">
            {issues.map((issue) => (
              <li
                key={issue.id}
                className="rounded-2xl border border-border bg-surface-raised p-6"
              >
                <p className="font-body text-[13px] text-ink-muted">
                  {new Date(issue.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </p>
                <h2 className="mt-2 text-2xl">{issue.title}</h2>
                <p className="mt-3 whitespace-pre-line font-body text-[15px] leading-relaxed text-ink">
                  {issue.body}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
