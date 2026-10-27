import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EditDestination from "@/components/buttons/EditDestination";
import DeleteDestination from "@/components/buttons/DeleteDestination";

const HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];

const SUPPORT_CHECKLIST = [
  "Free cancellations up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const DestinationDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/destination/${id}`);
  const destination = await res.json();

  const title = destination.name ?? "Destination";
  const country = destination.country ?? "";
  const description = destination.description ?? "";
  const duration = destination.duration ?? "";
  const price = destination.price ?? 0;
  const departure = destination.departure ?? "";
  const image = destination.image ?? "/images/Banner.png";
  const rating = destination.rating ?? 4.9;
  const reviewCount = destination.reviewCount ?? 234;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Top bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          render={<Link href="/destinations" />}
        >
          <ArrowLeft />
          Back to Destinations
        </Button>
        <div className="flex items-center gap-3">
          <EditDestination destination={destination}
          />

          <DeleteDestination id={id} />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_340px]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Hero image */}
          <Card className="overflow-hidden border bg-card">
            <CardContent
              className="p-0 h-100 md:h-125"
            >
              <Image
                src={image}
                alt={title}
                width={1200}
                height={675}
                priority
                className="h-full w-full object-cover"
              />
            </CardContent>
          </Card>

          {/* Title row */}
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className="bg-sky-500/10 text-sky-600 hover:bg-sky-500/20"
            >
              {country}
            </Badge>
            <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
              {title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 text-sky-500 font-medium">
                <Star className="size-4" />
                {rating} ({reviewCount} reviews)
              </div>
              <span className="w-px h-3 bg-neutral-300" />
              <div className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {duration}
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Overview</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              Highlights
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-sky-500 shrink-0" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4 md:sticky md:top-8">
          <Card className="overflow-hidden border bg-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Price */}
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Starting from
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    $<span className="text-foreground">{price}</span>
                    <span className="text-sm font-medium text-muted-foreground ml-1">
                      per person
                    </span>
                  </p>
                </div>

                {/* Date */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    readOnly
                    value={departure}
                    className="w-full pl-10 pr-3 py-2.5 border border-input rounded-lg bg-card text-sm text-foreground focus:outline-none"
                    disabled
                  />
                </div>

                {/* Book button */}
                <Button className="cursor-pointer w-full bg-sky-500 text-white hover:bg-sky-600">
                  Book Now
                  <ArrowRight className="ml-1 size-4" />
                </Button>

                {/* Checklist */}
                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  {SUPPORT_CHECKLIST.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="size-3.5 text-sky-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed text-muted-foreground">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
