import { Button } from "@/components/ui/button";
import {
  CalendarCheckIcon,
  IndianRupeeIcon,
  MegaphoneIcon,
  PowerIcon,
  SettingsIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";

export interface PartnerCardContent {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export default async function PartnerPage() {
  const data: PartnerCardContent[] = [
    {
      id: 1,
      title: "Reach More Customers",
      description:
        "Our platform connects you with a wide network of diners looking for the best dining experiences.",
      iconName: "MegaphoneIcon",
    },
    {
      id: 2,
      title: "Streamlined Booking",
      description:
        "Offer online reservations and manage your bookings effortlessly.",
      iconName: "CalendarCheckIcon",
    },
    {
      id: 3,
      title: "Increased Revenue",
      description:
        "Attract more diners and boost your sales with our marketing tools.",
      iconName: "IndianRupeeIcon",
    },
    {
      id: 4,
      title: "Hassle-free Management",
      description:
        "Streamline your operations with our user-friendly platform.",
      iconName: "SettingIcon",
    },
    {
      id: 5,
      title: "Dedicated Support",
      description: "Our team is here to help you every step of the way.",
      iconName: "PowerIcons",
    },
    {
      id: 6,
      title: "Reputation Management",
      description: "Showcase your restaurant's best reviews and ratings.",
      iconName: "StarIcon",
    },
  ];

  return (
    <main className="pb-24 p-3">
      <section>
        <div className="grid justify-center p-5">
          <div className="text-center">
            <h1 className="flex justify-center items-center font-bold bg-gradient-to-r from-yellow-500 via-bg-orange-900 to-orange-600 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl min-h-16 h-auto">
              Grow Your Restaurant
            </h1>
          </div>
          <div className="text-center max-w-[900px]">
            <p className="pt-3 text-neutral-600 flex justify-center items-center text-base sm:text-lg lg:text-xl">
              Join our network of top-rated restaurants and reach more customers
              than ever before.
            </p>
          </div>
        </div>
      </section>
      <section className="pt-5">
        <div className="grid justify-center p-5">
          <div className="text-center">
            <h1 className="text-neutral-700 font-semibold text-lg sm:text-2xl">
              Partner with us to increase your visibility, bookings, and
              revenue.
            </h1>
          </div>
        </div>
        <div className="px-5 sm:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
          {data.map((card) => {
            return (
              <div
                key={card.id}
                className="p-3 border-b sm:border-b sm:border-r rounded-md sm:shadow-sm"
              >
                <div className="flex items-center">
                  {card.iconName === "MegaphoneIcon" && (
                    <MegaphoneIcon className="h-5 w-5 mr-1 text-red-600 " />
                  )}
                  {card.iconName === "CalendarCheckIcon" && (
                    <CalendarCheckIcon className="h-5 w-5 mr-1 text-red-600 " />
                  )}
                  {card.iconName === "IndianRupeeIcon" && (
                    <IndianRupeeIcon className="h-5 w-5 mr-1 text-red-600 " />
                  )}
                  {card.iconName === "SettingIcon" && (
                    <SettingsIcon className="h-5 w-5 mr-1 text-red-600  " />
                  )}
                  {card.iconName === "PowerIcons" && (
                    <PowerIcon className="h-5 w-5 mr-1 text-red-600  " />
                  )}
                  {card.iconName === "StarIcon" && (
                    <StarIcon className="h-5 w-5 mr-1 text-red-600 " />
                  )}
                  <h1 className="font-semibold text-lg">{card.title}</h1>
                </div>
                <p className="text-sm text-neutral-600">{card.description}</p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center ">
          <div className="flex justify-center items-center  gap-4 w-full">
            <Link href="/partner/become-partner/details/restaurant">
              <Button className="bg-red-500 hover:bg-red-500 text-xs sm:text-sm">
                Partner with us
              </Button>
            </Link>
            <Button variant="outline" className="text-xs sm:text-sm">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
