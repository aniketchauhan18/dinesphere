"use client";
import React from "react";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../label";
import { Input } from "../input";
import { LoaderCircleIcon, UploadIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../button";
import UploadImage from "@/components/UploadImage";

export default function UploadProfileImage({ userId }: { userId: string }) {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("placeholderId", userId);

    try {
      const response = await fetch(`/api/upload-image/user`, {
        method: "PATCH",
        body: formData,
      });
      if (!response.ok) {
        alert("Error while uploading the image");
        setIsLoading(false);
        router.refresh();
        return;
      }
      router.refresh();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert("Error while uploading the image");
    }
  };

  return (
    <form onSubmit={handleImageSubmit} className="pt-2 lg:pt-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className=" h-3 py-3 shadow-none">
            New Image
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Profile Image</DialogTitle>
          </DialogHeader>
          {/* <div>
          <Label
            htmlFor="image"
            className="hover:cursor-pointer text-neutral-700 bg-gray-900"
          >
            {isLoading ? (
              <div className="flex items-center">
                <LoaderCircleIcon className="animate-spin h-5 w-5 mr-1" />
                Uploading...
              </div>
            ) : (
              <div className="flex items-center">
                <UploadIcon className="h-3 w-3 mr-1" />
                New Image
              </div>
            )}
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            onChange={handleChange}
            className="hidden"
          />
        </div> */}
          <UploadImage
            placeholder="user"
            placeholderId={userId}
            method="PATCH"
          />
        </DialogContent>
      </Dialog>
    </form>
  );
}
