"use client";
import { useState } from "react";

type NodeId = "customers" | "suppliers" | "email" | "portals" | "pipelines" | "data" | "erp" | "dashboards" | "staff";

const accentStroke = { orange: "#F58634", purple: "#6666CC", green: "#99CC99" } as const;

const nodes: { id: NodeId; x: number; y: number; w: number; h: number; name: string; sub: string; accent?: keyof typeof accentStroke; data?: boolean }[] = [
  { id: "customers", x: 24, y: 24, w: 200, h: 56, name: "Customers", sub: "Place and track orders" },
  { id: "suppliers", x: 268, y: 24, w: 200, h: 56, name: "Suppliers", sub: "Confirm, upload docs" },
  { id: "email", x: 512, y: 24, w: 200, h: 56, name: "Email and PDFs", sub: "Inbound orders, invoices" },
  { id: "portals", x: 24, y: 112, w: 444, h: 64, name: "Client & Supplier Portals", sub: "Sign in, submit, approve and track", accent: "orange" },
  { id: "pipelines", x: 512, y: 112, w: 200, h: 64, name: "Automation Pipelines", sub: "Read, check and route", accent: "purple" },
  { id: "data", x: 24, y: 232, w: 444, h: 56, name: "Supabase Postgres + Storage", sub: "One source of truth for orders, documents, statuses", data: true },
  { id: "erp", x: 512, y: 232, w: 200, h: 56, name: "QuickBooks / ERP", sub: "Bridged both ways" },
  { id: "dashboards", x: 24, y: 344, w: 444, h: 64, name: "Real-Time Dashboards", sub: "Live orders, throughput and exceptions", accent: "green" },
  { id: "staff", x: 512, y: 344, w: 200, h: 64, name: "Staff and owner", sub: "Act on what they see" },
];

const edges: { from: NodeId; to: NodeId; d: string; both?: boolean; label?: { text: string; x: number; y: number; anchor?: "middle" } }[] = [
  { from: "customers", to: "portals", d: "M124 80V112" },
  { from: "suppliers", to: "portals", d: "M368 80V112" },
  { from: "email", to: "pipelines", d: "M612 80V112" },
  { from: "portals", to: "data", d: "M246 176V232", label: { text: "writes", x: 254, y: 208 } },
  { from: "pipelines", to: "data", d: "M612 176V204H400V232", label: { text: "writes", x: 620, y: 196 } },
  { from: "data", to: "erp", d: "M468 260H512", both: true, label: { text: "sync", x: 490, y: 252, anchor: "middle" } },
  { from: "data", to: "dashboards", d: "M246 288V344", label: { text: "live reads", x: 254, y: 320 } },
  { from: "dashboards", to: "staff", d: "M468 376H512" },
];

export function ArchitectureDiagram({ tone = "dark", simple = false, className = "" }: {
  tone?: "dark" | "light"; simple?: boolean; className?: string;
}) {
  const [active, setActive] = useState<NodeId | null>(null);
  const dark = tone === "dark";
  const c = dark
    ? { box: "#2A3344", fill: "#111827", dataFill: "#1B2230", ink: "#FFFFFF", quiet: "#9CA3AF", edge: "#6B7280", hot: "#F58634" }
    : { box: "#D1D5DB", fill: "#FFFFFF", dataFill: "#F9FAFB", ink: "#111827", quiet: "#6B7280", edge: "#9CA3AF", hot: "#C2410C" };

  const related = (id: NodeId) =>
    !active || id === active || edges.some((e) => (e.from === active && e.to === id) || (e.to === active && e.from === id));
  const hotEdge = (e: (typeof edges)[number]) => active !== null && (e.from === active || e.to === active);

  return (
    <svg
      viewBox="0 0 736 432"
      role="group"
      aria-label="System architecture: customers, suppliers and email feed portals and pipelines, which write to one Supabase database. QuickBooks syncs with it and dashboards read from it live for staff."
      className={`h-auto w-full ${className}`}
      fontFamily="var(--font-jakarta), sans-serif"
    >
      <defs>
        <marker id={`arrow-${tone}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={c.edge} />
        </marker>
        <marker id={`arrow-hot-${tone}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={c.hot} />
        </marker>
      </defs>
      <g fill="none" strokeWidth="1.5">
        {edges.map((e) => {
          const hot = hotEdge(e);
          const m = `url(#${hot ? "arrow-hot" : "arrow"}-${tone})`;
          return (
            <g key={e.d} className="transition-opacity" opacity={active && !hot ? 0.25 : 1}>
              <path d={e.d} stroke={hot ? c.hot : c.edge} markerEnd={m} markerStart={e.both ? m : undefined} />
              {e.label && !simple && (
                <text x={e.label.x} y={e.label.y} textAnchor={e.label.anchor} fontSize="12" fill={c.quiet} stroke="none">{e.label.text}</text>
              )}
            </g>
          );
        })}
      </g>
      {nodes.map((n) => {
        const stroke = n.accent ? accentStroke[n.accent] : c.box;
        return (
          <g
            key={n.id}
            tabIndex={0}
            aria-label={`${n.name}: ${n.sub}`}
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.id)}
            onBlur={() => setActive(null)}
            className="cursor-default outline-none transition-opacity"
            opacity={related(n.id) ? 1 : 0.3}
          >
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="10" fill={n.data ? c.dataFill : c.fill} stroke={stroke} strokeWidth={n.accent || active === n.id ? 2 : 1.25} />
            {n.accent && <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="10" fill={stroke} fillOpacity="0.12" />}
            {n.accent && <rect x={n.x + 16} y={n.y + (simple ? n.h / 2 - 4 : 18)} width="8" height="8" fill={stroke} />}
            <text
              x={n.x + (n.accent ? 32 : 16)}
              y={simple ? n.y + n.h / 2 + 5 : n.y + 26}
              fontSize="14"
              fontWeight="700"
              fill={c.ink}
            >
              {n.name}
            </text>
            {!simple && (
              <text x={n.x + 16} y={n.y + 44} fontSize="12" fill={c.quiet}>{n.sub}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
