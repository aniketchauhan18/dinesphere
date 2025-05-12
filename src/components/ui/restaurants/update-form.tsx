"use client";
import { RestaurantProps } from "@/app/restaurants/page";
import React, { useState } from "react";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
// omitting out few fields

export default function RestaurantUpdateForm({
  restaurant,
}: {
  restaurant: RestaurantProps;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const commonInputClasses: string =
    "text-sm text-neutral-700 bg-zinc-100/30 shadow-none";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const formObj = {
      name: formData.get("name"),
      country: formData.get("country"),
      city: formData.get("city"),
      state: formData.get("state"),
      address: formData.get("address"),
      number: formData.get("number"),
      email: formData.get("email"),
      websiteUrl: formData.get("websiteUrl"),
      description: formData.get("description"),
    };
    console.log("formObj", formObj);

    const response = await fetch(`/api/restaurant/${restaurant._id}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObj),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      alert("Error while updating restaurant with new data , Kindly try again");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    alert("Restaurant data updated");
    router.refresh();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-3 sm:gap-5 w-full p-3"
    >
      <div className="grid sm:grid-cols-2 w-full gap-5">
        <div className="flex flex-col justify-between gap-2">
          <div className="w-full space-y-0.5">
            <Label>Restaurant Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="DineSphere"
              required
              defaultValue={restaurant.name}
              className={commonInputClasses}
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              placeholder="India"
              required
              defaultValue={restaurant.country}
              className={commonInputClasses}
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              placeholder="Palampur"
              defaultValue={restaurant.city}
              required
              className={commonInputClasses}
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label>State</Label>
            <Input
              type="text"
              name="state"
              placeholder="State"
              defaultValue={restaurant.state}
              required
              className={commonInputClasses}
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label>Address</Label>
            <Textarea
              name="address"
              placeholder="Address"
              required
              defaultValue={restaurant.address}
              className={`min-h-24 ${commonInputClasses}`}
            />
          </div>
        </div>
        <div className="space-y-3 flex justify-between flex-col">
          <div className="w-full space-y-0.5">
            <Label>Contact No.</Label>
            <Input
              type="text"
              name="number"
              placeholder="Number"
              required
              defaultValue={restaurant.number}
              className={commonInputClasses}
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              defaultValue={restaurant.email}
              className={commonInputClasses}
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label>Website Url</Label>
            <Input
              type="text"
              name="websiteUrl"
              placeholder="https://dineshere.vercel.app"
              defaultValue={restaurant.websiteURL as string}
              required
              className={commonInputClasses}
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Description"
              required
              className={`min-h-24 ${commonInputClasses}`}
              defaultValue={restaurant.description}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-linear-to-b from-orange-600 to-orange-500 shadow-none "
        >
          {isLoading ? (
            <div className="flex items-center">
              <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" />
              Updating
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </form>
  );
}
