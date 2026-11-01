import Image from "next/image";
import Link from "next/link";
import { Rail } from "./rail";
import { LabelledCell, LabelledCellGroup } from "./labelled-cell";
import { contact } from "@/lib/site";

const services = [
  { href: "/services#portals", label: "Client & Supplier Portals", color: "bg-orange" },
  { href: "/services#automation", label: "Workflow Automation Pipelines", color: "bg-purple" },
  { href: "/services#dashboards", label: "Real-Time ERP & Operations Dashboards", color: "bg-green" },
  { href: "/services#custom", label: "Custom Software Development", color: "bg-mist" },
];

const columns = [
  { title: "Company", links: [["About", "/about"], ["Work", "/work"], ["Process", "/process"], ["Contact", "/contact"]] },
  { title: "Get started", links: [["Book a discovery call", "/contact"], ["Start a Blueprint", "/contact?brief=blueprint"], ["Platform", "/services#system"]] },
  { title: "Legal", links: [["Privacy", "/privacy"], ["Terms", "/terms"]] },
];

// Mirrors the business card back: navy grid, rail, colour mark, tagline and contact cells.
export function Footer() {
  return (
    <footer className="surface-navy relative border-t border-navy-cell">
      <Rail className="absolute inset-y-0 left-0" />
      <div className="mx-auto flex max-w-content flex-col gap-12 px-6 pb-8 pt-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-4">
            <Image src="/brand/logo.png" alt="Farman Labs" width={45} height={56} />
            <p className="text-[22px] font-extrabold uppercase text-white">Farman Labs <span className="text-orange">Inc.</span></p>
            <p className="text-mist">Modern Software Infrastructure for Physical Operations</p>
            <p className="path-line">// farman-labs / inc</p>
          </div>
          <div className="col-span-2 md:col-span-4">
            <p className="mb-3 font-mono text-label uppercase text-slate">What we build</p>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.href} className="flex items-center gap-3">
                  <span aria-hidden className={`h-2 w-2 shrink-0 ${s.color}`} />
                  <Link href={s.href} className="font-semibold text-white hover:underline">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-4">
            {columns.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="mb-3 font-mono text-label uppercase text-slate">{c.title}</p>
                <ul className="flex flex-col gap-2">
                  {c.links.map(([label, href]) => (
                    <li key={href}><Link href={href} className="text-[15px] text-mist hover:text-white">{label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <LabelledCellGroup tone="dark">
          <LabelledCell label="Phone" value={contact.phone} href={contact.phoneHref} />
          <LabelledCell label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <LabelledCell label="Web" value={contact.web} href={`https://${contact.web}`} />
        </LabelledCellGroup>
        <div className="flex flex-wrap justify-between gap-4 border-t border-navy-cell pt-6 text-[14px] text-slate">
          <span>© {new Date().getFullYear()} Farman Labs Inc. · {contact.name}, {contact.title}</span>
          <span className="font-mono text-label uppercase">// farman-labs / end-of-page</span>
        </div>
      </div>
    </footer>
  );
}
