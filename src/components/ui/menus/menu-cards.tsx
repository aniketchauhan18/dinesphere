"use server";
// remove any from menus and menu types
import { MenuProps } from "@/lib/definition";
import Image from "next/image";
import { Button } from "../button";
export default async function MenuCards({ menus }: { menus: MenuProps[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {menus.map((menu) => (
        <MenuCard key={menu._id.toString()} menu={menu} />
      ))}
    </div>
  );
}

function MenuCard({ menu }: { menu: MenuProps }) {
  return (
    <div className="p-5 flex justify-center">
      <div className="rounded-lg h-full hover:shadow duration-300 bg-neutral-50 max-w-xs">
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
        <div className="p-3 space-y-0.5">
          <p className="font-bold text-neutral-800 text-lg">{menu.name}</p>
          <p className="text-neutral-700">
            {menu.description.length > 35
              ? menu.description.slice(0, 35) + "..."
              : menu.description}
          </p>
          <div className="flex items-center justify-between text-neutral-800 py-1">
            <div className="flex items-center">
              <p className="font-bold text-base">₹ {menu.price}</p>
            </div>
            <button className="px-3 text-white bg-gradient-to-b from-green-500 to-green-600 py-1 text-sm rounded-sm shadow-sm">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
