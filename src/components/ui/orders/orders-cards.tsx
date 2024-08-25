"use server";
import { MenuImageProps, MenuOrderItemProps } from "@/lib/definition";
import Image from "next/image";
import { PlusIcon, MinusIcon, TrashIcon } from "lucide-react";
import UpdateOrder from "./order-update";
import { fetchMenuImagesByMenuId } from "@/lib/data";

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
            <OrderCard
              key={order._id.toString()}
              order={JSON.parse(JSON.stringify(order))}
            />
          ))}
        </div>
      ) : (
        <div>khana order karo be</div>
      )}
    </div>
  );
}

async function OrderCard({ order }: { order: MenuOrderItemProps }) {
  const basePrice = order.price / order.quantity;
  // "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=600"
  const menuImage = (await fetchMenuImagesByMenuId(
    order.menuId._id,
  )) as MenuImageProps;
  console.log(menuImage, menuImage);

  return (
    <div className="w-full border  rounded-lg p-3 shadow-sm duration-300">
      <div className="flex gap-3">
        <div className="relative h-28 w-[200px]">
          <Image
            src={
              menuImage?.url
                ? menuImage?.url
                : "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt="menu-order-image"
            className="object-cover rounded-md"
            fill
            priority
          />
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 w-full justify-between">
          <div className="space-y-0.5">
            <div className="flex justify-between">
              <p className="font-bold text-sm sm:text-lg">
                {order.menuId.name}
              </p>
              <p className="font-semibold text-xs sm:text-base min-w-12">
                ₹ {order.price.toFixed(2).toString()}
              </p>
            </div>
            <p className="text-neutral-700 text-xs sm:text-sm">
              {order.menuId.description}
            </p>
          </div>
          <UpdateOrder
            orderItemId={order._id.toString()}
            quantity={order.quantity.toString()}
            basePrice={basePrice}
          />
          {/* <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-neutral-900 p-0.5">
                <PlusIcon className="w-4 h-4 text-white hover:cursor-pointer" />
              </div>
              <div>
                <p>{order.quantity.toString()}</p>
              </div>
              <div className="rounded-full bg-neutral-900 p-0.5">
                <MinusIcon className="w-4 h-4 text-white hover:cursor-pointer" />
              </div>
            </div>
            {/* <Button variant="destructive" className="text-sm">Remove</Button> */}
          {/* <p className="text-neutral-700 text-sm">
              <TrashIcon className="w-5 h-5 text-red-400 hover:cursor-pointer" />
            </p> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
