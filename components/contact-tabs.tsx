"use client";
import { useState } from "react";
import { IntakeForm } from "./intake-form";
import { contact } from "@/lib/site";

const tabs = [
  { key: "book", label: "Book a call" },
  { key: "write", label: "Prefer to write?" },
] as const;

export function ContactTabs({ initialTab, initialServices, initialEmail }: { initialTab: "book" | "write"; initialServices: string[]; initialEmail?: string }) {
  const [tab, setTab] = useState<"book" | "write">(initialTab);
  const cal = process.env.NEXT_PUBLIC_CAL_LINK;

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="How to get in touch" className="flex gap-1 border-b border-hairline">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls={`panel-${t.key}`}
            onClick={() => setTab(t.key)}
            className={`-mb-px h-12 border-b-2 px-4 text-[15px] font-semibold ${tab === t.key ? "border-orange text-navy" : "border-transparent text-steel hover:text-navy"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="panel-book" aria-labelledby="tab-book" hidden={tab !== "book"}>
        {cal ? (
          <iframe
            title="Book a 30-minute discovery call"
            src={`https://cal.com/${cal}?embed=true&layout=month_view&theme=light&brandColor=%23F58634`}
            className="h-[680px] w-full rounded-cell border border-hairline"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col gap-4 rounded-cell border border-dashed border-hairline bg-paper p-8">
            <p className="path-line">// farman-labs / contact / booking</p>
            <p className="text-h3 font-extrabold">30-minute discovery call</p>
            <p className="text-steel">
              Online booking is being set up. Until then, email{" "}
              <a href={`mailto:${contact.email}?subject=Discovery%20call`} className="font-semibold text-navy underline">{contact.email}</a>{" "}
              or call <a href={contact.phoneHref} className="font-semibold text-navy underline">{contact.phone}</a> and we&rsquo;ll find a time.
            </p>
          </div>
        )}
      </div>

      <div role="tabpanel" id="panel-write" aria-labelledby="tab-write" hidden={tab !== "write"}>
        <IntakeForm initialServices={initialServices} initialEmail={initialEmail} />
      </div>
    </div>
  );
}
