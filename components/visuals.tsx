// Small graphic primitives: icon tiles, mini charts, metric cards and a step-by-step pipeline.
// Chart colours follow the series order Navy, Orange, Purple, Green. On navy, the navy series is drawn in mist.
import { Fragment } from "react";
import type { LucideIcon } from "lucide-react";

export type Series = "navy" | "orange" | "purple" | "green";
type Tone = "light" | "dark";

const bg = (s: Series, dark: boolean) =>
  ({ navy: dark ? "bg-mist" : "bg-navy", orange: "bg-orange", purple: "bg-purple", green: "bg-green" })[s];
// Strokes on white use the darker ink shades so thin lines stay visible.
const stroke = (s: Series, dark: boolean) =>
  ({ navy: dark ? "#D1D5DB" : "#111827", orange: "#F58634", purple: "#6666CC", green: dark ? "#99CC99" : "#3F7D3F" })[s];
const iconInk = (s: Series, dark: boolean) =>
  ({ navy: dark ? "text-mist" : "text-navy", orange: dark ? "text-orange" : "text-orange-ink", purple: "text-purple", green: dark ? "text-green" : "text-green-ink" })[s];

const gridLines = (dark: boolean) => {
  const c = dark ? "#1B2230" : "#EEF0F3";
  return { backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`, backgroundSize: "8px 8px" };
};

/** A Lucide line icon on a small square grid, with an optional accent square in the corner. */
export function IconTile({ icon: Icon, color = "orange", marker, tone = "light", size = "md" }: {
  icon: LucideIcon; color?: Series; marker?: Series; tone?: Tone; size?: "sm" | "md";
}) {
  const dark = tone === "dark";
  return (
    <span
      aria-hidden
      style={gridLines(dark)}
      className={`relative inline-flex shrink-0 items-center justify-center rounded-[8px] border ${size === "sm" ? "h-10 w-10" : "h-12 w-12"} ${dark ? "border-navy-cell bg-navy" : "border-hairline bg-white"}`}
    >
      <Icon size={size === "sm" ? 18 : 22} strokeWidth={1.75} className={iconInk(color, dark)} />
      {marker && <span className={`absolute -right-px -top-px h-2 w-2 rounded-tr-[8px] ${bg(marker, dark)}`} />}
    </span>
  );
}

/** Bars in one series colour; every bar except the highlighted last one is muted. */
export function MiniBars({ values, color, tone = "light", all = false, className = "h-12" }: {
  values: number[]; color: Series; tone?: Tone; all?: boolean; className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div aria-hidden className={`flex items-end gap-1 ${className}`}>
      {values.map((v, i) => (
        <span
          key={i}
          className={`flex-1 rounded-t-[2px] ${all || i === values.length - 1 ? bg(color, dark) : dark ? "bg-navy-cell" : "bg-hairline"}`}
          style={{ height: `${v}%` }}
        />
      ))}
    </div>
  );
}

/** A ring filled to `value` percent with a short label in the middle. */
export function StatusRing({ value, color, tone = "light", label, size = 64 }: {
  value: number; color: Series; tone?: Tone; label?: string; size?: number;
}) {
  const dark = tone === "dark";
  const r = 24;
  const c = 2 * Math.PI * r;
  return (
    <span aria-hidden className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 60 60" className="absolute inset-0 -rotate-90">
        <circle cx="30" cy="30" r={r} fill="none" strokeWidth="6" stroke={dark ? "#2A3344" : "#E5E7EB"} />
        <circle cx="30" cy="30" r={r} fill="none" strokeWidth="6" strokeLinecap="round" stroke={stroke(color, dark)} strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      {label && <span className={`font-mono text-[11px] font-bold ${dark ? "text-white" : "text-navy"}`}>{label}</span>}
    </span>
  );
}

/** Today against the target, as two horizontal bars. `level` is the target as a percentage of today. */
export function CompareBars({ level, color, tone = "light", labels = ["Today", "Target"] }: {
  level: number; color: Series; tone?: Tone; labels?: [string, string];
}) {
  const dark = tone === "dark";
  return (
    <div aria-hidden className="flex flex-col gap-1.5">
      {[100, level].map((w, i) => (
        <div key={i} className="grid grid-cols-[52px_1fr] items-center gap-2">
          <span className={`font-mono text-[10px] uppercase tracking-[0.08em] ${dark ? "text-slate" : "text-steel"}`}>{labels[i]}</span>
          <span className={`h-2 rounded-full ${dark ? "bg-navy-grid" : "bg-paper"}`}>
            <span className={`block h-full rounded-full ${i === 0 ? (dark ? "bg-navy-cell" : "bg-mist") : bg(color, dark)}`} style={{ width: `${Math.max(w, 3)}%` }} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** A labelled metric: tiny mono label, bold value, an optional chart and a note. */
export function MetricCard({ label, value, color, note, tone = "light", children, className = "" }: {
  label: string; value: React.ReactNode; color: Series; note?: string; tone?: Tone; children?: React.ReactNode; className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col gap-3 rounded-cell border p-5 ${dark ? "border-navy-cell bg-navy" : "border-hairline bg-white"} ${className}`}>
      <p className={`flex items-center gap-2 font-mono text-label uppercase ${dark ? "text-slate" : "text-steel"}`}>
        <span aria-hidden className={`h-2 w-2 shrink-0 ${bg(color, dark)}`} />
        {label}
      </p>
      <p className={`text-[22px] font-extrabold leading-tight ${dark ? "text-white" : "text-navy"}`}>{value}</p>
      {children && <div className="mt-auto">{children}</div>}
      {note && <p className={`text-[13px] ${dark ? "text-slate" : "text-steel"}`}>{note}</p>}
    </div>
  );
}

export type Stage = { icon: LucideIcon; color: Series; name: string; label: string; detail?: React.ReactNode };

function Connector({ dark }: { dark: boolean }) {
  const c = dark ? "#6B7280" : "#9CA3AF";
  return (
    <li aria-hidden className="flex h-8 shrink-0 items-center justify-center lg:h-auto lg:w-10">
      <svg viewBox="0 0 40 16" className="hidden h-4 w-10 lg:block" fill="none" stroke={c} strokeWidth="1.5">
        <line x1="0" y1="8" x2="34" y2="8" strokeDasharray="4 4" className="animate-dash" />
        <path d="M31 3.5 37.5 8 31 12.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 16 32" className="h-8 w-4 lg:hidden" fill="none" stroke={c} strokeWidth="1.5">
        <line x1="8" y1="0" x2="8" y2="26" strokeDasharray="4 4" className="animate-dash" />
        <path d="M3.5 23 8 29.5 12.5 23" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </li>
  );
}

/** Stages joined by flowing arrows: a row from lg up, a column below. */
export function Pipeline({ stages, tone = "light", label, className = "" }: {
  stages: Stage[]; tone?: Tone; label: string; className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ol aria-label={label} className={`flex flex-col lg:flex-row ${className}`}>
      {stages.map((s, i) => (
        <Fragment key={s.name}>
          <li className={`flex min-w-0 flex-1 flex-col overflow-hidden rounded-cell border ${dark ? "border-navy-cell bg-navy" : "border-hairline bg-white"}`}>
            <span aria-hidden className={`h-1 ${bg(s.color, dark)}`} />
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="flex items-start justify-between">
                <IconTile icon={s.icon} color={s.color} tone={tone} size="sm" />
                <span className={`font-mono text-label ${dark ? "text-slate" : "text-steel"}`}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <p className={`font-mono text-label uppercase ${dark ? "text-slate" : "text-steel"}`}>{s.label}</p>
                <p className={`text-[17px] font-bold ${dark ? "text-white" : "text-navy"}`}>{s.name}</p>
              </div>
              {/* Details sit at the bottom unless they grow themselves (flex-1) to fill the card */}
              {s.detail && <div className="flex flex-1 flex-col justify-end">{s.detail}</div>}
            </div>
          </li>
          {i < stages.length - 1 && <Connector dark={dark} />}
        </Fragment>
      ))}
    </ol>
  );
}
