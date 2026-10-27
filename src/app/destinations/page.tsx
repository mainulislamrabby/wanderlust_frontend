import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ArrowUpRight, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Destination {
  _id?: string;
  id?: string | number;
  name: string;
  country: string;
  price: number;
  duration: string;
  departure?: string;
  image: string;
  rating?: number;
}

interface DestinationsResponse {
  destinations?: Destination[];
}

const Destinations = async () => {
  let destinations: Destination[] = [];

  try {
    const res = await fetch("http://localhost:5000/destinations", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch destinations: ${res.status}`);
    }

    const data: unknown = await res.json();

    if (Array.isArray(data)) {
      destinations = data as Destination[];
    } else if (
      data !== null &&
      typeof data === "object" &&
      "destinations" in data &&
      Array.isArray((data as DestinationsResponse).destinations)
    ) {
      destinations = (data as DestinationsResponse).destinations!;
    }
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-normal tracking-tight text-gray-900 sm:text-3xl">
            Explore All Destinations
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            Discover amazing places for your next adventure.
          </p>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {destinations.length} destinations
          </p>
        </div>

        {/* Destination grid */}
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, index) => {
              const destinationId = destination._id ?? destination.id;

              return (
                <Card
                  key={destinationId ?? index}
                  className="group overflow-hidden rounded-none border-0 bg-transparent py-0 shadow-none"
                >
                  {/* Destination image */}
                  <div className="relative aspect-2/1 overflow-hidden rounded-sm bg-gray-100">
                    {destination.image ? (
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image available
                      </div>
                    )}

                    {/* Rating */}
                    <Badge
                      variant="secondary"
                      className="absolute right-2 top-2 gap-1 rounded-sm bg-white/95 px-2 py-1 text-xs font-medium text-gray-900 shadow-sm"
                    >
                      {destination.rating ?? 4.5}
                      <Star className="h-3 w-3 fill-current" />
                    </Badge>
                  </div>

                  <CardContent className="space-y-1.5 p-2">
                    {/* Country and price */}
                    <div className="flex items-center justify-between gap-2">
                      <p className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{destination.country}</span>
                      </p>

                      <p className="shrink-0 text-sm font-semibold text-gray-900">
                        ${destination.price}
                        <span className="text-[10px] font-normal text-muted-foreground">
                          /person
                        </span>
                      </p>
                    </div>

                    {/* Destination name */}
                    <h2 className="truncate text-sm font-medium text-gray-900">
                      {destination.name}
                    </h2>

                    {/* Duration */}
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3 shrink-0" />
                      {destination.duration}
                    </p>

                    {/* Booking link */}
                    {destinationId != null && (
                      <Link
                        href={`/destinations/${destination._id}`}
                        className="inline-flex h-auto cursor-pointer items-center justify-start gap-1 px-0 pt-1 text-xs font-medium text-sky-600 hover:text-sky-800"
                      >
                        BOOK NOW
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed text-center">
            <MapPin className="mb-3 h-8 w-8 text-muted-foreground" />

            <h2 className="text-lg font-medium">No destinations found</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add destinations to your database to display them here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Destinations;
