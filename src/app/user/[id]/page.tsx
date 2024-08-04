import { Button } from "@/app/components/ui/button";
import { fetchUserById } from "@/lib/data";
// import { UserDetails } from "../../lib/definition";
import { SignOutButton } from "@clerk/nextjs";

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
  const userDetails: UserDetails = await fetchUserById(id);
  console.log(id);
  console.log(typeof userDetails);

  // add logic for updating user username firstName or make them disabled or get another details from user based on roles
  return (
    <div className="pt-10">
      <div className="flex flex-col gap-5 justify-center items-center h-96">
        {userDetails.firstName}
        <Button className="w-10/12 max-w-xs bg-gradient-to-b from-orange-600 to-orange-500">
          <SignOutButton />
        </Button>
      </div>
    </div>
  );
}
