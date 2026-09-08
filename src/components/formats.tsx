import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { FormatTabs } from "@/components/format-tabs";
import { FORMATS } from "@/content/formats";

/**
 * The five kinds of room. This half runs on the server; the tabs do not.
 *
 * The only thing it does is render the five photographs and hand them to the
 * interactive part, and the reason is worth writing down because the build
 * fails outright without it. PhotoPlaceholder looks on disk to see whether a
 * photograph has arrived in public/photography yet, so it reaches for node:fs.
 * Imported from a file marked "use client" that pulls node:fs towards the
 * browser bundle, and Turbopack stops with "the chunking context does not
 * support external modules".
 *
 * A server component can hand already-rendered elements to a client one as a
 * prop. So the pictures are made here, where the filesystem is allowed, and the
 * tabs receive them as something to place rather than something to build.
 */
export function Formats() {
  const photos = FORMATS.map((format) => (
    <PhotoPlaceholder
      key={format.id}
      name={`format-${format.id}`}
      label={`${format.name}. Photograph to come`}
      ratio="landscape"
      sizes="(min-width: 768px) 42vw, 90vw"
      showLabel={false}
      scrim={false}
      className="rounded-2xl"
    />
  ));

  return <FormatTabs photos={photos} />;
}
