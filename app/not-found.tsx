import { Hero } from "@/components/hero";
import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <Hero
      path="// farman-labs / 404"
      line1="Page not"
      line2="found."
      lead="That address doesn't lead anywhere. Try the home page, or get in touch."
      actions={
        <>
          <Button href="/">Go home</Button>
          <Button href="/contact" variant="secondary">Contact</Button>
        </>
      }
    />
  );
}
