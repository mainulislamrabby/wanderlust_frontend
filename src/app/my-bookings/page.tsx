import MyBookingCard from "@/components/booking/MyBookingCard";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

import { headers } from "next/headers";

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

const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">My Bookings</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Please sign in to view your bookings.
        </p>
      </div>
    );
  }
  const token = await getTokenFromServer()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user.email}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookingsData = await res.json();

  const bookings = Array.isArray(bookingsData)
    ? bookingsData
    : (bookingsData.bookings ?? []);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
        <h1 className="text-3xl font-normal tracking-tight sm:text-4xl">
          My Bookings
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage and view your upcoming travel plans
        </p>

        <div className="mt-6 space-y-3">
          {bookings.length > 0 ? (
            bookings.map((booking: Booking, index: number) => (
              <MyBookingCard
                key={booking._id ?? booking.id ?? index}
                booking={booking}
              />
            ))
          ) : (
            <div className="rounded-md border px-6 py-12 text-center">
              <p className="text-lg font-medium">No bookings yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Your travel bookings will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyBookings;
