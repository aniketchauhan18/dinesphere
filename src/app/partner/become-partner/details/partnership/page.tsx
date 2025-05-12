import ChangeRoleButton from "@/components/ui/change-role-button";
import {
  RocketIcon,
  WalletIcon,
  HeadphonesIcon,
  StarIcon,
  MegaphoneIcon,
  BarChart2Icon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { auth } from "@clerk/nextjs/server"
// import { fetchRestaurantsCountByUserId, fetchUserByClerkId } from "@/lib/data";
// import { UserProps } from "@/components/ui/orders/checkout-button";

export default async function Patnership() {
  // const { userId } = auth();
  // const user = await fetchUserByClerkId(userId as string) as UserProps;
  // const userOwnedRestaurantsCount = await fetchRestaurantsCountByUserId(user?._id);

  return (
    <main className="lg:pt-24 pb-24">
      <div className="flex justify-center items-center min-h-[85dvh]">
        <section className="p-3 min-w-sm">
          <div className="border rounded-md w-full flex flex-col grow">
            <div className="bg-linear-to-b from-orange-500 to-orange-600/80 text-white flex justify-between gap-16 p-3 items-center rounded-t-md">
              <div>
                <h1 className="font-semibold text-base">
                  Partner with DineSphere
                </h1>
                <p className="text-xs">Start your partnership today!</p>
              </div>
            </div>
            <div className="p-2">
              <div className="p-3 space-y-2">
                <h1 className="text-xs font-bold">Why partner with us</h1>
                <div className="flex justify-between items-center text-xs text-neutral-600">
                  <p>Reach a wider audience</p>
                  <RocketIcon className="w-3 h-3" />
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-600">
                  <p>Increase your sales</p>
                  <WalletIcon className="w-3 h-3" />
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-600">
                  <p>Receive dedicated support</p>
                  <HeadphonesIcon className="w-3 h-3" />
                </div>
              </div>
              <Separator />
              <div className="p-3 space-y-2">
                <h1 className="text-xs font-bold">What we offer</h1>
                <div className="flex justify-between items-center text-xs text-neutral-600">
                  <p>Featured Listings</p>
                  <StarIcon className="w-3 h-3" />
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-600">
                  <p>Promotional Tools</p>
                  <MegaphoneIcon className="w-3 h-3" />
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-600">
                  <p>Analytics Dashboard</p>
                  <BarChart2Icon className="w-3 h-3" />
                </div>
              </div>
            </div>
            <div className="border-t p-4 bg-neutral-100 rounded-b-md">
              <div className="flex justify-between gap-6 items-center text-xs">
                <p className="text-neutral-600">
                  Start your partnership today!
                </p>
                <ChangeRoleButton />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
