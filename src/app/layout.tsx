import type { Metadata } from "next";
import "./globals.css";
import { CONTACT } from "@/lib/brand";
import { META } from "@/content/site";
import { fontVariables, rootFontStyle } from "@/lib/fonts";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { InlineScript } from "@/components/inline-script";
import { Analytics } from "@vercel/analytics/next";

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
      style={rootFontStyle}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before the page is drawn so there is never a flash of the
            wrong colour mode. See src/lib/theme.ts for what it does, and
            src/components/inline-script.tsx for why it is not written as a
            plain <script> tag here. */}
        <InlineScript html={THEME_INIT_SCRIPT} />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        {/* The three line menu is NOT here.
            It used to be, which put it on all twenty-nine routes including the
            holding page, where it offered a way around a site that is not open
            yet. It belongs to the pages that are navigable, so each of those
            renders it. See src/components/site-menu.tsx. */}
        {children}

        {/*
          How many people arrive, and what they look at.
          ----------------------------------------------------------------
          IT SETS NO COOKIE AND FOLLOWS NOBODY BETWEEN SITES. That is why it
          is this one and not Google Analytics: no cookie means no consent
          banner, and the cookie notice can keep saying the site sets one
          cookie of its own, which stays true. Visitors are counted by a hash
          that is thrown away daily, so there is no profile of a person to
          hold and nothing to hand over if somebody asks what we have on them.

          It only reports from the deployed site. On your own machine it does
          nothing, so `npm run dev` is never counted.

          It has to be switched on once in the Vercel dashboard as well:
          the project, then Analytics, then enable. Until that is done this
          component is inert rather than broken.
        */}
        <Analytics />
      </body>
    </html>
  );
}
