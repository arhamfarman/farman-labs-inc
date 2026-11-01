// Photos from Unsplash (free licence), saved in public/images. Credit is not required, but we give it.
export type Photo = { src: string; alt: string; by: string; href: string };

const unsplash = (slug: string) => `https://unsplash.com/photos/${slug}`;

export const photos = {
  printing: { src: "/images/printing.jpg", alt: "Printed sheets running through an offset press", by: "Bank Phrom", href: unsplash("Tzm3Oyu_6sk") },
  distribution: { src: "/images/distribution.jpg", alt: "A forklift driving down a racked warehouse aisle", by: "Bernd Dittrich", href: unsplash("F2C_mSrb6iM") },
  logistics: { src: "/images/logistics.jpg", alt: "A driver unloading boxes from a delivery truck onto a dolly", by: "chansu shin", href: unsplash("YjjAU8eQjDc") },
  trades: { src: "/images/trades.jpg", alt: "A builder in a hard hat framing a timber structure", by: "Josh Olalde", href: unsplash("EWoU3snzadU") },
  heritagePress: { src: "/images/heritage-press.jpg", alt: "A vintage printing press in a workshop", by: "Lennert Naessens", href: unsplash("EgB66PkGZbQ") },
} satisfies Record<string, Photo>;

export function PhotoCredits({ list, className = "" }: { list: Photo[]; className?: string }) {
  return (
    <p className={`text-[12px] text-steel ${className}`}>
      Photos:{" "}
      {list.map((p, i) => (
        <span key={p.href}>
          <a href={p.href} className="hover:underline" target="_blank" rel="noopener noreferrer">{p.by}</a>
          {i < list.length - 1 ? ", " : ""}
        </span>
      ))}{" "}
      on Unsplash
    </p>
  );
}
