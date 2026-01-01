"use client";
import { useUser } from "@/app/hooks/UserContext";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  number?: string;
  imageUrl: string;
  clerkId: string;
  username: string;
  address?: string;
  role: "admin" | "user";
}

export interface CheckOutOrderProps {
  restaurantId: string;
  totalPrice: string;
  status: string;
  orderItemsIds: string[]; // mongodb object Ids
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => Promise<void>;
  modal?: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open(): void;
  on(event: string, callback: (response: unknown) => void): void;
}

// adding razorpay to window
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function CheckoutButton({
  restaurantId,
  totalPrice,
  status,
  orderItemsIds,
}: CheckOutOrderProps) {
  const router = useRouter();
  const user: UserProps = useUser() as UserProps;
  const [isLoading, setIsLoading] = useState(false);

  const handleAddOrder = async (totalPrice: number | string) => {
    if (!user.address || user.address.trim() === "") {
      toast.error("Please add your delivery address first");
      router.push(`/user/${user?._id}/profile`);
      return;
    }

    // Check if Razorpay script is loaded
    if (typeof window.Razorpay === "undefined") {
      toast.error("Payment gateway is loading. Please try again in a moment.");
      return;
    }

    setIsLoading(true);

    try {
      const orderResponse = await fetch(`/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice,
        }),
        cache: "no-cache",
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        toast.error(errorData.message || "Failed to create order");
        setIsLoading(false);
        return;
      }

      const { order, apikey } = await orderResponse.json();
      
      if (!order || !order.id) {
        toast.error("Failed to create payment order. Please try again.");
        setIsLoading(false);
        return;
      }

      const options: RazorpayOptions = {
        key: apikey || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
        amount: order.amount, // Use amount from order response (already in paise)
        currency: order.currency || "INR",
        name: "DineSphere",
        description: "Food Order Payment",
        image: "/favicon.ico",
        order_id: order.id,
        prefill: {
          name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Guest",
          email: user?.email || "",
          contact: user?.number || "",
        },
        notes: {
          address: user?.address || "Not provided",
        },
        theme: {
          color: "#f97316", // Orange theme matching the app
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            toast.info("Payment cancelled");
          },
        },
        handler: async function (response: RazorpayResponse) {
          if (
            !response.razorpay_payment_id ||
            !response.razorpay_order_id ||
            !response.razorpay_signature
          ) {
            console.error("Razorpay response is missing required properties.");
            toast.error("Payment verification failed. Please contact support.");
            setIsLoading(false);
            return;
          }
          
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          try {
            // Store payment in database
            const storePaymentResponse = await fetch(`/api/payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user._id,
                paymentId: razorpay_payment_id,
                paymentOrderId: razorpay_order_id,
                paymentSignature: razorpay_signature,
              }),
            });

            if (!storePaymentResponse.ok) {
              throw new Error("Failed to store payment");
            }

            const { payment } = await storePaymentResponse.json();

            // Create the order
            const checkoutResponse = await fetch(`/api/checkout`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user._id,
                restaurantId,
                totalPrice,
                status,
                orderItems: orderItemsIds,
                paymentId: payment._id,
              }),
            });

            if (checkoutResponse.ok) {
              toast.success("Order placed successfully!");
              router.push(`/user/${user._id}/orders/track`);
            } else {
              throw new Error("Failed to create order");
            }
          } catch (error) {
            console.error("Error processing order:", error);
            toast.error("Payment received but order creation failed. Please contact support.");
          } finally {
            setIsLoading(false);
          }
        },
      };

      const rzp1 = new window.Razorpay(options);
      
      // Handle payment failures
      rzp1.on("payment.failed", function (response: unknown) {
        console.error("Payment failed:", response);
        toast.error("Payment failed. Please try again.");
        setIsLoading(false);
      });
      
      rzp1.open();
    } catch (err) {
      console.error("Error initiating payment:", err);
      toast.error("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full sm:max-w-48 bg-linear-to-b from-orange-500 to-orange-600"
      onClick={() => handleAddOrder(totalPrice)}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Checkout"}
    </Button>
  );
}
