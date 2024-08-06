import { Button } from "../../../components/ui/button";
import { fetchUserById } from "@/lib/data";
// import { UserDetails } from "../../lib/definition";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

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
  const user: UserDetails = await fetchUserById(id);

  return (
    <div className="pt-10">
      <div className="flex flex-col gap-5 justify-center items-center h-96">
        <div>{user.firstName}</div>
        <div>
          <Link
            href={`/user/${user._id}/orders`}
            className="hover:cursor-pointer"
          >
            Orders
          </Link>
        </div>
        <div>
          <Link href={`/restaurants`} className="hover:cursor-pointer">
            Restaurants
          </Link>
        </div>
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 py-2 text-white w-10/12 max-w-xs bg-gradient-to-b from-orange-600 to-orange-500">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
