"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { useUser } from "@/app/hooks/UserContext";
import { UserProps } from "./orders/checkout-button";

export default function BecomePartnerButton({
  userRestaurantsCount,
}: {
  userRestaurantsCount: number;
}) {
  const user = useUser() as UserProps;
  const router = useRouter();

  const handleButtonClick = async () => {
    // making it work for better user experience
    if (userRestaurantsCount > 0) {
      router.push(`/dashboard/${user?._id}`);
    }
    router.push(`/partner/become-partner`);
  };

  return (
    <Button
      className="bg-linear-to-l from-orange-600 to-yellow-500 rounded-full text-xs"
      onClick={handleButtonClick}
    >
      Become Partner
    </Button>
  );
}
