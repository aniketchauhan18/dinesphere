"use client";
import { Trash } from "lucide-react";
import { Button } from "../button";
import { useState } from "react";

interface DeleteImageProps {
  publicId: string;
  restaurantId: string;
  userId: string;
}

export default function DeleteRestaurantImage({ publicId, restaurantId, userId }: DeleteImageProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Call your delete function here with the publicId
      const response = await fetch(`/api/upload-image/restaurant`, {
        method: "DELETE",
        body: JSON.stringify({ publicId, restaurantId, userId }),
      });

      if (!response.ok) {
        // Handle error
      }
    } catch (err) {
      // Error handled silently
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white"
      onClick={handleDelete}
    >
      <Trash className="w-6 h-6" />
      <span className="sr-only">View</span>
    </Button>
  )
}