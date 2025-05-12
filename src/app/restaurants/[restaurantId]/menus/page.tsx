import { Button } from "@/components/ui/button";
import { fetchMenusByRestaurantId } from "@/lib/data";
import { PlusIcon, Section } from "lucide-react";
import EditMenuCards from "../../../../components/ui/menus/edit-menu-cards";
import { MenuProps } from "@/lib/definition";

export default async function Menus({
  params,
}: {
  params: { restaurantId: string };
}) {
  const menus: MenuProps[] = await fetchMenusByRestaurantId(
    params.restaurantId,
  );

  return (
    <main className="min-h-[70dvh] p-5 pb-24">
      <section className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Current Menus</h1>
        <Button className="bg-linear-to-b from-orange-500 to-orange-600">
          <PlusIcon className="w-4 h-4 mr-1" />
          Create Menu
        </Button>
      </section>
      <section className="pt-5">
        <EditMenuCards menus={JSON.parse(JSON.stringify(menus))} />
      </section>
    </main>
  );
}
