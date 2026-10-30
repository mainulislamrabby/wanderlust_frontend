import { Banner } from "@/components/site/Banner";
import { Cta } from "@/components/site/Cta";
import Featured from "@/components/site/Featured";


import { Testimonials } from "@/components/site/Testimonials";
import { WhyChoose } from "@/components/site/Why-choose";

export default function Home() {
  return (
    <div>
      <Banner />
      <Featured/>
      <WhyChoose />
      <Testimonials />
      <Cta />
    </div>
  );
}
