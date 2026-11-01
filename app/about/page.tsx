import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, Code2, Database, KeyRound, LifeBuoy, Lightbulb, Printer } from "lucide-react";
import { Hero } from "@/components/hero";
import { Button, TextLink } from "@/components/button";
import { Rail } from "@/components/rail";
import { LabelledCell, LabelledCellGroup } from "@/components/labelled-cell";
import { Section, SectionHeading, SquareList } from "@/components/section";
import { IconTile, Pipeline, type Stage } from "@/components/visuals";
import { ClosingBand } from "@/components/closing-band";
import { contact } from "@/lib/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About",
  description: "Farman Labs grew out of a family printing press. We build the software that gives teams in physical operations their time back.",
};

const story: Stage[] = [
  {
    icon: Printer,
    color: "orange",
    label: "Where it started",
    name: "A family printing press",
    detail: <p className="text-[14px] text-steel">Orders, deadlines and paper, held together by memory and hard work.</p>,
  },
  {
    icon: Lightbulb,
    color: "purple",
    label: "What it taught us",
    name: "The people were never the problem",
    detail: <p className="text-[14px] text-steel">The re-typing, chasing and guessing came from the systems around them.</p>,
  },
  {
    icon: Code2,
    color: "green",
    label: "What we do now",
    name: "Build the systems they deserve",
    detail: <p className="text-[14px] text-steel">Portals, automations and live dashboards for operations like yours.</p>,
  },
];

const forYou = [
  { icon: Database, label: "Enter data once", text: "One source of truth, synced to every screen and to your books." },
  { icon: CalendarCheck, label: "See progress weekly", text: "A working demo every Friday, not a status report." },
  { icon: KeyRound, label: "Own everything", text: "Code, data and documentation are yours from day one." },
  { icon: LifeBuoy, label: "It keeps working", text: "Proven tools, monitored and documented. Boring on purpose." },
];

const blocks = [
  { letter: "F", colour: "Orange", text: "My father's block, carried over from the Farman Printing Press monogram.", accent: "orange" },
  { letter: "L", colour: "Purple", text: "Labs: the new company, built from the same blocks.", accent: "purple" },
  { letter: "I", colour: "Green", text: "Inc.: the new company, built from the same blocks.", accent: "green" },
] as const;

export default function AboutPage() {
  return (
    <>
      <Hero
        path="// farman-labs / about"
        line1="We come from"
        line2="a printing press."
        lead="We know the phone calls, the late files and the whiteboard, because our family business ran on them. Now we build the software that gives that time back to teams like yours."
        actions={
          <>
            <Button href="/contact" size="lg">Book a discovery call</Button>
            <Button href="/process" variant="secondary" size="lg">How we work</Button>
          </>
        }
        cells={
          <LabelledCellGroup tone="dark" columns={3}>
            <LabelledCell size="sm" label="Grew out of" value="Farman Printing Press" accent="orange" />
            <LabelledCell size="sm" label="Built for" value="Teams like yours" accent="purple" />
            <LabelledCell size="sm" label="You work with" value={contact.name} accent="green" />
          </LabelledCellGroup>
        }
        media={
          <figure className="relative overflow-hidden rounded-[12px] border border-navy-cell bg-navy/70">
            <div className="flex items-center justify-between border-b border-navy-cell px-4 py-3 font-mono text-label uppercase text-slate">
              <span>Mark · FLI</span>
              <span>Rev. 2026</span>
            </div>
            <div className="flex justify-center p-10">
              <Image src="/brand/logo.png" alt="The Farman Labs FLI mark" width={243} height={300} priority className="h-[280px] w-auto" />
            </div>
            <figcaption className="grid grid-cols-3 border-t border-navy-cell font-mono text-label uppercase text-slate">
              {blocks.map((b, i) => (
                <span key={b.letter} className={`flex items-center gap-2 px-4 py-3 ${i > 0 ? "border-l border-navy-cell" : ""}`}>
                  <span aria-hidden className={`h-2 w-2 ${{ orange: "bg-orange", purple: "bg-purple", green: "bg-green" }[b.accent]}`} />
                  {b.letter} · {b.colour}
                </span>
              ))}
            </figcaption>
          </figure>
        }
      />

      {/* The story as three steps, then the heritage and the mark */}
      <Section surface="paper">
        <SectionHeading path="// farman-labs / about / why-we-do-this" line1="Why we" line2="do this." />
        <Pipeline stages={story} label="How Farman Labs came to be" className="mt-12" />

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-6">
          <article className="flex flex-col overflow-hidden rounded-cell border border-hairline bg-white lg:col-span-4">
            <figure className="relative h-56 md:h-64">
              <Image src={photos.heritagePress.src} alt={photos.heritagePress.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              <figcaption className="absolute bottom-2 right-3 rounded-[6px] bg-navy/80 px-2 py-1 text-[11px] text-mist">
                A press like the one it started on · <a href={photos.heritagePress.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{photos.heritagePress.by} / Unsplash</a>
              </figcaption>
            </figure>
            <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
              <p className="path-line">// farman-labs / about / story</p>
              {/* Draft copy. Arham to write the final story. */}
              <p className="text-lead text-steel">
                Farman Printing Press was founded by my late father. Customers called to check on jobs, files arrived in the wrong
                format, and good people lost hours to work a system should have done. Farman Labs exists so your team doesn&rsquo;t have to.
              </p>
              <SquareList items={["Orders entered once, not re-typed", "Status visible without a phone call", "Systems your team owns and understands"]} className="mt-auto" />
            </div>
          </article>
          <figure className="flex flex-col overflow-hidden rounded-cell border border-hairline bg-white lg:col-span-2">
            <div className="border-b border-hairline bg-paper px-5 py-3 font-mono text-label uppercase text-steel">Archive · the original mark</div>
            <div className="flex flex-1 items-center justify-center p-10">
              <Image src="/brand/fpp-logo.png" alt="The original Farman Printing Press monogram" width={200} height={200} className="h-auto w-3/4" />
            </div>
            <figcaption className="border-t border-hairline px-5 py-3 text-[14px] text-steel">Farman Printing Press monogram</figcaption>
          </figure>

          <article className="surface-navy relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-cell p-6 pl-8 md:p-8 md:pl-10 lg:col-span-6 lg:grid-cols-12">
            <Rail className="absolute inset-y-0 left-0" />
            <div className="flex flex-col gap-3 lg:col-span-4">
              <p className="path-line">// farman-labs / about / the-mark</p>
              <h3 className="text-h3 font-extrabold uppercase text-white">The same <span className="text-orange">blocks.</span></h3>
              <p>The orange F is my father&rsquo;s. The L and the I are the new company, built from the same blocks.</p>
            </div>
            <div className="flex items-center justify-center gap-6 lg:col-span-3">
              <span className="rounded-cell bg-white p-3"><Image src="/brand/fpp-logo.png" alt="Farman Printing Press monogram" width={80} height={80} className="h-16 w-auto" /></span>
              <span aria-hidden className="text-[2rem] text-slate">→</span>
              <Image src="/brand/logo.png" alt="Farman Labs FLI mark" width={73} height={90} className="h-20 w-auto" />
            </div>
            <div className="lg:col-span-5">
              <LabelledCellGroup tone="dark" columns={3}>
                {blocks.map((b) => (
                  <LabelledCell key={b.letter} label={`${b.colour} · ${b.letter}`} value={<span className="text-[32px] font-extrabold leading-none">{b.letter}</span>} accent={b.accent}>
                    <p className="text-[13px] text-slate">{b.text}</p>
                  </LabelledCell>
                ))}
              </LabelledCellGroup>
            </div>
          </article>
        </div>
      </Section>

      {/* What that background means for the visitor */}
      <section className="surface-navy relative overflow-hidden">
        <Rail className="absolute inset-y-0 left-0" />
        <div className="mx-auto max-w-content px-6 py-[72px] md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading dark path="// farman-labs / about / for-you" line1="What that" line2="means for you." />
            <TextLink href="/process">See the process</TextLink>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {forYou.map((p, i) => (
              <li key={p.label} className="flex flex-col gap-4 rounded-cell border border-navy-cell bg-navy/70 p-6">
                <div className="flex items-start justify-between">
                  <IconTile icon={p.icon} color={i % 2 === 0 ? "orange" : "purple"} marker={(["orange", "purple", "green", "orange"] as const)[i]} tone="dark" />
                  <span className="font-mono text-label text-slate">0{i + 1}</span>
                </div>
                <p className="font-mono text-label uppercase text-slate">{p.label}</p>
                <p className="text-[18px] font-bold leading-snug text-white">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Founder, laid out like the business card and a spec sheet */}
      <Section surface="white">
        <SectionHeading path="// farman-labs / team" line1="Who you'll" line2="work with." />
        <article className="mt-12 grid grid-cols-1 overflow-hidden rounded-cell border border-hairline md:grid-cols-12">
          <div className="surface-navy relative flex aspect-[4/5] items-center justify-center md:col-span-4 md:aspect-auto md:min-h-[420px]">
            <Rail className="absolute inset-y-0 left-0" />
            {/* Replace with a portrait photo at /public/brand/arham.jpg */}
            <Image src="/brand/logo.png" alt="" width={97} height={120} />
            <p className="absolute bottom-4 left-6 font-mono text-label uppercase text-slate">Portrait coming soon</p>
          </div>
          <div className="flex flex-col md:col-span-8">
            <header className="flex items-center justify-between border-b border-hairline bg-paper px-6 py-3 font-mono text-label uppercase text-steel">
              <span>Spec sheet · Team · 001</span>
              <span>Founder</span>
            </header>
            <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
              <p className="path-line">// farman-labs / team / arham-farman</p>
              <div>
                <h3 className="text-h2 uppercase max-md:text-[2rem]">{contact.name}</h3>
                <p className="text-[15px] font-extrabold uppercase tracking-[0.02em] text-orange-ink">{contact.title}</p>
                <p className="mt-1 font-mono text-[14px] text-steel">{contact.line}</p>
              </div>
              {/* Draft bio. Arham to confirm. */}
              <p className="max-w-prose text-steel">
                You talk to the person who designs and writes your system. No account managers and no hand-offs: Arham
                works through your process with your team, builds the system, and stays on to keep it running.
              </p>
              <SquareList items={["Maps how work moves today, with the people doing it", "Designs and builds the system", "Stays on after launch"]} className="text-[15px]" />
              <LabelledCellGroup columns={3} className="mt-auto">
                <LabelledCell size="sm" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
                <LabelledCell size="sm" label="Phone" value={contact.phone} href={contact.phoneHref} />
                <LabelledCell size="sm" label="LinkedIn" value="Profile link to add" />
              </LabelledCellGroup>
            </div>
          </div>
        </article>
      </Section>

      <ClosingBand />
    </>
  );
}
