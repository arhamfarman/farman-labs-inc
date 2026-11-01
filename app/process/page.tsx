import type { Metadata } from "next";
import { CalendarCheck, ClipboardList, DoorOpen, Hammer, KeyRound, LifeBuoy, Receipt } from "lucide-react";
import { Hero } from "@/components/hero";
import { IconTile, Pipeline } from "@/components/visuals";
import { Button } from "@/components/button";
import { Rail } from "@/components/rail";
import { LabelledCell, LabelledCellGroup } from "@/components/labelled-cell";
import { Section, SectionHeading, SquareList } from "@/components/section";
import { BrowserFrame } from "@/components/browser-frame";
import { TimelineMock } from "@/components/mocks";
import { ClosingBand } from "@/components/closing-band";
import { modelRules, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process",
  description: "Three fixed steps with fixed prices: Blueprint, Build and Retainer, each with a clear exit.",
};

const stepIcon = { blueprint: ClipboardList, build: Hammer, retainer: LifeBuoy } as const;

// Weekly demos and code-in-your-repo are proposed guarantees: confirm before launch.
const guarantees = [
  { icon: Receipt, label: "Fixed quote", value: "No surprise invoices", text: "The Blueprint sets the price. Anything new is a written change order first.", accent: "orange" },
  { icon: CalendarCheck, label: "Weekly demos", value: "Progress every Friday", text: "A working staging link you can click through, not a status report.", accent: "purple" },
  { icon: KeyRound, label: "Your code", value: "In your repository", text: "From day one, with the data in your own database.", accent: "green" },
  { icon: DoorOpen, label: "Exit anytime", value: "Documented handover", text: "Runbook, credentials and architecture notes, ready for any team.", accent: "orange" },
] as const;

// Draft answers written from the engagement model. Review before launch.
const faqs = [
  {
    q: "We're not technical. Is that a problem?",
    a: "Not at all. You tell us how work moves today; we handle the software. Every build comes with training for your team and a plain-English runbook.",
  },
  {
    q: "What if we need changes mid-build?",
    a: "The Build is fixed by the Blueprint. Anything outside that scope becomes a short written change order, with its own price and timeline, before any work starts. Small changes can also wait for the retainer.",
  },
  {
    q: "Who hosts it?",
    a: "The system runs on accounts set up in your company's name, so you are never locked in. On the retainer we handle hosting, monitoring and updates for you.",
  },
  {
    q: "What happens to our data?",
    a: "It stays in your own database, protected with row-level security. You own it outright, and the handover package includes everything needed to move it.",
  },
  {
    q: "Do you work with our existing software?",
    a: "Yes. We connect to QuickBooks, ERPs, spreadsheets and email through their official APIs, so data is entered once and flows to where it belongs.",
  },
  {
    q: "How do you price larger systems?",
    a: "Larger systems ship in phases. Each phase gets its own fixed scope and quote from the Blueprint, and each one goes live in 2–3 weeks.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <Hero
        path="// farman-labs / process"
        line1="You'll always"
        line2="know what's next."
        lead="No big upfront bet. Start with a small paid Blueprint, see your system working within weeks, and stop after any step with something useful in hand."
        actions={
          <>
            <Button href="/contact?brief=blueprint" size="lg">Start with a Blueprint</Button>
            <Button href="/contact" variant="secondary" size="lg">Book a discovery call</Button>
          </>
        }
        cells={
          <LabelledCellGroup tone="dark" columns={3}>
            <LabelledCell size="sm" label="First step" value="$500 Blueprint" accent="orange" />
            <LabelledCell size="sm" label="First release" value="2–3 weeks" accent="purple" />
            <LabelledCell size="sm" label="Retainer" value="Month to month" accent="green" />
          </LabelledCellGroup>
        }
        media={
          <BrowserFrame url="plan.farmanlabs.app">
            <TimelineMock />
            <figcaption className="sr-only">Illustration of a six-week project plan from workshops to go-live</figcaption>
          </BrowserFrame>
        }
      />

      {/* Roadmap: the three steps as one flow, each ending in a decision the client makes */}
      <Section surface="paper">
        <SectionHeading
          path="// farman-labs / process / roadmap"
          line1="Three steps."
          line2="An exit after each."
          lead="You decide at the end of every step whether to keep going. Whatever you decide, you keep what you've paid for."
        />
        <Pipeline
          className="mt-12"
          label="The three steps of an engagement"
          stages={steps.map((s) => ({
            icon: stepIcon[s.key],
            color: s.accent,
            label: `${s.weeks} · ${s.price}`,
            name: s.name,
            detail: (
              <div className="flex flex-1 flex-col gap-4">
                <div>
                  <p className="mb-2 font-mono text-label uppercase text-steel">You get</p>
                  <SquareList items={s.gets} className="text-[15px]" />
                </div>
                <div className="mt-auto rounded-[8px] border border-hairline bg-paper p-3">
                  <p className="mb-1 font-mono text-label uppercase text-steel">If you stop here</p>
                  <p className="text-[15px] font-semibold">{s.exit}</p>
                </div>
              </div>
            ),
          }))}
        />
        <div className="mt-4 rounded-cell border border-hairline bg-white p-6">
          <p className="mb-3 font-mono text-label uppercase text-steel">Rules that keep the model honest</p>
          <SquareList items={modelRules} className="text-[15px] text-steel" />
        </div>
      </Section>

      {/* Guarantees */}
      <section className="surface-navy relative overflow-hidden">
        <Rail className="absolute inset-y-0 left-0" />
        <div className="mx-auto max-w-content px-6 py-[72px] md:py-28">
          <SectionHeading dark path="// farman-labs / process / guarantees" line1="What you can" line2="count on." />
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g, i) => (
              <li key={g.label} className="flex flex-col gap-3 rounded-cell border border-navy-cell bg-navy/70 p-6">
                <IconTile icon={g.icon} color={i % 2 === 0 ? "orange" : "purple"} marker={g.accent} tone="dark" />
                <p className="font-mono text-label uppercase text-slate">{g.label}</p>
                <p className="text-[20px] font-bold leading-snug text-white">{g.value}</p>
                <p className="text-[15px]">{g.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <Section surface="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <SectionHeading path="// farman-labs / process / faq" line1="Questions," line2="answered." />
            <div className="surface-navy relative flex flex-col gap-4 overflow-hidden rounded-cell p-6 pl-8">
              <Rail className="absolute inset-y-0 left-0" />
              <p className="font-bold text-white">Still weighing it up?</p>
              <p className="text-[15px]">A 30-minute call with the founder covers your process, the likely system and a rough budget.</p>
              <div><Button href="/contact">Book a discovery call</Button></div>
            </div>
          </div>
          <div className="divide-y divide-hairline border-y border-hairline lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="font-mono text-[20px] text-orange-ink transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-prose text-steel">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <ClosingBand />
    </>
  );
}
