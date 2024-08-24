import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { UserCheck2Icon, Utensils, Tag, Truck } from "lucide-react";
import Link from "next/link";
import { montserrat } from "@/components/fonts";
import Image from "next/image";
import BecomePartnerButton from "@/components/ui/become-partner-button";
import { fetchRestaurantsByUserId, fetchUserByClerkId } from "@/lib/data";
import { UserProps } from "@/components/ui/orders/checkout-button";
import { auth } from "@clerk/nextjs/server";
import { UserRestaurantsProps } from "@/lib/definition";

export default async function Home() {
  const cuisineIconClasses: string =
    "flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-orange-500 hover:text-white ease-in-out duration-300";

  const cuisineData = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/4491395/pexels-photo-4491395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cuisine: "Sandwich",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cuisine: "Pizza",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/3147493/pexels-photo-3147493.jpeg?auto=compress&cs=tinysrgb&w=600",
      cuisine: "Sushi",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=750",
      cuisine: "Mexican",
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cuisine: "Asian",
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cuisine: "Healthy",
    },
  ];

  const { userId } = auth();

  const user = (await fetchUserByClerkId(userId as string)) as UserProps;
  const data: UserRestaurantsProps = await fetchRestaurantsByUserId(user._id);
  const { length } = data;

  return (
    <main className="min-h-screen pb-12">
      <Navbar />
      <div className="grid justify-center lg:pt-24 p-5">
        <div className="text-center">
          <div
            className={`flex flex-col justify-center items-center font-bold text-orange-600 text-center px-4 py-6 ${montserrat.className}`}
          >
            <p className="text-3xl  lg:text-4xl">
              Empowering restaurants to{" "}
              <span className="bg-gradient-to-b from-red-500  to-yellow-500 bg-clip-text text-transparent animate-gradient">
                serve
              </span>
            </p>
            <p className="text-3xl lg:text-4xl">
              and users to{" "}
              <span className="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                indulge
              </span>
              , all in{" "}
              <span className="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent">
                one place
              </span>
            </p>
          </div>
        </div>
        <div className="text-center space-x-4">
          <Link href="/restaurants">
            <Button variant="outline" className="rounded-full text-xs">
              Search Restaurants
            </Button>
          </Link>
          <BecomePartnerButton userRestaurantsCount={length} />
        </div>
      </div>
      <div className="bg-background py-6">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col items-center space-y-8">
            {/* <div className="space-y-1 text-center">
              <h2 className="text-3xl font-bold lg:text-4xl text-orange-00">
                Explore Cuisines
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Find the perfect meal for any craving.
              </p>
            </div> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-3">
              {cuisineData.map((item) => (
                <div key={item.id}>
                  <div className="relative overflow-hidden group">
                    <Image
                      src={item.src}
                      alt={`${item.cuisine}-image`}
                      width={400}
                      sizes="100%"
                      className="rounded-lg"
                      height={250}
                      objectFit="cover"
                      placeholder="empty"
                      loading="lazy"
                    />
                    <span className="absolute bottom-0 left-0 w-full py-2 text-sm font-medium text-white bg-neutral-600/60 border-t border-white/30 bg-opacity-50 text-center transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 rounded-b-lg">
                      {item.cuisine}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 px-5 grid justify-center">
        <div className="text-center">
          <h1 className="flex justify-center text-2xl lg:text-4xl items-center font-bold text-orange-600">
            Hungry? We&apos;ve Got You Covered!
          </h1>
        </div>
        <div className="flex justify-center">
          <p className="pt-3 text-gray-700 text-center text-sm sm:text-base max-w-[550px]">
            From local favorites to gourmet delights, satisfy your cravings with
            just a few taps!
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          <div className=" rounded-lg p-6">
            <div className="flex justify-center w-full">
              <div className="p-2 bg-yellow-500 rounded-full">
                <Utensils className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="pt-4 space-y-1">
              <h2 className="text-center font-bold text-xl text-red-600">
                Quick & Easy Ordering
              </h2>
              <p className="text-center text-sm text-gray-600">
                Browse menus, customize your order, and checkout in minutes.
                Your favorite meals are just a few clicks away!
              </p>
            </div>
          </div>
          <div className="p-6 sm:border-l border-t sm:border-t-0">
            <div className="flex justify-center w-full">
              <div className="p-2 bg-green-500 rounded-full">
                <Tag className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="pt-4 space-y-1">
              <h2 className="text-center font-bold text-xl text-red-600">
                Exclusive Deals & Discounts
              </h2>
              <p className="text-center text-sm text-gray-600">
                Enjoy special promotions, loyalty rewards, and personalized
                offers. Save big on your favorite dishes!
              </p>
            </div>
          </div>
          <div className="p-6 lg:border-l border-t sm:border-t-0">
            <div className="flex justify-center w-full ">
              <div className="p-2 bg-blue-500 rounded-full">
                <Truck className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="pt-4 space-y-1">
              <h2 className="text-center font-bold text-xl text-red-600">
                Fast & Reliable Delivery
              </h2>
              <p className="text-center text-sm text-gray-600">
                Track your order in real-time and get your food delivered hot
                and fresh. Satisfaction guaranteed!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid py-10 px-5">
        <div className="text-center">
          <h1 className="flex justify-center text-2xl lg:text-4xl items-center font-bold">
            What Our Users Say
          </h1>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 ">
          <div className="border rounded-lg p-5 bg-zinc-50">
            <div className="flex gap-5 flex-col">
              <div className="flex gap-5 items-center">
                <UserCheck2Icon className="text-3xl text-neutral-600" />
                <div>
                  <p className="font-semibold">Aniket Chauhan</p>
                  <p className="text-neutral-500 text-snm">Food Enthusiast</p>
                </div>
              </div>
              <p className="text-neutral-700">
                &quot;DineSphere has made it so easy to discover new restaurants
                and book reservations. I&apos;ve found some amazing places I
                never would have known about otherwise.&quot;
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-5 bg-zinc-50 ">
            <div className="flex gap-5 flex-col">
              <div className="flex gap-5 items-center">
                <UserCheck2Icon className="text-3xl text-neutral-600" />
                <div>
                  <p className="font-semibold">Phunsuk Wangdu</p>
                  <p className="text-neutral-500 text-sm">Restaurant Owner</p>
                </div>
              </div>
              <p className="text-neutral-700">
                &quot;As a restaurant owner, DineSphere has been a game-changer.
                The platform makes it easy to manage reservations, reach new
                customers, and grow my business.&quot;
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-5 bg-zinc-50">
            <div className="flex gap-5 flex-col">
              <div className="flex gap-5 items-center">
                <UserCheck2Icon className="text-3xl text-neutral-600" />
                <div>
                  <p className="font-semibold">Choocha Fukrey</p>
                  <p className="text-neutral-500 text-sm">Reviewer</p>
                </div>
              </div>
              <p className="text-neutral-700">
                &quot;Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Odit ea neque natus a earum vero quasi officia eum itaque totam
                voluptates unde praesentium molestias quam error sit modi, eos
                mollitia!&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
