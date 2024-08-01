import { HomeIcon, FaceIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found - DineSphere",
  description: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
}

export default function NotFound() {

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <FaceIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, page not found!</h1>
        <p className="mt-4 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className=""
          >
            <Button className="gap-3 bg-orange-500 hover:bg-orange-400">
              <HomeIcon />Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}