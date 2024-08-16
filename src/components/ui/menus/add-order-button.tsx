"use client";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
// change any types here
export default function AddOrderItemButton({
  userId,
  price,
  quantity = 1,
  menuId,
}: {
  userId: any;
  price: any;
  quantity: number;
  menuId: any;
}) {
  const router = useRouter();

  const handleAddOrderItem = useDebouncedCallback(async () => {
    try {
      const response = await fetch(`/api/users/add-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          price,
          quantity: 1, // 1 by default
          menuId,
        }),
        cache: "no-cache",
      });
      if (!response.ok) {
        alert("Error adding menu to the orderItem");
      }
      router.refresh();
      alert("menu adder to the orderItem");
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  }, 300);
  return (
    <button
      className="px-3 text-white bg-gradient-to-b from-green-500 to-green-600 py-1 text-sm rounded-sm shadow-sm"
      onClick={() => handleAddOrderItem()}
    >
      Add
    </button>
  );
}
