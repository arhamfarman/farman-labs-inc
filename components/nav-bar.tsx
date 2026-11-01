"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./button";
import { Rail } from "./rail";

const services = [
  { href: "/services#portals", name: "Client & Supplier Portals", text: "Order intake, file upload and live tracking", square: "bg-orange" },
  { href: "/services#automation", name: "Workflow Automation Pipelines", text: "Invoice and email parsing, ERP syncing", square: "bg-purple" },
  { href: "/services#dashboards", name: "Real-Time ERP & Operations Dashboards", text: "Job boards, field dispatch, inventory", square: "bg-green" },
  { href: "/services#custom", name: "Custom Software Development", text: "Full-stack builds for unusual operations", square: "bg-navy" },
];

const links = [
  { href: "/services#system", label: "Platform" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [path]);
  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    const onClick = (e: MouseEvent) => !megaRef.current?.contains(e.target as Node) && setMega(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [mega]);

  const linkCls = (active: boolean) =>
    `text-[15px] font-semibold decoration-orange decoration-2 underline-offset-[10px] ${active ? "underline" : "hover:underline"}`;

  return (
    <header className={`sticky top-0 z-50 h-16 text-white transition-colors md:h-[72px] ${scrolled ? "bg-navy/90 backdrop-blur" : "bg-navy"} border-b border-navy-cell`}>
      <nav className="mx-auto flex h-full max-w-content items-center justify-between gap-6 px-6" aria-label="Main">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Farman Labs Inc. home">
          <Image src="/brand/logo.png" alt="" width={26} height={32} priority />
          <span className="text-[15px] font-extrabold uppercase tracking-[0.04em]">
            Farman Labs <span className="text-orange">Inc.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          <li ref={megaRef} onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button
              type="button"
              aria-expanded={mega}
              aria-controls="services-menu"
              onClick={() => setMega(!mega)}
              className={`flex h-[72px] items-center gap-1 ${linkCls(path.startsWith("/services"))}`}
            >
              Services <ChevronDown aria-hidden size={16} className={`transition-transform ${mega ? "rotate-180" : ""}`} />
            </button>
            {mega && (
              <div id="services-menu" className="absolute inset-x-0 top-full border-b border-hairline bg-white text-navy shadow-[0_24px_48px_-24px_rgba(17,24,39,0.35)]">
                <div className="mx-auto grid max-w-content grid-cols-12 gap-8 px-6 py-8">
                  <div className="col-span-8">
                    <p className="mb-4 font-mono text-label uppercase text-orange-ink">// farman-labs / services</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {services.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className="flex gap-4 rounded-cell p-4 transition hover:bg-paper">
                            <span aria-hidden className={`mt-1.5 h-2.5 w-2.5 shrink-0 ${s.square}`} />
                            <span className="flex flex-col gap-1">
                              <span className="font-bold">{s.name}</span>
                              <span className="text-[14px] text-steel">{s.text}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/services#system" className="surface-navy relative col-span-4 flex flex-col justify-between gap-6 overflow-hidden rounded-cell p-6 pl-8">
                    <Rail className="absolute inset-y-0 left-0" />
                    <span className="flex flex-col gap-2">
                      <span className="path-line">// farman-labs / platform</span>
                      <span className="text-[20px] font-extrabold uppercase leading-tight text-white">One database.<br /><span className="text-orange">Every screen.</span></span>
                      <span className="text-[14px]">See how portals, pipelines and dashboards share one source of truth.</span>
                    </span>
                    <span className="text-link text-[14px]">How it connects <span aria-hidden className="arrow">→</span></span>
                  </Link>
                </div>
              </div>
            )}
          </li>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={path === l.href ? "page" : undefined} className={linkCls(path === l.href)}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/contact?brief=1" className="text-[15px] font-semibold hover:underline">Contact</Link>
          <Button href="/contact" size="sm">Book a discovery call</Button>
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
          {open ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="surface-navy fixed inset-0 top-16 flex flex-col gap-6 overflow-y-auto p-6 lg:hidden">
          <div className="flex flex-col gap-3">
            <span className="path-line">// farman-labs / services</span>
            {services.map((s) => (
              <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="flex items-center gap-3 text-[18px] font-bold text-white">
                <span aria-hidden className={`h-2 w-2 shrink-0 ${s.square === "bg-navy" ? "bg-mist" : s.square}`} />
                {s.name}
              </Link>
            ))}
          </div>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-[28px] font-extrabold uppercase text-white">
              {l.label}
            </Link>
          ))}
          <Button href="/contact" className="mt-auto w-full">Book a discovery call</Button>
        </div>
      )}
    </header>
  );
}
