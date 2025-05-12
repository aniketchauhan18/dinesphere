"use client";
import { MenuProps } from "@/lib/definition";
import { Label } from "../label";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { Separator } from "../separator";
import { FilePenLineIcon } from "lucide-react";

export default function UpdateMenu({ menu }: { menu: MenuProps }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const formObj = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      restaurantId: menu.restaurantId,
    };

    const response = await fetch(
      `/api/restaurant/${menu.restaurantId.toString()}/menu/${menu._id.toString()}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
      },
    );

    if (!response.ok) {
      alert("Error while creating the menu");
      setIsLoading(false);
      return;
    }
    alert("Menu updated Successfully");
    setIsLoading(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center border rounded hover:shadow-xs duration-75 text-xs px-2 text-neutral-600 hover:text-neutral-600 h-8 py-0">
            <FilePenLineIcon className="w-3 h-3 mr-1 text-neutral-600" />
            <p>Edit</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Menu Details</DialogTitle>
            <Separator />
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="gap-0.5">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    defaultValue={menu.name}
                    required
                  />
                </div>
                <div className="gap-0.5">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    defaultValue={menu.price}
                    name="price"
                    required
                  />
                </div>
                <div className="gap-0.5">
                  <Label>Desctiption</Label>
                  <Textarea
                    name="description"
                    defaultValue={menu.description}
                    required
                    className="min-h-16"
                  />
                </div>
                <div className="flex gap-5 justify-end pt-2">
                  <DialogClose>Cancel</DialogClose>
                  <Button
                    className="bg-linear-to-br from-orange-500 to-orange-600"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
