"use server";
import { MenuOrderItemProps } from "@/lib/definition";
import Image from "next/image";

export async function OrdersCards({
  orders,
}: {
  orders: MenuOrderItemProps[];
}) {
  return (
    <div>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
          {orders.map((order) => (
            <OrderCard key={order._id.toString()} order={order} />
          ))}
        </div>
      ) : (
        <div>khana order karo be</div>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: MenuOrderItemProps }) {
  return (
    <div className="w-full border  rounded-lg p-3 shadow-sm duration-300">
      <div className="flex gap-3">
        <div className="flex items-center">
          <Image
            src="https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="menu-image"
            className="rounded-lg"
            width="300"
            height="150"
            objectFit="cover"
            placeholder="empty"
          />
        </div>
        <div className="flex flex-col gap-1 sm:gap-2">
          <p className="font-bold sm:text-lg">{order.menuId.name}</p>
          <p className="text-neutral-700 text-xs sm:text-sm">
            {order.menuId.description}
          </p>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm sm:text-base ">
              ₹ {order.price.toString()}
            </p>
            {/* <Button variant="destructive" className="text-sm">Remove</Button> */}
            <p className="text-neutral-700 text-sm">
              Quantity: {order.quantity.toString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
