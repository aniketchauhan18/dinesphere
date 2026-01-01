"use client";
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Separator } from "../separator";
import { FilePenLineIcon, PlusIcon } from "lucide-react";
import { Label } from "../label";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { useRouter } from "next/navigation";

export default function CreateMenu({ restaurantId }: { restaurantId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const formObj = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
    };

    try {
      const response = await fetch(`/api/restaurant/${restaurantId}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
      });

      // if (!response.ok) {
      //   console.log(response.ok);
      //   return
      // }
      const responseData = await response.json();
      if (!response.ok) {
        router.refresh();
        return;
      }
      alert(responseData.message);
      router.refresh();
      setIsLoading(false);
      return;
    } catch (error) {
      alert("Error while creating menu");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center border rounded hover:shadow-xs duration-75 text-xs px-2 text-neutral-600 hover:text-neutral-600 h-8 py-0">
            <PlusIcon className="w-3 h-3 mr-1 text-neutral-600" />
            <p>Create Menu</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Menu Details</DialogTitle>
            <Separator />
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="gap-0.5">
                  <Label>Name</Label>
                  <Input type="text" name="name" required />
                </div>
                <div className="gap-0.5">
                  <Label>Price</Label>
                  <Input type="number" name="price" required />
                </div>
                <div className="gap-0.5">
                  <Label>Desctiption</Label>
                  <Textarea name="description" required className="min-h-16" />
                </div>
                <div className="flex gap-5 justify-end pt-2">
                  <DialogClose className="border px-2 rounded-md hover:bg-neutral-100 duration-100 text-sm">
                    Cancel
                  </DialogClose>
                  <Button
                    className="bg-linear-to-br from-orange-500 to-orange-600"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}
