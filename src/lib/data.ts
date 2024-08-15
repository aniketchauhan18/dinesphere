import User from "./models/user.model";
import Restaurant from "./models/restaurant.model";
import Menu from "./models/menu.model";
import { connect } from "./db";
import OrderItem from "./models/orderItem.model";
import { revalidatePath } from "next/cache";
import Order from "./models/order.model";
import { Types } from "mongoose";
import { ImageRestaurant } from "./models/image.model";

export async function fetchUserByClerkId(clerkId: string) {
  await connect();
  const user = await User.findOne({ clerkId });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function fetchUserById(userId: string) {
  await connect();
  const user = await User.findById(userId);
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
    revalidatePath(`/user/${userId}/orders`);
    return orderItems;
  } catch (err) {
    throw new Error("Error fetching user orderItems");
  }
}

export async function fetchOrderById(id: string) {
  try {
    await connect();
    const order = await Order.findById(id);
    return order;
  } catch (err) {
    throw new Error("Error fetching order details");
  }
}

export async function fetchOrderByUserId(id: string) {
  try {
    await connect();
    const order = await Order.find({
      $and: [
        {
          userId: id,
        },
        {
          status: "pending",
        },
      ],
    });
    return order;
  } catch (err) {
    throw new Error("Error fethcing user orders");
  }
}

export async function fetchAggregatedOrdersByUserId(id: string) {
  try {
    await connect();

    // aggregation pipeline
    // const orders = await Order.aggregate([
    //   {
    //     $match: {
    //       _id: new Types.ObjectId(id),
    //       status: "pending"
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "orderitems",
    //       localField: "orderItems",
    //       foreignField: "_id",
    //       as: "orderItems"
    //     }
    //   },
    //   {
    //     $unwind: "$orderItems"
    //   },
    //   {
    //     $lookup: {
    //       from: "menus",
    //       localField: "orderItems.menuId",
    //       foreignField: "_id",
    //       as: "menu"
    //     }
    //   },
    //   {
    //     $unwind: "$menu"
    //   },
    //   {
    //     $project: {
    //       userId: 1,
    //       restaurantId: 1,
    //       totalPrice: 1,
    //       status: 1,
    //       menu: {
    //         _id: "$menu._id",
    //         name: "$menu.name",
    //         description: "$menu.description",
    //         price: "$menu.price"
    //       },
    //       orderItems: {
    //         orderItems: "$order.orderItems"
    //       }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       orderItems: {
    //         $push: {
    //           menu: "$menu",
    //         }
    //       },
    //       orderItemsId: {
    //         $push: {
    //           orderItemId: "$order"
    //         }
    //       },
    //       userId: {
    //         $first: "$userId"
    //       },
    //       restaurantId: {
    //         $first: "$restaurantId"
    //       },
    //       totalPrice: {
    //         $first: "$totalPrice"
    //       },
    //       status: {
    //         $first: "$status"
    //       }
    //     }}
    // ])

    const order = await Order.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(id),
          status: "pending",
        },
      },
      {
        $lookup: {
          from: "orderitems",
          localField: "orderItems",
          foreignField: "_id",
          as: "orderItems",
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $lookup: {
          from: "menus",
          localField: "orderItems.menuId",
          foreignField: "_id",
          as: "orderItems.menuId",
        },
      },
      {
        $unwind: "$orderItems.menuId",
      },
      {
        $group: {
          _id: "$_id",
          orderItems: {
            $push: {
              orderItemId: "$orderItems._id", // change the orderItem to _id if wants
              quantity: "$orderItems.quantity",
              price: "$orderItems.price",
              menuDetails: "$orderItems.menuId",
            },
          },
          status: {
            $first: "$status",
          },
          restaurantId: {
            $first: "$restaurantId",
          },
          totalPrice: {
            $first: "$totalPrice",
          },
          userId: {
            $first: "$userId",
          },
          createdAt: {
            $first: "$createdAt",
          },
        },
      },
    ]);
    return order;
  } catch (err) {
    throw new Error("Error fetching populated orders");
  }
}

export async function fetchMenusByRestaurantId(restaurantId: string) {
  try {
    await connect();
    const menus = await Menu.find({
      restaurantId,
    });
    return menus;
  } catch (err) {
    throw new Error("Error fetching menus by restaurant Id");
  }
}

export async function fetchRestaurantImagesById(restaurantId: string) {
  try {
    await connect();
    const restaurantImages = await ImageRestaurant.find({ restaurantId });
    return restaurantImages;
  } catch (err) {
    throw new Error("Error fetching restaurant images");
  }
}
