"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FaceIcon } from "@radix-ui/react-icons";

export default function CreateUser() {
  const router = useRouter();
  const { user } = useUser();

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
              lastName: user.lastName,
              imageUrl: user.imageUrl,
              email: user.emailAddresses[0]?.emailAddress,
            }),
          });
          const data = await response.json();

          // store user in the local storage

          localStorage.setItem("dineSphere-userId", data.user._id);
          if (!response.ok) {
            console.error("Failed to create user in backend");
          }
          router.push("/");
        } catch (err) {
          console.log(err);
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
