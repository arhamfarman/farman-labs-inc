export function Rail({ direction = "vertical", className = "" }: { direction?: "vertical" | "horizontal"; className?: string }) {
  const v = direction === "vertical";
  return (
    <div aria-hidden className={`flex ${v ? "w-1.5 origin-top animate-rail-draw flex-col" : "h-1 flex-row gap-2"} ${className}`}>
      <span className={`bg-orange ${v ? "flex-1" : "w-10"}`} />
      <span className={`bg-purple ${v ? "flex-1" : "w-10"}`} />
      <span className={`bg-green ${v ? "flex-1" : "w-10"}`} />
    </div>
  );
}
