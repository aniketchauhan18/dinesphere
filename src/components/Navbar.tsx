import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { DropdownMenu } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { inter } from "./fonts";
import { Input } from "./ui/input";

export default function Navbar() {
  // user button for logout and all that thing;

  const DropDownMenuItemClasses: string =
    "duration-300 hover:bg-neutral-200/50 rounded-sm p-1";
  return (
    <header className={`min-h-16 p-5 ${inter.className}`}>
      <nav className="border z-50 rounded-lg bg-white/80 p-3 flex justify-between items-center gap-5">
        <Link href="/" className="font-semibold text-neutral-700">
          DineSphere
        </Link>
        <div className="flex gap-4 items-center sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserIcon className="text-neutral-700 w-8 h-8 bg-zinc-100 rounded-full p-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 rounded p-2 bg-white border text-sm space-y-1">
              <DropdownMenuLabel className="font-semibold p-1">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border-b w-full text-neutral-600 " />
              <SignedIn>
                <DropdownMenuItem className={DropDownMenuItemClasses}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className={DropDownMenuItemClasses}>
                  <Link
                    href="/restaurants"
                    className="text-neutral-700 text-sm item"
                  >
                    Restaurants
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className={DropDownMenuItemClasses}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className={DropDownMenuItemClasses}>
                  <SignOutButton />
                </DropdownMenuItem>
              </SignedIn>
              <SignedOut>
                <DropdownMenuItem className={DropDownMenuItemClasses}>
                  <Link
                    href="/restaurants"
                    className="text-neutral-700 text-sm item"
                  >
                    Restaurants
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className={DropDownMenuItemClasses}>
                  <Link href="/sign-in" className="text-neutral-700 text-sm">
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className={DropDownMenuItemClasses}>
                  <Link href="/sign-up" className="text-neutral-700 text-sm">
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <UserButton /> */}
        </div>
        <div className="hidden sm:flex w-full max-w-xs">
          <Input
            placeholder="Search restaurants..."
            className="shadow-none text-sm "
          />
        </div>
        <div className="hidden sm:flex pr-3">
          <SignedIn>
            <div className="flex gap-3 items-center">
              <Link href="/restaurants" className="text-neutral-700 text-sm ">
                Restaurants
              </Link>
              <Link href="/orders" className="text-neutral-700 text-sm ">
                Orders
              </Link>
              <div className="text-sm text-neutral-700 min-w-2 items-center">
                <SignOutButton />
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex gap-3 items-center">
              <Link href="/restaurants" className="text-neutral-700 text-sm ">
                Restaurants
              </Link>
              <Link href="/restaurants" className="text-neutral-700 text-sm ">
                Orders
              </Link>
              <div className="text-sm text-neutral-700 min-w-2 items-center">
                <SignInButton />
              </div>
            </div>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
