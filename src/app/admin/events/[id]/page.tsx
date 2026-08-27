import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listAllEvents, getEventAttendance } from "@/lib/store/admin";
import { sendInvitation } from "@/app/admin/actions";
import { formatDate } from "@/components/clubhouse/event-detail";
import { isEmailConfigured } from "@/lib/email";

export const metadata: Metadata = { title: "Invitations" };

export default async function AdminEventPage({
  params,
}: PageProps<"/admin/events/[id]">) {
  const { id } = await params;

  const events = await listAllEvents();
  if (events === null) {
    return (
      <main className="flex-1 px-6 py-12 font-body">
        <p className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface-raised p-6 text-[15px] text-ink">
          The database is not connected, so there is nothing to show.
        </p>
      </main>
    );
  }

  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  const attendance = (await getEventAttendance(id)) ?? [];
  const going = attendance.filter((a) => a.response === "going").length;
  const notGoing = attendance.filter((a) => a.response === "not_going").length;
  const invitedNoAnswer = attendance.filter(
    (a) => a.invited && a.response === null,
  ).length;

  return (
    <main className="flex-1 px-6 py-12 font-body">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin/events" className="fwd-underline text-sm text-accent">
          All events
        </Link>

        <h1 className="mt-6 text-4xl">{event.title}</h1>
        <p className="mt-2 text-[15px] text-ink-muted">
          {formatDate(event.starts_at, event.ends_at)} · {event.city}
        </p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-[15px]">
          <div><dt className="text-ink-muted">Coming</dt><dd className="text-ink">{going}</dd></div>
          <div><dt className="text-ink-muted">Cannot make it</dt><dd className="text-ink">{notGoing}</dd></div>
          <div><dt className="text-ink-muted">Invited, no answer</dt><dd className="text-ink">{invitedNoAnswer}</dd></div>
        </dl>

        {isEmailConfigured() ? null : (
          <p className="mt-8 rounded-2xl border border-border bg-surface-raised p-5 text-[14px] leading-relaxed text-ink">
            The email service is not connected, so invitations cannot be sent
            yet. Everything else on this page works.
          </p>
        )}

        <ul className="mt-10 space-y-3">
          {attendance.map((person) => (
            <li
              key={person.member_id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface-raised px-6 py-4"
            >
              <div>
                <p className="text-[15px] text-ink">{person.name}</p>
                <p className="text-[13px] text-ink-muted">
                  {person.email}
                  {person.invited ? " · invited" : " · not invited"}
                  {person.response === "going" ? " · coming" : ""}
                  {person.response === "not_going" ? " · cannot make it" : ""}
                </p>
              </div>

              <form action={sendInvitation}>
                <input type="hidden" name="eventId" value={event.id} />
                <input type="hidden" name="memberId" value={person.member_id} />
                <input type="hidden" name="slug" value={event.slug} />
                <input type="hidden" name="title" value={event.title} />
                <input type="hidden" name="name" value={person.name} />
                <input type="hidden" name="email" value={person.email} />
                <button
                  type="submit"
                  className="fwd-btn border border-border px-5 py-2 text-[13px] text-ink hover:border-ink"
                >
                  {person.invited ? "Send again" : "Send invitation"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
