import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms" };

// Placeholder: replace with reviewed terms before launch.
export default function TermsPage() {
  return (
    <LegalPage path="// farman-labs / terms" title="Terms">
      <p>The site terms are being finalised. Engagement terms for each Blueprint, Build and Retainer are set out in writing before work starts.</p>
      <p>Questions: arham@farmanlabs.com.</p>
    </LegalPage>
  );
}
