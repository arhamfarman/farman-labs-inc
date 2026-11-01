import type { Metadata } from "next";
import Image from "next/image";
import { Rail } from "@/components/rail";
import { LabelledCell, LabelledCellGroup } from "@/components/labelled-cell";
import { Section, SectionHeading, SquareList } from "@/components/section";
import { ContactTabs } from "@/components/contact-tabs";
import { contact } from "@/lib/site";
import { services } from "@/lib/services";

const square = { orange: "bg-orange", purple: "bg-purple", green: "bg-green", navy: "bg-white" } as const;

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 30-minute discovery call or send a project brief.",
};

const known = ["portals", "automation", "dashboards", "custom", "not-sure"];

const next = [
  { n: "01", title: "We talk for 30 minutes", text: "You walk through where work gets re-typed, chased or lost. No slides, no sales team.", bar: "bg-orange" },
  { n: "02", title: "You get a written summary", text: "Within one business day: the likely system, a rough budget and whether a Blueprint makes sense.", bar: "bg-purple" },
  { n: "03", title: "Blueprint, if it fits", text: "A $500–$1,000 Blueprint maps the process and fixes the build quote. You own it either way.", bar: "bg-green" },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string; brief?: string; email?: string }> }) {
  const { service, brief, email } = await searchParams;
  const initialServices = service && known.includes(service) ? [service] : [];
  const initialTab = brief ? "write" : "book";

  return (
    <>
      {/* Hero: copy on the left, the booking and brief card on the right, overhanging into the next section */}
      <section className="surface-navy relative">
        <Rail className="absolute inset-y-0 left-0" />
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 pb-16 pt-[72px] md:pt-28 lg:grid-cols-12 lg:pb-28">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <p className="path-line">// farman-labs / contact</p>
            <h1 className="h-display text-white">
              <span className="block animate-fade-up">Let&rsquo;s map</span>
              <span className="line-2 animate-fade-up [animation-delay:80ms]">your operation.</span>
            </h1>
            <p className="text-lead text-mist">Book a 30-minute call, or send a short brief and I&rsquo;ll reply within one business day.</p>
            <div>
              <p className="mb-3 font-mono text-label uppercase text-slate">On the call we cover</p>
              <SquareList items={["Where orders, invoices and jobs get re-typed", "Which tools you run today and what they cost you", "The smallest system that removes the worst of it"]} className="text-mist" />
            </div>
            <LabelledCellGroup tone="dark" columns={3}>
              <LabelledCell size="sm" label="Reply" value="1 business day" accent="orange" />
              <LabelledCell size="sm" label="Call" value="30 minutes" accent="purple" />
              <LabelledCell size="sm" label="With" value="The founder" accent="green" />
            </LabelledCellGroup>
          </div>
          <div className="lg:col-span-7">
            <div className="surface-light relative z-10 rounded-[12px] border border-hairline bg-white p-6 text-navy shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] md:p-8 lg:-mb-56">
              <div className="mb-6 flex items-center justify-between font-mono text-label uppercase text-steel">
                <span>Spec sheet · Project brief</span>
                <span className="flex items-center gap-2"><span aria-hidden className="h-2 w-2 rounded-full bg-green" />Taking new projects</span>
              </div>
              <ContactTabs initialTab={initialTab} initialServices={initialServices} initialEmail={email?.slice(0, 200)} />
            </div>
          </div>
        </div>
      </section>

      {/* What happens next, and the business card */}
      <Section surface="paper" innerClassName="lg:!pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading path="// farman-labs / contact / next" line1="What happens" line2="next." />
            <ol className="flex flex-col gap-4">
              {next.map((s) => (
                <li key={s.n} className="flex overflow-hidden rounded-cell border border-hairline bg-white">
                  <span aria-hidden className={`w-1.5 shrink-0 ${s.bar}`} />
                  <div className="flex flex-col gap-1 p-5">
                    <p className="font-mono text-label text-steel">{s.n}</p>
                    <p className="font-bold">{s.title}</p>
                    <p className="text-[15px] text-steel">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="lg:col-span-7 lg:pt-44">
            {/* mirrors the business card back */}
            <div className="surface-navy relative flex flex-col gap-6 overflow-hidden rounded-cell p-8 pl-10">
              <Rail className="absolute inset-y-0 left-0" />
              <div className="flex items-start justify-between gap-4">
                <p className="path-line">// farman-labs / team / arham-farman</p>
                <Image src="/brand/logo.png" alt="" width={32} height={40} />
              </div>
              <div>
                <p className="text-[28px] font-extrabold uppercase leading-tight text-white">{contact.name}</p>
                <p className="text-[14px] font-extrabold uppercase tracking-[0.02em] text-orange">{contact.title}</p>
                <p className="mt-1 text-[14px] text-mist">{contact.line}</p>
              </div>
              <div>
                <p className="mb-2 font-mono text-label uppercase text-slate">What we build</p>
                <ul className="flex flex-col gap-1 font-semibold text-white">
                  {services.map((s) => (
                    <li key={s.key} className="flex items-center gap-3">
                      <span aria-hidden className={`h-2 w-2 shrink-0 ${square[s.accent]}`} />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
              <LabelledCellGroup tone="dark" columns={1}>
                <LabelledCell size="sm" label="Phone" value={contact.phone} href={contact.phoneHref} />
                <LabelledCell size="sm" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
                <LabelledCell size="sm" label="Web" value={contact.web} href={`https://${contact.web}`} />
              </LabelledCellGroup>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
