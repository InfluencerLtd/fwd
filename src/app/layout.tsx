import type { Metadata } from "next";
import "./globals.css";
import { CONTACT } from "@/lib/brand";
import { META } from "@/content/site";
import { fontVariables, chosenPairing } from "@/lib/fonts";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

export const metadata: Metadata = {
  // Needed so the link preview image gets a full web address rather than a
  // relative one. Set NEXT_PUBLIC_SITE_URL once the domain exists.
  metadataBase: new URL(CONTACT.siteUrl),
  title: META.title,
  description: META.description,
  openGraph: {
    title: META.title,
    description: META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
  },
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
