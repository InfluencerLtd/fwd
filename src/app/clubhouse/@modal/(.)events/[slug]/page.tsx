import { notFound } from "next/navigation";
import { getCurrentMember } from "@/lib/auth/session";
import { publicEventView, type PublicEventView } from "@/lib/invitations";
import { getEventBySlug, getRsvp, listAttendees } from "@/lib/store/clubhouse";
import { EventBody } from "@/components/clubhouse/event-detail";
import { RsvpControls } from "@/components/clubhouse/rsvp-controls";
import { MemberCard } from "@/components/clubhouse/member-card";
import { RouteModal } from "@/components/clubhouse/route-modal";
import { EVENTS } from "@/content/clubhouse";

/**
 * One event, opened over the list a member was looking at.
 *
 * This intercepts a click on /clubhouse/events/[slug] from inside the member
 * area. The real page at that address is untouched and is still what a refresh,
 * a bookmark or an invitation link gets. See src/components/clubhouse/route-modal.
 *
 * ONLY THE SIGNED IN CASE IS HERE. The page handles three: a member, somebody
 * holding an invitation who is not signed in, and everybody else. The other two
 * arrive by opening the address directly, which is a hard navigation and is
 * never intercepted, so they always reach the real page. Falling through to
 * notFound here would be wrong for them and cannot happen.
 */
export default async function EventModal({
  params,
}: PageProps<"/clubhouse/events/[slug]">) {
  const { slug } = await params;
  const member = await getCurrentMember();
  if (!member) notFound();

  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const [rsvp, attendees] = await Promise.all([
    getRsvp(event.id, member.id),
    listAttendees(event.id),
  ]);
  const others = attendees.filter((a) => a.id !== member.id);

  return (
    <RouteModal label={event.title}>
      {/* No back link in here. The way out of a modal is the close button and
          the Escape key; a link that navigates would leave the member somewhere
          different from where they opened it. */}
      <EventBody
        event={publicEventView(event) as PublicEventView}
        showBackLink={false}
      >
        <div className="mt-12">
          <RsvpControls
            eventId={event.id}
            slug={event.slug}
            current={rsvp?.response ?? null}
          />
        </div>

        {others.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl">{EVENTS.attendingHeading}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </section>
        ) : null}
      </EventBody>
    </RouteModal>
  );
}
