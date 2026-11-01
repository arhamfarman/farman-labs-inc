import Link from "next/link";
import type { CaseStudy } from "@/lib/work";
import { LabelledCell, LabelledCellGroup } from "./labelled-cell";
import { SquareList } from "./section";

// Case studies are laid out like engineering spec sheets.
export function CaseCard({ study, index = 1 }: { study: CaseStudy; index?: number }) {
  return (
    <article className="surface-light flex flex-col overflow-hidden rounded-cell border border-hairline bg-white">
      <header className="flex items-center justify-between gap-4 border-b border-hairline bg-paper px-5 py-3 font-mono text-label uppercase text-steel">
        <span>Spec sheet · FL-CS-{String(index).padStart(3, "0")}</span>
        {study.demo ? <span className="rounded-full bg-navy px-2.5 py-0.5 text-white">Demo build</span> : <span>{study.industry}</span>}
      </header>
      <div className="flex flex-1 flex-col gap-5 p-5">
        <h3 className="text-h3 font-extrabold">
          <Link href={`/work/${study.slug}`} className="hover:underline">{study.title}</Link>
        </h3>
        <LabelledCellGroup columns={2}>
          <LabelledCell size="sm" label="Client industry" value={study.industry} />
          <LabelledCell size="sm" label="Operational friction" value={study.friction} />
          <LabelledCell size="sm" label="System built" value={study.system} />
          <LabelledCell size="sm" label="Measured outcome" value={study.outcome} />
        </LabelledCellGroup>
        <SquareList items={study.features.slice(0, 3)} className="text-[15px] text-steel" />
        <Link href={`/work/${study.slug}`} className="text-link mt-auto">Read the spec <span aria-hidden className="arrow">→</span></Link>
      </div>
    </article>
  );
}
