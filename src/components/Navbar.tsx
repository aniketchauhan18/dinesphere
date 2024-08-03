import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/nextjs";
import { HomeIcon, Search, UserIcon } from "lucide-react";
import { inter, poppins } from "./fonts";
import { Input } from "./ui/input";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
// import { HamburgerMenuIcon } from "@radix-ui/react-icons";
// import { DropdownMenu } from "./ui/dropdown-menu";
// import {
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  // user button for logout and all that thing;

  const { userId } = auth();
  console.log(userId);

  const DropDownMenuItemClasses: string =
    "duration-300 hover:bg-neutral-200/50 rounded-sm p-1";
  const linkClasses: string = "flex flex-col items-center cursor-pointer";
  return (
    <nav className={`${inter.className}`}>
      <header
        className={`border-b min-h-16 bg-primary-foreground hidden lg:flex z-50  p-3 justify-between items-center gap-5`}
      >
        <div className={`flex  justify-between items-center gap-5 w-full`}>
          <Link href="/" className={`font-semibold  text-neutral-700`}>
            DineSphere
          </Link>
          {/* <div className=" gap-4 items-center hidden">
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
          {/* </div> */} 
          {/* <div className="hidden sm:flex w-full max-w-xs">
            <Input
              placeholder="Search restaurants..."
              className="shadow-none text-sm py-0"
            />
          </div> */}
          <div className={`hidden sm:flex pr-3`}>
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
        </div>
      </header>
      <footer
        className={`lg:hidden fixed bottom-0 left-0 w-full p-2 bg-primary-foreground z-50  border-t-2 border-border`}
      >
        <div className="flex justify-around items-center">
          <Link href={"/"} className={linkClasses}>
            <HomeIcon className="w-5 h-5" />
            <p className="text-xs mt-1">Home</p>
          </Link>
          <Link href={"/"} className={linkClasses}>
            <Search className="w-5 h-5" />
            <p className="text-xs mt-1">Search</p>
          </Link>
          <SignedIn>
            <Link href={`/user/${userId}`} className={linkClasses}>
              <UserIcon className="w-5 h-5" />
              <p className="text-xs mt-1">Profile</p>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <UserIcon className="w-5 h-5 " />
            </Link>
          </SignedOut>
        </div>
      </footer>
    </nav>
  );
}
