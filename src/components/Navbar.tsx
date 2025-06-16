import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/nextjs";
import {
  HomeIcon,
  Search,
  ShoppingBag,
  MenuIcon,
  StoreIcon,
} from "lucide-react";
import { inter } from "./fonts";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { fetchUserByClerkId, fetchUserOrderMenuItems } from "@/lib/data";
export default async function Navbar() {
  const { userId } = auth();

  let user;
  if (userId) {
    user = await fetchUserByClerkId(userId as string);
  }

  const orderItems = await fetchUserOrderMenuItems(user?._id);

  const linkClasses: string = "flex flex-col items-center cursor-pointer";
  return (
    <nav className={`${inter.className}`}>
      <header
        className={`fixed inset-x-0 min-h-16 hidden lg:flex z-50 bg-white/80 border-b backdrop-blur-xs justify-between items-center gap-5 p-5`}
      >
        <div className={`flex justify-between items-center gap-5 w-full`}>
          <Link
            href="/"
            prefetch
            className="font-semibold text-neutral-700 flex items-center"
          >
            <StoreIcon className="w-5 h-3.5 mr-1 " />
            <p>DineSphere</p>
          </Link>
          <div className={`hidden sm:flex pr-3`}>
            <SignedIn>
              <div className="flex gap-3 items-center">
                <Link
                  href="/restaurants"
                  className="text-neutral-700 text-sm"
                  prefetch
                >
                  Restaurants
                </Link>
                <Link
                  href={`/user/${user?._id}/orders`}
                  className="text-neutral-700 text-sm"
                  prefetch
                >
                  Orders
                </Link>
                <Link
                  href={`/user/${user?._id}`}
                  className="text-neutral-700 text-sm"
                  prefetch
                >
                  More
                </Link>
                <div className="text-sm text-neutral-700 min-w-2 items-center">
                  <SignOutButton />
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex gap-3 items-center">
                <Link
                  href="/restaurants"
                  className="text-neutral-700 text-sm "
                  prefetch
                >
                  Restaurants
                </Link>
                <Link
                  href="/restaurants"
                  className="text-neutral-700 text-sm "
                  prefetch
                >
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
          <Link
            href={`/user/${user?._id}/orders`}
            className={`${linkClasses} flex items-center relative`}
          >
            <ShoppingBag className="w-5 h-5" />
            <p className="text-xs mt-1">Orders</p>
            {orderItems.length >= 1 && (
              <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 bg-opacity-90 rounded-full"></span>
            )}
          </Link>
          <SignedIn>
            <Link href={`/user/${user?._id}`} className={linkClasses}>
              <MenuIcon className="w-5 h-5" />
              <p className="text-xs mt-1">More</p>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className={linkClasses}>
              <MenuIcon className="w-5 h-5" />
              <p className="text-xs mt-1">More</p>
            </Link>
          </SignedOut>
        </div>
      </footer>
    </nav>
  );
}
