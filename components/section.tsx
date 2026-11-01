type Surface = "white" | "paper" | "navy";

const surfaces: Record<Surface, string> = {
  white: "surface-light bg-white",
  paper: "surface-light bg-paper",
  navy: "surface-navy",
};

export function Section({ surface = "white", id, className = "", innerClassName = "", children }: {
  surface?: Surface; id?: string; className?: string; innerClassName?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative ${surfaces[surface]} ${className}`}>
      <div className={`mx-auto max-w-content px-6 py-[72px] md:py-28 ${innerClassName}`}>{children}</div>
    </section>
  );
}

export function SectionHeading({ path, line1, line2, lead, dark = false, className = "" }: {
  path?: string; line1: string; line2?: string; lead?: string; dark?: boolean; className?: string;
}) {
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${className}`}>
      {path && <p className="path-line">{path}</p>}
      <h2 className={`h-section ${dark ? "text-white" : "text-navy"}`}>
        {line1}
        {line2 && <span className="line-2">{line2}</span>}
      </h2>
      {lead && <p className={`max-w-[60ch] text-lead ${dark ? "text-mist" : "text-steel"}`}>{lead}</p>}
    </div>
  );
}

// Colour-square bullets always run Orange, Purple, Green, in that order, repeating.
const bulletCycle = ["bg-orange", "bg-purple", "bg-green"];

export function SquareList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {items.map((i, n) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className={`mt-[0.6em] h-2 w-2 shrink-0 ${bulletCycle[n % 3]}`} />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}
