import { useId } from "react";
import { Button } from "./button";

// Rippling-style inline capture: the email carries over to the Contact form, which opens on the brief tab.
// `fill` stretches the field to its column, for narrow placements such as the closing band.
export function EmailCapture({ cta = "Book a discovery call", secondary, fill = false }: { cta?: string; secondary?: React.ReactNode; fill?: boolean }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <form action="/contact" method="get" className={`flex w-full flex-col gap-3 sm:flex-row ${fill ? "" : "sm:w-auto"}`}>
        <input type="hidden" name="brief" value="1" />
        <label htmlFor={id} className="sr-only">Work email</label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Work email"
          className={`h-14 w-full rounded-btn border border-navy-cell bg-navy/80 px-4 text-[16px] text-white placeholder:text-slate focus:border-mist focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${fill ? "sm:min-w-0 sm:flex-1" : "sm:w-72"}`}
        />
        <Button type="submit" size="lg">{cta}</Button>
      </form>
      {secondary}
    </div>
  );
}
