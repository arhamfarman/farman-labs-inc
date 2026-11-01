import { z } from "zod";

export const industryOptions = ["Distribution", "Printing", "Trade contracting", "Freight & logistics", "Clinic / B2B services", "Other"] as const;
export const serviceOptions = [
  { value: "portals", label: "Portals" },
  { value: "automation", label: "Automation" },
  { value: "dashboards", label: "Dashboards" },
  { value: "custom", label: "Custom software" },
  { value: "not-sure", label: "Not sure" },
] as const;
export const teamSizeOptions = ["1–10", "11–50", "51–200", "200+"] as const;
export const timelineOptions = ["ASAP", "1–3 months", "Exploring"] as const;
export const budgetOptions = ["Under $5k", "$5–10k", "$10–25k", "$25k+"] as const;

const optional = <T extends readonly [string, ...string[]]>(values: T) =>
  z.union([z.enum(values), z.literal("")]).optional().transform((v) => v || null);

export const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid work email.").max(200),
  company: z.string().trim().min(1, "Please enter your company.").max(160),
  industry: z.enum(industryOptions, { errorMap: () => ({ message: "Please choose an industry." }) }),
  services: z
    .array(z.enum(["portals", "automation", "dashboards", "custom", "not-sure"]))
    .min(1, "Choose at least one service, or “Not sure”."),
  problem: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(1000, "Please keep it under 1,000 characters."),
  tools: z.string().trim().max(300).optional().transform((v) => v || null),
  teamSize: optional(teamSizeOptions),
  timeline: optional(timelineOptions),
  budget: optional(budgetOptions),
});

export type Lead = z.infer<typeof leadSchema>;

export type LeadState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors: Partial<Record<keyof Lead, string>>; values: Record<string, string | string[]> }
  | { status: "success"; firstName: string };
