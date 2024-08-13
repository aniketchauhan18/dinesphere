import Navbar from "../../components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
