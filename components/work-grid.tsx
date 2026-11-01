"use client";
import { useState } from "react";

type Item = { slug: string; industry: string; services: string[]; card: React.ReactNode };

const serviceLabels: Record<string, string> = { portals: "Portals", automation: "Automation", dashboards: "Dashboards" };

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`h-9 rounded-full border px-4 text-[14px] font-semibold transition ${on ? "border-navy bg-navy text-white" : "border-hairline bg-white text-navy hover:border-navy"}`}
    >
      {children}
    </button>
  );
}

export function WorkGrid({ items, industries }: { items: Item[]; industries: string[] }) {
  const [industry, setIndustry] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const shown = items.filter((i) => (!industry || i.industry === industry) && (!service || i.services.includes(service)));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div role="group" aria-label="Filter by industry" className="flex flex-wrap gap-2">
          <Chip on={!industry} onClick={() => setIndustry(null)}>All industries</Chip>
          {industries.map((i) => <Chip key={i} on={industry === i} onClick={() => setIndustry(industry === i ? null : i)}>{i}</Chip>)}
        </div>
        <div role="group" aria-label="Filter by service" className="flex flex-wrap gap-2">
          <Chip on={!service} onClick={() => setService(null)}>All services</Chip>
          {Object.entries(serviceLabels).map(([k, v]) => <Chip key={k} on={service === k} onClick={() => setService(service === k ? null : k)}>{v}</Chip>)}
        </div>
      </div>
      <p aria-live="polite" className="sr-only">{shown.length} case studies shown</p>
      {shown.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{shown.map((i) => <div key={i.slug}>{i.card}</div>)}</div>
      ) : (
        <p className="rounded-cell border border-hairline bg-white p-8 text-steel">No case studies match those filters yet.</p>
      )}
    </div>
  );
}
