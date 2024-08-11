"use client";
import { Input } from "../input";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { Label } from "../label";
import { createRestaurant, State } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import { LoaderCircleIcon } from "lucide-react";

export default function CreateForm({ userId }: { userId: string }) {
  const createRestaurantWithUserId = createRestaurant.bind(null, userId);
  const { pending } = useFormStatus();
  const commonInputClasses: string = "text-sm text-neutral-700";

  return (
    <form
      action={createRestaurantWithUserId}
      className="flex flex-col justify-center items-center gap-3 sm:gap-5 w-full p-3"
    >
      <div className="grid sm:grid-cols-2 w-full gap-5">
        <div className="space-y-3">
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
              placeholder="City"
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
            <Label>Website Url</Label>
            <Input
              type="text"
              name="websiteUrl"
              placeholder="https://dineshere.vercel.app"
              required
              className={commonInputClasses}
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="w-full space-y-0.5">
            <Label>Address</Label>
            <Textarea
              name="address"
              placeholder="Address"
              required
              className={`min-h-24 ${commonInputClasses}`}
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
        </div>
      </div>
      <div className="flex justify-end w-full">
        <Button
          type="submit"
          disabled={pending}
          className="bg-gradient-to-b from-orange-600 to-orange-500 shadow-none "
        >
          {pending ? (
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
