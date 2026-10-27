import { Banner } from "@/components/site/Banner";
import { Cta } from "@/components/site/Cta";

import { Testimonials } from "@/components/site/Testimonials";
import { WhyChoose } from "@/components/site/Why-choose";

export default function Home() {
  return (
    <div>
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </div>
  );
}
