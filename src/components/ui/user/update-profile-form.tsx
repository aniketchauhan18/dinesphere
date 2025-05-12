"use client";
import { useUser } from "@/app/hooks/UserContext";
import React from "react";
import { Label } from "../label";
import { Input } from "../input";
import { UserProps } from "../orders/checkout-button";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import BackButton from "../back-button";

export default function UpdateProfile({ userId }: { userId: string }) {
  console.log(userId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const currentUserData = useUser() as UserProps;

  const inputClasses = "bg-neutral-100/70 shadow-none text-neutral-700";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formObj = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      number: formData.get("number"),
      address: formData.get("address"),
    };
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
      });
      if (!response.ok) {
        alert("User not updated");
        setIsLoading(false);
        router.refresh();
        return;
      }
      setIsLoading(false);
      router.refresh();
    } catch (err) {
      console.log(err);
      alert("User not updated");
    }
  };

  return (
    <form className="space-y-1 max-w-xl w-full" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label>First Name</Label>
        <Input
          name="firstName"
          className={inputClasses}
          required
          defaultValue={currentUserData?.firstName}
        />
      </div>
      <div>
        <Label>Last Name</Label>
        <Input
          name="lastName"
          className={inputClasses}
          required
          defaultValue={currentUserData?.lastName}
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          name="lastName"
          className={inputClasses}
          disabled
          required
          defaultValue={currentUserData?.email}
        />
      </div>
      <div>
        <Label>Address</Label>
        <Textarea
          name="address"
          required
          className={inputClasses}
          defaultValue={currentUserData?.address}
        />
      </div>
      <div className="w-full flex justify-center   pt-2">
        <Button
          type="submit"
          className="bg-linear-to-br from-orange-500 to-orange-600 w-full max-w-sm"
        >
          {isLoading ? (
            <div className="flex items-center">
              <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" />
              Updating...
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </form>
  );
}
