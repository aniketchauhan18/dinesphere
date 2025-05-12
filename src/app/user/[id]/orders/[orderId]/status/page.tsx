import { fetchOrderById } from "@/lib/data";
import { BikeIcon, CheckIcon, PackageIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/ui/copy-button";

export const revalidate = 0;

export default async function OrderIdPage({
  params,
}: {
  params: { orderId: string };
}) {
  // order fetch call

  // const order = await fetchOrderById(params.orderId);

  return (
    <main className="min-h-[90dvh] p-5 flex items-center justify-center w-full">
      <section className="flex justify-center items-center h-full pb-24 p-3">
        <div className="max-w-xl border p-3 rounded-lg shadow-xs">
          <h1 className="font-bold text-xl w-full text-center">Order Status</h1>
          <div className="flex justify-center text-sm">
            Delievered by DineSphere
          </div>
          <div className="grid grid-cols-3 items-center pt-6 gap-2 sm:gap-5">
            <div className="flex flex-col items-center gap-3 text-neutral-700">
              <div className="bg-neutral-200 rounded-full p-2">
                <PackageIcon className="text-neutral-700 w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm">Order Placed</p>
            </div>
            <div className="flex flex-col items-center gap-3 text-neutral-700">
              <div className="bg-neutral-200 rounded-full p-2">
                <BikeIcon className="text-neutral-700 w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm">Out for delievery</p>
            </div>
            <div className="flex flex-col items-center gap-3 text-neutral-700">
              <div className="bg-green-600 rounded-full p-2">
                <CheckIcon className="text-white w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm">Delievered</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pt-5">
            <p className="text-neutral-600 text-xs sm:text-sm">
              Estimated time for delievery: 18 mins left
            </p>
          </div>
          <div className="pt-3">
            <Progress value={34} />
          </div>
          <div className="pt-5 flex justify-start text-xs sm:text-sm gap-2">
            <p className="text-neutral-700">OrderId: {params.orderId}</p>
            <CopyButton text={"wehfh928r232dhqoiwurt78"} />
          </div>
          <div className="pt-5">
            <Link href="/restaurants" className="flex justify-center w-full">
              <Button
                variant="outline"
                className="bg-linear-to-b from-orange-600 to-orange-500 rounded-full text-white hover:text-white border-none"
              >
                Your Orders
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
