import { Rail } from "./rail";

type HeroProps = {
  path: string; // e.g. "// farman-labs / home"
  line1: string; // white line
  line2: string; // orange line
  lead: string;
  actions?: React.ReactNode; // <Button/>s
  cells?: React.ReactNode; // <LabelledCellGroup tone="dark"/>
  media?: React.ReactNode; // screenshot or the FLI mark
  overhang?: boolean; // media hangs 64 px below the section (Home)
  children?: React.ReactNode; // extra content under the copy, e.g. a sub-navigation
};

export function Hero({ path, line1, line2, lead, actions, cells, media, overhang, children }: HeroProps) {
  return (
    <section className={`surface-navy relative ${overhang ? "z-10" : "overflow-hidden"}`}>
      <Rail className="absolute inset-y-0 left-0" />
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 pb-16 pt-[72px] md:grid-cols-12 md:pb-28 md:pt-32">
        <div className="flex flex-col gap-6 md:col-span-7">
          <p className="path-line">{path}</p>
          <h1 className="h-display text-white">
            <span className="block animate-fade-up">{line1}</span>
            <span className="line-2 animate-fade-up [animation-delay:80ms]">{line2}</span>
          </h1>
          <p className="max-w-[56ch] text-lead text-mist">{lead}</p>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          {cells}
        </div>
        {media && <div className={`md:col-span-5 md:self-center ${overhang ? "md:-mb-44 md:self-end" : ""}`}>{media}</div>}
      </div>
      {children}
    </section>
  );
}
