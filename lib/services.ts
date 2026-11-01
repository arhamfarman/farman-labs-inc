import type { LucideIcon } from "lucide-react";
import {
  Bell, Boxes, Calculator, CalendarClock, ClipboardList, Code2, Layers, Plug, Database, FileCheck2, FileText, Gauge, KanbanSquare, Link2, ListChecks,
  Mail, MapPinned, RefreshCw, Settings2, ShieldCheck, Timer, UserCheck, Zap,
} from "lucide-react";
import type { Accent } from "@/components/labelled-cell";

export type ServiceKey = "portals" | "automation" | "dashboards" | "custom";

export type Service = {
  key: ServiceKey;
  accent: Accent;
  name: string;
  short: string;
  path: string;
  summary: string;
  promise: string;
  bullets: string[];
  pains: string[];
  features: { name: string; detail: string; icon: LucideIcon }[];
  outcomes: { metric: string; target: string }[];
};

// Content from Section 1 of the spec. Outcome figures are targets to measure per engagement, not claims.
export const services: Service[] = [
  {
    key: "portals",
    accent: "orange",
    name: "Client & Supplier Portals",
    short: "Portals",
    path: "// farman-labs / services / portals",
    summary:
      "A branded, secure web portal where customers place and track orders and suppliers confirm and update them, so your team stops re-typing emails into spreadsheets.",
    promise: "Customers order and track online. Your team stops re-typing.",
    bullets: ["Guided order intake and file upload", "Live order status for every customer", "Suppliers confirm dates and flag delays"],
    pains: [
      "Orders arrive by email, phone and WhatsApp, and get re-keyed by hand, with errors.",
      "Print files and job specs come in the wrong format or resolution, and are found late.",
      "Customers call to ask “where is my order?” several times a day.",
      "Supplier confirmations live in inboxes, so nobody sees what is late until it is too late.",
    ],
    features: [
      { name: "Order intake", icon: ClipboardList, detail: "Guided forms with product-specific fields, quantity breaks, due dates and repeat-order shortcuts." },
      { name: "File upload and preflight", icon: FileCheck2, detail: "Drag-and-drop upload of print-ready PDFs, checked for page size, bleed, colour mode and resolution, with a clear pass or fail message." },
      { name: "Custom job specs", icon: Settings2, detail: "A spec builder per product (stock, finish, binding, dimensions) that feeds the production job record." },
      { name: "Status tracking", icon: Timer, detail: "A live order timeline driven by the same data the shop floor updates." },
      { name: "Automated notifications", icon: Bell, detail: "Email and SMS at each status change, proof-approval links and delivery confirmation, with no staff action needed." },
      { name: "Supplier side and accounts", icon: ShieldCheck, detail: "Purchase orders pushed to suppliers. Company accounts with roles, row-level security and SSO-ready sign-in." },
    ],
    outcomes: [
      { metric: "Staff time on order entry", target: "Cut by 60–80%" },
      { metric: "Orders with missing or wrong specs", target: "Cut by over half" },
      { metric: "“Where is my order?” calls", target: "Cut by over half" },
      { metric: "Order to production-ready", target: "Same day" },
    ],
  },
  {
    key: "automation",
    accent: "purple",
    name: "Workflow Automation Pipelines",
    short: "Automation",
    path: "// farman-labs / services / automation",
    summary:
      "Background systems that read the documents and emails your business already receives, pull out the data and put it where it belongs, with no copy-paste.",
    promise: "Invoices and emails become data automatically.",
    bullets: ["PDF, invoice and email parsing", "QuickBooks and ERP bridges", "A review queue for anything uncertain"],
    pains: [
      "Staff spend hours a week keying supplier invoices, POs and delivery notes into QuickBooks or the ERP.",
      "Data lives in several tools that disagree: the spreadsheet says one thing, the accounting system another.",
      "Routine steps (send the invoice, chase the approval, update the stock count) depend on someone remembering.",
      "Errors surface at month-end, when they cost the most to fix.",
    ],
    features: [
      { name: "PDF and invoice parsing", icon: FileText, detail: "Extracts vendor, line items, totals, tax and PO numbers. Low-confidence fields go to a review queue, not straight into the books." },
      { name: "Email parsing", icon: Mail, detail: "A dedicated inbox whose messages and attachments become structured records automatically." },
      { name: "Database syncing", icon: RefreshCw, detail: "Two-way sync between your database and your spreadsheets or line-of-business tools, with conflict rules." },
      { name: "QuickBooks and ERP bridges", icon: Link2, detail: "Creates bills, invoices, customers and items through official APIs, with matching to avoid duplicates." },
      { name: "Background jobs", icon: Zap, detail: "Scheduled and event-driven jobs with retries, step-level logs and alerts on failure." },
      { name: "Review and audit trail", icon: UserCheck, detail: "An approval screen for exceptions, and every automated action logged with its source document." },
    ],
    outcomes: [
      { metric: "Manual data entry", target: "10–30 hours a week saved" },
      { metric: "Data-entry error rate", target: "Under 1% after review" },
      { metric: "Invoice to books", target: "Minutes, not days" },
      { metric: "Month-end close", target: "Days saved" },
    ],
  },
  {
    key: "dashboards",
    accent: "green",
    name: "Real-Time ERP & Operations Dashboards",
    short: "Dashboards",
    path: "// farman-labs / services / dashboards",
    summary:
      "One live screen showing every job, crew and asset, updated the moment something changes, built around how your business actually runs instead of a generic ERP's idea of it.",
    promise: "Every job, crew and asset on one live screen.",
    bullets: ["Kanban job boards per department", "Field dispatch with a mobile crew view", "Inventory, assets and KPI alerts"],
    pains: [
      "The owner has to walk the floor or call around to know where things stand.",
      "Job status lives on whiteboards and in people's heads, so handovers drop work.",
      "Field crews get dispatched by phone and text, with no record of who went where.",
      "Inventory and equipment go missing or run out without warning.",
      "Off-the-shelf ERPs cost too much, take months to roll out and fit the work poorly.",
    ],
    features: [
      { name: "Kanban job boards", icon: KanbanSquare, detail: "Drag-and-drop boards per department, with due-date warnings and capacity limits." },
      { name: "Field dispatch", icon: MapPinned, detail: "Assign jobs to crews on a calendar and map. Crews check in, add photos and notes, and capture signatures." },
      { name: "Inventory and assets", icon: Boxes, detail: "Stock levels with reorder points, barcode or QR scanning from a phone, and equipment history." },
      { name: "Real-time updates", icon: Database, detail: "Changes reach every open screen instantly, with no refresh and no stale data." },
      { name: "KPI dashboards", icon: Gauge, detail: "Throughput, on-time rate, backlog, revenue by customer and crew utilisation." },
      { name: "Alerts", icon: ListChecks, detail: "Rules such as “job late by 1 day” or “stock below reorder point” trigger email, SMS or Slack messages." },
    ],
    outcomes: [
      { metric: "Owner's status picture", target: "Seconds, any device" },
      { metric: "On-time delivery rate", target: "Up vs. baseline" },
      { metric: "Status meetings and calls", target: "Cut by over half" },
      { metric: "Stockouts and lost equipment", target: "Cut by over half" },
    ],
  },
];

services.push({
  key: "custom",
  accent: "navy",
  name: "Custom Software Development",
  short: "Custom software",
  path: "// farman-labs / services / custom",
  summary:
    "Full-stack software engineered around one operation's unusual work: quoting engines, scheduling tools, scanners and internal apps that no off-the-shelf product handles.",
  promise: "The system your operation needs, when no product fits.",
  bullets: ["Next.js and Supabase, built to last", "Connected to the tools you already run", "Documented, tested and yours"],
  pains: [
    "Off-the-shelf software covers 80% of the job, and staff work around the other 20% with spreadsheets.",
    "A core process (quoting, scheduling, costing) lives in one person's head or one fragile spreadsheet.",
    "Several disconnected tools each hold part of the picture.",
    "Past custom builds became black boxes nobody can change.",
  ],
  features: [
    { name: "Web and mobile apps", icon: Layers, detail: "Internal tools, customer apps and shop-floor screens on Next.js, built for phones, tablets and desktops." },
    { name: "Quoting and costing engines", icon: Calculator, detail: "Your pricing rules, materials and labour turned into instant, consistent quotes." },
    { name: "Scheduling and capacity", icon: CalendarClock, detail: "Planning tools that know your machines, crews and lead times." },
    { name: "Integrations and APIs", icon: Plug, detail: "Connections to accounting, ERPs, carriers, payment providers and machinery through official APIs." },
    { name: "Data model and security", icon: ShieldCheck, detail: "A Supabase Postgres schema with row-level security, backups and audit logs." },
    { name: "Tests and documentation", icon: Code2, detail: "Automated tests, a written runbook and the code in your repository from day one." },
  ],
  outcomes: [
    { metric: "Quote", target: "Fixed by the Blueprint" },
    { metric: "First release", target: "2–3 weeks" },
    { metric: "Code and data", target: "Yours, in your repo" },
    { metric: "Handover", target: "Documented" },
  ],
});

export const serviceByKey = Object.fromEntries(services.map((s) => [s.key, s])) as Record<ServiceKey, Service>;
