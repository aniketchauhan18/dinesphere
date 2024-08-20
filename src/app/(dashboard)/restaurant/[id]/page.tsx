import { RestaurantProps } from "@/app/restaurants/page";
import RestaurantUpdateForm from "@/components/ui/restaurants/update-form";
import { fetchRestaurantById, fetchRestaurantImagesById } from "@/lib/data";
import { EyeIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import UploadImage from "@/components/UploadImage";
import UpdateRestaurantImage from "@/components/ui/restaurants/update-image";
import Image from "next/image";
import { RestaurantImageResponse } from "@/lib/definition";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UploadMenuCards from "@/components/ui/menus/upload-menu-card";
import { redirect } from "next/navigation";
import { checkRole } from "@/lib/utils/role";

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

  if (!checkRole("admin")) {
    redirect("/");
  }

  const imageUrl = restaurantImages[0]?.url ?? undefined; // Use  nullish coalescing

  // use image url in src in image
  return (
    <main className="lg:py-24 pb-24">
      {Boolean(imageUrl) || (
        <section className="p-3">
          <div className="flex flex-col justify-center w-full">
            <div className="flex justify-center relative ">
              <UploadImage
                placeholder="restaurant"
                placeholderId={restaurant._id.toString()}
              />
            </div>
          </div>
        </section>
      )}
      {/* <section className="p-3">
            <div className="flex flex-col justify-center w-full">
              <div className="flex justify-center relative ">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    width={500}
                    height={300}
                    className="w-full h-44 sm:h-80 lg:h-96 object-cover object-top rounded-lg"
                    alt="Restaurant Logo"
                    priority
                  />
                ) : (
                  <UploadImage
                    placeholder="restaurant"
                    placeholderId={restaurant._id.toString()}
                  />
                )}
              </div>
            </div>
          </section> */}
      {/* {imageUrl && (
              <section className="p-2">
                <div className="flex justify-end gap-4">
                  <div>
                    <Button variant="outline">
                      See Images
                    </Button>
                  </div>
                  <div className="text-xs sm:text-sm flex border p-2 rounded-md shadow-sm items-center hover:bg-neutral-100 duration-75">
                    <UpdateRestaurantImage restaurantId={restaurant._id.toString()} />
                  </div>
                </div>
              </section>
            )} */}
      <section className="p-3">
        {imageUrl && (
          <div className="p-3">
            <h1 className="font-bold text-2xl">Your Restaurant Gallery</h1>
            <p className="text-xs sm:text-sm text-neutral-700">
              Browse through all the images you&apos;ve uploaded for your
              restaurant.
            </p>
            {restaurantImages.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {restaurantImages.map((image) => (
                  <div
                    className="relative overflow-hidden rounded-lg group"
                    key={image._id}
                  >
                    <Link
                      href="#"
                      className="absolute inset-0 z-10"
                      prefetch={false}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <Image
                      src={image.url}
                      alt="Restaurant Image"
                      width={400}
                      height={300}
                      className="object-cover w-full h-60"
                      style={{ aspectRatio: "400/300", objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white"
                      >
                        <EyeIcon className="w-6 h-6" />
                        <span className="sr-only">View</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No images uploaded yet</div>
            )}
            <div className="flex justify-end pt-3">
              <div className="text-xs sm:text-sm flex border p-2 rounded-md shadow-sm items-center hover:bg-neutral-100 duration-75">
                <UpdateRestaurantImage
                  restaurantId={restaurant._id.toString()}
                />
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="p-3 sm:p-10 grid grid-cols-2">
        <div className="flex justify-start">
          <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-bold flex items-center">
              <MapPinIcon className="w-4 h-4 text-neutral-800 mr-1" />
              Address
            </h1>
            <p className="text-sm text-neutral-700">{restaurant.address}</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-bold"> Contact</h1>
            <p className="text-sm text-neutral-700 flex items-center">
              <PhoneIcon className="w-4 h-4 text-neutral-800 mr-1" />
              {restaurant.number}
            </p>
            <div className="text-sm flex items-center text-neutral-700 hover:cursor-pointer">
              <MailIcon className="w-4 h-4 mr-1" />
              <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-red-400 p-3 mt-5">
        <h1 className="font-bold text-lg text-neutral-100">About Us</h1>
        <p className="text-sm text-neutral-100">
          {/* {restaurant.description} */}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          perferendis veniam. Ad earum molestiae, reprehenderit suscipit maxime
          praesentium dolores voluptate recusandae sequi modi voluptas eveniet,
          nulla voluptatum illum fugit est?
        </p>
      </section>
      <section className=" pt-10 p-3">
        <h1 className="font-bold tex-lg">Update Restaurant Details</h1>
        <div className="pt-3">
          <RestaurantUpdateForm restaurant={restaurant} />
        </div>
      </section>
      <section className="pt-3 p-3">
        <h1 className="font-bold text-xl">Upload Menus</h1>
        <UploadMenuCards restaurantId={restaurant._id.toString()} />
      </section>
    </main>
  );
}
