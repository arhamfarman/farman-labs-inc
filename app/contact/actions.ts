"use server";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { leadSchema, type Lead, type LeadState } from "@/lib/leads";

async function verifyTurnstile(token: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: the honeypot still runs
  if (!token) return false;
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] ?? "";
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

async function saveLead(lead: Lead) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.info("[leads] Supabase not configured; lead not stored:", lead.email);
    return;
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    email: lead.email,
    company: lead.company,
    industry: lead.industry,
    services: lead.services,
    problem: lead.problem,
    tools: lead.tools,
    team_size: lead.teamSize,
    timeline: lead.timeline,
    budget: lead.budget,
  });
  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
}

async function sendEmails(lead: Lead, firstName: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[leads] Resend not configured; no emails sent for:", lead.email);
    return;
  }
  const resend = new Resend(key);
  const from = process.env.LEAD_FROM ?? "Farman Labs <hello@farmanlabs.com>";
  const to = process.env.LEAD_NOTIFY_TO ?? "arham@farmanlabs.com";
  const booking = process.env.NEXT_PUBLIC_CAL_LINK ? `https://cal.com/${process.env.NEXT_PUBLIC_CAL_LINK}` : "https://www.farmanlabs.com/contact";
  const rows = [
    ["Name", lead.name], ["Email", lead.email], ["Company", lead.company], ["Industry", lead.industry],
    ["Services", lead.services.join(", ")], ["Tools", lead.tools ?? "—"], ["Team size", lead.teamSize ?? "—"],
    ["Timeline", lead.timeline ?? "—"], ["Budget", lead.budget ?? "—"],
  ];
  await Promise.all([
    resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: `New project brief: ${lead.company}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nWhat's slowing them down:\n${lead.problem}`,
    }),
    resend.emails.send({
      from,
      to: lead.email,
      replyTo: to,
      subject: "Thanks for your brief | Farman Labs",
      text: `Hi ${firstName},\n\nThanks for telling me about ${lead.company}. I'll reply within one business day.\n\nIf you'd rather talk it through, you can book a 30-minute call here: ${booking}\n\nArham Farman\nFounder & Systems Architect, Farman Labs Inc.\n+1 (437) 575-4990`,
    }),
  ]);
}

export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  const values: Record<string, string | string[]> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v !== "string") continue;
    if (k === "services") values.services = [...((values.services as string[]) ?? []), v];
    else values[k] = v;
  }

  // Honeypot: real people never see or fill this field. Pretend success so bots learn nothing.
  if (values.website) return { status: "success", firstName: "there" };

  if (!(await verifyTurnstile(form.get("cf-turnstile-response") as string | null))) {
    return { status: "error", message: "Please complete the spam check and try again.", fieldErrors: {}, values };
  }

  const parsed = leadSchema.safeParse({ ...values, services: values.services ?? [] });
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof Lead, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof Lead;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const lead = parsed.data;
  const firstName = lead.name.split(/\s+/)[0];
  try {
    await saveLead(lead);
    await sendEmails(lead, firstName);
  } catch (e) {
    console.error("[leads]", e);
    return {
      status: "error",
      message: "Something went wrong sending your brief. Please email arham@farmanlabs.com directly.",
      fieldErrors: {},
      values,
    };
  }
  return { status: "success", firstName };
}
