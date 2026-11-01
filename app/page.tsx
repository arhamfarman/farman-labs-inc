import Link from "next/link";
import Image from "next/image";
import { PhotoCredits, photos } from "@/lib/photos";
import { Check, Clock, HardHat, KeyRound, Printer, Receipt, Truck, Warehouse } from "lucide-react";
import { Button, TextLink } from "@/components/button";
import { LabelledCell, LabelledCellGroup } from "@/components/labelled-cell";
import { Section, SectionHeading } from "@/components/section";
import { Rail } from "@/components/rail";
import { BrowserFrame } from "@/components/browser-frame";
import { AppMock, CodeMock, LiveBadge, PortalMock } from "@/components/mocks";
import { CompareBars, IconTile, MetricCard, MiniBars, StatusRing } from "@/components/visuals";
import { WorkflowPipeline } from "@/components/workflow-pipeline";
import { DayCompare, PainCards, type Moment } from "@/components/story";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { EmailCapture } from "@/components/email-capture";
import { Reveal } from "@/components/reveal";
import { CaseCard } from "@/components/case-card";
import { ClosingBand } from "@/components/closing-band";
import { serviceByKey, type Service } from "@/lib/services";
import { steps } from "@/lib/site";
import { getCaseStudies } from "@/lib/work";

const industries = [
  { icon: Printer, name: "Commercial printing", photo: photos.printing },
  { icon: Warehouse, name: "Distribution", photo: photos.distribution },
  { icon: Truck, name: "Logistics", photo: photos.logistics },
  { icon: HardHat, name: "Trade contractors", photo: photos.trades },
];

const principles = [
  { icon: Clock, title: "See it working in weeks", text: "Your first release is live in 2–3 weeks, not after a nine-month ERP rollout." },
  { icon: Receipt, title: "Know the price first", text: "A small paid Blueprint fixes the scope and the quote before any build starts." },
  { icon: KeyRound, title: "Keep everything", text: "Your code, your data, your accounts. Leave whenever you like, with a full handover." },
];

// The same working day, before and after. Illustrative, not a client account.
const moments: Moment[] = [
  { time: "08:10", before: "A customer calls for the third time about one order.", after: "They check live status in their portal. Nobody's phone rings.", fix: "Client portal", color: "orange" },
  { time: "09:30", before: "A print file arrives at 72 dpi. Prepress finds out at four.", after: "The portal rejects it on upload and tells the customer how to fix it.", fix: "File preflight", color: "orange" },
  { time: "11:00", before: "Someone spends the morning typing supplier invoices into QuickBooks.", after: "They were read, checked and posted before anyone got in.", fix: "Automation pipeline", color: "purple" },
  { time: "15:30", before: "The spreadsheet and the books disagree on stock. Which is right?", after: "There's one database, so every screen shows the same number.", fix: "Shared database", color: "navy" },
  { time: "17:45", before: "You walk the floor to find out what's running late.", after: "You already know. It's on your phone, flagged in orange.", fix: "Live dashboard", color: "green" },
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
        <p className={`font-mono text-label uppercase ${dark ? "text-slate" : "text-steel"}`}>{service.name}</p>
      </div>
      <h3 className={`text-h3 font-extrabold ${dark ? "text-white" : ""}`}>{service.hook}</h3>
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
          <p className="path-line">// farman-labs / software-for-physical-operations</p>
          <h1 className="h-display text-white">
            <span className="block animate-fade-up">Run your floor.</span>
            <span className="line-2 animate-fade-up [animation-delay:80ms]">Not your inbox.</span>
          </h1>
          <p className="max-w-[56ch] text-lead text-mist">
            Orders by email, invoices typed twice, job status on a whiteboard. It costs your team hours every day. We build the
            portals, automations and live dashboards that take that work off their plate.
          </p>
          <EmailCapture secondary={<Button href="#sound-familiar" variant="secondary" size="lg">See if this is you</Button>} />
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
        <div className="mx-auto flex max-w-content flex-col gap-6 px-6 pb-16 pt-44 md:pt-64">
          <p className="text-center font-mono text-label uppercase text-steel">For teams that make, move and store real things</p>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {industries.map((i) => (
              <li key={i.name} className="relative aspect-[4/5] overflow-hidden rounded-cell bg-navy md:aspect-[4/3]">
                <Image src={i.photo.src} alt={i.photo.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 text-[16px] font-bold text-white">
                  <i.icon aria-hidden size={18} strokeWidth={1.75} className="shrink-0 text-orange" />
                  {i.name}
                </p>
              </li>
            ))}
          </ul>
          <PhotoCredits list={industries.map((i) => i.photo)} className="text-center" />
        </div>
      </section>

      {/* 3 · The problem, in scenes the visitor recognises */}
      <Section surface="paper" id="sound-familiar">
        <SectionHeading
          path="// 01 / sound-familiar"
          line1="Sound"
          line2="familiar?"
          lead="None of this is anyone's fault. It's what happens when a growing operation still runs on email, spreadsheets and memory."
        />
        <div className="mt-12"><PainCards /></div>
      </Section>

      {/* 4 · The turn: the same day, with a system behind it */}
      <Section surface="white">
        <SectionHeading path="// 02 / picture-this" line1="Same day." line2="Different ending." lead="Here's an ordinary Tuesday, before and after." />
        <Reveal className="mt-12"><DayCompare moments={moments} /></Reveal>
      </Section>

      {/* 5 · The fix: four services, each led by the problem it solves */}
      <Section surface="paper">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            path="// 03 / the-fix"
            line1="Start with"
            line2="what hurts most."
            lead="Each system works on its own and connects to the others when you're ready."
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

      {/* 6 · How it works: one invoice, start to finish, then the targets it is measured against */}
      <Section surface="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            path="// 04 / how-it-works"
            line1="Follow one invoice."
            line2="Nobody types it."
            lead="This is how we automate your workflow: the document goes in, the data lands where it belongs, and your team only steps in when something looks wrong."
          />
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

      {/* 7 · Platform band */}
      <section className="surface-navy relative overflow-hidden">
        <Rail className="absolute inset-y-0 left-0" />
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 py-[72px] md:py-28 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <SectionHeading
              dark
              path="// 05 / one-source-of-truth"
              line1="Enter it once."
              line2="See it everywhere."
              lead="Your portal, your pipelines, QuickBooks and your dashboards share one database. Your team stops reconciling numbers and starts trusting them."
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

      {/* 8 · Why it's a safe bet */}
      <Section surface="white">
        <SectionHeading
          path="// 06 / no-big-bet"
          line1="Low risk."
          line2="No lock-in."
          lead="Changing how your operation runs is a big decision. We keep each step small, so you can stop at any of them."
        />
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

      {/* 9 · Case studies as spec sheets */}
      <Section surface="paper">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading path="// 07 / proof" line1="Built for teams" line2="like yours." />
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
                  to see what your system would look like is a Blueprint.
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

      {/* 10 · Getting started */}
      <Section surface="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading path="// 08 / getting-started" line1="Three steps." line2="An exit after each." />
          <TextLink href="/process">How it works</TextLink>
        </div>
        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.key} className="flex flex-col overflow-hidden rounded-cell border border-hairline bg-white">
              <span aria-hidden className={`h-1 ${railColor[s.accent]}`} />
              <div className="flex flex-col gap-3 p-6">
                <p className="font-mono text-label text-steel">{s.n}</p>
                <h3 className="text-h3 font-extrabold">{s.short}</h3>
                <p className="text-[15px] text-steel"><span className="font-semibold text-navy">If you stop here: </span>{s.exit}</p>
              </div>
              <LabelledCellGroup columns={1} className="mx-6 mb-6 mt-auto">
                <LabelledCell size="sm" label="Price" value={s.price} />
                <LabelledCell size="sm" label="Duration" value={s.duration} />
              </LabelledCellGroup>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[15px] text-steel">
          You&rsquo;ll work directly with Arham Farman, whose family business, Farman Printing Press, ran on exactly that kind of Tuesday.{" "}
          <Link href="/about" className="font-semibold text-orange-ink hover:underline">Why we do this</Link>
        </p>
      </Section>

      <ClosingBand />
    </>
  );
}
