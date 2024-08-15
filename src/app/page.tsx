import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import {
  SearchIcon,
  SettingsIcon,
  StarIcon,
  PizzaIcon,
  FishIcon,
  TurtleIcon,
  SaladIcon,
  BeanIcon,
  SandwichIcon,
  UserCheck2Icon,
} from "lucide-react";
import Link from "next/link";
import { cedarvilleCursive } from "@/components/fonts";

export default function Home() {
  const cuisineIconClasses: string =
    "flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-orange-500 hover:text-white ease-in-out duration-300";

  return (
    <main className="min-h-screen pb-12">
      <Navbar />
      <div className="grid justify-center pt-14 p-5">
        <div className="text-center">
          <div className="flex flex-col justify-center items-center font-bold  text-transparent text-base sm:text-3xl min-h-16 h-auto text-orange-600">
            <p className="text-orange-600">
              Empowering restaurants to{" "}
              <span className="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent">
                serve
              </span>{" "}
              and users
            </p>
            <p className="text-orange-600">
              to{" "}
              <span className="bg-gradient-to-br from-red-500  to-yellow-500 bg-clip-text text-transparent">
                indulge
              </span>
              ,all in{" "}
              <span className="bg-gradient-to-br from-red-500  to-yellow-500 bg-clip-text text-transparent">
                one place
              </span>
            </p>
          </div>
        </div>
        <div className="text-center  max-w-[600px] text-xs sm:text-sm">
          <p className="sm:pt-1 text-neutral-600 flex justify-center items-center">
            Our app connects food enthusiasts with top-rated restaurants, and
            provides restaurant owners with powerful tools to manage and grow
            their business.
          </p>
        </div>
        <div className="text-center pt-10 space-x-4">
          <Link href="/restaurants">
            <Button variant="outline" className="rounded-full text-xs">
              Search Restaurants
            </Button>
          </Link>
          <Link href={"/partner/become-partner"}>
            <Button className="bg-gradient-to-l from-orange-600 to-yellow-500 rounded-full text-xs">
              Become Partner
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-background py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col items-center space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Explore Cuisines
              </h2>
              <p className="text-lg text-muted-foreground">
                Find the perfect meal for any craving.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-3">
              <Link href="/" className={cuisineIconClasses}>
                <SandwichIcon className="w-8 h-8" />
                <span className="text-sm font-medium">Sandwich</span>
              </Link>
              <Link href="/" className={cuisineIconClasses}>
                <PizzaIcon className="w-8 h-8" />
                <span className="text-sm font-medium">Pizza</span>
              </Link>
              <Link href="/" className={cuisineIconClasses}>
                <FishIcon className="w-8 h-8" />
                <span className="text-sm font-medium">Sushi</span>
              </Link>
              <Link href="/" className={cuisineIconClasses}>
                <TurtleIcon className="w-8 h-8" />
                <span className="text-sm font-medium">Mexican</span>
              </Link>
              <Link href="/" className={cuisineIconClasses}>
                <BeanIcon className="w-8 h-8" />
                <span className="text-sm font-medium">Asian</span>
              </Link>
              <Link href="/" className={cuisineIconClasses}>
                <SaladIcon className="w-8 h-8" />
                <span className="text-sm font-medium">Healthy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 px-5 grid justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="flex justify-center text-2xl sm:text-3xl lg:text-4xl items-center font-bold ">
            How it works?
          </h1>
        </div>
        <div className="flex justify-center">
          <p className="pt-3 text-neutral-600 text-center text-base sm:text-lg l max-w-[700px]">
            Our app makes it easy for food enthusiasts to discover the best
            restaurants and for restaurant owners to manage and grow their
            business.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
          <div className="bg-white border border-zinc-50 shadow rounded p-3">
            <div className="flex justify-center w-full">
              <SearchIcon className="text-3xl" />
            </div>
            <div className="pt-2 space-y-2">
              <h1 className="text-center font-bold text-neutral-700">
                Search & Discover
              </h1>
              <p className="text-center text-neutral-600">
                Browse our extensive database of restaurants and filter by
                cuisine, location, and more.
              </p>
            </div>
          </div>
          <div className="bg-white border border-zinc-50 shadow rounded p-3 text-neutral-700">
            <div className="flex justify-center w-full">
              <SettingsIcon className="text-3xl" />
            </div>
            <div className="pt-2 space-y-2">
              <h1 className="text-center font-bold text-neutral-700">
                Manage Your Business
              </h1>
              <p className="text-center text-neutral-600">
                Restaurant owners can use our app to manage orders, update
                menus, and more.
              </p>
            </div>
          </div>
          <div className="bg-white border border-zinc-50 shadow rounded p-3 text-neutral-700">
            <div className="flex justify-center w-full">
              <StarIcon className="text-3xl" />
            </div>
            <div className="pt-2 space-y-2">
              <h1 className="text-center font-bold">Review</h1>
              <p className="text-center text-neutral-600">
                Share your dining experiences and help others discover the best
                restaurants.
              </p>
            </div>
          </div>
          {/*
           */}
        </div>
      </div>
      <div className="grid py-10 px-5">
        <div className="text-center">
          <h1 className="flex justify-center text-2xl sm:text-3xl lg:text-4xl items-center font-bold">
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
                  <p className="text-neutral-500">Food Enthusiast</p>
                </div>
              </div>
              <p className="text-neutral-700">
                &quot;Delicious Bites has made it so easy to discover new
                restaurants and book reservations. I&apos;ve found some amazing
                places I never would have known about otherwise.&quot;
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-5 bg-zinc-50 ">
            <div className="flex gap-5 flex-col">
              <div className="flex gap-5 items-center">
                <UserCheck2Icon className="text-3xl text-neutral-600" />
                <div>
                  <p className="font-semibold">Phunsuk Wangdu</p>
                  <p className="text-neutral-500">Restaurant Owner</p>
                </div>
              </div>
              <p className="text-neutral-700">
                &quot;As a restaurant owner, Delicious Bites has been a
                game-changer. The platform makes it easy to manage reservations,
                reach new customers, and grow my business.&quot;
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-5 bg-zinc-50">
            <div className="flex gap-5 flex-col">
              <div className="flex gap-5 items-center">
                <UserCheck2Icon className="text-3xl text-neutral-600" />
                <div>
                  <p className="font-semibold">Choocha Fukrey</p>
                  <p className="text-neutral-500">Reviewer</p>
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
