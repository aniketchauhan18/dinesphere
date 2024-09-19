import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "./hooks/UserContext";
import "./globals.css";
import { inter } from "../components/fonts";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: {
    template: "%s | DineSphere",
    default: "DinesSphere",
  },
  description:
    "A comprehensive dining platform that connects food enthusiasts with their favorite restaurants and allows them to explore a wide variety of culinary experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>DineSphere</title>
        </head>
        <body className={`${inter.className} antialiased min-h-screen`}>
          <UserProvider>{children}</UserProvider>
          <Toaster richColors position="top-center"/>
        </body>
      </html>
    </ClerkProvider>
  );
}
