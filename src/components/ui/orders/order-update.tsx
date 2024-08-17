"use client";
import { PlusIcon, MinusIcon, TrashIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

export default function UpdateOrder({
  quantity,
  orderItemId,
  basePrice,
}: {
  quantity: string;
  orderItemId: string;
  basePrice: number;
}) {
  const router = useRouter();

  const incrementOrderQuantity = useDebouncedCallback(async () => {
    const newQuantity = parseInt(quantity) + 1; // inc quantity by 1

    const response = await fetch(`/api/order-item/${orderItemId}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: newQuantity,
        orderItemId,
        basePrice,
      }),
    });

    if (response.ok) {
      router.refresh(); // refresh for ui consistency with data
    }
  }, 200);

  const decrementOrderQuantity = useDebouncedCallback(async () => {
    if (parseInt(quantity) === 1) {
      return;
    }
    const newQuantity = parseInt(quantity) - 1;

    const response = await fetch(`/api/order-item/${orderItemId}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: newQuantity,
        orderItemId,
        basePrice,
      }),
    });
    if (response.ok) {
      router.refresh();
    }
  }, 300);

  const deleteOrderItem = useDebouncedCallback(async () => {
    const response = await fetch(`/api/order-item/${orderItemId}/update`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderItemId,
      }),
    });

    if (response.ok) {
      router.refresh();
    }
  }, 300);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-neutral-900 p-0.5">
            <PlusIcon
              className="w-4 h-4 text-white hover:cursor-pointer"
              onClick={incrementOrderQuantity}
            />
          </div>
          <div>
            <p>{quantity}</p>
          </div>
          <div className="rounded-full bg-neutral-900 p-0.5">
            <MinusIcon
              className="w-4 h-4 text-white hover:cursor-pointer"
              onClick={decrementOrderQuantity}
            />
          </div>
        </div>
        {/* <Button variant="destructive" className="text-sm">Remove</Button> */}
        <p className="text-neutral-700 text-sm">
          <TrashIcon
            className="w-5 h-5 text-red-400 hover:cursor-pointer"
            onClick={deleteOrderItem}
          />
        </p>
      </div>
    </div>
  );
}
