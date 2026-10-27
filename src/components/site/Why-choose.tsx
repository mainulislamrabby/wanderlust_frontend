import { Headset, Map, ShieldCheck, type LucideIcon } from "lucide-react";

const FEATURES: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="w-full bg-sky-50">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-20">
        <h2 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
          Why Choose Wanderlast
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-10 grid gap-6 text-left md:grid-cols-3 md:gap-8">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-card p-8">
              <Icon className="size-8 text-sky-500" strokeWidth={2} />
              <h3 className="mt-4 text-xl font-medium text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
