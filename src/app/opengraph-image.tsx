import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { BRAND } from "@/lib/brand";

/**
 * The picture that appears when the link is pasted into email, WhatsApp,
 * Slack or LinkedIn. This link will be shared constantly, so it is worth
 * getting right: it is the first impression for most people.
 *
 * It is generated from code rather than being a saved image file, so it always
 * matches the identity. The typeface is included in the project rather than
 * fetched from the internet, so building the site never depends on somebody
 * else's server being up.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${BRAND.markShort} ${BRAND.endorsement}`;

const FONT_DIR = path.join(process.cwd(), "src", "assets", "fonts");

export default async function OpengraphImage() {
  const [regular, italic] = await Promise.all([
    readFile(path.join(FONT_DIR, "InstrumentSerif-Regular.ttf")),
    readFile(path.join(FONT_DIR, "InstrumentSerif-Italic.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          // The hero ground, which stays dark in every context.
          backgroundColor: "#0b100c",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 220,
              lineHeight: 0.85,
              // The pale ice blue, on a dark ground where it belongs.
              color: "#b1e3fc",
            }}
          >
            {BRAND.markShort}
          </span>
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 34,
              color: "rgba(242, 240, 236, 0.7)",
              paddingBottom: 18,
            }}
          >
            {BRAND.endorsement}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: regular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
