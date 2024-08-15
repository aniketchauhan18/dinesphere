import { Inter, Poppins, Cedarville_Cursive } from "next/font/google";
export const inter = Inter({ subsets: ["latin"] });
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800", "200", "100"],
});
export const cedarvilleCursive = Cedarville_Cursive({
  subsets: ["latin"],
  weight: ["400"],
});
