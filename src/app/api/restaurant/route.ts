import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import Restaurant from "@/lib/models/restaurant.model";
import { connect } from "@/lib/db";

export const createRestaurantSchema = z.object({
  userId: z.string({ required_error: "UserId is requried" }),
  name: z
    .string({ required_error: "Restaurants name is required" })
    .min(3, "Name must be at least 3 characters long"),
  country: z
    .string({ required_error: "Country is required" })
    .min(2, "Please enter correct country name"),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "State is required" }),
  address: z.string({ required_error: "Address is required" }),
  description: z.string({ required_error: "Description is required" }),
  number: z.string({ required_error: "Number is required" }),
  email: z.string({ required_error: "Email is required" }),
  websiteUrl: z.string().optional(),
  cuisine: z.array(z.string()).optional(),
});

export type RestaurantSchema = z.infer<typeof createRestaurantSchema>;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    //  userId,
    // name: formData.get("name"),
    // country: formData.get("country"),
    // city: formData.get("city"),
    // state: formData.get("state"),
    // address: formData.get("address"),
    // number: formData.get("number"),
    // email: formData.get("email"),
    // websiteUrl: formData.get("websiteUrl"),
    // description: formData.get("description"),

    const reqBody = await req.json();

    // validating the input

    const { success, data } = createRestaurantSchema.safeParse(reqBody);
    if (!success) {
      return NextResponse.json(
        {
          message: "Invalid req body check again",
        },
        {
          status: 400,
        },
      );
    }

    await connect();

    const restaurant = await Restaurant.create(data);
    return NextResponse.json(
      {
        message: "Restaurant created successfully",
        data: restaurant,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An error occurred during upload",
      },
      {
        status: 500,
      },
    );
  }
}
