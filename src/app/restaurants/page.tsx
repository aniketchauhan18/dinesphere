import {
  fetchFilteredRestuarants,
  fetchRestaurants,
  fetchRestaurantsCuisines,
} from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import RestauranCards from "../../components/ui/restaurants/restaurant-cards";
import Search from "@/components/Search";
import Filter from "@/components/Filter";

export interface RestaurantProps {
  _id: string;
  userId: string;
  name: string;
  country: string;
  city: string;
  state: string;
  address: string;
  description: string;
  number: string;
  email: string;
  websiteURL: string | null;
  cuisine: string[];
}

export default async function Restaurants({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; cuisine?: string }>;
}) {
  const query = (await searchParams).query || ".*";
  const cuisine = (await searchParams).cuisine || ".*";

  // const restaurants: RestaurantProps[] = await fetchRestaurants();

  const filteredRestaurants = await fetchFilteredRestuarants(query, cuisine);
  const cuisines = await fetchRestaurantsCuisines();

  return (
    <main className="lg:pt-20">
      <section className="lg:hidden px-5 pt-5">
        <p className="font-bold text-xl">Available Restaurants</p>
        <Separator />
      </section>
      <section className="pt-5 lg:py-16  flex justify-center items-center w-full flex-col sm:flex-row gap-3">
        <Search />
        <div className="w-full sm:w-auto flex justify-end px-5 sm:justify-normal items-center max-w-lg">
          <Filter cuisines={cuisines} />
        </div>
      </section>
      <section className="pb-24 pt-5">
        <RestauranCards
          restaurants={JSON.parse(JSON.stringify(filteredRestaurants))}
        />
      </section>
    </main>
  );
}
