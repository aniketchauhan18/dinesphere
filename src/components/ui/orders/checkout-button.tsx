"use client";
import { Button } from "../button";
export interface CheckOutOrderProps {
  userId: string;
  restaurantId: string;
  totalPrice: string;
  status: string;
  orderItemsIds: string[]; // mongodb object Ids
}

export default function CheckoutButton({
  userId,
  restaurantId,
  totalPrice,
  status,
  orderItemsIds,
}: CheckOutOrderProps) {
  // userId, restaurantId, totalPrice, status, orderItems

  const handleAddOrder = async () => {
    try {
      const response = await fetch(`/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          restaurantId,
          totalPrice,
          status,
          orderItems: orderItemsIds,
        }),
      });
      if (response.ok) {
        alert("Order added sucessfully");
      }
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  };

  return (
    <>
      <Button
        className="w-full max-w-sm bg-gradient-to-b from-orange-500 to-orange-600"
        onClick={() => handleAddOrder()}
      >
        Checkout
      </Button>
    </>
  );
}
