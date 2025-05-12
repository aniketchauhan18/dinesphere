"use client";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { UserProps } from "../orders/checkout-button";
import { useUser } from "@/app/hooks/UserContext";
import { toast } from "sonner";
// change any types here
export default function AddOrderItemButton({
  price,
  quantity = 1,
  menuId,
}: {
  price: any;
  quantity: number;
  menuId: any;
}) {
  const router = useRouter();
  const user = useUser() as UserProps;

  const handleAddOrderItem = useDebouncedCallback(async () => {
    try {
      const response = await fetch(`/api/users/add-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          price,
          quantity: 1, // 1 by default
          menuId,
        }),
        cache: "no-cache",
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast("Error adding menu to the orderItem");
      }
      router.refresh();
      toast("Added to the orders");
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  }, 300);
  return (
    <button
      className="px-3 text-white bg-linear-to-b from-green-500 to-green-600 py-1 text-sm rounded-sm shadow-xs"
      onClick={() => handleAddOrderItem()}
    >
      Add
    </button>
  );
}
