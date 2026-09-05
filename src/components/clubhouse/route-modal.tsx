"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { NAV } from "@/content/site";

/**
 * The shell that turns an intercepted route into a modal.
 *
 * HOW THIS WORKS, because it is not obvious from the file names. An event and a
 * merch item each have a real page of their own, at a real address. Those pages
 * have not gone anywhere and are still what somebody gets if they open the
 * address directly: a refresh, a bookmark, or the link inside an invitation
 * email. That last one matters, because an invitation is the only thing in The
 * House that can be opened without signing in, and it has to keep working.
 *
 * What changes is the click. Next intercepts a link followed from inside the
 * member area and renders the same page into a slot beside the list instead of
 * replacing it, so the list stays where it was and the detail opens over it.
 * See src/app/clubhouse/@modal.
 *
 * Closing means going back, because the address really did change. That is what
 * makes the browser's own back button close the modal rather than leaving the
 * member somewhere they did not ask to be.
 */
export function RouteModal({
  label,
  children,
}: {
  /** Announced when the dialog opens. */
  label: string;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    // showModal, not the open attribute: it is what gives the focus trap,
    // Escape, and an inert page behind. None of that is hand-rolled.
    if (!el.open) el.showModal();
    const onClose = () => router.back();
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, [router]);

  return (
    <dialog
      ref={dialog}
      className="fwd-dialog fwd-dialog-wide"
      aria-label={label}
      onClick={(event) => {
        // Only the backdrop. A click that began inside the panel is not a
        // request to close it.
        if (event.target === dialog.current) dialog.current?.close();
      }}
    >
      <div className="flex max-h-[inherit] flex-col">
        {/* The way out stays on screen however long the detail is. */}
        <div className="flex items-center justify-end border-b border-border px-6 py-4">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label={NAV.menuClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border font-body text-base leading-none text-ink-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="overflow-y-auto">{children}</div>
      </div>
    </dialog>
  );
}
