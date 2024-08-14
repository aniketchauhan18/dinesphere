"use server";
// remove any from menus and menu types
import { MenuProps } from "@/lib/definition";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { fetchUserByClerkId, fetchUserById } from "@/lib/data";
import AddOrderItemButton from "./add-order-button";

// import { Button } from "../button";
export default async function MenuCards({ menus }: { menus: MenuProps[] }) {
  return (
    <div>
      {menus.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {menus.map((menu) => (
            <MenuCard key={menu._id.toString()} menu={menu} />
          ))}
        </div>
      ) : (
        <div className="min-h-[50dvh] flex justify-center items-center">
          No menu data available
        </div>
      )}
    </div>
  );
}

// adding menus to the orderItem

// we can also use clerk id for searhing for user but using user._id here

async function MenuCard({ menu }: { menu: MenuProps }) {
  const { userId } = auth();
  const user = await fetchUserByClerkId(userId as string);

  return (
    <div className=" pt-5 flex justify-center">
      <div className="rounded-lg h-full hover:shadow duration-300 bg-neutral-50 max-w-xs flex flex-col justify-between">
        <div className="space-y-0.5">
          <Image
            src="https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="menu-image"
            className="rounded-t-lg"
            width="400"
            sizes="100%"
            height="150"
            objectFit="cover"
            placeholder="empty"
          />
          <div className="flex flex-col justify-between">
            <div className="p-3 space-y-0.5">
              <p className="font-bold text-neutral-800 text-sm sm:text-lg">
                {menu.name}
              </p>
              <p className="text-neutral-700 text-xs ">{menu.description}</p>
            </div>
            <div></div>
          </div>
        </div>
        {/* <div className="flex flex-col justify-between"> */}
        {/* <div className="p-3 space-y-0.5">
            <p className="font-bold text-neutral-800 text-lg">{menu.name}</p>
            <p className="text-neutral-700 text-sm">
              {menu.description}
            </p>
          </div> */}
        {/* <div className="flex items-end">
            <div className="flex items-center justify-between text-neutral-800 py-1">
              <div className="flex items-center">
                <p className="font-bold text-base">₹ {menu.price}</p>
              </div>
              <AddOrderItemButton
                quantity={1}
                price={menu.price}
                userId={user._id.toString()}
                menuId={menu._id.toString()}
              />
            </div> */}
        {/* </div> */}
        {/* </div> */}
        <div className="flex justify-between p-3 text-neutral-800">
          <div className="flex items-center">
            <p className="font-bold text-base">₹ {menu.price}</p>
          </div>
          <AddOrderItemButton
            quantity={1}
            price={menu.price}
            userId={user._id.toString()}
            menuId={menu._id.toString()}
          />
        </div>
      </div>
    </div>
  );
}
