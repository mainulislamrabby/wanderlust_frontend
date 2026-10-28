"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-sky-600",
        active ? "text-sky-500" : "text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <nav className="relative container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-heading text-xl font-semibold tracking-wide text-sky-500"
        >
          Wanderlast
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLink href="/" label="Home" active />
          <NavLink href="/destinations" label="Destinations" />
          <NavLink href="/add-destinations" label="Add Destinations" />
          <NavLink href="/my-bookings" label="My Bookings" />
          <NavLink href="/admin" label="Admin" />
        </div>

        {/* Desktop account */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm font-medium hover:text-sky-600"
          >
            <UserRound className="size-4" />
            Profile
          </Link>
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image as string}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              >
                Open Account
              </PopoverTrigger>

              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user.name}</PopoverTitle>
                  <PopoverDescription>
                    <p>{user.email}</p>
                    <Button
                      onClick={handleSignOut}
                      variant="destructive"
                      className="mt-3 w-full"
                    >
                      Sign Out
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium hover:text-sky-600"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="text-sm font-medium hover:text-sky-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto md:hidden"
              />
            }
          >
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>

          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="text-sky-500">Wanderlast</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-4 px-4">
              <NavLink href="/" label="Home" active />
              <NavLink href="/destinations" label="Destinations" />
              <NavLink href="/add-destinations" label="Add Destinations" />
              <NavLink href="/bookings" label="My Bookings" />
              <NavLink href="/admin" label="Admin" />

              <div className="my-2 border-t" />

              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image as string}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleSignOut}
                    variant="destructive"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium hover:text-sky-600"
                  >
                    <UserRound className="size-4" />
                    Profile
                  </Link>

                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium hover:text-sky-600"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium hover:text-sky-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
