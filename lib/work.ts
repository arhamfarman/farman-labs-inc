import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ServiceKey } from "./services";

export type CaseStudy = {
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: ServiceKey[];
  friction: string;
  system: string;
  outcome: string;
  blueprintWeeks: number;
  buildWeeks: number;
  launched?: string;
  quote?: { text: string; name: string; role: string };
  results: { label: string; before: string; after: string }[];
  features: string[];
  demo?: boolean; // an internal example, shown with a clear "Demo build" label
  body: string;
};

export const industries = ["Distribution", "Printing", "Trade contractors", "Logistics", "Clinics and B2B services"];

const dir = path.join(process.cwd(), "content", "work");

export function getCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return { ...(data as Omit<CaseStudy, "body">), body: content };
    })
    .sort((a, b) => Number(!!a.demo) - Number(!!b.demo));
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((c) => c.slug === slug);
}
