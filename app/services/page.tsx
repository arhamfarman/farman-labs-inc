import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Button } from "@/components/button";
import { LabelledCell, LabelledCellGroup } from "@/components/labelled-cell";
import { Section, SectionHeading, SquareList } from "@/components/section";
import { BrowserFrame } from "@/components/browser-frame";
import { DashboardMock } from "@/components/dashboard-mock";
import { CodeMock, PipelineMock, PortalMock } from "@/components/mocks";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ArchStrip } from "@/components/arch-strip";
import { CompareBars, IconTile, MetricCard, Pipeline } from "@/components/visuals";
import { ClosingBand } from "@/components/closing-band";
import { services } from "@/lib/services";
import { modelRules, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Client & supplier portals, workflow automation pipelines, real-time operations dashboards and custom software, sold in fixed, priced steps.",
};

const square = { orange: "bg-orange", purple: "bg-purple", green: "bg-green", navy: "bg-navy" } as const;

function ServiceTiles() {
  return (
    <nav aria-label="Jump to a service" className="grid grid-cols-2 gap-px overflow-hidden rounded-cell border border-navy-cell bg-navy-cell">
      {services.map((s) => (
        <a key={s.key} href={`#${s.key}`} className="group flex flex-col gap-4 bg-navy p-5 transition hover:bg-navy-grid">
          <IconTile icon={s.icon} color={s.tile} marker={s.accent === "navy" ? undefined : s.accent} tone="dark" />
          <span className="font-bold text-white">{s.short}</span>
          <span className="flex flex-col gap-0.5">
            <span className="font-mono text-label uppercase text-slate">{s.outcomes[0].metric}</span>
            <span className="text-[15px] font-semibold text-mist">{s.outcomes[0].target}</span>
          </span>
        </a>
      ))}
    </nav>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Hero
        path="// farman-labs / services"
        line1="Four systems."
        line2="One operation."
        lead="Start with the one that hurts most. They connect when you're ready."
        media={<ServiceTiles />}
      />

      <nav aria-label="Services" className="sticky top-16 z-40 border-b border-hairline bg-white/95 backdrop-blur md:top-[72px]">
        <ul className="mx-auto flex max-w-content gap-1 overflow-x-auto px-6">
          {services.map((s) => (
            <li key={s.key}>
              <a href={`#${s.key}`} className="flex h-14 items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 text-[15px] font-semibold hover:border-navy">
                <span aria-hidden className={`h-2 w-2 ${square[s.accent]}`} />
                {s.short}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((s, i) => (
        <Section key={s.key} id={s.key} surface={i % 2 === 0 ? "white" : "paper"}>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-5 lg:col-span-5">
              <p className="path-line">{s.path}</p>
              <IconTile icon={s.icon} color={s.tile} marker={s.accent === "navy" ? undefined : s.accent} />
              <h2 className="text-[2rem] font-extrabold uppercase leading-[1.05] max-md:text-[1.75rem]">{s.name}</h2>
              <p className="text-lead text-steel">{s.promise}</p>
              <div>
                <h3 className="mb-3 font-mono text-label uppercase text-steel">Before</h3>
                <SquareList items={s.pains.slice(0, 3)} className="text-[15px] text-steel" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <BrowserFrame url={`${s.key}.farmanlabs.app`}>
                {s.key === "portals" ? <PortalMock /> : s.key === "automation" ? <PipelineMock /> : s.key === "custom" ? <CodeMock /> : <DashboardMock />}
                <figcaption className="sr-only">Illustration of a {s.short.toLowerCase()} screen. {s.summary}</figcaption>
              </BrowserFrame>
            </div>
          </div>

          <h3 className="mb-4 mt-16 font-mono text-label uppercase text-steel">How it flows</h3>
          <Pipeline stages={s.flow} label={`How ${s.short.toLowerCase()} work, step by step`} />

          <h3 className="mb-4 mt-16 font-mono text-label uppercase text-steel">What we build</h3>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-cell border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {s.features.map((f, n) => (
              <li key={f.name} className="flex gap-4 bg-white p-5">
                <IconTile icon={f.icon} color={n % 2 === 0 ? "orange" : "purple"} size="sm" />
                <div className="flex flex-col gap-1">
                  <p className="font-bold">{f.name}</p>
                  <p className="text-[14px] text-steel">{f.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mb-4 mt-16 font-mono text-label uppercase text-steel">What changes · targets</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.outcomes.map((o, n) => (
              <MetricCard key={o.metric} label={o.metric} value={o.target} color={(["navy", "orange", "purple", "green"] as const)[n % 4]}>
                {o.level !== undefined && <CompareBars level={o.level} color={(["navy", "orange", "purple", "green"] as const)[n % 4]} />}
              </MetricCard>
            ))}
          </div>
          <p className="mt-3 text-[14px] text-steel">Targets we measure against your baseline in every engagement, not past results.</p>

          <div className="mt-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <ArchStrip active={s.key} />
            <Button href={`/contact?service=${s.key}`}>Book a call about {s.short.toLowerCase()}</Button>
          </div>
        </Section>
      ))}

      <Section surface="navy" id="system">
        <SectionHeading dark path="// farman-labs / services / system" line1="How it" line2="connects." lead="Hover or tab through a part to see what it talks to." />
        <div className="mt-12 rounded-cell border border-navy-cell bg-navy/70 p-4 md:p-8">
          <ArchitectureDiagram tone="dark" />
        </div>
      </Section>

      <Section surface="white">
        <SectionHeading path="// farman-labs / services / pricing" line1="Priced in" line2="three steps." lead="Each step is scoped and priced on its own, so you can stop after any step with something useful in hand." />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((st) => (
            <div key={st.key} className="flex flex-col gap-4">
              <p className="flex items-center gap-2 font-bold">
                <span aria-hidden className={`h-2.5 w-2.5 ${square[st.accent]}`} />
                {st.n} · {st.short}
              </p>
              <LabelledCellGroup columns={1}>
                <LabelledCell label="Price (USD)" value={st.price} />
                <LabelledCell label="Duration" value={st.duration} size="sm" />
                <LabelledCell label="What you get" value={<SquareList items={st.gets} className="pt-1 text-[15px] font-medium" />} size="sm" />
                <LabelledCell label="Exit point" value={st.exit} size="sm" />
              </LabelledCellGroup>
            </div>
          ))}
        </div>
        <SquareList items={modelRules} className="mt-10 max-w-prose text-[15px] text-steel" />
      </Section>

      <ClosingBand />
    </>
  );
}
