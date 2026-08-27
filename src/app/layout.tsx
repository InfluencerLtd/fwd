import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { fontVariables, chosenPairing } from "@/lib/fonts";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

export const metadata: Metadata = {
  title: `${BRAND.markShort}`,
  description: `${BRAND.markLong}. A private members' club.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontVariables} h-full`}
      style={chosenPairing.style}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before the page is drawn so there is never a flash of the
            wrong colour mode. See src/lib/theme.ts. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        {children}
      </body>
    </html>
  );
}
