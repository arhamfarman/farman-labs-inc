import type { Accent } from "@/components/labelled-cell";

export const contact = {
  name: "Arham Farman",
  title: "Founder & Systems Architect",
  line: "Operational Systems • Automated Workflows",
  phone: "+1 (437) 575-4990",
  phoneHref: "tel:+14375754990",
  email: "arham@farmanlabs.com",
  web: "www.farmanlabs.com",
};

export type Step = {
  n: string;
  key: "blueprint" | "build" | "retainer";
  name: string;
  short: string;
  accent: Exclude<Accent, "navy">;
  price: string;
  duration: string;
  weeks: string;
  gets: string[];
  happens: string[];
  exit: string;
  decision: string;
};

// The engagement model from Section 1 of the spec. The 60-day credit and 30-day notice are proposed defaults.
export const steps: Step[] = [
  {
    n: "01",
    key: "blueprint",
    name: "Discovery & Blueprint",
    short: "Paid Blueprint",
    accent: "orange",
    price: "$500–$1,000",
    duration: "1–2 weeks",
    weeks: "Weeks 1–2",
    gets: ["Workflow map of the current process", "System architecture and data model", "Screen list", "Fixed quote and timeline for the build"],
    happens: ["Workshops with the people who do the work", "Process mapping", "A baseline of current metrics", "Architecture and a fixed quote"],
    exit: "You own the blueprint and can build with anyone.",
    decision: "Go ahead with the build, or take the blueprint elsewhere.",
  },
  {
    n: "02",
    key: "build",
    name: "Rapid Build",
    short: "Fixed-Scope Build",
    accent: "purple",
    price: "$5,000–$10,000+",
    duration: "2–3 weeks for a first release",
    weeks: "Weeks 3–5",
    gets: ["The working system, deployed", "Data migrated", "Staff trained", "Documentation and admin access"],
    happens: ["Weekly demos on a staging link", "Data migration", "User training"],
    exit: "Code and data belong to you.",
    decision: "Accept the release against the blueprint's checklist.",
  },
  {
    n: "03",
    key: "retainer",
    name: "Launch & Retainer",
    short: "Monthly Retainer",
    accent: "green",
    price: "$1,000–$1,500 / month",
    duration: "Ongoing, cancel with 30 days' notice",
    weeks: "Week 6 onward",
    gets: ["Hosting and monitoring", "Bug fixes", "Small changes (hours set per plan)", "Monthly usage and outcome report"],
    happens: ["Go-live support", "Monitoring", "Monthly report against the baseline", "Small improvements"],
    exit: "Full handover package on exit.",
    decision: "Continue month to month or take a full handover.",
  },
];

export const modelRules = [
  "The Blueprint fee is credited against the Build if you proceed within 60 days.",
  "The Build quote is fixed by the Blueprint. A change outside scope becomes a written change order before work starts.",
  "Every Build ships to production in 2–3 weeks. Larger systems ship in phases, each with its own fixed scope.",
];
