import React from "react";

const accentBg = { orange: "bg-orange", purple: "bg-purple", green: "bg-green", navy: "bg-navy group-data-[tone=dark]/cells:bg-mist" } as const;
const valueSize = { sm: "text-[15px]", md: "text-[20px]", lg: "text-[40px] leading-none font-extrabold" } as const;
const cols = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" } as const;

type Tone = "dark" | "light";
export type Accent = keyof typeof accentBg;

export function LabelledCellGroup({ tone = "light", columns, className = "", children }: {
  tone?: Tone; columns?: 1 | 2 | 3 | 4; className?: string; children: React.ReactNode;
}) {
  const n = (columns ?? Math.min(4, React.Children.count(children))) as 1 | 2 | 3 | 4;
  const dark = tone === "dark";
  // Dividers are the 1 px gap showing the border colour through, so they hold on any number of rows.
  return (
    <dl
      data-tone={tone}
      className={[
        "group/cells grid grid-cols-1 gap-px overflow-hidden rounded-cell border",
        n > 1 && "sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2",
        n > 2 && "lg:[&>*:last-child:nth-child(odd)]:col-span-1",
        cols[n],
        dark ? "border-navy-cell bg-navy-cell" : "border-hairline bg-hairline",
        className,
      ].filter(Boolean).join(" ")}
    >
      {children}
    </dl>
  );
}

export function LabelledCell({ label, value, size = "md", accent, href, children }: {
  label: string; value: React.ReactNode; size?: keyof typeof valueSize; accent?: Accent; href?: string; children?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1 bg-white px-5 py-4 group-data-[tone=dark]/cells:bg-navy">
      <dt className="flex items-center gap-2 font-mono text-label uppercase text-steel group-data-[tone=dark]/cells:text-slate">
        {accent && <span aria-hidden className={`h-2 w-2 ${accentBg[accent]}`} />}
        {label}
      </dt>
      <dd className={`break-words font-bold text-navy group-data-[tone=dark]/cells:text-white ${valueSize[size]}`}>
        {href ? <a href={href} className="hover:underline">{value}</a> : value}
      </dd>
      {children}
    </div>
  );
}
