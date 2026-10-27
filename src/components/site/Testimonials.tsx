"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// TODO: swap the last two placeholder testimonials/images for real ones
const TESTIMONIALS = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical. Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person1.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person2.png",
  },
  {
    quote:
      "The Tokyo Tour Was Flawless From Start To Finish. Our Guide Made Every Temple And Street Market Come Alive. We Can't Wait To Book Again!",
    name: "David Lee",
    location: "Toronto, Canada",
    image: "/images/person1.png",
  },
  {
    quote:
      "Santorini Was A Dream! The Sunset Cruise And The Charming Villages Were Beyond Anything We Imagined. Every Detail Was Handled For Us.",
    name: "Emma Williams",
    location: "London, UK",
    image: "/images/person2.png",
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-card py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Carousel opts={{ align: "start", loop: true }}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 pb-1">
              <CarouselPrevious className="static size-10 text-muted-foreground" />
              <CarouselNext className="static size-10 text-muted-foreground" />
            </div>
          </div>

          <CarouselContent className="mt-8">
            {TESTIMONIALS.map(({ quote, name, location, image }) => (
              <CarouselItem key={name} className="md:basis-1/2">
                <figure className="flex h-full gap-4 border bg-card p-6 md:gap-6">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <blockquote className="font-heading text-lg leading-snug font-medium text-foreground italic">
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-auto pt-6">
                      <p className="text-sm font-medium text-sky-500">
                        &mdash; {name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {location}
                      </p>
                    </figcaption>
                  </div>
                  <Image
                    src={image}
                    alt={name}
                    width={218}
                    height={264}
                    className="size-28 self-start object-cover md:size-44"
                  />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
