"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { UndoIcon } from "lucide-react";

export default function DefaultBackButton() {
  const router = useRouter();
  return (
    <button
      className="flex text-sm border bg-neutral-100/70 md:text-base rounded-full items-center px-3 py-1"
      onClick={() => router.back()}
    >
      <UndoIcon className="w-4 h-4 mr-2" />
      Back
    </button>
  );
}
