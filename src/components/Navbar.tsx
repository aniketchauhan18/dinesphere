import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/nextjs";
import { HomeIcon, Search, ShoppingBag, UserIcon } from "lucide-react";
import { inter } from "./fonts";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { fetchUserByClerkId } from "@/lib/data";

export default async function Navbar() {
  const { userId } = auth();

  let user;
  if (userId) {
    user = await fetchUserByClerkId(userId as string);
  }

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
          <div className={`hidden sm:flex pr-3`}>
            <SignedIn>
              <div className="flex gap-3 items-center">
                <Link href="/restaurants" className="text-neutral-700 text-sm ">
                  Restaurants
                </Link>
                <Link
                  href={`/user/${user?._id}/orders`}
                  className="text-neutral-700 text-sm "
                >
                  My Orders
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
                  My Orders
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
        className={`lg:hidden fixed bottom-0 left-0 w-full p-2 bg-primary-foreground z-50 border-t-2 border-border`}
      >
        <div className="flex justify-around items-center">
          <Link href={"/"} className={linkClasses}>
            <HomeIcon className="w-5 h-5" />
            <p className="text-xs mt-1">Home</p>
          </Link>
          <Link href={"/restaurants"} className={linkClasses}>
            <Search className="w-5 h-5" />
            <p className="text-xs mt-1">Search</p>
          </Link>
          <Link href={`/user/${user?._id}/orders`} className={linkClasses}>
            <ShoppingBag className="w-5 h-5" />
            <p className="text-xs mt-1">My Orders</p>
          </Link>
          <SignedIn>
            <Link href={`/user/${user?._id}`} className={linkClasses}>
              {user ? (
                <Image
                  src={user?.imageUrl}
                  alt="profile photo"
                  height={25}
                  width={25}
                  className="rounded-full"
                />
              ) : (
                <UserIcon className="w-5 h-5" />
              )}
              <p className="text-xs mt-1">Profile</p>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className={linkClasses}>
              <UserIcon className="w-5 h-5" />
              <p className="text-xs mt-1">Profile</p>
            </Link>
          </SignedOut>
        </div>
      </footer>
    </nav>
  );
}
