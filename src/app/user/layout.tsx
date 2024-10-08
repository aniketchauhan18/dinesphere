import { inter } from "../../components/fonts";
import Navbar from "../../components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User-Profile",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} antialiased min-h-screen`}>
      <Navbar />
      {children}
    </div>
  );
}
