// A stylised operations dashboard drawn in HTML, standing in for a product screenshot.
// Every value here is illustrative; the figcaption says so for screen readers.

const columns = [
  { name: "Prepress", jobs: ["Menu cards · 500", "Banner set · 12"], accent: "bg-orange" },
  { name: "Press", jobs: ["Catalogue · 2,000", "Labels · 8,000", "Flyers · 5,000"], accent: "bg-purple" },
  { name: "Shipping", jobs: ["Brochures · 1,500"], accent: "bg-green" },
];

const bars = [38, 52, 46, 64, 58, 72, 80];

export function DashboardMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-4 bg-navy p-4 text-[12px]" aria-hidden>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["On time", "96%"],
          ["In production", "14"],
          ["Late", "1"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[8px] border border-navy-cell px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate">{label}</p>
            <p className="text-[18px] font-extrabold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {columns.map((c) => (
          <div key={c.name} className="flex flex-col gap-2 rounded-[8px] bg-navy-grid p-2">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-slate">
              <span className={`h-1.5 w-1.5 ${c.accent}`} />
              {c.name}
            </p>
            {c.jobs.map((j) => (
              <div key={j} className="rounded-[6px] border border-navy-cell bg-navy px-2 py-1.5 font-semibold text-mist">{j}</div>
            ))}
          </div>
        ))}
      </div>
      {!compact && (
        <div className="rounded-[8px] border border-navy-cell p-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-slate">Throughput · last 7 days</p>
          <div className="flex h-16 items-end gap-2">
            {bars.map((h, i) => (
              <span key={i} className={`flex-1 rounded-t-[3px] ${i === bars.length - 1 ? "bg-orange" : "bg-navy-cell"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
