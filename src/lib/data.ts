import User from "./models/user.model";
import Restaurant from "./models/restaurant.model";
import Menu from "./models/menu.model";
import { connect } from "./db";
import OrderItem from "./models/orderItem.model";

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

export async function fetchRestaurantsCuisines() {
  try {
    await connect();
    // fetch all the distinct cuisines from all the restauarant models
    const cuisines = await Restaurant.distinct("cuisine");
    if (!cuisines) {
      throw new Error("Cuisine not found");
    }
    return cuisines;
  } catch (err) {
    throw new Error("Error while fetching restaurants cuisine");
  }
}

// fetching filtered restaurants based on query with searching for queries for name and city

export async function fetchFilteredRestuarants(query: string, cuisine: string) {
  try {
    await connect();
    const filteredRestaurants = await Restaurant.find({
      $and: [
        {
          $or: [
            { name: new RegExp(query, "i") },
            { city: new RegExp(query, "i") },
          ],
        },
        {
          cuisine: { $elemMatch: { $regex: new RegExp(cuisine, "i") } },
        },
      ],
    });
    return filteredRestaurants;
  } catch (err) {
    throw new Error("Error fetching filtered restaurants");
  }
}

// we can use clerk id here also but in orderItem model userId is defined so using that
export async function fetchUserOrderMenuItems(userId: string) {
  try {
    await connect();
    const orderItems = await OrderItem.find({
      $and: [
        {
          userId: userId,
        },
        {
          status: "pending",
        },
      ],
    }).populate("menuId"); // populating to get menuId here
    return orderItems;
  } catch (err) {
    throw new Error("Error fetching user orderItems");
  }
}
