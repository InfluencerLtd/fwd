import { requireMember } from "@/lib/auth/guard";
import { listEvents } from "@/lib/store/clubhouse";
import { EventCard } from "@/components/clubhouse/event-card";
import { NotConnected } from "@/components/clubhouse/not-connected";
import { HOME, NAV } from "@/content/clubhouse";
import { BRAND } from "@/lib/brand";
import { ButtonLink } from "@/components/button";

export default async function ClubhouseHome() {
  const member = await requireMember("/clubhouse");
  const events = await listEvents();
  const next = events?.upcoming.slice(0, 2) ?? [];

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        {/* The greeting on the left, the way back out on the right, level with
            it. It used to sit at the very bottom of the page, which is a long
            way to scroll to leave a room. */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {/* The brand blue, not the ember. The member area had no blue in it
                at all, and this is the one line on the page whose whole job is
                to say which room you are in. `accent` is the blue for light
                grounds; the pale one is for dark grounds only. */}
            <p className="font-body text-xs tracking-[0.2em] text-accent">
              {BRAND.memberArea}
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl">
              {HOME.greeting.replace("{name}", member.name.split(" ")[0])}
            </h1>
            <p className="mt-5 font-body text-[17px] text-ink-muted">
              {HOME.intro}
            </p>
          </div>

          {/* Pale blue as a FILL under a near-black label, which is the one way
              that colour is allowed on a light page: as text it would be
              1.27:1, as a fill under this label it is 13.42:1. */}
          <div className="shrink-0 sm:mt-2">
            <ButtonLink href="/" variant="primary" size="md">
              {NAV.publicSite}
            </ButtonLink>
          </div>
        </div>

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

      </div>
    </main>
  );
}
