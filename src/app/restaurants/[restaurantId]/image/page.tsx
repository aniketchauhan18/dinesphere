import UploadImage from "@/components/UploadImage";

export default async function UploadPage({
  params,
}: {
  params: Promise<{
    restaurantId: string;
  }>;
}) {
  return (
    <div className="flex justify-center items-center min-h-[90dvh]">
      <UploadImage
        placeholderId={(await params).restaurantId}
        placeholder="Restaurant"
      />
    </div>
  );
}
