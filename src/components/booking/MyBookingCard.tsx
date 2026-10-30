"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Eye, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

interface Booking {
  _id?: string;
  id?: string;
  destinationId?: string;
  name?: string;
  destination?:
    | string
    | {
        name?: string;
        image?: string;
        country?: string;
      };
  country?: string;
  image?: string;
  price?: number;
  departure?: string;
  status?: string;
}

interface MyBookingCardProps {
  booking: Booking;
}

const MyBookingCard = ({ booking }: MyBookingCardProps) => {
  const handleCancelBooking = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();

    console.log(data);
    redirect("/my-bookings");
  };

  const destination =
    typeof booking.destination === "object" ? booking.destination : undefined;

  const destinationName =
    destination?.name ??
    (typeof booking.destination === "string"
      ? booking.destination
      : booking.name) ??
    "Untitled Destination";

  const image =
    booking.image ??
    destination?.image ??
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4";

  const departure = booking.departure
    ? new Date(booking.departure).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Not scheduled";

  const status = booking.status?.toLowerCase() ?? "pending";
  const isConfirmed = status === "confirmed";

  return (
    <Card className="rounded-none border-border/70 py-0 shadow-none">
      <CardContent className="flex flex-col gap-4 p-3 sm:flex-row sm:items-center sm:gap-3">
        {/* Destination Image */}
        <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-24.5 sm:w-43.5">
          <Image
            src={image}
            alt={destinationName}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 174px"
            className="object-cover"
          />
        </div>

        {/* Booking Information */}
        <div className="min-w-0 flex-1">
          <div className="mb-1">
            <Badge
              variant="outline"
              className={
                isConfirmed
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-amber-100 bg-amber-50 text-amber-700"
              }
            >
              <span
                className={`mr-1 inline-block size-1.5 rounded-full ${
                  isConfirmed ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              {isConfirmed ? "Confirmed" : "Pending"}
            </Badge>
          </div>

          <h2 className="truncate text-lg font-semibold leading-6 tracking-tight">
            {destinationName}
          </h2>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            <span>Departure: {departure}</span>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            <span>Booking ID: {booking._id ?? booking.id ?? "N/A"}</span>
          </div>

          <p className="mt-1.5 text-xl font-medium text-cyan-600">
            ${Number(booking.price ?? 0).toLocaleString("en-US")}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:self-end">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer h-8 rounded-none border-red-300 px-2.5 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleCancelBooking}
          >
            <Trash2 className="size-3.5" />
            Cancel
          </Button>

          <Button
            size="sm"
            className="cursor-pointer h-8 rounded-none bg-cyan-600 px-2.5 text-xs text-white hover:bg-cyan-700"
          >
            <Link
              className="flex items-center gap-1"
              href={`/destinations/${booking.destinationId ?? booking._id ?? booking.id ?? ""}`}
            >
              <Eye className="size-3.5" />
              View
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyBookingCard;
