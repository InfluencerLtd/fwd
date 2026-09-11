import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { BRAND } from "@/lib/brand";

/**
 * The picture a link to the site unfurls with, on LinkedIn, iMessage and the
 * rest.
 *
 * THE DELIVERED LOCKUP, NOT A TYPESET STAND-IN. This used to set "fwd." and
 * "by influencer" in the serif, from before the artwork arrived. It now draws
 * public/brand/fwd-lockup.svg itself, in the wordmark blue on the site's warm
 * near-black, so a shared link shows exactly the mark the site does.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${BRAND.markShort} ${BRAND.endorsement}`;

export default async function OpengraphImage() {
  const svg = (
    await readFile(path.join(process.cwd(), "public", "brand", "fwd-lockup.svg"), "utf8")
  ).replaceAll("currentColor", "#b1e3fc");
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  // The lockup's own proportions, from its viewBox.
  const width = 560;
  const height = Math.round((width * 214.87) / 355.96);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171310",
        }}
      >
        {/* The image's alt text is `alt` above; this inner img is decorative. */}
        <img src={src} width={width} height={height} alt="" />
      </div>
    ),
    { ...size },
  );
}
