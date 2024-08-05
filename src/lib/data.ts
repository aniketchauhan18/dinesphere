import User from "./models/user.model";
import Restaurant from "./models/restaurant.model";
import Menu from "./models/menu.model";
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
    throw new Error("Error fetching restuarant data");
  }
}

export async function fetchRestaurantMenuById(id: string) {
  try {
    await connect();
    const menus = await Menu.find({ restaurantId: id });
    if (!menus) {
      throw new Error("Menus not found");
    }
    return menus;
  } catch (err) {
    throw new Error("Error while fetching menu data");
  }
}

// fetching filtered restaurants based on query with searching for queries for name and city

export async function fetchFilteredRestuarants(query: string) {
  try {
    await connect();
    const filteredRestaurants = await Restaurant.find({
      $or: [{ name: new RegExp(query, "i") }, { city: new RegExp(query, "i") }],
    });
    return filteredRestaurants;
  } catch (err) {
    throw new Error("Error fetching filtered restaurants");
  }
}
