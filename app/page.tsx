import Link from "next/link";
import { Check, Clock, Database, HardHat, KeyRound, Printer, Truck, Warehouse } from "lucide-react";
import { Button, TextLink } from "@/components/button";
import { LabelledCell, LabelledCellGroup } from "@/components/labelled-cell";
import { Section, SectionHeading } from "@/components/section";
import { Rail } from "@/components/rail";
import { BrowserFrame } from "@/components/browser-frame";
import { AppMock, CodeMock, LiveBadge, PortalMock } from "@/components/mocks";
import { CompareBars, IconTile, MetricCard, MiniBars, StatusRing } from "@/components/visuals";
import { WorkflowPipeline } from "@/components/workflow-pipeline";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { EmailCapture } from "@/components/email-capture";
import { Reveal } from "@/components/reveal";
import { CaseCard } from "@/components/case-card";
import { ClosingBand } from "@/components/closing-band";
import { serviceByKey, type Service } from "@/lib/services";
import { steps } from "@/lib/site";
import { getCaseStudies } from "@/lib/work";

const industries = [
  { icon: Printer, name: "Commercial printing" },
  { icon: Warehouse, name: "Distribution" },
  { icon: Truck, name: "Logistics" },
  { icon: HardHat, name: "Trade contractors" },
];

const principles = [
  { icon: Database, title: "Enter data once", text: "One database behind every portal, pipeline and dashboard." },
  { icon: Clock, title: "Ship in weeks", text: "First release in 2–3 weeks. Bigger systems ship in quoted phases." },
  { icon: KeyRound, title: "You own it", text: "Your repository, your database, a written handover." },
];

const railColor = { orange: "bg-orange", purple: "bg-purple", green: "bg-green" } as const;

function BentoCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <article className={`flex flex-col overflow-hidden rounded-cell border border-hairline bg-white ${className}`}>{children}</article>;
}

function BentoHead({ service, dark = false }: { service: Service; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <IconTile icon={service.icon} color={service.tile} marker={service.accent === "navy" ? undefined : service.accent} tone={dark ? "dark" : "light"} />
        <p className="path-line">{service.path.replace("// farman-labs / services / ", "// ")}</p>
      </div>
      <h3 className={`text-h3 font-extrabold ${dark ? "text-white" : ""}`}>{service.name}</h3>
      <p className={dark ? "" : "text-steel"}>{service.promise}</p>
    </div>
  );
}

export default function Home() {
  const { portals, automation, dashboards, custom } = serviceByKey;
  const studies = getCaseStudies();
  const real = studies.filter((s) => !s.demo);
  const shown = real.length > 0 ? real.slice(0, 2) : studies.slice(0, 1);

  return (
    <>
      {/* 1 · Hero: left-aligned copy and capture, then a full-width product frame that overhangs the next section */}
      <section className="surface-navy relative">
        <Rail className="absolute inset-y-0 left-0" />
        <div className="mx-auto flex max-w-content flex-col gap-8 px-6 pt-[72px] md:pt-28">
          <p className="path-line">// farman-labs / modern-software-infrastructure</p>
          <h1 className="h-display text-white lg:text-[3.6rem] xl:text-[3.75rem]">
            <span className="block animate-fade-up">Modern software infrastructure</span>
            <span className="line-2 animate-fade-up [animation-delay:80ms]">for physical operations.</span>
          </h1>
          <p className="max-w-[52ch] text-lead text-mist">
            Portals, automations and live dashboards for printers, distributors, logistics firms and trade contractors.
          </p>
          <EmailCapture secondary={<Button href="/services" variant="secondary" size="lg">Explore services</Button>} />
          <LabelledCellGroup tone="dark" columns={3} className="max-w-3xl">
            <LabelledCell size="sm" label="Build time" value="2–3 weeks to first release" accent="orange" />
            <LabelledCell size="sm" label="First step" value="$500 paid Blueprint" accent="purple" />
            <LabelledCell size="sm" label="You own" value="The code and the data" accent="green" />
          </LabelledCellGroup>
          <div className="relative z-10 -mb-32 mt-6 md:-mb-48">
            <BrowserFrame url="ops.yourcompany.com/job-board">
              <AppMock />
              <figcaption className="sr-only">Illustration of a Farman Labs operations dashboard: live job board, KPIs and activity feed</figcaption>
            </BrowserFrame>
            {/* Floating callouts: what the pipelines did behind the board */}
            <div aria-hidden className="absolute -left-4 bottom-20 hidden w-64 flex-col gap-2 rounded-cell border border-navy-cell bg-navy p-4 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)] xl:flex">
              <p className="flex items-center gap-2 text-[13px] font-bold text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green/15"><Check size={12} className="text-green" /></span>
                INV-8812 posted to QuickBooks
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate">Parsed 09:14 · posted 09:15 · 0 keystrokes</p>
            </div>
            <div aria-hidden className="absolute -right-4 -top-8 hidden w-56 flex-col gap-2 rounded-cell border border-navy-cell bg-navy p-4 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)] xl:flex">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate">Hours saved · this week</p>
              <p className="text-[24px] font-extrabold leading-none text-white">22 h</p>
              <MiniBars values={[30, 42, 38, 55, 61, 72, 88]} color="orange" tone="dark" className="h-8" />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Industries strip, in place of a client logo wall until clients can be named */}
      <section id="industries" className="surface-light bg-white">
        <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 pb-16 pt-44 md:pt-64">
          <p className="text-center font-mono text-label uppercase text-steel">Built for operations that move, make and store real things</p>
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {industries.map((i) => (
              <li key={i.name} className="flex items-center gap-3 text-[18px] font-bold text-navy">
                <i.icon aria-hidden size={22} strokeWidth={1.75} className="text-steel" />
                {i.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · Four services as a bento grid */}
      <Section surface="paper">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            path="// farman-labs / services"
            line1="Four systems."
            line2="One operation."
            lead="Start with the one that hurts most. Each runs on its own and connects to the others when you're ready."
          />
          <TextLink href="/services">All services</TextLink>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6">
          <BentoCard className="lg:col-span-4">
            <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col gap-6 p-6 md:p-8">
                <BentoHead service={portals} />
                <MetricCard label="Target · order entry time" value="60–80% less" color="orange" className="mt-auto">
                  <CompareBars level={30} color="orange" />
                </MetricCard>
                <TextLink href="/services#portals">Explore portals</TextLink>
              </div>
              <div className="flex items-center bg-paper p-4 md:p-6">
                <BrowserFrame url="portal.yourcompany.com" className="w-full"><PortalMock /></BrowserFrame>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-2">
            <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
              <BentoHead service={dashboards} />
              <MetricCard
                label="Example · on-time jobs"
                value={<span className="flex items-center gap-4"><StatusRing value={96} color="green" label="96%" />Live, no refresh</span>}
                color="green"
                className="mt-auto"
              />
              <TextLink href="/services#dashboards">Explore dashboards</TextLink>
            </div>
          </BentoCard>

          <article className="surface-navy relative flex flex-col overflow-hidden rounded-cell lg:col-span-4">
            <Rail className="absolute inset-y-0 left-0" />
            <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col gap-6 p-6 pl-8 md:p-8 md:pl-10">
                <BentoHead service={custom} dark />
                <LabelledCellGroup tone="dark" columns={2} className="mt-auto">
                  <LabelledCell size="sm" label="Stack" value="Next.js · Supabase" />
                  <LabelledCell size="sm" label="Repository" value="Yours" />
                </LabelledCellGroup>
                <TextLink href="/services#custom">Explore custom builds</TextLink>
              </div>
              <div className="flex items-center p-4 md:p-6">
                <BrowserFrame url="github.com/yourcompany/ops" className="w-full"><CodeMock /></BrowserFrame>
              </div>
            </div>
          </article>
          <BentoCard className="lg:col-span-2">
            <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
              <BentoHead service={automation} />
              <MetricCard label="Target · hours saved a week" value="10–30 h" color="purple" className="mt-auto">
                <MiniBars values={[18, 30, 44, 52, 66, 78, 92]} color="purple" />
              </MetricCard>
              <TextLink href="/services#automation">Explore automation</TextLink>
            </div>
          </BentoCard>

        </div>
        <p className="mt-4 text-[14px] text-steel">Figures marked &ldquo;target&rdquo; are what we measure against your baseline in each engagement, not past results.</p>
      </Section>

      {/* 4 · How we automate: one invoice, start to finish, then the targets it is measured against */}
      <Section surface="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading path="// farman-labs / how-we-automate" line1="How we automate" line2="your workflow." />
          <TextLink href="/services#automation">Automation pipelines</TextLink>
        </div>
        <Reveal className="mt-12"><WorkflowPipeline /></Reveal>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Invoice to books" value="Minutes, not days" color="navy">
            <CompareBars level={5} color="navy" />
          </MetricCard>
          <MetricCard label="Hours saved a week" value="10–30 h" color="orange">
            <MiniBars values={[18, 30, 44, 52, 66, 78, 92]} color="orange" className="h-10" />
          </MetricCard>
          <MetricCard label="Month-end close" value="Days saved" color="purple">
            <CompareBars level={40} color="purple" />
          </MetricCard>
          <MetricCard
            label="Accuracy after review"
            value={<span className="flex items-center justify-between gap-3">Under 1% errors<StatusRing value={99} color="green" label="99%" size={56} /></span>}
            color="green"
          />
        </div>
        <p className="mt-4 text-[14px] text-steel">Targets measured against your baseline in each engagement, not past results.</p>
      </Section>

      {/* 5 · Platform band */}
      <section className="surface-navy relative overflow-hidden">
        <Rail className="absolute inset-y-0 left-0" />
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 py-[72px] md:py-28 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <SectionHeading
              dark
              path="// farman-labs / platform"
              line1="One database."
              line2="Every screen."
              lead="Portals and pipelines write to one Supabase database. QuickBooks stays in sync with it, and the dashboards read from it live."
            />
            <LabelledCellGroup tone="dark" columns={3}>
              <LabelledCell size="sm" label="Entered" value="Once" accent="orange" />
              <LabelledCell size="sm" label="Synced" value="QuickBooks / ERP" accent="purple" />
              <LabelledCell size="sm" label="Updates" value="Real time" accent="green" />
            </LabelledCellGroup>
            <div><TextLink href="/services#system">See how it connects</TextLink></div>
          </div>
          <Reveal className="lg:col-span-7">
            <div className="rounded-cell border border-navy-cell bg-navy/70 p-4 md:p-6">
              <div className="mb-3 flex justify-end"><LiveBadge text="Shared data · live" /></div>
              <ArchitectureDiagram tone="dark" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 · Why Farman Labs */}
      <Section surface="white">
        <SectionHeading path="// farman-labs / principles" line1="Engineered for" line2="the floor, not the slide deck." />
        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-cell border border-hairline bg-hairline md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title} className="flex flex-col gap-4 bg-white p-8">
              <IconTile icon={p.icon} color={i === 1 ? "purple" : "orange"} marker={(["orange", "purple", "green"] as const)[i]} />
              <h3 className="text-h3 font-extrabold">{p.title}</h3>
              <p className="text-steel">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7 · Case studies as spec sheets */}
      <Section surface="paper">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading path="// farman-labs / work" line1="Systems in" line2="production." />
          <TextLink href="/work">All work</TextLink>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {shown.map((s, i) => <CaseCard key={s.slug} study={s} index={i + 1} />)}
          {real.length === 0 && (
            <article className="surface-navy relative flex flex-col overflow-hidden rounded-cell">
              <Rail className="absolute inset-y-0 left-0" />
              <header className="flex items-center justify-between border-b border-navy-cell px-5 py-3 pl-8 font-mono text-label uppercase text-slate">
                <span>Spec sheet · FL-CS-002</span>
                <span>Open</span>
              </header>
              <div className="flex flex-1 flex-col gap-5 p-5 pl-8">
                <h3 className="text-h3 font-extrabold text-white">Your operation, next</h3>
                <p>
                  The first client systems are being built now, and every case study will lead with a measured number. The fastest way
                  to see what we would build for you is a Blueprint.
                </p>
                <LabelledCellGroup tone="dark" columns={2}>
                  <LabelledCell size="sm" label="Blueprint" value="$500–$1,000" />
                  <LabelledCell size="sm" label="Takes" value="1–2 weeks" />
                </LabelledCellGroup>
                <div className="mt-auto"><Button href="/contact?brief=blueprint">Start with a Blueprint</Button></div>
              </div>
            </article>
          )}
        </div>
      </Section>

      {/* 8 · Engagement model */}
      <Section surface="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading path="// farman-labs / process" line1="Fixed steps." line2="Fixed prices." />
          <TextLink href="/process">How we work</TextLink>
        </div>
        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.key} className="flex flex-col overflow-hidden rounded-cell border border-hairline bg-white">
              <span aria-hidden className={`h-1 ${railColor[s.accent]}`} />
              <div className="flex flex-col gap-3 p-6">
                <p className="font-mono text-label text-steel">{s.n}</p>
                <h3 className="text-h3 font-extrabold">{s.short}</h3>
                <p className="text-[15px] text-steel">{s.exit}</p>
              </div>
              <LabelledCellGroup columns={1} className="mx-6 mb-6 mt-auto">
                <LabelledCell size="sm" label="Price" value={s.price} />
                <LabelledCell size="sm" label="Duration" value={s.duration} />
              </LabelledCellGroup>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[15px] text-steel">
          Founded by Arham Farman, carrying forward his father&rsquo;s Farman Printing Press.{" "}
          <Link href="/about" className="font-semibold text-orange-ink hover:underline">Our story</Link>
        </p>
      </Section>

      <ClosingBand />
    </>
  );
}
