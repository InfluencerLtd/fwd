"use client";

import { useActionState } from "react";
import { saveRsvp } from "@/app/clubhouse/events/actions";
import { EVENTS } from "@/content/clubhouse";
import { Button } from "@/components/button";

/**
 * Saying whether you are coming, and changing your mind later.
 *
 * The event is identified by a hidden field, but the MEMBER is not: the server
 * takes that from the session. Nobody can RSVP on somebody else's behalf by
 * editing this form.
 */
export function RsvpControls({
  eventId,
  slug,
  current,
}: {
  eventId: string;
  slug: string;
  current: "going" | "not_going" | null;
}) {
  const [state, action, pending] = useActionState(saveRsvp, {
    response: current,
    error: null,
  });

  const response = state.response;

  return (
    <form action={action} className="font-body">
      <input type="hidden" name="eventId" value={eventId} />
      <input type="hidden" name="slug" value={slug} />

      {response ? (
        <p className="text-[17px] text-ink">
          {response === "going" ? EVENTS.youAreGoing : EVENTS.youAreNotGoing}
        </p>
      ) : null}

      {/* Both pale blue. The one already chosen is the same button inverted,
          near-black fill with a pale blue label, because two identical buttons
          cannot say which answer you gave. The line above says it in words as
          well, but the colour is what carries it at a glance. */}
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          type="submit"
          name="response"
          value="going"
          size="lg"
          variant={response === "going" ? "chosen" : "primary"}
          disabled={pending}
        >
          {pending ? EVENTS.rsvpSaving : EVENTS.rsvpGoing}
        </Button>
        <Button
          type="submit"
          name="response"
          value="not_going"
          size="lg"
          variant={response === "not_going" ? "chosen" : "primary"}
          disabled={pending}
        >
          {EVENTS.rsvpNotGoing}
        </Button>
      </div>

      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-ink">
        {state.error ?? ""}
      </p>
    </form>
  );
}
