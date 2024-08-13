import { NextRequest, NextResponse } from "next/server";
import Restaurant from "@/lib/models/restaurant.model";
import { connect } from "@/lib/db";
import { createRestaurantSchema } from "../../../lib/definition";

export async function POST(req: NextRequest): Promise<Response> {
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
