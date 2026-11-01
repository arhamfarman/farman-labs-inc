export function BrowserFrame({ url = "app.farmanlabs.com", children, className = "" }: {
  url?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-[12px] border border-navy-cell bg-navy shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-navy-cell px-4 py-3">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-navy-cell" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-navy-cell" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-navy-cell" />
        <span className="ml-3 truncate rounded-[6px] bg-navy-grid px-3 py-1 font-mono text-[11px] text-slate">{url}</span>
      </div>
      {children}
    </figure>
  );
}
