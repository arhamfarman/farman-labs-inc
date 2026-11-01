import Link from "next/link";
import { HardHat, Printer, Truck, Warehouse } from "lucide-react";
import { Button, TextLink } from "@/components/button";
import { LabelledCell, LabelledCellGroup } from "@/components/labelled-cell";
import { Section, SectionHeading, SquareList } from "@/components/section";
import { Rail } from "@/components/rail";
import { BrowserFrame } from "@/components/browser-frame";
import { AppMock, CodeMock, LiveBadge, PortalMock } from "@/components/mocks";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { EmailCapture } from "@/components/email-capture";
import { Reveal } from "@/components/reveal";
import { CaseCard } from "@/components/case-card";
import { ClosingBand } from "@/components/closing-band";
import { serviceByKey } from "@/lib/services";
import { steps } from "@/lib/site";
import { getCaseStudies } from "@/lib/work";

const industries = [
  { icon: Printer, name: "Commercial printing" },
  { icon: Warehouse, name: "Distribution" },
  { icon: Truck, name: "Logistics" },
  { icon: HardHat, name: "Trade contractors" },
];

const principles = [
  { title: "Enter data once", text: "Portals, pipelines and dashboards share one database, so nobody re-types an order, an invoice or a status." },
  { title: "Ship in weeks", text: "A fixed-scope first release goes live in 2–3 weeks. Larger systems ship in phases, each with its own quote." },
  { title: "You own it", text: "The code sits in your repository and the data in your database from day one, with a documented handover." },
];

const railColor = { orange: "bg-orange", purple: "bg-purple", green: "bg-green" } as const;

function BentoCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <article className={`flex flex-col overflow-hidden rounded-cell border border-hairline bg-white ${className}`}>{children}</article>;
}

function BentoHead({ path, square, name, promise }: { path: string; square: string; name: string; promise: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="path-line">{path}</p>
      <h3 className="flex items-start gap-3 text-h3 font-extrabold">
        <span aria-hidden className={`mt-2 h-2.5 w-2.5 shrink-0 ${square}`} />
        {name}
      </h3>
      <p className="text-steel">{promise}</p>
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
          <p className="max-w-[60ch] text-lead text-mist">
            We design and build the portals, automations and live dashboards that run printing presses, distributors, logistics
            firms and trade contractors. Every order, invoice and job is entered once and visible everywhere.
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
              <div className="flex flex-col gap-5 p-6 md:p-8">
                <BentoHead path={portals.path} square="bg-orange" name={portals.name} promise={portals.promise} />
                <SquareList items={portals.bullets} className="text-[15px]" />
                <LabelledCellGroup columns={2} className="mt-auto">
                  <LabelledCell size="sm" label="Target · order entry" value="60–80% less time" />
                  <LabelledCell size="sm" label="File checks" value="On upload" />
                </LabelledCellGroup>
                <TextLink href="/services#portals">Explore portals</TextLink>
              </div>
              <div className="flex items-center bg-paper p-4 md:p-6">
                <BrowserFrame url="portal.yourcompany.com" className="w-full"><PortalMock /></BrowserFrame>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-2">
            <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
              <BentoHead path={dashboards.path} square="bg-green" name={dashboards.name} promise={dashboards.promise} />
              <SquareList items={dashboards.bullets} className="text-[15px]" />
              <LabelledCellGroup columns={2} className="mt-auto">
                <LabelledCell size="sm" label="System status" value={<span className="inline-flex items-center gap-2"><span aria-hidden className="h-2 w-2 rounded-full bg-green" />Live</span>} />
                <LabelledCell size="sm" label="Refresh" value="None needed" />
              </LabelledCellGroup>
              <TextLink href="/services#dashboards">Explore dashboards</TextLink>
            </div>
          </BentoCard>

          <article className="surface-navy relative flex flex-col overflow-hidden rounded-cell lg:col-span-4">
            <Rail className="absolute inset-y-0 left-0" />
            <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col gap-5 p-6 pl-8 md:p-8 md:pl-10">
                <div className="flex flex-col gap-3">
                  <p className="path-line">{custom.path}</p>
                  <h3 className="text-h3 font-extrabold text-white">{custom.name}</h3>
                  <p>{custom.promise}</p>
                </div>
                <SquareList items={custom.bullets} className="text-[15px]" />
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
            <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
              <BentoHead path={automation.path} square="bg-purple" name={automation.name} promise={automation.promise} />
              <SquareList items={automation.bullets} className="text-[15px]" />
              <LabelledCellGroup columns={1} className="mt-auto">
                <LabelledCell size="sm" label="Target · hours saved" value="10–30 a week per team" />
              </LabelledCellGroup>
              <TextLink href="/services#automation">Explore automation</TextLink>
            </div>
          </BentoCard>

        </div>
        <p className="mt-4 text-[14px] text-steel">Figures marked &ldquo;target&rdquo; are what we measure against your baseline in each engagement, not past results.</p>
      </Section>

      {/* 4 · Platform band */}
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

      {/* 5 · Why Farman Labs */}
      <Section surface="white">
        <SectionHeading path="// farman-labs / principles" line1="Engineered for" line2="the floor, not the slide deck." />
        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-cell border border-hairline bg-hairline md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title} className="flex flex-col gap-3 bg-white p-8">
              <span aria-hidden className={`h-3 w-3 ${["bg-orange", "bg-purple", "bg-green"][i]}`} />
              <h3 className="text-h3 font-extrabold">{p.title}</h3>
              <p className="text-steel">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6 · Case studies as spec sheets */}
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

      {/* 7 · Engagement model */}
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
