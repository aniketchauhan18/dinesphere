import { fetchPopulatedOrderById } from "@/lib/data";
import { TrackOrderProps } from "@/lib/definition";
import TrackCards from "@/components/ui/orders/track-cards";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function TrackOrder({
  params,
}: {
  params: { id: string; orderId: string };
}) {
  const order: TrackOrderProps = await fetchPopulatedOrderById(params.orderId);

  return (
    <main className="p-5 min-h-screen pb-24">
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold">
            Track your Order
          </h1>
          <div>
            <Button variant="link" className="text-neutral-700">
              New Order
            </Button>
          </div>
        </div>
        <Separator />
      </section>
      <TrackCards
        orderId={order._id}
        trackOrderItems={order.orderItems}
        status={order.status}
        restaurantId={order.restaurantId}
        total={order.totalPrice}
        date={order.createdAt}
        userId={order.userId}
      />
    </main>
  );
}
