import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy" };

// Placeholder: replace with the reviewed privacy policy before launch.
export default function PrivacyPage() {
  return (
    <LegalPage path="// farman-labs / privacy" title="Privacy">
      <p>
        When you send a project brief, we store the details you enter (name, work email, company and your answers) so we can
        reply and prepare for a call. We do not sell your information or use advertising trackers.
      </p>
      <p>The full privacy policy is being finalised. Questions: arham@farmanlabs.com.</p>
    </LegalPage>
  );
}
