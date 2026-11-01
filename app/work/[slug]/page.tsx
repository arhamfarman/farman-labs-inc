import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Rail } from "@/components/rail";
import { LabelledCell, LabelledCellGroup } from "@/components/labelled-cell";
import { Section, SquareList } from "@/components/section";
import { BrowserFrame } from "@/components/browser-frame";
import { DashboardMock } from "@/components/dashboard-mock";
import { ArchStrip } from "@/components/arch-strip";
import { ClosingBand } from "@/components/closing-band";
import { getCaseStudies, getCaseStudy } from "@/lib/work";
import { serviceByKey } from "@/lib/services";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudies().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? { title: study.title, description: study.system } : {};
}

const mdxComponents = {
  h2: (p: React.ComponentProps<"h2">) => <h2 className="mb-3 mt-10 text-h3 font-extrabold" {...p} />,
  p: (p: React.ComponentProps<"p">) => <p className="mb-4 text-steel" {...p} />,
};

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const all = getCaseStudies();
  const next = all.length > 1 ? all[(all.findIndex((s) => s.slug === slug) + 1) % all.length] : undefined;

  return (
    <>
      <section className="surface-navy relative overflow-hidden">
        <Rail className="absolute inset-y-0 left-0" />
        <div className="mx-auto flex max-w-content flex-col gap-6 px-6 pb-16 pt-[72px] md:pb-28 md:pt-32">
          <p className="path-line">// farman-labs / work / {study.slug}</p>
          <p className="flex flex-wrap items-center gap-3 font-semibold text-mist">
            {study.client}
            {study.demo && <span className="rounded-full border border-navy-cell px-3 py-1 font-mono text-label uppercase text-white">Demo build, not a client project</span>}
          </p>
          <h1 className="h-display max-w-4xl text-white">{study.title}</h1>
          <LabelledCellGroup tone="dark" columns={4}>
            <LabelledCell size="sm" label="Industry" value={study.industry} />
            <LabelledCell size="sm" label="Friction" value={study.friction} />
            <LabelledCell size="sm" label="System built" value={study.system} />
            <LabelledCell size="sm" label="Measured outcome" value={study.outcome} />
          </LabelledCellGroup>
        </div>
      </section>

      <Section surface="white">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <article className="md:col-span-7">
            <MDXRemote source={study.body} components={mdxComponents} />
          </article>
          <aside className="flex flex-col gap-8 md:col-span-5">
            <BrowserFrame url={`${study.slug}.app`}>
              <DashboardMock compact />
            </BrowserFrame>
            <div>
              <h2 className="mb-3 font-mono text-label uppercase text-steel">Features built</h2>
              <SquareList items={study.features} />
            </div>
            <ArchStrip active={study.services[0]} />
          </aside>
        </div>
      </Section>

      <Section surface="paper">
        <h2 className="mb-6 font-mono text-label uppercase text-steel">The build</h2>
        <LabelledCellGroup columns={3}>
          <LabelledCell label="Blueprint" value={`${study.blueprintWeeks} weeks`} accent="orange" />
          <LabelledCell label="Build" value={`${study.buildWeeks} weeks`} accent="purple" />
          <LabelledCell label="Launch" value={study.launched ?? (study.demo ? "Demo only" : "TBC")} accent="green" />
        </LabelledCellGroup>

        <h2 className="mb-6 mt-16 font-mono text-label uppercase text-steel">The result</h2>
        <LabelledCellGroup columns={study.results.length as 1 | 2 | 3 | 4}>
          {study.results.map((r) => (
            <LabelledCell key={r.label} label={r.label} value={r.after}>
              <p className="text-[14px] text-steel">Before: {r.before}</p>
            </LabelledCell>
          ))}
        </LabelledCellGroup>
        {study.quote && (
          <blockquote className="mt-12 max-w-3xl">
            <p className="text-[1.5rem] font-extrabold leading-snug">&ldquo;{study.quote.text}&rdquo;</p>
            <footer className="mt-3 font-mono text-[14px] text-steel">— {study.quote.name}, {study.quote.role}</footer>
          </blockquote>
        )}
        {next && (
          <p className="mt-12">
            <Link href={`/work/${next.slug}`} className="text-link">Next case study: {next.title} <span aria-hidden className="arrow">→</span></Link>
          </p>
        )}
      </Section>

      <ClosingBand />
    </>
  );
}
