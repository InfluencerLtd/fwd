import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ADMIN_ENABLED, ADMIN_COOKIE } from "@/lib/site-config";
import { findPendingApplications } from "@/lib/store/decisions";
import { isHubspotConfigured } from "@/lib/hubspot";
import { isEmailConfigured } from "@/lib/email";
import { AdminSignInForm } from "./sign-in-form";
import { decide } from "./actions";
import { MEMBER_GROUPS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * The club team's view of applications waiting on a decision.
 *
 * Functional rather than beautiful, on purpose. Accepting sends the welcome
 * email with the sign-in link. Declining sends the polite one. Both emails can
 * be read in advance at /review/emails.
 */
export default async function AdminPage() {
  if (!ADMIN_ENABLED) notFound();

  const jar = await cookies();
  if (jar.get(ADMIN_COOKIE)?.value !== "granted") {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl">admin</h1>
          <p className="mt-3 font-body text-sm text-ink-muted">
            For the club team.
          </p>
          <AdminSignInForm />
        </div>
      </main>
    );
  }

  const pending = await findPendingApplications();

  return (
    <main className="px-6 py-16 font-body">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl">applications</h1>

        <Warnings
          databaseMissing={pending === null}
          hubspot={isHubspotConfigured()}
          email={isEmailConfigured()}
        />

        {pending === null ? null : pending.length === 0 ? (
          <p className="mt-10 text-[15px] text-ink-muted">
            Nothing waiting on a decision.
          </p>
        ) : (
          <ul className="mt-10 space-y-5">
            {pending.map((application) => (
              <li
                key={application.id}
                className="rounded-sm border border-border bg-surface-raised p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="text-lg text-ink">
                    {application.name}
                    <span className="text-ink-muted">
                      {" "}
                      · {application.role}, {application.company}
                    </span>
                  </p>
                  <p className="text-[13px] text-ink-muted">
                    {groupLabel(application.group_type)} · {application.market}
                  </p>
                </div>

                <p className="mt-1 text-[13px] text-ink-muted">
                  {application.email}
                  {application.link ? (
                    <>
                      {" · "}
                      <a
                        href={application.link}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                        className="text-accent underline underline-offset-4"
                      >
                        profile
                      </a>
                    </>
                  ) : null}
                  {application.hubspot_synced_at ? null : (
                    <span className="text-ink"> · not yet in HubSpot</span>
                  )}
                </p>

                <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-ink">
                  {application.reason}
                </p>

                <div className="mt-6 flex gap-3">
                  <form action={decide}>
                    <input type="hidden" name="id" value={application.id} />
                    <input type="hidden" name="decision" value="accepted" />
                    <button
                      type="submit"
                      className="rounded-sm bg-accent px-5 py-2.5 text-sm text-surface-raised"
                    >
                      Accept and send welcome
                    </button>
                  </form>
                  <form action={decide}>
                    <input type="hidden" name="id" value={application.id} />
                    <input type="hidden" name="decision" value="declined" />
                    <button
                      type="submit"
                      className="rounded-sm border border-border px-5 py-2.5 text-sm text-ink"
                    >
                      Decline
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function groupLabel(id: string) {
  return MEMBER_GROUPS.find((g) => g.id === id)?.label ?? id;
}

/** Says plainly what is not connected yet, rather than failing quietly. */
function Warnings({
  databaseMissing,
  hubspot,
  email,
}: {
  databaseMissing: boolean;
  hubspot: boolean;
  email: boolean;
}) {
  const problems: string[] = [];
  if (databaseMissing)
    problems.push(
      "The database is not connected, so there is nothing to show and no application can be saved.",
    );
  if (!hubspot)
    problems.push(
      "HubSpot is not connected. Applications are still saved here and will be pushed once a token is set.",
    );
  if (!email)
    problems.push(
      "The email service is not connected. Accepting or declining will record the decision but will not send anything.",
    );

  if (problems.length === 0) return null;

  return (
    <ul className="mt-8 space-y-2 rounded-sm border border-border bg-surface-raised p-5">
      {problems.map((problem) => (
        <li key={problem} className="text-[14px] leading-relaxed text-ink">
          {problem}
        </li>
      ))}
    </ul>
  );
}
