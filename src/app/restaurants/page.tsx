import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchRestaurants } from "@/lib/data";
import { SearchIcon } from "lucide-react";
import RestauranCards from "@/components/ui/restaurants/restaurant-cards";
import Image from "next/image";
import React from "react";

export interface RestaurantProps {
  _id: String,
  userId: String,
  name: String,
  country: String,
  city: String,
  state: String,
  address: String
  description: String,
  number: String,
  email: String,
  websiteURL: String | null,
  imageUrls: String[],
  cuisine: String[]
}

export default async function Restaurants() {
  const restaurants: RestaurantProps[] = await fetchRestaurants();
  console.log(restaurants);

  return (
    <main>
      <section className="bg-neutral-100 py-16 flex justify-center items-center">
        <div className="flex justify-center items-center max-w-lg w-full px-5">
          <Input 
            className="rounded-none rounded-l-lg border-r-0"
            placeholder="Search for restaurants"
          />
          <Button className=" rounded-none rounded-r-lg gap-1 flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500">
            <div className="flex justify-center items-center">
            <SearchIcon className="w-3.5 h-3.5"/>
            </div>
          </Button>
        </div>
      </section>
        {/* <div className="p-5">
          <div className="bg-neutral-100 rounded-lg">
            <Image
              src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="restaurant-image"
              className="rounded-t-lg"
              layout="responsive"
              width="200"
              sizes="100%"
              height="150"
              objectFit="cover"
              placeholder="empty"
            />
            <div className="p-3">
              <div></div>
              <p className="font-bold text-neutral-700 text-lg">
              The Sushi Bar
              </p>
              <p>
                Juicy burgers and fries
              </p>
              <div className="flex items-center text-neutral-500">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <div>23 Main St, Anytown USA</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="bg-neutral-100 rounded-lg">
            <Image
              src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="restaurant-image"
              className="rounded-t-lg"
              layout="responsive"
              width="200"
              sizes="100%"
              height="150"
              objectFit="cover"
              placeholder="empty"
            />
            <div className="p-3">
              <div></div>
              <p className="font-bold text-neutral-700 text-lg">
              The Sushi Bar
              </p>
              <p>
                Juicy burgers and fries
              </p>
              <div className="flex items-center text-neutral-500">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <div>23 Main St, Anytown USA</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="bg-neutral-100 rounded-lg">
            <Image
              src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="restaurant-image"
              className="rounded-t-lg"
              layout="responsive"
              width="200"
              sizes="100%"
              height="150"
              objectFit="cover"
              placeholder="empty"
            />
            <div className="p-3">
              <div></div>
              <p className="font-bold text-neutral-700 text-lg">
              The Sushi Bar
              </p>
              <p>
                Juicy burgers and fries
              </p>
              <div className="flex items-center text-neutral-500">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <div>23 Main St, Anytown USA</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="bg-neutral-100 rounded-lg">
            <Image
              src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="restaurant-image"
              className="rounded-t-lg"
              layout="responsive"
              width="200"
              sizes="100%"
              height="150"
              objectFit="cover"
              placeholder="empty"
            />
            <div className="p-3">
              <div></div>
              <p className="font-bold text-neutral-700 text-lg">
              The Sushi Bar
              </p>
              <p>
                Juicy burgers and fries
              </p>
              <div className="flex items-center text-neutral-500">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <div>23 Main St, Anytown USA</div>
              </div>
            </div>
          </div>
        </div> */}
        <RestauranCards restaurants={restaurants} />
    </main>
  )
}