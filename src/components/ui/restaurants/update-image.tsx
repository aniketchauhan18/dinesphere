"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../button";
import { Label } from "../label";
import { Input } from "../input";
import { ImageUpIcon, LoaderCircleIcon, UploadIcon } from "lucide-react";

export default function UpdateRestaurantImage({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      return alert("Please select image");
    }
    setIsLoading(true);
    try {
      // console.log(image);
      if (!image) {
        return;
      }
      const formData = new FormData();
      formData.append("image", image);
      formData.append("placeholderId", restaurantId);

      const response = await fetch("/api/upload-image/restaurant", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data, "-----------------------------------");
      if (!response.ok) {
        alert("Error while uploading new image");
      }
      setIsLoading(false);
      alert("Image uploaded successfully");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(image);

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center">
          <UploadIcon className="w-4 h-4 mr-1" />
          New Image
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload new restaurant image</DialogTitle>
          </DialogHeader>
          <div className="pt-5 w-full">
            <form
              className="flex flex-col gap-4 items-center"
              onSubmit={handleSubmit}
            >
              <Label
                htmlFor="image-input"
                className="flex flex-col gap-2 p-5 border border-dashed hover:cursor-pointer rounded-md w-full"
              >
                <ImageUpIcon className="text-neutral-600 w-7 h-7" />
                <div className="text-xs sm:text-sm text-neutral-600 flex gap-5 justify-between items-center">
                  <p>{image ? image.name : "Drag and drop image here"}</p>
                  <p className="text-neutral-600 sm:hover:border-b sm:hover:border-neutral-600 sm:duration-75">
                    {image ? "Choose another file" : "Select File"}
                  </p>
                </div>
              </Label>
              <Input
                className="pt-1.5 w-auto cursor-pointer hidden"
                type="file"
                id="image-input"
                onChange={handleChange}
              />
              <div className="flex justify-end w-full gap-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-linear-to-b  from-orange-600 to-orange-500"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" />
                      Uploading...
                    </div>
                  ) : (
                    "Upload"
                  )}
                </Button>
              </div>
            </form>
          </div>
          {/* <DialogFooter>
              <Button className="bg-linear-to-b from-red-500 to-orange-500">
                Upload Image
              </Button>
            </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
