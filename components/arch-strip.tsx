import type { ServiceKey } from "@/lib/services";

// A one-line view of the full system with the current service highlighted.
const stages: { key: ServiceKey | "inputs" | "data"; label: string; color?: string }[] = [
  { key: "inputs", label: "Customers, suppliers, email" },
  { key: "portals", label: "Portals", color: "border-orange bg-orange/10" },
  { key: "automation", label: "Pipelines", color: "border-purple bg-purple/10" },
  { key: "data", label: "Shared database" },
  { key: "dashboards", label: "Dashboards", color: "border-green bg-green/10" },
];

export function ArchStrip({ active }: { active: ServiceKey }) {
  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="font-mono text-label uppercase text-steel">Where it sits in the system</figcaption>
      <ol className="flex flex-wrap items-center gap-2 text-[14px]">
        {stages.map((s, i) => {
          const on = s.key === active;
          return (
            <li key={s.key} className="flex items-center gap-2">
              <span
                aria-current={on ? "step" : undefined}
                className={`rounded-[8px] border px-3 py-1.5 font-semibold ${on ? `border-2 ${s.color} text-navy` : "border-hairline bg-white text-steel"}`}
              >
                {s.label}
              </span>
              {i < stages.length - 1 && <span aria-hidden className="text-slate">→</span>}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
