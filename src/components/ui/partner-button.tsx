"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { useUser } from "@/app/hooks/UserContext";
import { UserProps } from "./orders/checkout-button";

export default function PartnerButton({
  numberOfRestaurants,
}: {
  numberOfRestaurants: number;
}) {
  const router = useRouter();
  const user = useUser() as UserProps;

  const handleButtonClick = () => {
    if (numberOfRestaurants > 0) {
      router.push(`/dashboard/${user?._id}`);
      return;
    }
    router.push("/partner/become-partner/details/partnership");
  };
  return (
    <Button
      className="bg-red-500 hover:bg-red-500 text-xs sm:text-sm"
      onClick={handleButtonClick}
    >
      Partner with us
    </Button>
  );
}
