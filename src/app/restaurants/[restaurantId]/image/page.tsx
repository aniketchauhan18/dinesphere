"use client";
import UploadImage from "@/components/UploadImage";

export default function UploadPage({
  params,
}: {
  params: {
    restaurantId: string;
  };
}) {
  return (
    <div className="flex justify-center items-center min-h-[90dvh]">
      <UploadImage
        placeholderId={params.restaurantId}
        placeholder="Restaurant"
      />
    </div>
  );
}
