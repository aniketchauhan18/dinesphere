"use server";
import { RestaurantProps } from "@/app/restaurants/page";
import { fetchRestaurantById, fetchUserById } from "@/lib/data";
import { TrackOrderItemProps, TrackOrderProps } from "@/lib/definition";
import Link from "next/link";
import OrderInvoice from "./order-invoice";
import { User } from "./checkout-button";

export default async function TrackCards({
  orders,
}: {
  orders: TrackOrderProps[];
}) {
  console.log(
    orders,
    "asdakjbcbcasjh bcbcjysccsVD CHS BCKSjdhbc uysvc hsckwEVHG",
  );
  return (
    <div>
      {orders.length >= 1 ? (
        <div className="grid sm:grid-cols-2 gap-5">
          {orders.map((order) => (
            <TrackCard key={order._id.toString()} order={order} />
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
  const [user, restaurant]: [User, RestaurantProps] = await Promise.all([
    fetchUserById(order.userId),
    fetchRestaurantById(order.restaurantId),
  ]);

  return (
    <div className="mt-10 border p-5 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <p className="font-semibold text-xl">{restaurant.name.toString()}</p>
        <div className="flex justify-center items-center">
          <p className="px-2 py-1 rounded-md text-xs font-medium bg-red-500 text-white">
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
          <p>Ordered on {order.createdAt.toDateString()}</p>
          <p className="text-xs">
            {/* <Link href={`/user/${userId}/orders/${orderId}/status`}>
              View Details
            </Link> */}
            <OrderInvoice user={user} order={order} />
          </p>
        </div>
      </div>
    </div>
  );
}
