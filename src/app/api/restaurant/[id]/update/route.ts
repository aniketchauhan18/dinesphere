import { NextResponse, NextRequest } from "next/server";
import { createRestaurantSchema } from "@/lib/definition";
import Restaurant from "@/lib/models/restaurant.model";
import { connect } from "@/lib/db";

const UpdateRestaurantSchema = createRestaurantSchema.omit({
  userId: true,
});

// to do => write restaurant updation schema in
export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    // extracting id from url
    await connect();
    const { pathname } = req.nextUrl;
    const segments = pathname.split("/");
    const id = segments[segments.length - 2]; // restaurant id extraction

    const body = await req.json();
    // validating user request
    const { success, data } = UpdateRestaurantSchema.safeParse(body);
    if (!success) {
      return NextResponse.json(
        {
          message: "Invalid req body or some fields are missing",
        },
        {
          status: 400,
        },
      );
    }

    const updateRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        ...data,
      },
      { new: true },
    );
    if (updateRestaurant) {
      return NextResponse.json(
        {
          message: "Restaurant Updated sucessfully",
        },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Error while updating restaurant in the database",
      },
      {
        status: 400,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal server error while updating the restaurat",
      },
      {
        status: 500,
      },
    );
  }
}
