"use client";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { ImageUpIcon, LoaderCircleIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

export default function UploadImage({
  placeholderId,
  placeholder,
  method = "POST",
}: {
  placeholderId: string;
  placeholder: string;
  method: string;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      return alert("Please select image");
    }
    setIsLoading(true);
    try {
      // console.log(image);
      if (!image) {
        setIsLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("image", image);
      formData.append("placeholderId", placeholderId);
      // making req to img bb api key to get the details of the image

      // image is present in different model in the database

      const response = await fetch(
        `/api/upload-image/${placeholder.toLowerCase()}`,
        {
          method: method,
          body: formData,
        },
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert("Error while uplaoding image");
      }
      alert("Image uploaded");
      setIsLoading(false);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="p-4 bg-white/20 rounded-xl ">
      <div className="flex flex-col gap-2 justify-center items-center p-5 rounded-lg">
        <section className="w-full">
          <form
            className="flex flex-col gap-4 items-center "
            onSubmit={handleSubmit}
          >
            <Label
              htmlFor="image-input"
              className="flex flex-col gap-2 p-5 border border-dashed text-sm rounded-md w-full"
            >
              <ImageUpIcon className="text-neutral-500 w-7 h-7" />
              <div className="text-xs text-neutral-500 flex gap-5 justify-between items-center">
                <p>{image ? image.name : "Drag and drop image here"}</p>
                <p className="text-neutral-500 sm:hover:border-b sm:hover:border-neutral-500 sm:duration-75">
                  {image ? "Another Image" : "Select File"}
                </p>
              </div>
            </Label>
            <Input
              className="pt-1.5 w-auto cursor-pointer hidden"
              type="file"
              id="image-input"
              onChange={handleChange}
            />
            <div className="flex justify-between w-full gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-b w-full  from-orange-600 to-orange-500"
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
        </section>
      </div>
    </main>
  );
}

{
  /* <main className="p-4">
      <div className="flex flex-col gap-2 justify-center items-center border p-5 rounded-lg">
        <section className="flex flex-col w-full gap-2">
          <div className=" flex justify-start">
            <h1 className="text-xl font-bold">Upload {placeholder} Image</h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600">
            Only one image can be uploaded. Supported formats: JPG, PNG. Max
            size: 5MB
          </p>
        </section>
        <section className="pt-5 w-full">
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleSubmit}
          >
            <Label
              htmlFor="image-input"
              className="flex flex-col gap-2 p-5 border border-dashed  rounded-md w-full"
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
            <div className="flex justify-between w-full gap-3">
              <Button variant="outline">Cancel</Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-b  from-orange-600 to-orange-500"
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
        </section>
      </div>
    </main> */
}
