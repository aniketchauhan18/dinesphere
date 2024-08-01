import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
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

export default function Navbar() {
  // user button for logout and all that thing;

  const DropDownMenuItemClasses: string =
    "duration-300 hover:bg-neutral-200/50 rounded-sm p-1";
  return (
    <header className="min-h-16 p-5">
      <nav className="border z-50 rounded-lg bg-white/80 p-3 flex justify-between items-center">
        <Link href="/" className="font-semibold text-neutral-700">
          DineSphere
        </Link>
        <div className="flex gap-4 items-center">
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
                  <SignOutButton />
                </DropdownMenuItem>
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
                    Sign In
                  </Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem className={DropDownMenuItemClasses}>
                  <Link href="/sign-up" className="text-neutral-700 text-sm">
                    Sign Up
                  </Link>{" "}
                </DropdownMenuItem>
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <UserButton /> */}
        </div>
      </nav>
    </header>
  );
}
