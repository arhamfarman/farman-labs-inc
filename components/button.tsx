import Link from "next/link";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";
type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  tone?: "dark" | "light"; // surface the button sits on; affects secondary only
  className?: string; // layout only (width, margin); colour classes are not accepted
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "color" | "style">;

// Primary hard-codes navy text on orange (7.1:1). There is no prop for text colour, so white-on-orange cannot be written.
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-btn font-bold transition " +
  "active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-12 px-6 text-[16px]",
  lg: "h-14 px-7 text-[17px]",
};

const variants = {
  primary: "bg-orange text-navy hover:bg-orange-hover focus-visible:ring-offset-navy",
  "secondary-dark": "border-[1.5px] border-white text-white hover:bg-white/10 focus-visible:ring-offset-navy",
  "secondary-light": "border-[1.5px] border-navy text-navy hover:bg-navy/5 focus-visible:ring-offset-white",
} as const;

export function Button({ href, variant = "primary", size = "md", tone = "dark", className = "", children, ...rest }: Props) {
  const key = variant === "primary" ? "primary" : (`secondary-${tone}` as const);
  const cls = `${base} ${sizes[size]} ${variants[key]} ${className}`;
  return href ? (
    <Link href={href} className={cls}>{children}</Link>
  ) : (
    <button className={cls} {...rest}>{children}</button>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-link">
      {children} <span aria-hidden className="arrow">→</span>
    </Link>
  );
}
