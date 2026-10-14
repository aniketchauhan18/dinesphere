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

interface PendingPaymentPayload extends RazorpayResponse {}

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
  const pendingPaymentStorageKey = "pending_payment_sync";
  const [hasPendingSync, setHasPendingSync] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.localStorage.getItem(pendingPaymentStorageKey));
  });

  const getPendingPaymentPayload = (): PendingPaymentPayload | null => {
    if (typeof window === "undefined") return null;
    const payload = window.localStorage.getItem(pendingPaymentStorageKey);
    if (!payload) return null;
    try {
      return JSON.parse(payload) as PendingPaymentPayload;
    } catch {
      return null;
    }
  };

  const verifyAndFinalizePayment = async (
    paymentPayload: PendingPaymentPayload,
  ) => {
    const verifyResponse = await fetch("/api/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
    });

    if (!verifyResponse.ok) {
      throw new Error("Payment verification failed");
    }
  };

  const handleResumePaymentSync = async () => {
    const pendingPayload = getPendingPaymentPayload();
    if (!pendingPayload) {
      setHasPendingSync(false);
      toast.info("No pending payment sync found");
      return;
    }

    setIsLoading(true);
    try {
      await verifyAndFinalizePayment(pendingPayload);
      window.localStorage.removeItem(pendingPaymentStorageKey);
      setHasPendingSync(false);
      toast.success("Payment synced and order created successfully!");
      router.push(`/user/${user._id}/orders/track`);
    } catch {
      toast.error("Still unable to sync payment. Please retry in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrder = async (totalPrice: number | string) => {
    if (hasPendingSync) {
      await handleResumePaymentSync();
      return;
    }

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
          userId: user._id,
          restaurantId,
          orderItems: orderItemsIds,
          status,
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

          const paymentPayload = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          };

          window.localStorage.setItem(
            pendingPaymentStorageKey,
            JSON.stringify(paymentPayload),
          );
          setHasPendingSync(true);

          try {
            await verifyAndFinalizePayment(paymentPayload);
            window.localStorage.removeItem(pendingPaymentStorageKey);
            setHasPendingSync(false);
            toast.success("Order placed successfully!");
            router.push(`/user/${user._id}/orders/track`);
          } catch (error) {
            console.error("Error processing payment verification:", error);
            toast.error(
              "Payment received but sync is pending. Use 'Resume Payment Sync'.",
            );
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
      {isLoading
        ? "Processing..."
        : hasPendingSync
          ? "Resume Payment Sync"
          : "Checkout"}
    </Button>
  );
}
