import User from "./models/user.model";
import Restaurant from "./models/restaurant.model";
import { connect } from "./db";

export async function fetchUserById(clerkId: string) {
  await connect();
  console.log(clerkId);
  const user = await User.findOne({ clerkId });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function fetchRestaurants() {
  try {
    await connect();
    const restaurants = await Restaurant.find();
    if (!restaurants) {
      throw new Error("No restaurants found");
    }
    return restaurants;
  } catch (error) {
    throw new Error("Error fetching restaurants");
  }
}

export async function fetchRestaurantById(id: string) {
  try {
    await connect();
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return restaurant;
  } catch (err) {
    throw new Error("Error fetching restuarant data")
  }
}