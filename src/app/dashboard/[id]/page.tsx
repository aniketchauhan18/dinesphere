import { Button } from "@/components/ui/button";
import { fetchDashboardStatsByUserId, fetchRestaurantsByUserId } from "@/lib/data";
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
  const { id } = await params;
  const [data, stats]: [UserRestaurantsProps, Awaited<ReturnType<typeof fetchDashboardStatsByUserId>>] =
    await Promise.all([
      fetchRestaurantsByUserId(id),
      fetchDashboardStatsByUserId(id),
    ]);
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
            <p className="text-xs text-neutral-600">Registered restaurants</p>
          </div>
        </div>
        <div className="p-3 space-y-4 border rounded-md">
          <div className="flex justify-between items-center ">
            <h2>Total Revenue</h2>
            <TrendingUpIcon className="text-neutral-600 w-4 h-4" />
          </div>
          <div>
            <p className="font-bold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(stats.totalRevenue)}
            </p>
            <p className="text-xs text-neutral-600 ">Across all orders</p>
          </div>
        </div>
        <div className="p-3 space-y-4 border rounded-md">
          <div className="flex justify-between items-center ">
            <h2>Active Orders</h2>
            {/* <StoreIcon className="text-neutral-600 w-4 h-4" /> */}
          </div>
          <div className="space-y-1">
            <p className="font-bold">{stats.activeOrders}</p>
            <p className="text-xs text-neutral-600">Pending or in progress</p>
          </div>
        </div>
        <div className="p-3 space-y-4 border rounded-md">
          <div className="flex justify-between items-center ">
            <h2>Delivered Orders</h2>
            <StoreIcon className="text-neutral-600 w-4 h-4" />
          </div>
          <div>
            <p className="font-bold">{stats.deliveredOrders}</p>
            <p className="text-xs text-neutral-600">
              Out of {stats.totalOrders} total orders
            </p>
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
            {restaurants.map((restaurant) => {
              return (
                <div
                  key={restaurant._id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center">
                    <StoreIcon className="w-4 h-4 mr-2 text-neutral-600" />
                    <p>{restaurant.name}</p>
                  </div>
                  <Link href={`/dashboard/${id}/restaurant/${restaurant._id.toString()}`}>
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
