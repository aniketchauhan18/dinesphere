import { UserProps } from "@/components/ui/orders/checkout-button";
import CreateForm from "@/components/ui/restaurants/create-form";
import { fetchUserByClerkId } from "@/lib/data";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RestaurantDetails() {
  const clerkUser = await currentUser();
  const userId = clerkUser?.id;
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  const user: UserProps = await fetchUserByClerkId(userId);

  return (
    <main className="pb-24 lg:pt-24 p-4">
      <div className="flex flex-col pb-1">
        <h1 className="text-lg sm:text-xl font-semibold">Restaurant Details</h1>
        <p className="text-neutral-600 text-xs sm:text-sm">
          Enter the information about your restaurant.
        </p>
      </div>
      <div className="border-b" />
      <section className="pt-5">
        <CreateForm userId={user._id} />
      </section>
    </main>
  );
}
