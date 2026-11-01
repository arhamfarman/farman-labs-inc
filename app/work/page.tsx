import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { CaseCard } from "@/components/case-card";
import { WorkGrid } from "@/components/work-grid";
import { ClosingBand } from "@/components/closing-band";
import { getCaseStudies, industries } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Systems Farman Labs has put into production, each led by a measured result.",
};

export default function WorkPage() {
  const studies = getCaseStudies();
  return (
    <>
      <Hero
        path="// farman-labs / work"
        line1="Systems in"
        line2="production."
        lead="Every case study leads with a measured number. Real client work is published only with permission."
      />
      <Section surface="paper">
        <WorkGrid
          industries={industries}
          items={studies.map((s) => ({ slug: s.slug, industry: s.industry, services: s.services, card: <CaseCard study={s} /> }))}
        />
      </Section>
      <ClosingBand />
    </>
  );
}
