import { UserProps } from "@/components/ui/orders/checkout-button";
import UpdateProfile from "@/components/ui/user/update-profile-form";
import { fetchUserById } from "@/lib/data";
import Image from "next/image";
import UploadProfileImage from "@/components/ui/user/upload-profile-image";
import { Separator } from "@/components/ui/separator";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user: UserProps = await fetchUserById((await params).id);
  return (
    <main className="lg:pt-24 pb-20 p-5 min-h-screen">
      <div>
        <h1 className="font-bold text-xl sm:text-2xl">User Profile</h1>
        <p className="text-sm text-neutral-700">
          View and edit your profile information
        </p>
      </div>
      <Separator className="mt-1" />
      <section className="flex justify-center items-center">
        <div className="grid lg:grid-cols-2 pt-5 w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="relative h-24 w-24 sm:h-48 sm:w-48">
              <Image
                src={user.imageUrl}
                alt="menu-image"
                className="object-cover w-full h-full rounded-full hover:cursor-pointer"
                layout="fill"
                sizes="100%"
                placeholder="empty"
              />
            </div>
            <UploadProfileImage userId={(await params).id} />
          </div>
          <div className="flex justify-center min-w-full pt-2 sm:pt-5 lg:pt-10">
            <UpdateProfile userId={(await params).id} />
          </div>
        </div>
      </section>
    </main>
  );
}
