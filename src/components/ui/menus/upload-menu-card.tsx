"use server";
import { fetchMenuImagesByMenuId, fetchMenusByRestaurantId } from "@/lib/data";
import { MenuProps } from "@/lib/definition";
import Image from "next/image";
// import { Button } from "../button";
// import { FilePenLineIcon } from "lucide-react";
// import { Dialog } from "../dialog";
import UpdateMenu from "./update-menu";
import UploadImage from "@/components/UploadImage";
import CreateMenu from "./create-menu";

export default async function UploadMenuCards({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const menus: MenuProps[] = await fetchMenusByRestaurantId(restaurantId);

  return (
    <div className="mt-5">
      {menus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <MenuCard key={menu._id} menu={JSON.parse(JSON.stringify(menu))} />
          ))}
          <div className="bg-gray-100 rounded-lg flex justify-center items-center min-h-60">
            <CreateMenu restaurantId={restaurantId} />
          </div>
        </div>
      ) : (
        <div>
          <CreateMenu restaurantId={restaurantId} />
        </div>
      )}
    </div>
  );
}

async function MenuCard({ menu }: { menu: MenuProps }) {
  const menuImage = await fetchMenuImagesByMenuId(menu._id.toString());
  return (
    <div className="border rounded-lg shadow-sm flex flex-col h-full">
      <div className="mb-3 relative w-full h-60">
        {menuImage ? (
          <Image
            src={menuImage.url}
            alt="Restaurant Image"
            fill
            sizes="900px"
            style={{
              objectFit: "cover",
            }}
            className="rounded-t-lg"
          />
        ) : (
          <div className="w-full h-full">
            <UploadImage
              placeholder="menu"
              placeholderId={menu._id.toString()}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-3">
        <div className="mb-2">
          <p className="font-semibold text-neutral-800 mb-1">{menu.name}</p>
          <p className="text-neutral-600 text-sm">{menu.description}</p>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-neutral-700 text-base font-bold">₹ {menu.price}</p>
          <UpdateMenu menu={menu} />
        </div>
      </div>
    </div>
  );
}
