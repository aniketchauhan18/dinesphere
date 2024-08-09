import { fetchUserOrderMenuItems, fetchUserById } from "@/lib/data";
import { MenuOrderItemProps } from "@/lib/definition";
import { OrdersCards } from "@/components/ui/orders/orders-cards";
import { Button } from "@/components/ui/button";
import CheckoutButton, { User } from "@/components/ui/orders/checkout-button";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

export const revalidate = 0;

function totalAmountWithGST(price: number) {
  const gstAmount = (price * 18) / 100;
  const total = gstAmount + price;
  return total.toFixed(2); // total amount rounded to 2 decimal
}

export default async function Orders({ params }: { params: { id: string } }) {
  const [user, menuOrders]: [User, MenuOrderItemProps[]] = await Promise.all([
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
    <main className="pt-4 px-5">
      <>
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
      </>
      <section className="flex justify-start">
        <h1 className="text-xl font-bold">Your Orders</h1>
      </section>
      <div className="pt-3 border-b" />
      {menuOrders.length > 0 ? (
        <div className="w-full pb-24">
          <section className="pt-3">
            <OrdersCards orders={menuOrders} />
          </section>
          <section className="pt-3">
            <div className="p-3 border rounded-lg">
              <p className="font-bold text-lg">CheckOut</p>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between pt-3">
                  <p className="font-semibold">Subtotal</p>
                  <p>₹ {totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between ">
                  <p className="font-semibold">GST</p>
                  <p>₹ {(totalWithGST - totalAmount).toFixed(2)}</p>
                </div>
                <div className="border-b" />
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>₹ {totalWithGST.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-center w-full pt-2">
                <CheckoutButton
                  user={user}
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
