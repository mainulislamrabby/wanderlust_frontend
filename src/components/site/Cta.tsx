import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/CTA.png')",
      }}
      aria-labelledby="cta-heading"
    >
      <div aria-hidden className="absolute inset-0 bg-slate-950/50" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center text-white md:py-24">
        <h2
          id="cta-heading"
          className="font-heading text-4xl font-semibold md:text-5xl"
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button className="mt-8 rounded-sm bg-white text-xs font-semibold tracking-wider text-slate-900 uppercase hover:bg-white/80">
          Book Your Trip Today
          <ArrowRight className="ml-1 size-4" />
        </Button>
      </div>
    </section>
  );
}
