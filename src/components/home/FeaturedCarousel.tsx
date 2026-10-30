"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";

import { Destination } from "../site/Featured";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeaturedCarouselProps {
  destinations: Destination[];
}

const FeaturedCarousel = ({ destinations }: FeaturedCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const firstCard = container.firstElementChild as HTMLElement;

    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 12;

    setActiveIndex(Math.round(container.scrollLeft / cardWidth));
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const firstCard = container.firstElementChild as HTMLElement;

    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 12;

    container.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden py-12">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Featured Destinations
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Button
            variant="outline"
            className="h-9 rounded-none border-sky-300 px-3 text-[10px] font-normal uppercase tracking-wide text-sky-600 hover:bg-sky-50"
          >
            <Link href="/destinations">
              All Destinations
              <ArrowRight className="ml-2 size-3" />
            </Link>
          </Button>
        </div>

        {/* Destination Carousel */}
        {destinations.length > 0 ? (
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {destinations.map((destination) => (
              <Card
                key={destination._id}
                className="w-70 min-w-70 shrink-0 snap-start overflow-hidden rounded-none border-0 shadow-none sm:w-77.5 sm:min-w-77.5"
              >
                <CardContent className="p-2">
                  {/* Image */}
                  <div className="relative h-45 w-full sm:h-49.5">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      unoptimized
                      sizes="310px"
                      className="object-cover"
                    />

                    {/* Rating */}
                    <Badge className="absolute right-2 top-2 rounded-none bg-white px-2 py-1 text-[10px] font-medium text-black hover:bg-white">
                      {destination.rating ?? "4.5"}
                      <Star className="ml-1 size-3 fill-black" />
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="pt-3">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="size-3" />
                      {destination.country}
                    </div>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <h3 className="truncate text-base font-medium">
                        {destination.name}
                      </h3>

                      <p className="shrink-0 text-sm font-medium">
                        ${destination.price}
                        <span className="text-[9px] text-muted-foreground">
                          /Person
                        </span>
                      </p>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <CalendarDays className="size-3" />
                      {destination.duration}
                    </div>

                    {/* Book Now */}
                    <Link
                      href={`/destinations/${destination._id}`}
                      className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium uppercase text-sky-600 hover:text-sky-800"
                    >
                      Book Now
                      <ArrowUpRight className="size-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No featured destinations available.
          </div>
        )}

        {/* Carousel Footer */}
        {destinations.length > 0 && (
          <div className="mt-5 flex items-center gap-5">
            <span className="text-sm font-medium tabular-nums">
              {activeIndex + 1}/{destinations.length}
            </span>

            <div className="h-px flex-1 bg-border" />

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full"
                disabled={activeIndex === 0}
                onClick={() => scrollCarousel("left")}
                aria-label="Previous destination"
              >
                <ArrowLeft className="size-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full"
                disabled={activeIndex >= destinations.length - 1}
                onClick={() => scrollCarousel("right")}
                aria-label="Next destination"
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCarousel;
