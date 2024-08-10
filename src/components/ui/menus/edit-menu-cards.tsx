import { MenuProps } from "@/lib/definition";
import { Button } from "../button";
import { PencilIcon } from "lucide-react";
import Image from "next/image";

export default function EditMenuCards({ menus }: { menus: MenuProps[] }) {
  return (
    <div>
      {menus.length > 1 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {menus.map((menu) => (
            <EditMenuCard key={menu._id.toString()} menu={menu} />
          ))}
        </div>
      ) : (
        <div className="min-h-[70dvh] flex justify-center items-center">
          No menus available , why not create one
        </div>
      )}
    </div>
  );
}

function EditMenuCard({ menu }: { menu: MenuProps }) {
  return (
    <div className="p-5 flex justify-center">
      <div className="rounded-lg h-full max-w-sm">
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
        <div className="p-2 bg-primary-foreground rounded-b-lg border border-neutral-100 border-t-none">
          <div className="font-semibold">{menu.name}</div>
          <div className="text-neutral-600 text-sm">{menu.description}</div>
          <div className="flex justify-end">
            <Button variant="link">
              <PencilIcon />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
