"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FaceIcon } from "@radix-ui/react-icons";

export default function CreateUser() {
  const router = useRouter();
  const { user } = useUser();

  //check if user is already registered

  useEffect(() => {
    const createUserInBackend = async () => {
      if (user) {
        try {
          const response = await fetch("/api/users/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName || "", // Handle null lastName from Google OAuth
              imageUrl: user.imageUrl,
              email: user.emailAddresses[0]?.emailAddress,
            }),
          });

          // Check response status BEFORE accessing data
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to create user in backend:", errorData);
            // Still redirect to home, but don't try to access user data
            router.push("/");
            return;
          }

          const data = await response.json();

          // store user in the local storage
          if (data.user?._id) {
            localStorage.setItem("dineSphere-userId", data.user._id);
          }
          router.push("/");
        } catch (err) {
          console.error("Error creating user:", err);
          // Redirect to home even on error to prevent user getting stuck
          router.push("/");
        }
      }
    };
    createUserInBackend();
  }, [router, user]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center animate-pulse text-neutral-700">
      <div className="text-center">
        <FaceIcon className="w-12 h-12 text-neutral-700" />
      </div>
      <h1 className="text-xl lg:text-3xl">Setting up your account...</h1>
    </div>
  );
}
