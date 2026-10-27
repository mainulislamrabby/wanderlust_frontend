import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

// lucide no longer ships brand icons, so these are inlined simple-icons paths
const SOCIAL_LINKS = [
  {
    label: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest text-neutral-300 uppercase">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-neutral-400 transition-colors hover:text-white"
    >
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-6">
        <h2 className="font-heading text-5xl font-bold tracking-tight">
          Wanderlast
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-4">
          <FooterColumn title="Newsletter">
            <p className="text-xs leading-relaxed text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form
              className="mt-4 flex items-center rounded-md border border-neutral-800 bg-neutral-900 pr-1 transition-colors focus-within:border-neutral-600"
              action="/subscribe" // TODO: wire up to a real subscribe endpoint
            >
              <Input
                type="email"
                name="email"
                required
                placeholder="Enter email"
                className="h-9 rounded-md border-0 bg-transparent px-3 text-sm focus-visible:border-0 focus-visible:ring-0"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="size-8 shrink-0 rounded-sm text-white hover:bg-neutral-800"
                aria-label="Subscribe"
              >
                <ArrowUpRight className="text-white" />
              </Button>
            </form>
          </FooterColumn>

          <FooterColumn title="Quick Links">
            <nav className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </nav>
          </FooterColumn>

          <FooterColumn title="Support">
            <nav className="flex flex-col gap-3">
              {SUPPORT_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </nav>
          </FooterColumn>

          <FooterColumn title="Contact Us">
            <div className="flex flex-col gap-3 text-sm text-neutral-200">
              <a href="tel:+17869011622" className="hover:text-white">
                786 901 1622
              </a>
              <a href="mailto:info@wanderlast.com" className="hover:text-white">
                info@wanderlast.com
              </a>
            </div>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; 2026 Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-neutral-300 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="size-4"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
