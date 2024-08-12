"use server";
import { RestaurantProps } from "@/app/restaurants/page";
import { MapPinIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function RestaurantCards({
  restaurants,
}: {
  restaurants: RestaurantProps[];
}) {
  return (
    <div>
      {restaurants.length > 0 ? (
        <div className="py-16 px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id.toString()}
              restaurant={restaurant}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 flex items-center justify-center min-h-[80dvh]">
          No restaurants found!!
        </div>
      )}
    </div>
  );
}

async function RestaurantCard({ restaurant }: { restaurant: RestaurantProps }) {
  return (
    <div className="p-5 flex justify-center">
      <Link
        href={`/restaurants/${restaurant._id}`}
        className=" rounded-lg h-full hover:shadow duration-300 bg-neutral-50 max-w-xs"
      >
        <Image
          src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="restaurant-image"
          className="rounded-t-lg"
          width="400"
          sizes="100%"
          height="150"
          objectFit="cover"
          placeholder="empty"
        />
        <div className="p-3 space-y-0.5">
          <p className="font-bold text-neutral-800 text-lg">
            {restaurant.name}
          </p>
          <p className="text-neutral-700 text-sm">
            {restaurant.description.length > 25
              ? restaurant.description.slice(0, 25) + "..."
              : restaurant.description}
          </p>
          <div className="flex items-center justify-between text-neutral-500">
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1" />
              <p className="text-sm">{restaurant.address}</p>
            </div>
            <div className="flex text-sm items-center ">
              <StarIcon className="w-4 h-4 text-green-600" />
              <StarIcon className="w-4 h-4 text-green-600" />
              <StarIcon className="w-4 h-4 text-green-600" />
              <StarIcon className="w-4 h-4 text-green-600" />
              <StarIcon className="w-4 h-4" />
              <p className="ml-1">4.3</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
