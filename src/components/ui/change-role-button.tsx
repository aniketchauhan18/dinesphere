"use client";
import { useUser } from "@/app/hooks/UserContext";
import { RocketIcon } from "lucide-react";
import { UserProps } from "./orders/checkout-button";
import { useRouter } from "next/navigation";

export default function ChangeRoleButton() {
  const user = useUser() as UserProps;
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch(`/api/users/${user._id}/change-role`, {
      method: "PATCH",
      headers: {
        Content: "application/json",
      },
      body: JSON.stringify({
        role: "admin",
        clerkId: user.clerkId,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      router.push(`/partner/become-partner/details/restaurant`);
      router.refresh();
    }
  };

  return (
    <div
      className="flex hover:cursor-pointer items-center text-xs px-2 py-0.5 border bg-white rounded-sm "
      onClick={handleClick}
    >
      <RocketIcon className="w-3 h-3 mr-1" />
      <p>Get started</p>
    </div>
  );
}
