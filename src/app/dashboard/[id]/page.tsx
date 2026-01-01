import { Button } from "@/components/ui/button";
import { fetchRestaurantsByUserId } from "@/lib/data";
import { StoreIcon, TrendingUpIcon } from "lucide-react";
import { UserRestaurantsProps } from "@/lib/definition";
import DefaultBackButton from "@/components/ui/default-back-button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const data: UserRestaurantsProps = await fetchRestaurantsByUserId(
    (await params).id,
  );
  const { restaurants, length } = data;

  return (
    <main className="lg:pt-20 pb-20 lg:pb-5 p-5">
      <section className="flex justify-between items-center py-3">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <DefaultBackButton />
      </section>
      <Separator />
      <section className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 pt-5">
        <div className="p-3 space-y-4 border rounded-md">
          <div className="flex justify-between items-center ">
            <h2>Total Restaurants</h2>
            <StoreIcon className="text-neutral-600 w-4 h-4" />
          </div>
          <div className="space-y-1">
            <p className="font-bold">{length}</p>
            <p className="text-xs text-neutral-600">+2 from last month</p>
          </div>
        </div>
        <div className="p-3 space-y-4 border rounded-md">
          <div className="flex justify-between items-center ">
            <h2>Total Revenue</h2>
            <TrendingUpIcon className="text-neutral-600 w-4 h-4" />
          </div>
          <div>
            <p className="font-bold">$24,780</p>
            <p className="text-xs text-neutral-600 ">+15% from last month</p>
          </div>
        </div>
        <div className="p-3 space-y-4 border rounded-md">
          <div className="flex justify-between items-center ">
            <h2>Active Orders</h2>
            {/* <StoreIcon className="text-neutral-600 w-4 h-4" /> */}
          </div>
          <div className="space-y-1">
            <p className="font-bold">+573</p>
            <p className="text-xs text-neutral-600">+201 from last hour</p>
          </div>
        </div>
        <div className="p-3 space-y-4 border rounded-md">
          <div className="flex justify-between items-center ">
            <h2>Customer Satisfaction</h2>
            <StoreIcon className="text-neutral-600 w-4 h-4" />
          </div>
          <div>
            <p className="font-bold">98%</p>
            <p className="text-xs text-neutral-600a">+2% from last week</p>
          </div>
        </div>
      </section>
      <section className="pt-10">
        <div className="border rounded-md p-3">
          <h1 className="font-bold text-lg">Your Restaurants</h1>
          <p className="text-sm text-neutral-700">
            You have {length} registered restaurants.
          </p>
          <div className="space-y-1 pt-2">
            {restaurants.map(async (restaurant) => {
              return (
                <div
                  key={restaurant._id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center">
                    <StoreIcon className="w-4 h-4 mr-2 text-neutral-600" />
                    <p>{restaurant.name}</p>
                  </div>
                  <Link
                    href={`/dashboard/${(await params).id}/restaurant/${restaurant._id.toString()}`}
                  >
                    <Button variant="link" className="text-sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
