import { requireAdmin } from "@/lib/auth/admin-guard";
import type { Metadata } from "next";
import { listIntroRequests } from "@/lib/store/admin";
import { handleIntroRequest } from "@/app/admin/actions";
import { BENEFITS } from "@/lib/brand";

export const metadata: Metadata = { title: "Introductions" };

/**
 * Meeting of Minds requests waiting on the club team.
 *
 * These never reach the other member on their own. A person reads the reason,
 * decides whether the introduction is a good one, and makes it properly. That
 * is the entire point of the benefit.
 */
export default async function AdminIntroductionsPage() {
  await requireAdmin();

  const requests = await listIntroRequests();

  return (
    <main className="flex-1 px-6 py-12 font-body">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl">{BENEFITS.signature.toLowerCase()}</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          Members asking to be introduced to each other. Nothing has been sent to
          anyone. Read the reason, decide whether it is a good introduction, and
          make it yourself.
        </p>

        {requests === null ? (
          <p className="mt-10 rounded-2xl border border-border bg-surface-raised p-6 text-[15px] text-ink">
            The database is not connected, so there is nothing to show.
          </p>
        ) : requests.length === 0 ? (
          <p className="mt-10 text-[15px] text-ink-muted">
            Nothing waiting.
          </p>
        ) : (
          <ul className="mt-10 space-y-4">
            {requests.map((request) => (
              <li
                key={request.id}
                className="rounded-2xl border border-border bg-surface-raised p-6"
              >
                <p className="text-[15px] text-ink">
                  {request.requester?.name ?? "Someone"}
                  <span className="text-ink-muted"> would like to meet </span>
                  {request.target?.name ?? "someone"}
                </p>
                <p className="mt-1 text-[13px] text-ink-muted">
                  {request.requester?.email}
                  {request.target?.email ? ` → ${request.target.email}` : ""}
                </p>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-ink">
                  {request.reason}
                </p>
                <form action={handleIntroRequest} className="mt-5">
                  <input type="hidden" name="id" value={request.id} />
                  <button
                    type="submit"
                    className="fwd-btn border border-border px-5 py-2 text-[13px] text-ink hover:border-ink"
                  >
                    Mark as done
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
