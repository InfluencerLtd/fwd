import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ButtonLink } from "@/components/button";
import { EVENTS } from "@/content/clubhouse";
import type { PublicEventView } from "@/lib/invitations";

const FORMAT_LABEL: Record<string, string> = {
  dinner: "Dinner",
  drinks: "Drinks",
  roundtable: "Roundtable",
  webinar: "Webinar",
  conference: "Conference",
};

export function formatDate(iso: string, end?: string | null): string {
  const start = new Date(iso);
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };
  const startText = start.toLocaleDateString("en-US", opts);
  if (!end) return startText;

  const finish = new Date(end);
  // A single day reads as one date, not as a range with the same day twice.
  if (startText === finish.toLocaleDateString("en-US", opts)) return startText;

  return `${start.toLocaleDateString("en-US", { day: "numeric", month: "long", timeZone: "UTC" })} to ${finish.toLocaleDateString("en-US", opts)}`;
}

export function EventFacts({ event }: { event: PublicEventView }) {
  return (
    <dl className="mt-8 grid gap-5 font-body text-[15px] sm:grid-cols-3">
      <div>
        <dt className="text-ink-muted">Date</dt>
        <dd className="mt-1 text-ink">{formatDate(event.starts_at, event.ends_at)}</dd>
      </div>
      <div>
        <dt className="text-ink-muted">City</dt>
        <dd className="mt-1 text-ink">{event.city}</dd>
      </div>
      <div>
        <dt className="text-ink-muted">Format</dt>
        <dd className="mt-1 text-ink">
          {FORMAT_LABEL[event.format] ?? event.format}
        </dd>
      </div>
    </dl>
  );
}

/**
 * The shared body of an event page: the picture, the name, the facts and the
 * description.
 *
 * This takes a `PublicEventView`, the narrow shape an invited person is allowed
 * to see. Anything that must NOT reach somebody who is not signed in, such as
 * who else is coming, is passed in as `children` by the signed-in page and is
 * simply absent on the invitation view.
 */
export function EventBody({
  event,
  /**
   * Off for the invitation view. Somebody who is not signed in gets this one
   * event and no route onward into the club, not even a link that would bounce
   * them to a sign-in screen.
   */
  showBackLink = true,
  children,
}: {
  event: PublicEventView;
  showBackLink?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {showBackLink ? (
        <Link
          href="/clubhouse/events"
          className="fwd-underline font-body text-sm text-accent"
        >
          {EVENTS.backToEvents}
        </Link>
      ) : null}

      <div className="fwd-zoom mt-8 overflow-hidden rounded-2xl">
        <PhotoPlaceholder
          label={`Photograph for ${event.title}`}
          ratio="wide"
          className="fwd-zoom-inner"
        />
      </div>

      {event.is_confirmed ? null : (
        <p className="mt-8 inline-block rounded-full border border-ember/40 px-4 py-1 font-body text-xs tracking-[0.16em] text-ember">
          {EVENTS.provisional}
        </p>
      )}

      <h1 className="mt-6 text-4xl sm:text-5xl">{event.title}</h1>

      <EventFacts event={event} />

      {event.description ? (
        <p className="mt-9 font-body text-[17px] leading-relaxed text-ink-muted">
          {event.description}
        </p>
      ) : null}

      {event.detail ? (
        <p className="mt-5 whitespace-pre-line font-body text-[17px] leading-relaxed text-ink-muted">
          {event.detail}
        </p>
      ) : null}

      {children}
    </article>
  );
}

/**
 * What somebody sees when they open an invitation without being signed in.
 *
 * They can read the whole invitation. There is no RSVP here, no navigation into
 * the rest of the club, and nothing at all about any other member. The only way
 * onward is to sign in, and doing that brings them straight back to this page.
 */
export function InvitationView({
  event,
  signInHref,
}: {
  event: PublicEventView;
  signInHref: string;
}) {
  return (
    <main className="flex-1">
      <EventBody event={event} showBackLink={false}>
        <div className="mt-12 rounded-2xl border border-border bg-surface-raised p-7">
          <p className="font-body text-[15px] leading-relaxed text-ink">
            {EVENTS.invitationNote}
          </p>
          <ButtonLink href={signInHref} size="lg" className="mt-6">
            {EVENTS.signInToRsvp}
          </ButtonLink>
        </div>
      </EventBody>
    </main>
  );
}
