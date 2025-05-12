import { fetchAggregatedOrdersByUserId } from "@/lib/data";
import { TrackOrderProps } from "@/lib/definition";
import TrackCards from "@/components/ui/orders/track-cards";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function TrackOrder({
  params,
}: {
  params: Promise<{ id: string; orderId: string }>;
}) {
  const orders: TrackOrderProps[] = await fetchAggregatedOrdersByUserId(
    (await params).id,
  );

  return (
    <main className="p-5 min-h-screen lg:pt-20 pb-24">
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold">
            Track your Orders
          </h1>
          <div>
            <Link href="/restaurants">
              <Button variant="link" className="text-neutral-700">
                New Order
              </Button>
            </Link>
          </div>
        </div>
        <Separator className="mt-1" />
      </section>
      <TrackCards orders={JSON.parse(JSON.stringify(orders))} />
    </main>
  );
}
