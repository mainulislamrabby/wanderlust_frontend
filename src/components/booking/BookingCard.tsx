"use client";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import React from "react";

const SUPPORT_CHECKLIST = [
  "Free cancellations up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

interface Destination {
  price?: number;
  departure?: string;
}

interface BookingCardProps {
  destination: Destination;
}

const BookingCard = ({ destination }: BookingCardProps) => {
  const price = destination.price ?? 0;
  const departure = destination.departure ?? "";

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const departure = e.target.departure.value;
    const data = {
      userName: user?.name,
      email: user?.email,
      image: user?.image,
      ...destination,
      departure: departure,
      bookingDate: new Date(),
    };

    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const bookingRes = await res.json();
    console.log(bookingRes);
  };

  return (
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

            <form onSubmit={handleBooking}>
              {/* Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <input
                  type="date"
                  name="departure"
                  defaultValue={departure}
                  className="w-full pl-10 pr-3 py-2.5 border border-input rounded-lg bg-card text-sm text-foreground focus:outline-none"
                />
              </div>

              {/* Book button */}
              <Button
                type="submit"
                className="cursor-pointer w-full bg-sky-500 text-white hover:bg-sky-600"
              >
                Book Now
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </form>

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
  );
};

export default BookingCard;
