"use client";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { UndoIcon } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <div>
      <button
        className="flex items-center text-xs border px-2 py-1 rounded-md text-neutral-700"
        onClick={() => router.back()}
      >
        <UndoIcon className="w-4 h-4 mr-1" />
        Back
      </button>
    </div>
  );
}
