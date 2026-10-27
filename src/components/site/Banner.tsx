import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SEARCH_FIELDS = [
  { label: "Location", placeholder: "Anywhere, City, Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime, 0 Days" },
  { label: "Budget", placeholder: "$0 - $3,000" },
  { label: "People", placeholder: "0-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-150 w-full flex-col">
      {/* Background image + overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // TODO: replace with a real destination image (e.g. from /public or an API)
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-slate-900/30" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-1 flex-col items-center px-4 pb-24 pt-28 text-center text-white md:pb-32">
        <h1 className="font-heading text-5xl leading-tight font-semibold md:text-6xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button className="rounded-sm bg-sky-500 text-xs font-semibold tracking-wider text-white uppercase hover:bg-sky-600">
            Explore Now
            <ArrowRight className="ml-1 size-4" />
          </Button>
          <Button className="rounded-sm bg-white/70 text-xs font-semibold tracking-wider text-slate-700 uppercase hover:bg-white/90">
            View Destination
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative z-10 mx-auto grid w-full grid-cols-2 bg-white shadow-lg md:grid-cols-[repeat(4,1fr)_auto]">
        {SEARCH_FIELDS.map(({ label, placeholder }) => (
          <label
            key={label}
            className="cursor-text border-r border-slate-200 px-5 py-3"
          >
            <span className="block text-sm font-semibold text-slate-900">
              {label}
            </span>
            <span className="block truncate text-xs text-slate-400">
              {placeholder}
            </span>
          </label>
        ))}
        <Button className="col-span-2 h-full rounded-none bg-sky-500 text-sm font-semibold tracking-wider text-white uppercase hover:bg-sky-600 md:col-span-1 md:px-10">
          Search
        </Button>
      </div>
    </section>
  );
}
