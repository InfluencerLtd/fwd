import type { Metadata } from "next";
import { PRIVACY } from "@/content/legal";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      heading={PRIVACY.heading}
      body={PRIVACY.body}
      link={PRIVACY.link}
      smallPrint={PRIVACY.controller}
    />
  );
}
