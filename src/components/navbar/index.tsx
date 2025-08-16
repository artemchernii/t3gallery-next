// components/navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [{ name: "Dashboard", href: "/" }];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white px-[10%] text-black backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-lg font-semibold">
            T3
          </Link>

          <nav className="hidden items-center space-x-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-primary text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <SignedOut>
            <SignInButton>
              <button className="cursor-pointer text-black hover:text-black/50">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="cursor-pointer text-black hover:text-black/50">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        {/* TODO: to be removed, was playing with shadcn */}
        {/* Desktop User Menu */}
        {/* <div className="hidden items-center gap-4 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-black text-white"
              align="end"
              forceMount
            >
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">

              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        {/* Mobile Menu Button */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="md:hidden">
            <div className="flex h-full flex-col py-6">
              <div className="flex-1 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="hover:text-primary block py-2 text-lg font-medium transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-muted-foreground text-sm">
                      john@example.com
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-600 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
