import type { Metadata } from "next";
import { COOKIES } from "@/content/legal";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Cookies" };

export default function CookiesPage() {
  return <LegalPage heading={COOKIES.heading} body={COOKIES.holdingText} />;
}
