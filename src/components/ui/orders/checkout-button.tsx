"use client";
import { useUser } from "@/app/hooks/UserContext";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
}

interface RazorpayInstance {
  open(): void;
}

// adding razorpay to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

// const initialUserState: User | null = null;

export default function CheckoutButton({
  restaurantId,
  totalPrice,
  status,
  orderItemsIds,
}: CheckOutOrderProps) {
  // userId, restaurantId, totalPrice, status, orderItems
  const router = useRouter();
  const user: UserProps = useUser() as UserProps;

  const handleAddOrder = async (totalPrice: number | string) => {
    if (!user.address || user.address.trim() === "") {
      alert("Please add address");
      router.push(`/user/${user?._id}/profile`);
      return;
    }

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

      const { order } = await orderResponse.json();
      const options: RazorpayOptions = {
        key: process.env.RAZORPAY_KEY_ID as string,
        amount: totalPrice as number, // Amount should be in currency subunits (e.g., paise for INR)
        currency: "INR",
        name: "DineSphere",
        description: "Test Transaction",
        image:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yankzbDVYTGZMYktidDhoWGRYY054MUxzdmgifQ",
        order_id: order.id, // Use the order ID obtained from the response
        prefill: {
          name: (user?.firstName as string) || "Aniket",
          email: (user?.email as string) || "workwithaniket18@gmail.com",
          contact: user?.number || "8580496476",
        },
        notes: {
          address: "HBH",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (response: RazorpayResponse) {
          if (
            !response.razorpay_payment_id ||
            !response.razorpay_order_id ||
            !response.razorpay_signature
          ) {
            console.error("Razorpay response is missing required properties.");
            console.log("Razorpay error");
            return;
          }
          console.log("Payment Successful!");
          console.log("Payment ID: ", response.razorpay_payment_id);
          console.log("Order ID: ", response.razorpay_order_id);
          console.log("Signature: ", response.razorpay_signature);
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          // store payment api call

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
          // extracting payment from the response this payment contains the payment id
          const { payment } = await storePaymentResponse.json();
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
          const { order } = await checkoutResponse.json();
          if (checkoutResponse.ok) {
            toast("Order added sucessfully");
            router.push(`/user/${user._id}/orders/track`);
          }
        },
      };

      const rzp1: RazorpayInstance = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  };

  return (
    <>
      <Button
        className="w-full sm:max-w-[12rem] bg-gradient-to-b from-orange-500 to-orange-600"
        onClick={() => handleAddOrder(totalPrice)}
      >
        Checkout
      </Button>
    </>
  );
}
