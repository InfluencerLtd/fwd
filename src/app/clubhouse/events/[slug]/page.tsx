import { notFound, redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/auth/session";
import {
  readInvitationToken,
  publicEventView,
  type PublicEventView,
} from "@/lib/invitations";
import {
  getEventBySlug,
  getEventForInvitation,
  getRsvp,
  listAttendees,
} from "@/lib/store/clubhouse";
import { EventBody, InvitationView } from "@/components/clubhouse/event-detail";
import { RsvpControls } from "@/components/clubhouse/rsvp-controls";
import { MemberCard } from "@/components/clubhouse/member-card";
import { EVENTS } from "@/content/clubhouse";

/**
 * One event.
 *
 * This is the only page in The House that can be seen without signing in,
 * and the rules are worth stating in full because they are easy to get wrong:
 *
 *   1. A SIGNED IN MEMBER sees everything: the event, whether they are coming,
 *      the buttons to say so or change their mind, and who else is going.
 *
 *   2. SOMEBODY WITH AN INVITATION LINK, not signed in, sees the invitation and
 *      only the invitation. Name, date, city, format, description, imagery.
 *      They do not see who else is coming, they do not see the directory, and
 *      there is no route from here into the rest of the club. The one thing
 *      they can do is sign in, and that brings them straight back here.
 *
 *   3. ANYBODY ELSE is sent to sign in.
 *
 * The token names the event, and it is the token's event id that is checked
 * against the address, so a link to one event cannot open another.
 */
export default async function EventPage({
  params,
  searchParams,
}: PageProps<"/clubhouse/events/[slug]">) {
  const { slug } = await params;
  const query = await searchParams;
  const invite = typeof query.invite === "string" ? query.invite : undefined;

  const member = await getCurrentMember();

  /* ---- 1. Signed in ---------------------------------------------------- */
  if (member) {
    const event = await getEventBySlug(slug);
    if (!event) notFound();

    const [rsvp, attendees] = await Promise.all([
      getRsvp(event.id, member.id),
      listAttendees(event.id),
    ]);

    const others = attendees.filter((a) => a.id !== member.id);

    return (
      <main className="flex-1">
        <EventBody event={publicEventView(event) as PublicEventView}>
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
                {others.map((attendee) => (
                  <MemberCard key={attendee.id} member={attendee} compact />
                ))}
              </div>
            </section>
          ) : null}
        </EventBody>
      </main>
    );
  }

  /* ---- 2. Not signed in, but holding a genuine invitation -------------- */
  if (invite) {
    const parsed = readInvitationToken(invite);
    if (parsed) {
      const event = await getEventForInvitation(parsed.eventId, slug);
      if (event) {
        // Coming back to exactly this address, token and all, is what makes
        // signing in return them to the event they clicked.
        const here = `/clubhouse/events/${slug}?invite=${encodeURIComponent(invite)}`;
        return (
          <InvitationView
            event={publicEventView(event)}
            signInHref={`/clubhouse/sign-in?next=${encodeURIComponent(here)}`}
          />
        );
      }
    }
  }

  /* ---- 3. Everybody else ----------------------------------------------- */
  redirect(
    `/clubhouse/sign-in?next=${encodeURIComponent(`/clubhouse/events/${slug}`)}`,
  );
}
