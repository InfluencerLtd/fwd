import Link from "next/link";
import { requireMember } from "@/lib/auth/guard";
import { listEvents } from "@/lib/store/clubhouse";
import { EventCard } from "@/components/clubhouse/event-card";
import { NotConnected } from "@/components/clubhouse/not-connected";
import { HOME } from "@/content/clubhouse";
import { BRAND } from "@/lib/brand";

export default async function ClubhouseHome() {
  const member = await requireMember("/clubhouse");
  const events = await listEvents();
  const next = events?.upcoming.slice(0, 2) ?? [];

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="font-body text-xs tracking-[0.2em] text-ember">
          {BRAND.memberArea}
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl">
          {HOME.greeting.replace("{name}", member.name.split(" ")[0])}
        </h1>
        <p className="mt-5 font-body text-[17px] text-ink-muted">{HOME.intro}</p>

        {events === null ? (
          <NotConnected />
        ) : (
          <section className="mt-14">
            <h2 className="text-2xl">{HOME.upcomingHeading}</h2>
            {next.length === 0 ? (
              <p className="mt-5 font-body text-[15px] text-ink-muted">
                {HOME.noEvents}
              </p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {next.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>
        )}

        <section className="mt-16 rounded-2xl border border-border bg-surface-warm p-8">
          <h2 className="text-2xl">{HOME.directoryTeaser}</h2>
          <p className="mt-3 font-body text-[15px] text-ink-muted">
            {HOME.directoryLine}
          </p>
          <Link
            href="/clubhouse/directory"
            className="fwd-underline mt-5 inline-block font-body text-[15px] text-accent"
          >
            {HOME.directoryTeaser}
          </Link>
        </section>
      </div>
    </main>
  );
}
