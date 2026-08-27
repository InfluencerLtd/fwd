import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { formatDate } from "@/components/clubhouse/event-detail";
import { EVENTS } from "@/content/clubhouse";
import type { FwdEvent } from "@/lib/store/clubhouse";

export function EventCard({ event }: { event: FwdEvent }) {
  return (
    <Link
      href={`/clubhouse/events/${event.slug}`}
      className="fwd-zoom group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised transition-colors duration-500 hover:border-ink/25"
    >
      <PhotoPlaceholder
        label={`Photograph for ${event.title}`}
        ratio="wide"
        showLabel={false}
        className="fwd-zoom-inner"
      />

      <span className="flex flex-1 flex-col p-6 font-body">
        <span className="flex flex-wrap items-center gap-3">
          <span className="text-[13px] text-ink-muted">
            {formatDate(event.starts_at, event.ends_at)}
          </span>
          {event.is_confirmed ? null : (
            <span className="rounded-full border border-ember/40 px-3 py-0.5 text-[10px] tracking-[0.14em] text-ember">
              {EVENTS.provisional}
            </span>
          )}
          {event.is_dummy ? (
            <span className="rounded-full border border-ember/40 px-3 py-0.5 text-[10px] tracking-[0.14em] text-ember">
              EXAMPLE
            </span>
          ) : null}
        </span>

        <span className="mt-3 block font-display text-2xl text-ink">
          {event.title}
        </span>
        <span className="mt-1 block text-[14px] text-ink-muted">{event.city}</span>

        {event.description ? (
          <span className="mt-3 block text-[14px] leading-relaxed text-ink-muted">
            {event.description}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
