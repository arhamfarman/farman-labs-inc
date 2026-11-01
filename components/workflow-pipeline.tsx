// "How we automate your workflow": one invoice followed from upload to the books.
// The document, fields and timings are illustrative; the figure caption says so.
import { Check, Database, FileUp, RefreshCw, ScanText } from "lucide-react";
import { Pipeline, type Stage } from "./visuals";

const label = "font-mono text-[10px] uppercase tracking-[0.08em] text-steel";
const box = "rounded-[8px] border border-hairline bg-paper p-2.5 text-[12px]";

const stages: Stage[] = [
  {
    icon: FileUp,
    color: "orange",
    label: "Client PDF upload",
    name: "A document arrives",
    detail: (
      <div aria-hidden className={box}>
        <p className="font-semibold text-navy">invoice-8812.pdf</p>
        <p className="text-steel">2 pages · orders@ · 09:14</p>
        <span className="mt-2 inline-flex rounded-full border border-orange/50 bg-orange/10 px-2 py-0.5 font-mono text-[10px] uppercase text-orange-ink">Received</span>
      </div>
    ),
  },
  {
    icon: ScanText,
    color: "purple",
    label: "Automated parser",
    name: "Fields are read",
    detail: (
      <div aria-hidden className={`${box} flex flex-col gap-1`}>
        {[["Vendor", "99%", false], ["Total", "98%", false], ["Tax", "72%", true]].map(([k, v, low]) => (
          <p key={k as string} className="flex items-center justify-between gap-2">
            <span className={label}>{k}</span>
            <span className={`font-mono text-[10px] ${low ? "text-orange-ink" : "text-green-ink"}`}>{low ? `${v} · review` : v}</span>
          </p>
        ))}
      </div>
    ),
  },
  {
    icon: Database,
    color: "green",
    label: "Supabase database",
    name: "Saved once",
    detail: (
      <div aria-hidden className={`${box} font-mono text-[11px]`}>
        <p className="text-steel">bills · insert</p>
        <p className="text-navy">INV-8812 · $4,182.60</p>
        <p className="text-green-ink">status: approved</p>
      </div>
    ),
  },
  {
    icon: RefreshCw,
    color: "navy",
    label: "ERP sync",
    name: "Posted to the books",
    detail: (
      <div aria-hidden className={box}>
        <p className="flex items-center gap-1.5 font-semibold text-navy"><Check size={14} className="text-green-ink" />Bill created</p>
        <p className="text-steel">QuickBooks · 09:15</p>
        <p className="mt-1 text-steel">Nobody re-typed it</p>
      </div>
    ),
  },
];

export function WorkflowPipeline() {
  return (
    <figure className="flex flex-col gap-3">
      <Pipeline stages={stages} label="How an invoice moves from upload to QuickBooks" />
      <figcaption className="sr-only">
        Illustration: a supplier invoice PDF is received, its fields are read with a confidence score, anything below 90% goes to review,
        the record is saved once in the database and a bill is created in QuickBooks.
      </figcaption>
    </figure>
  );
}
