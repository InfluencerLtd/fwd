import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { Formats } from "@/components/formats";
import { ROOMS } from "@/content/pages";

export const metadata: Metadata = {
  title: ROOMS.title,
  description: ROOMS.lead[0],
};

/**
 * The five kinds of room get a page of their own rather than a section part
 * way down the membership page. "rooms" in the header pointed at an anchor
 * because there was nowhere else for it to go; this is where it belongs.
 */
export default function RoomsPage() {
  return (
    <SimplePage
      photo="rooms"
      heading={ROOMS.heading}
      lead={ROOMS.lead}
      closingHeading={ROOMS.closing.heading}
      closingNote={ROOMS.closing.note}
    >
      <Formats />
    </SimplePage>
  );
}
