import { RestaurantProps } from "@/app/restaurants/page";
import RestaurantUpdateForm from "@/components/ui/restaurants/update-form";
import { fetchRestaurantById, fetchRestaurantImagesById } from "@/lib/data";
import { MailIcon } from "lucide-react";
import UploadImage from "@/components/UploadImage";
import Image from "next/image";
import { RestaurantImageResponse } from "@/lib/definition";

export default async function RestaurantDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [restaurant, restaurantImages]: [
    RestaurantProps,
    RestaurantImageResponse[],
  ] = await Promise.all([
    fetchRestaurantById(params.id),
    fetchRestaurantImagesById(params.id),
  ]);
  // const restaurant: RestaurantProps = await fetchRestaurantById(params.id);
  // const restaurantImages = await fetchRestaurantImagesById(params.id);
  // console.log(restaurant)

  const imageUrl = restaurantImages[0]?.url ?? undefined; // Use  nullish coalescing

  // use image url in src in image
  return (
    <main className="pb-24">
      <section className="p-3">
        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-center relative ">
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={300}
                height={300}
                className="w-full h-44 sm:h-80 lg:h-96 object-cover object-center rounded-lg"
                alt="Restaurant Logo"
              />
            ) : (
              <UploadImage
                placeholder="restaurant"
                placeholderId={restaurant._id.toString()}
              />
            )}
          </div>
        </div>
        {/* <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  width={100}
                  height={100}
                  alt="Restaurant Logo"
                />
              ) : (
                <UploadImage
                  placeholder="restaurant"
                  placeholderId={restaurant._id.toString()}
                />
              )}

              <h1 className="text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
                {restaurant.name}
              </h1>
              <p className="text-primary-foreground/80 md:text-lg lg:text-xl">
                {restaurant.websiteURL}
              </p>
            </div>
          </div>
        </div> */}
      </section>
      <section className="p-3 sm:p-10 grid grid-cols-2">
        <div className="flex justify-start">
          <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-bold">Address</h1>
            <p className="text-sm text-neutral-700">{restaurant.address}</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-bold">Contact</h1>
            <p className="text-sm text-neutral-700">{restaurant.number}</p>
            <div className="text-sm flex items-center text-neutral-700 hover:cursor-pointer">
              <MailIcon className="w-4 h-4 mr-1" />
              <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-100 p-3 mt-5">
        <h1 className="font-bold text-lg">About Us</h1>
        <p className="text-sm text-neutral-700">
          {/* {restaurant.description} */}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          perferendis veniam. Ad earum molestiae, reprehenderit suscipit maxime
          praesentium dolores voluptate recusandae sequi modi voluptas eveniet,
          nulla voluptatum illum fugit est?
        </p>
      </section>
      <section className="pt-10 p-3">
        <h1 className="font-bold tex-lg">Update Restaurant Details</h1>
        <div className="pt-3">
          <RestaurantUpdateForm restaurant={restaurant} />
        </div>
      </section>
    </main>
  );
}
