"use server";
import { RestaurantProps } from "@/app/restaurants/page";
import { fetchRestaurantById } from "@/lib/data";
import { TrackOrderProps } from "@/lib/definition";
import Link from "next/link";
import OrderInvoice from "./order-invoice";
import clsx from "clsx";

export default async function TrackCards({
  orders,
}: {
  orders: TrackOrderProps[];
}) {
  return (
    <div>
      {orders.length >= 1 ? (
        <div className="grid sm:grid-cols-2 gap-5">
          {orders.map((order) => (
            <TrackCard
              key={order._id.toString()}
              order={JSON.parse(JSON.stringify(order))}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          You haven&apos;t ordered yet
          <Link href="/restaurants">Explore Restaurants</Link>
        </div>
      )}
    </div>
  );
}

export async function TrackCard({ order }: { order: TrackOrderProps }) {
  const [restaurant]: [RestaurantProps] = await Promise.all([
    fetchRestaurantById(order.restaurantId),
  ]);
  return (
    <div className="mt-10 border p-5 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <p className="font-semibold text-xl">{restaurant.name.toString()}</p>
        <div className="flex justify-center items-center">
          <p
            className={clsx(
              "px-2 py-1 rounded-md text-xs font-medium text-white",
              // change order stautus as per needs here in future code
              order.status == "pending" && "bg-amber-500",
              order.status == "accepted" && "bg-blue-500",
              order.status == "processing" && "bg-yellow-500",
              order.status == "reject" && "bg-red-500",
              order.status == "delivered" && "bg-green-500",
            )}
          >
            {order.status}
          </p>
        </div>
      </div>
      <div className="grid pt-2 space-y-3">
        {order.orderItems.map((trackOrderItem) => (
          <div key={trackOrderItem.orderItemId.toString()}>
            <div className="flex justify-between text-sm">
              <p>{trackOrderItem.menuDetails.name}</p>
              <p>x{trackOrderItem.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-b mt-3" />
      <div className="pt-3 grid gap-3">
        <div className="flex justify-between items-center text-sm">
          <p>Total</p>
          <p className="font-semibold">₹ {order.totalPrice.toString()}</p>
        </div>
        <div className="flex justify-between items-center text-xs text-neutral-500">
          <p>Ordered on {new Date(order.createdAt).toDateString()}</p>
          <p className="text-xs">
            {/* <Link href={`/user/${userId}/orders/${orderId}/status`}>
              View Details
            </Link> */}
            <OrderInvoice order={JSON.parse(JSON.stringify(order))} />
          </p>
        </div>
      </div>
    </div>
  );
}
