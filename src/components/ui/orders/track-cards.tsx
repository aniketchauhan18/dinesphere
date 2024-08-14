"use server";
import { RestaurantProps } from "@/app/restaurants/page";
import {
  fetchPopulatedOrderById,
  fetchRestaurantById,
  fetchUserById,
} from "@/lib/data";
import { TrackOrderItemProps, TrackOrderProps } from "@/lib/definition";
import Link from "next/link";
import OrderInvoice from "./order-invoice";
import { User } from "./checkout-button";

export default async function TrackCards({
  orderId,
  trackOrderItems,
  status,
  restaurantId,
  total,
  date,
  userId,
}: {
  orderId: string;
  trackOrderItems: TrackOrderItemProps[];
  status: string;
  restaurantId: string;
  total: number;
  date: Date;
  userId: string;
}) {
  const [user, order, restaurant]: [User, TrackOrderProps, RestaurantProps] =
    await Promise.all([
      fetchUserById(userId),
      fetchPopulatedOrderById(orderId),
      fetchRestaurantById(restaurantId),
    ]);

  return (
    <div className="mt-10 border p-5 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <p className="font-semibold text-xl">{restaurant.name.toString()}</p>
        <div className="flex justify-center items-center">
          <p className="px-2 py-1 rounded-md text-xs font-medium bg-red-500 text-white">
            {status}
          </p>
        </div>
      </div>
      <div className="grid pt-2 space-y-3">
        {trackOrderItems.map((trackOrderItem) => (
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
          <p className="font-semibold">₹ {total}</p>
        </div>
        <div className="flex justify-between items-center text-xs text-neutral-500">
          <p>Ordered on {date.toDateString()}</p>
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

// async function TrackCard({
//   trackOrderItem,
// }: {
//   trackOrderItem: TrackOrderItemProps;
// }) {

//   const restautant: RestaurantProps = await fetchRestaurantById(trackOrderItem.menuDetails.restaurantId)
//   return (
//     <div className="p-3 border rounded-md">
//       <div className="flex justify-between">
//         <p className="font-semibold">
//           {restautant.name}
//         </p>
//         <p>
//         </p>
//       </div>
//     </div>
//   )
// }

// {trackOrderItems.length > 1 ? (
//   <div className="grid pt-2 space-y-3" >
//     {trackOrderItems.map((trackOrderItem) => (
//       <div key={trackOrderItem.orderItemId.toString()}>
//         <div className="flex justify-between text-sm">
//           <p>
//             {trackOrderItem.menuDetails.name}
//           </p>
//           <p>
//             x{trackOrderItem.quantity}
//           </p>
//         </div>
//       </div>
//     ))}
//   </div>
// ) : (
//   <div className="min-h-[70dvh] flex items-center justify-center">
//     No Track order found
//   </div>
// )}
