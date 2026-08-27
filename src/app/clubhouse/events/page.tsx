import { requireMember } from "@/lib/auth/guard";
import { listEvents } from "@/lib/store/clubhouse";
import { EventCard } from "@/components/clubhouse/event-card";
import { NotConnected } from "@/components/clubhouse/not-connected";
import { EVENTS } from "@/content/clubhouse";

export default async function EventsPage() {
  await requireMember("/clubhouse/events");
  const events = await listEvents();

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl sm:text-5xl">{EVENTS.heading}</h1>

        {events === null ? (
          <NotConnected />
        ) : (
          <>
            <section className="mt-12">
              <h2 className="text-2xl">{EVENTS.upcoming}</h2>
              {events.upcoming.length === 0 ? (
                <p className="mt-5 font-body text-[15px] text-ink-muted">
                  {EVENTS.noUpcoming}
                </p>
              ) : (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {events.upcoming.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </section>

            <section className="mt-16">
              <h2 className="text-2xl">{EVENTS.past}</h2>
              {events.past.length === 0 ? (
                <p className="mt-5 font-body text-[15px] text-ink-muted">
                  {EVENTS.noPast}
                </p>
              ) : (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {events.past.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
