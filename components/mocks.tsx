// Product UI drawn in HTML, standing in for screenshots until real client systems can be shown.
// Every name and number is illustrative; mocks are aria-hidden and their frames carry a caption.
import { Check, FileText, Upload } from "lucide-react";

const label = "font-mono text-[10px] uppercase tracking-[0.08em] text-slate";

export function LiveBadge({ text = "Live" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-green">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
      </span>
      {text}
    </span>
  );
}

const board = [
  { name: "Prepress", square: "bg-orange", jobs: [["J-2041", "Menu cards", "500", "Due today"], ["J-2044", "Banner set", "12", "Proof sent"]] },
  { name: "On press", square: "bg-purple", jobs: [["J-2038", "Catalogue", "2,000", "Press 2"], ["J-2039", "Labels", "8,000", "Press 1"], ["J-2040", "Flyers", "5,000", "Queued"]] },
  { name: "Finishing", square: "bg-green", jobs: [["J-2035", "Brochures", "1,500", "Folding"]] },
  { name: "Shipping", square: "bg-mist", jobs: [["J-2031", "Business cards", "250", "Courier 3 pm"], ["J-2033", "Posters", "40", "Packed"]] },
];

const feed = [
  ["2m", "Portal", "New order J-2045 from Northside Dental"],
  ["6m", "Pipeline", "Invoice INV-8812 posted to QuickBooks"],
  ["11m", "Floor", "J-2038 moved to On press"],
  ["18m", "Portal", "Proof approved for J-2044"],
];

/** The large hero dashboard: sidebar, KPI cells, a job board and an activity feed. */
export function AppMock() {
  return (
    <div aria-hidden className="grid grid-cols-12 bg-navy text-[12px] text-mist">
      <aside className="col-span-2 hidden flex-col gap-1 border-r border-navy-cell p-3 lg:flex">
        <p className={`${label} mb-2 px-2`}>Operations</p>
        {["Overview", "Job board", "Orders", "Dispatch", "Inventory", "Invoices", "Reports"].map((i, n) => (
          <span key={i} className={`rounded-[6px] px-2 py-1.5 font-semibold ${n === 1 ? "bg-navy-grid text-white" : ""}`}>{i}</span>
        ))}
      </aside>
      <div className="col-span-12 flex flex-col gap-4 p-4 lg:col-span-7">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-bold text-white">Job board · Thursday</p>
          <LiveBadge text="Live · synced" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[["On time", "96%"], ["In production", "14"], ["Due today", "5"], ["Late", "1"]].map(([k, v]) => (
            <div key={k} className="rounded-[8px] border border-navy-cell px-3 py-2">
              <p className={label}>{k}</p>
              <p className="text-[18px] font-extrabold text-white">{v}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {board.map((c) => (
            <div key={c.name} className="flex flex-col gap-2 rounded-[8px] bg-navy-grid p-2">
              <p className={`flex items-center gap-2 ${label}`}><span className={`h-1.5 w-1.5 ${c.square}`} />{c.name} · {c.jobs.length}</p>
              {c.jobs.map(([id, name, qty, note]) => (
                <div key={id} className="rounded-[6px] border border-navy-cell bg-navy p-2">
                  <p className="font-mono text-[10px] text-slate">{id}</p>
                  <p className="font-semibold text-white">{name} · {qty}</p>
                  <p className="text-[11px] text-slate">{note}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <aside className="col-span-3 hidden flex-col gap-3 border-l border-navy-cell p-4 lg:flex">
        <p className={label}>Activity</p>
        {feed.map(([t, src, text]) => (
          <div key={text} className="flex flex-col gap-0.5 border-b border-navy-cell pb-3 last:border-0">
            <p className="font-mono text-[10px] text-slate">{t} ago · {src}</p>
            <p className="text-white">{text}</p>
          </div>
        ))}
        <div className="mt-auto rounded-[8px] border border-navy-cell p-3">
          <p className={label}>Throughput · 7 days</p>
          <div className="mt-2 flex h-12 items-end gap-1.5">
            {[38, 52, 46, 64, 58, 72, 84].map((h, i) => (
              <span key={i} className={`flex-1 rounded-t-[2px] ${i === 6 ? "bg-orange" : "bg-navy-cell"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

/** Customer portal: order form, preflight result and status timeline. */
export function PortalMock() {
  const steps = ["Received", "Approved", "In production", "Shipped", "Delivered"];
  return (
    <div aria-hidden className="flex flex-col gap-3 bg-navy p-4 text-[12px] text-mist">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-bold text-white">New order · Catalogue</p>
        <span className={label}>Northside Dental</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[["Quantity", "2,000"], ["Stock", "130 gsm silk"], ["Due", "Nov 14"]].map(([k, v]) => (
          <div key={k} className="rounded-[8px] border border-navy-cell px-3 py-2">
            <p className={label}>{k}</p>
            <p className="font-semibold text-white">{v}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-[8px] border border-dashed border-navy-cell p-3">
        <Upload size={16} className="text-orange" />
        <div className="flex-1">
          <p className="font-semibold text-white">catalogue-final.pdf</p>
          <p className="text-[11px] text-slate">A4 · 3 mm bleed · CMYK · 300 dpi</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-green/15 px-2 py-0.5 font-mono text-[10px] uppercase text-green"><Check size={12} />Preflight pass</span>
      </div>
      <div className="rounded-[8px] border border-navy-cell p-3">
        <p className={`${label} mb-3`}>Order J-2038 status</p>
        <ol className="flex items-center gap-1">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 flex-col gap-1.5">
              <span className={`h-1 rounded-full ${i < 3 ? "bg-orange" : "bg-navy-cell"}`} />
              <span className={`text-[10px] ${i === 2 ? "font-bold text-white" : "text-slate"}`}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Automation pipeline: a parsed invoice with confidence, then a post to the books. */
export function PipelineMock() {
  const fields = [
    ["Vendor", "Paper Mill Supply Co.", "99%"],
    ["Invoice", "INV-8812", "99%"],
    ["PO match", "PO-1173", "97%"],
    ["Total", "$4,182.60", "98%"],
    ["Tax", "$481.19", "72%"],
  ];
  return (
    <div aria-hidden className="flex flex-col gap-3 bg-navy p-4 text-[12px] text-mist">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[14px] font-bold text-white"><FileText size={16} className="text-purple" />invoice-8812.pdf</p>
        <span className={label}>orders@ inbox · 09:14</span>
      </div>
      <div className="overflow-hidden rounded-[8px] border border-navy-cell">
        {fields.map(([k, v, c]) => {
          const low = parseInt(c) < 90;
          return (
            <div key={k} className="grid grid-cols-[90px_1fr_auto] items-center gap-3 border-b border-navy-cell px-3 py-2 last:border-0">
              <span className={label}>{k}</span>
              <span className="font-semibold text-white">{v}</span>
              <span className={`font-mono text-[10px] ${low ? "text-orange" : "text-green"}`}>{low ? `${c} · review` : c}</span>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[["Parsed", "text-purple"], ["Reviewed", "text-orange"], ["Posted to QuickBooks", "text-green"]].map(([s, c]) => (
          <div key={s} className="rounded-[8px] border border-navy-cell px-2 py-2">
            <Check size={14} className={`mx-auto mb-1 ${c}`} />
            <p className="text-[11px] font-semibold text-white">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Project plan: the three steps across six weeks, with this week's demo. */
export function TimelineMock() {
  const rows = [
    { name: "Workshops and process map", start: 0, span: 1, color: "bg-orange" },
    { name: "Blueprint and fixed quote", start: 1, span: 1, color: "bg-orange" },
    { name: "Build · weekly demos", start: 2, span: 3, color: "bg-purple" },
    { name: "Data migration and training", start: 3, span: 2, color: "bg-purple" },
    { name: "Go-live and monitoring", start: 5, span: 1, color: "bg-green" },
  ];
  return (
    <div aria-hidden className="flex flex-col gap-3 bg-navy p-4 text-[12px] text-mist">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-bold text-white">Project plan · Order portal</p>
        <LiveBadge text="Staging · demo Friday" />
      </div>
      <div className="grid grid-cols-[150px_repeat(6,1fr)] items-center gap-y-2 rounded-[8px] border border-navy-cell p-3">
        <span />
        {[1, 2, 3, 4, 5, 6].map((w) => (
          <span key={w} className={`${label} text-center`}>W{w}</span>
        ))}
        {rows.map((r) => (
          <div key={r.name} className="contents">
            <span className="truncate pr-2 font-semibold text-white">{r.name}</span>
            <span className="relative col-span-6 h-5">
              <span
                className={`absolute inset-y-0 rounded-[4px] ${r.color}`}
                style={{ left: `${(r.start / 6) * 100}%`, width: `calc(${(r.span / 6) * 100}% - 4px)` }}
              />
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[["Quote", "Fixed"], ["This week", "Demo 3 of 3"], ["Repository", "Yours"]].map(([k, v]) => (
          <div key={k} className="rounded-[8px] border border-navy-cell px-3 py-2">
            <p className={label}>{k}</p>
            <p className="font-semibold text-white">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Code and stack view for custom software. */
export function CodeMock() {
  return (
    <div aria-hidden className="bg-navy p-4 font-mono text-[11.5px] leading-relaxed text-mist">
      <p className="text-slate">// app/quotes/actions.ts</p>
      <p><span className="text-purple">export async function</span> <span className="text-white">priceJob</span>(spec: JobSpec) {"{"}</p>
      <p className="pl-4"><span className="text-purple">const</span> stock = <span className="text-purple">await</span> db.stock.find(spec.stockId);</p>
      <p className="pl-4"><span className="text-purple">const</span> press = pickPress(spec.size, spec.qty);</p>
      <p className="pl-4"><span className="text-purple">return</span> quote({"{"} stock, press, finish: spec.finish {"}"});</p>
      <p>{"}"}</p>
      <p className="mt-3 flex flex-wrap gap-1.5 font-sans">
        {["Next.js", "Supabase", "Postgres", "TypeScript", "Vercel"].map((t) => (
          <span key={t} className="rounded-full border border-navy-cell px-2 py-0.5 text-[10px] text-slate">{t}</span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-green"><Check size={12} />142 tests passing</span>
      </p>
    </div>
  );
}
