import React from "react";
import Navbar from "../../components/Navbar";
import { inter } from "../../components/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurants",
};

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${inter.className} antialiased min-h-screen`}>
      <Navbar />
      {children}
    </body>
  );
}
