import {
  fetchRestaurantById,
  fetchRestaurantImagesById,
  fetchRestaurantMenuById,
} from "@/lib/data";
import { RestaurantProps } from "../page";
import { MenuProps } from "@/lib/definition";
import { Separator } from "@/components/ui/separator";

// import { MapPinIcon, PhoneIcon } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import MenuCards from "@/components/ui/menus/menu-cards";
import Image from "next/image";

interface RestaurantImageProps {
  _id: string;
  publicId: string;
  url: string;
  restauarantId: string;
  height: number;
  width: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export default async function RestaurantPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const [restaurant, menus, restaurantImages]: [
    RestaurantProps,
    MenuProps[],
    RestaurantImageProps[],
  ] = await Promise.all([
    fetchRestaurantById(params.restaurantId),
    fetchRestaurantMenuById(params.restaurantId),
    fetchRestaurantImagesById(params.restaurantId),
  ]);
  // console.log(menus);
  return (
    <main className="pt-5 lg:pt-20 px-5">
      <section className="lg:hidden">
        <p className="font-bold text-lg">{restaurant.name}</p>
        <Separator />
      </section>
      <section className="w-full mt-5 min-h-72 rounded flex items-center">
        {restaurantImages.length > 0 ? (
          restaurantImages.length === 1 ? (
            <div className="flex justify-start w-full">
              {restaurantImages.map((image, index) => (
                <div key={image.url} className="relative w-full h-96">
                  <Image
                    src={image.url}
                    alt="Restaurant Image"
                    fill
                    sizes="900px"
                    style={{
                      objectFit: "cover",
                    }}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          ) : restaurantImages.length === 2 ? (
            <div className="grid sm:grid-cols-2 gap-4 w-full h-full">
              {restaurantImages.map((image, index) => (
                <div key={image.url} className="relative w-full h-44 sm:h-96">
                  <Image
                    src={image.url}
                    alt="Restaurant Image"
                    fill
                    sizes="900px"
                    style={{
                      objectFit: "cover",
                    }}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          ) : restaurantImages.length === 3 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="relative w-full h-44 sm:h-96">
                <Image
                  src={restaurantImages[0].url}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  alt={`Restaurant Image 1`}
                  priority
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-rows-2 gap-4 h-full">
                <div className="relative aspect-square sm:aspect-auto w-full">
                  <Image
                    src={restaurantImages[1].url}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    alt={`Restaurant Image 2`}
                    priority
                  />
                </div>
                <div className="relative aspect-square sm:aspect-auto w-full">
                  <Image
                    src={restaurantImages[2].url}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    alt={`Restaurant Image 3`}
                    priority
                  />
                </div>
              </div>
            </div>
          ) : restaurantImages.length === 4 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full">
              {restaurantImages.map((image, index) => (
                <Image
                  key={image._id}
                  src={image.url}
                  width={140}
                  height={300}
                  className="w-full h-full object-cover object-center rounded-lg"
                  alt={`Restaurant Image ${index + 1}`}
                  priority
                />
              ))}
            </div>
          ) : null
        ) : (
          <div className="text-center w-full">No Images available</div>
        )}
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
      <section className="pt-5 pb-24">
        <h1>Our Menu</h1>
        <MenuCards menus={menus} />
      </section>
    </main>
  );
}
