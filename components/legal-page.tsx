import { Section } from "./section";

export function LegalPage({ path, title, children }: { path: string; title: string; children: React.ReactNode }) {
  return (
    <Section surface="white">
      <div className="flex max-w-prose flex-col gap-4">
        <p className="path-line">{path}</p>
        <h1 className="h-section">{title}</h1>
        <div className="flex flex-col gap-4 text-steel">{children}</div>
      </div>
    </Section>
  );
}
