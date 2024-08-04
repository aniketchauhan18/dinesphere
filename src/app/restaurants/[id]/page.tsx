import { fetchRestaurantById } from "@/lib/data";
import { RestaurantProps } from "../page";

export default async function RestaurantPage({
  params,
}: {
  params: { id: string };
}) {
  const restaurant: RestaurantProps = await fetchRestaurantById(params.id);
  console.log(restaurant);
  return (
    <div>
      <h1>Restaurant Page</h1>
      <p>Restaurant ID: {params.id}</p>
    </div>
  );
}
