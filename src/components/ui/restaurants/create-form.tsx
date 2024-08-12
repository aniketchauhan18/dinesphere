"use client";
import { Input } from "../input";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { Label } from "../label";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

export default function CreateForm({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const commonInputClasses: string =
    "text-sm text-neutral-700 bg-zinc-100/30 shadow-none";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const formObj = {
      userId,
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

    const response = await fetch("/api/restaurant", {
      method: "POST",
      headers: {
        "Contenr-Type": "application/json",
      },
      body: JSON.stringify(formObj),
    });

    if (!response.ok) {
      alert("Error while creating restaurnat please try again !!");
    }
    setIsLoading(false);
    // redirect to dashboard
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
              className={commonInputClasses}
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              placeholder="Palampur"
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
              className={commonInputClasses}
            />
          </div>
          <div className="w-full space-y-0.5">
            <Label>Website Url</Label>
            <Input
              type="text"
              name="websiteUrl"
              placeholder="https://dineshere.vercel.app"
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
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-b from-orange-600 to-orange-500 shadow-none "
        >
          {isLoading ? (
            <div className="flex items-center">
              <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" />
              Submiting
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}
