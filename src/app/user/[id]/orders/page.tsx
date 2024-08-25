import { fetchUserOrderMenuItems, fetchUserById } from "@/lib/data";
import { MenuOrderItemProps } from "@/lib/definition";
import { OrdersCards } from "@/components/ui/orders/orders-cards";
import { Button } from "@/components/ui/button";
import CheckoutButton, {
  UserProps,
} from "@/components/ui/orders/checkout-button";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { totalAmountWithGST } from "@/lib/utils/gstCalculator";
import BackButton from "@/components/ui/back-button";

export const revalidate = 0;

export default async function Orders({ params }: { params: { id: string } }) {
  const [user, menuOrders]: [UserProps, MenuOrderItemProps[]] =
    await Promise.all([
      fetchUserById(params.id),
      fetchUserOrderMenuItems(params.id),
    ]);

  if (!user || !menuOrders) {
    notFound();
  }

  const totalAmount = menuOrders.reduce((acc, menuOrder) => {
    return acc + menuOrder.price;
  }, 0);

  const totalWithGST = parseInt(totalAmountWithGST(totalAmount));

  // array of orderItems ids
  const orderItemsIds = menuOrders.map((menuOrder) => menuOrder._id);

  return (
    <main className="pt-4 lg:pt-20 px-5">
      <>
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
      </>
      <section className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Your Orders</h1>
        <BackButton />
      </section>
      <div className="pt-3 border-b" />
      {menuOrders.length > 0 ? (
        <div className="w-full pb-24">
          <section className="pt-3">
            <OrdersCards orders={JSON.parse(JSON.stringify(menuOrders))} />
          </section>
          <section className="pt-3">
            <div className="border rounded-lg">
              <p className="font-bold text-lg p-3 bg-neutral-200/80 rounded-t-lg">
                CheckOut
              </p>
              <div className="flex flex-col gap-3 p-3 ">
                <div className="flex justify-between pt-3">
                  <p className="font-semibold">Subtotal</p>
                  <p>₹ {totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between ">
                  <p className="font-semibold">GST</p>
                  <p>₹ {(totalWithGST - totalAmount).toFixed(2)}</p>
                </div>
                <div className="border-b border-dashed" />
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>₹ {totalWithGST.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end w-full pt-2 p-2">
                <CheckoutButton
                  restaurantId={menuOrders[0].menuId.restaurantId.toString()}
                  totalPrice={totalWithGST.toString()}
                  status="pending"
                  orderItemsIds={orderItemsIds}
                />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col min-h-[70dvh] justify-center items-center">
          <p className="pb-5">No orders have been added yet.</p>
          <Link href="/restaurants">
            <Button className="w-full max-w-sm bg-gradient-to-b from-orange-500 to-orange-600">
              Explore Restaurants
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
