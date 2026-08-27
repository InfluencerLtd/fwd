import { requireAdmin } from "@/lib/auth/admin-guard";
import type { Metadata } from "next";
import Link from "next/link";
import { listAllEvents } from "@/lib/store/admin";
import { createOrUpdateEvent } from "@/app/admin/actions";
import { formatDate } from "@/components/clubhouse/event-detail";

export const metadata: Metadata = { title: "Events" };

const field =
  "fwd-field w-full border border-border bg-surface-raised px-4 py-2.5 font-body text-[15px] text-ink";

export default async function AdminEventsPage() {
  await requireAdmin();

  const events = await listAllEvents();

  return (
    <main className="flex-1 px-6 py-12 font-body">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl">events</h1>

        <section className="mt-10 rounded-2xl border border-border bg-surface-raised p-6">
          <h2 className="text-2xl">Add an event</h2>
          <p className="mt-2 text-[13px] text-ink-muted">
            The web address is built from the short name, so keep it lowercase
            with dashes, like <code className="font-mono">december-drinks</code>.
            Unpublished events are not shown to members at all. Unconfirmed ones
            are shown, marked as provisional.
          </p>
          <form action={createOrUpdateEvent} className="mt-6 grid gap-4 sm:grid-cols-2">
            <input name="title" placeholder="Name" required className={field} />
            <input name="slug" placeholder="Short name for the address" required className={field} />
            <input name="city" placeholder="City" className={field} />
            <select name="format" defaultValue="dinner" className={field}>
              <option value="dinner">Dinner</option>
              <option value="drinks">Drinks</option>
              <option value="roundtable">Roundtable</option>
              <option value="webinar">Webinar</option>
              <option value="conference">Conference</option>
            </select>
            <label className="text-[13px] text-ink-muted">
              Starts
              <input name="starts_at" type="datetime-local" required className={`${field} mt-1`} />
            </label>
            <label className="text-[13px] text-ink-muted">
              Ends (optional)
              <input name="ends_at" type="datetime-local" className={`${field} mt-1`} />
            </label>
            <textarea name="description" rows={3} placeholder="Description" className={`${field} sm:col-span-2`} />
            <label className="flex items-center gap-3 text-[15px] text-ink">
              <input type="checkbox" name="is_confirmed" defaultChecked className="h-5 w-5 accent-[var(--fwd-accent)]" />
              Confirmed
            </label>
            <label className="flex items-center gap-3 text-[15px] text-ink">
              <input type="checkbox" name="is_published" className="h-5 w-5 accent-[var(--fwd-accent)]" />
              Show to members
            </label>
            <button type="submit" className="fwd-btn bg-accent px-6 py-2.5 text-[15px] text-white hover:bg-ink sm:col-span-2 sm:justify-self-start">
              Add event
            </button>
          </form>
        </section>

        {events === null ? (
          <p className="mt-10 rounded-2xl border border-border bg-surface-raised p-6 text-[15px] text-ink">
            The database is not connected, so there is nothing to show.
          </p>
        ) : events.length === 0 ? (
          <p className="mt-10 text-[15px] text-ink-muted">No events yet.</p>
        ) : (
          <ul className="mt-10 space-y-3">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface-raised px-6 py-4"
              >
                <div>
                  <p className="text-[15px] text-ink">{event.title}</p>
                  <p className="text-[13px] text-ink-muted">
                    {formatDate(event.starts_at, event.ends_at)} · {event.city}
                    {event.is_confirmed ? "" : " · provisional"}
                  </p>
                </div>
                <Link
                  href={`/admin/events/${event.id}`}
                  className="fwd-btn border border-border px-5 py-2 text-[13px] text-ink hover:border-ink"
                >
                  Invitations and RSVPs
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
