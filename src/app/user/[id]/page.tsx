import { Button } from "../../../components/ui/button";
import { fetchOrderByUserId, fetchUserById } from "@/lib/data";
import { OrderProps } from "@/lib/definition";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { DivideCircleIcon, LogOutIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export interface UserDetails {
  _id: string;
  clerkId: string;
  email: string;
  username: string | null;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  role: ["user", "admin"];
  __v: number | null;
}

export default async function Profile({ params }: { params: { id: string } }) {
  const { id } = params;
  // const user: UserDetails = await fetchUserById(id);
  const [user, order]: [user: UserDetails, order: OrderProps[]] =
    await Promise.all([fetchUserById(id), fetchOrderByUserId(id)]);

  return (
    <main className="min-h-screen p-5 bg-neutral-100 flex flex-col lg:py-20">
      <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
        <div className="w-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 relative">
            <span className="relative z-10 px-3 bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-600 animate-gradient">
              Hey, {user.firstName} {user.lastName}
            </span>
            <span>👋</span>
          </h1>
          <Separator className="bg-orange-300" />
        </div>

        <div className="space-y-8">
          {[
            { href: `/user/${user._id}/orders`, icon: "📦", text: "Orders" },
            { href: "/restaurants", icon: "🍽️", text: "Restaurants" },
            {
              href: `/user/${user._id}/orders/track`,
              icon: "🚚",
              text: "Track Orders",
            },
          ].map((link, index) => (
            <Link key={link.href} href={link.href} className="group block">
              <div className="relative overflow-hidden rounded-lg p-4 group">
                <span className="block text-3xl font-semibold text-gray-700 transition-all duration-300 ease-in-out transform group-hover:translate-x-2 relative z-10">
                  <span>{link.icon}</span>
                  <span className="inline-block transition-all duration-300 ease-in-out group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br from-yellow-400 via-orange-500 to-orange-600">
                    {link.text}
                  </span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out"></span>
              </div>
            </Link>
          ))}

          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50 py-3 text-white w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
            <LogOutIcon className="w-5 h-5 mr-2" />
            <SignOutButton />
          </button>
        </div>
      </div>
    </main>
  );
}
