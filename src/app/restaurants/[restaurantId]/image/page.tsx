"use client";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";

export default function UploadImage({
  params,
}: {
  params: {
    restaurantId: string;
  };
}) {
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!image) {
        return;
      }
      const formData = new FormData();
      formData.append("image", image);
      // making req to img bb api key to get the details of the image
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=91c50b3db1df89c6de77d817689b221a",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      if (data.success) {
        const { id, height, width, url } = data.data;

        const response = await fetch("/api/upload-image/restaurant", {
          method: "POST",
          headers: {
            "Content-Type": "applcation/json",
          },
          body: JSON.stringify({
            public_id: id,
            restaurantId: params.restaurantId,
            url,
            height,
            width,
          }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70dvh]">
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <input type="file" name="" id="" onChange={handleChange} />
        <Button>Upload</Button>
      </form>
    </div>
  );
}
