"use client";
import { useActionState, useEffect, useState } from "react";
import Script from "next/script";
import { submitLead } from "@/app/contact/actions";
import {
  budgetOptions, industryOptions, serviceOptions, teamSizeOptions, timelineOptions, type LeadState,
} from "@/lib/leads";
import { Button } from "./button";

const input =
  "h-12 w-full rounded-btn border border-hairline bg-white px-4 text-[16px] text-navy placeholder:text-slate " +
  "focus:border-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-orange aria-[invalid=true]:border-error";

function Field({ id, label, required, error, hint, children }: {
  id: string; label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-label uppercase text-steel">
        {label} {required ? <span className="text-error">*</span> : <span className="normal-case tracking-normal">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-[14px] text-steel">{hint}</p>}
      {error && <p id={`${id}-error`} className="text-[14px] font-semibold text-error">{error}</p>}
    </div>
  );
}

function Select({ id, options, value, error, required }: {
  id: string; options: readonly string[]; value?: string; error?: string; required?: boolean;
}) {
  return (
    <select
      id={id}
      name={id}
      defaultValue={value ?? ""}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={input}
    >
      <option value="">Choose…</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export function IntakeForm({ initialServices = [], initialEmail }: { initialServices?: string[]; initialEmail?: string }) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  // A submit before hydration posts as a plain HTML form and the visitor sees no result, so wait until React is ready.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-cell border border-hairline bg-paper p-8">
        <p className="path-line">// farman-labs / contact / received</p>
        <p className="text-h3 font-extrabold">Thanks, {state.firstName}. I&rsquo;ll reply within one business day.</p>
      </div>
    );
  }

  const err = state.status === "error" ? state.fieldErrors : {};
  const v = state.status === "error" ? state.values : {};
  const str = (k: string) => (typeof v[k] === "string" ? (v[k] as string) : undefined);
  const chosen = state.status === "error" ? ((v.services as string[]) ?? []) : initialServices;

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      {state.status === "error" && (
        <p role="alert" className="rounded-btn border border-error bg-white px-4 py-3 font-semibold text-error">{state.message}</p>
      )}

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={err.name}>
          <input id="name" name="name" autoComplete="name" required defaultValue={str("name")} aria-invalid={!!err.name} aria-describedby={err.name ? "name-error" : undefined} className={input} />
        </Field>
        <Field id="email" label="Work email" required error={err.email}>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={str("email") ?? initialEmail} aria-invalid={!!err.email} aria-describedby={err.email ? "email-error" : undefined} className={input} />
        </Field>
        <Field id="company" label="Company" required error={err.company}>
          <input id="company" name="company" autoComplete="organization" required defaultValue={str("company")} aria-invalid={!!err.company} aria-describedby={err.company ? "company-error" : undefined} className={input} />
        </Field>
        <Field id="industry" label="Industry" required error={err.industry}>
          <Select id="industry" options={industryOptions} value={str("industry")} error={err.industry} required />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2" aria-describedby={err.services ? "services-error" : undefined}>
        <legend className="mb-2 font-mono text-label uppercase text-steel">Service of interest <span className="text-error">*</span></legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((s) => (
            <label key={s.value} className="cursor-pointer">
              <input type="checkbox" name="services" value={s.value} defaultChecked={chosen.includes(s.value)} className="peer sr-only" />
              <span className="flex h-10 items-center rounded-full border border-hairline px-4 text-[15px] font-semibold transition peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-orange">
                {s.label}
              </span>
            </label>
          ))}
        </div>
        {err.services && <p id="services-error" className="text-[14px] font-semibold text-error">{err.services}</p>}
      </fieldset>

      <Field id="problem" label="What's slowing you down?" required error={err.problem} hint="20–1,000 characters. Where does work get re-typed, chased or lost?">
        <textarea
          id="problem"
          name="problem"
          rows={5}
          minLength={20}
          maxLength={1000}
          required
          defaultValue={str("problem")}
          aria-invalid={!!err.problem}
          aria-describedby={err.problem ? "problem-error" : "problem-hint"}
          className={`${input} h-auto py-3`}
        />
      </Field>

      <Field id="tools" label="Tools you use today">
        <input id="tools" name="tools" placeholder="e.g. QuickBooks, Excel, email" defaultValue={str("tools")} className={input} />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field id="teamSize" label="Team size"><Select id="teamSize" options={teamSizeOptions} value={str("teamSize")} /></Field>
        <Field id="timeline" label="Timeline"><Select id="timeline" options={timelineOptions} value={str("timeline")} /></Field>
        <Field id="budget" label="Budget range"><Select id="budget" options={budgetOptions} value={str("budget")} /></Field>
      </div>

      {siteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />
        </>
      )}

      <div>
        <Button type="submit" size="lg" disabled={pending || !ready}>{pending ? "Sending…" : "Send project brief"}</Button>
      </div>
    </form>
  );
}
