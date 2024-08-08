import { fetchRestaurantById, fetchRestaurantMenuById } from "@/lib/data";
import { RestaurantProps } from "../page";
import { MenuProps } from "@/lib/definition";
// import { MapPinIcon, PhoneIcon } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import MenuCards from "@/components/ui/menus/menu-cards";

export default async function RestaurantPage({
  params,
}: {
  params: { id: string };
}) {
  const [restaurant, menus]: [RestaurantProps, MenuProps[]] = await Promise.all([
    fetchRestaurantById(params.id),
    fetchRestaurantMenuById(params.id)
  ])

  // console.log(menus);
  return (
    <main className="pt-5 px-5">
      <section className="w-full min-h-72 bg-neutral-200 rounded flex justify-center items-center">
        Restaurant Image
      </section>
      {/* <section className="grid sm:grid-cols-2 lg:grid-cols-3 pt-5 gap-5">
        <div className="space-y-2">
          <h1 className="font-bold text-xl">About Us</h1>
          <p className="text-neutral-600">Our Restaurant is a family-owned Italian eatery that has been serving the community for over 20 years. We pride ourselves on using only the freshest ingredients and authentic recipes to create a truly memorable dining experience.</p>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-xl">Location</h1>
          <div className="flex items-center gap-2 ">
            <MapPinIcon className="w-4 h-4 text-neutral-600"/>
            <p>123 Main Street, Anytown USA</p>
          </div>
          <div className="flex items-center gap-2 ">
            <PhoneIcon className="w-4 h-4 text-neutral-600"/>
            <p>(123) 456-7890</p>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-xl">Cuisine</h1>
          <p>At Acme Restaurant, we specialize in authentic Italian cuisine. Our menu features a wide variety of classic dishes, from homemade pasta to wood-fired pizzas and decadent desserts. We use only the finest ingredients and time-honored recipes to ensure that every bite is a true taste of Italy.</p>
        </div>
      </section> */}
      {/* <h1>Restaurant Page</h1>
      <p>Restaurant ID: {params.id}</p> */}
      <section className="pt-5 pb-24">
        <h1>Our Menu</h1>
        <MenuCards menus={menus} />
      </section>
    </main>
  );
}
