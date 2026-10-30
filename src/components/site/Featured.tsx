import FeaturedCarousel from "../home/FeaturedCarousel";

export interface Destination {
  _id: string;
  name: string;
  country: string;
  price: number;
  duration: string;
  image: string;
  rating?: number;
}

const Featured = async () => {
  let destinations: Destination[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch featured destinations");
    }

    const data = await res.json();

    destinations = Array.isArray(data) ? data : data.destinations || [];
  } catch (error) {
    console.error("Featured destinations error:", error);
  }

  return <FeaturedCarousel destinations={destinations} />;
};

export default Featured;
