// The home page story: the problems a visitor recognises, then the same day with a system behind it.
// Every name, time and job in the scenes is illustrative.
import type { LucideIcon } from "lucide-react";
import { ArrowDown, Check, ClipboardX, Keyboard, PhoneIncoming, X } from "lucide-react";
import { IconTile, type Series } from "./visuals";

const scene = "rounded-[8px] border border-hairline bg-paper p-3 text-[12px]";
const label = "font-mono text-[10px] uppercase tracking-[0.08em] text-steel";
const seriesBg = { navy: "bg-navy", orange: "bg-orange", purple: "bg-purple", green: "bg-green" } as const;

function Retyped() {
  return (
    <div aria-hidden className="flex flex-col gap-2">
      <div className={scene}>
        <p className={label}>Email · 08:02</p>
        <p className="font-semibold text-navy">&ldquo;500 menu cards, 130 gsm, by Friday?&rdquo;</p>
      </div>
      <ArrowDown size={14} className="mx-auto text-slate" />
      <div className={`${scene} font-mono`}>
        <p className={label}>orders-2026.xlsx · row 214</p>
        <p className="text-navy">J-2041 · Menu cards · <span className="text-orange-ink">50</span><span className="animate-pulse">|</span></p>
      </div>
    </div>
  );
}

function Chased() {
  const calls = [["08:14", "Northside Dental", "Any update?"], ["09:40", "Harbor Café", "Has it shipped?"], ["10:05", "Northside Dental", "Calling again"]];
  return (
    <div aria-hidden className={scene}>
      <p className="mb-2 flex items-center justify-between">
        <span className={label}>Calls before lunch</span>
        <span className="rounded-full bg-orange/15 px-2 font-mono text-[10px] font-bold text-orange-ink">3</span>
      </p>
      <ul className="flex flex-col gap-1.5">
        {calls.map(([t, who, what]) => (
          <li key={t} className="flex items-center gap-2">
            <PhoneIncoming size={12} className="shrink-0 text-steel" />
            <span className="font-mono text-[10px] text-steel">{t}</span>
            <span className="truncate font-semibold text-navy">{who}</span>
            <span className="ml-auto truncate text-steel">{what}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Lost() {
  const rows = [["J-2038", "Catalogue", "Press 2", false], ["J-2039", "Labels", "?", true], ["J-2040", "Flyers", "ask Sam", true]];
  return (
    <div aria-hidden className={scene}>
      <p className={`${label} mb-2`}>Whiteboard · Tuesday</p>
      <ul className="flex flex-col gap-1.5 font-mono text-[11px]">
        {rows.map(([id, job, where, unsure]) => (
          <li key={id as string} className={`flex justify-between ${unsure ? "text-slate" : "text-navy"}`}>
            <span>{id} · {job}</span>
            <span className={unsure ? "text-orange-ink" : ""}>{where}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 border-t border-hairline pt-2 text-steel">Sam is out today.</p>
    </div>
  );
}

const pains: { icon: LucideIcon; color: Series; verb: string; text: string; scene: () => React.JSX.Element }[] = [
  { icon: Keyboard, color: "orange", verb: "Re-typed", text: "Every order is typed twice, and every typo becomes a reprint.", scene: Retyped },
  { icon: PhoneIncoming, color: "purple", verb: "Chased", text: "Your best people spend the morning answering “where’s my order?”", scene: Chased },
  { icon: ClipboardX, color: "green", verb: "Lost", text: "Status lives on a whiteboard and in someone’s head. When they’re out, so is the answer.", scene: Lost },
];

export function PainCards() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {pains.map((p) => (
        <li key={p.verb} className="flex flex-col gap-5 rounded-cell border border-hairline bg-white p-6">
          <div className="flex items-center gap-3">
            <IconTile icon={p.icon} color={p.color === "green" ? "orange" : p.color} marker={p.color} />
            <p className="text-h3 font-extrabold">{p.verb}</p>
          </div>
          <p className="text-steel">{p.text}</p>
          <div className="mt-auto"><p.scene /></div>
        </li>
      ))}
    </ul>
  );
}

export type Moment = { time: string; before: string; after: string; fix: string; color: Series };

/** One working day, side by side: how it goes today, and how it goes with the system in place. */
export function DayCompare({ moments }: { moments: Moment[] }) {
  return (
    <div className="overflow-hidden rounded-cell border border-hairline bg-white">
      <div className="hidden grid-cols-[96px_1fr_1fr] border-b border-hairline bg-paper font-mono text-label uppercase text-steel md:grid">
        <span className="px-5 py-3">Time</span>
        <span className="border-l border-hairline px-5 py-3">Today</span>
        <span className="border-l border-hairline px-5 py-3">With the right system</span>
      </div>
      <ol>
        {moments.map((m) => (
          <li key={m.time} className="grid grid-cols-1 border-b border-hairline last:border-0 md:grid-cols-[96px_1fr_1fr]">
            <span className="px-5 pt-5 font-mono text-[15px] font-bold text-navy md:py-5">{m.time}</span>
            <p className="flex gap-3 px-5 py-2 text-steel md:border-l md:border-hairline md:py-5">
              <X aria-hidden size={16} className="mt-1 shrink-0 text-slate" />
              <span><span className="sr-only">Today: </span>{m.before}</span>
            </p>
            <div className="flex gap-3 px-5 pb-5 pt-2 md:border-l md:border-hairline md:py-5">
              <Check aria-hidden size={16} className="mt-1 shrink-0 text-green-ink" />
              <div className="flex flex-col items-start gap-2">
                <p className="font-semibold text-navy"><span className="sr-only">With the right system: </span>{m.after}</p>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-steel">
                  <span aria-hidden className={`h-1.5 w-1.5 ${seriesBg[m.color]}`} />
                  {m.fix}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
