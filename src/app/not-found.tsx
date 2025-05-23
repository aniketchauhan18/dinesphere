"use client";
import { HomeIcon, FaceIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UndoIcon } from "lucide-react";
export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <FaceIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, page not found!
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="">
            <Button className="gap-3 bg-orange-500 hover:bg-orange-400">
              <HomeIcon />
              Go to Home
            </Button>
          </Link>
          <Link href="/" className="">
            <Button
              className="gap-3 bg-orange-500 hover:bg-orange-400"
              onClick={() => router.back()}
            >
              <UndoIcon className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
