import { Button } from "./button";
import { Rail } from "./rail";
import { EmailCapture } from "./email-capture";

export function ClosingBand() {
  return (
    <section className="surface-navy relative overflow-hidden">
      <Rail className="absolute inset-y-0 left-0" />
      <div className="mx-auto grid max-w-content grid-cols-1 items-end gap-10 px-6 py-[72px] md:grid-cols-12 md:py-28">
        <div className="flex flex-col gap-6 md:col-span-7">
          <p className="path-line">// farman-labs / next-step</p>
          <h2 className="h-display text-white">
            See what your operation
            <span className="line-2">could run on.</span>
          </h2>
          <Rail direction="horizontal" />
        </div>
        <div className="flex flex-col gap-4 md:col-span-5">
          <p className="text-lead text-mist">Tell us where work gets re-typed, chased or lost. We&rsquo;ll show you the system that removes it.</p>
          <EmailCapture fill secondary={<Button href="/contact?brief=blueprint" variant="secondary" size="lg">Start with a Blueprint</Button>} />
          <p className="text-[14px] text-slate">A 30-minute call with the founder. No sales team, no obligation.</p>
        </div>
      </div>
    </section>
  );
}
