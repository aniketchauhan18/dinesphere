import { ImageRestaurant } from "@/lib/models/image.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { public_id, restaurantId, url, height, width } = await req.json();

    if (!url) {
      return NextResponse.json(
        {
          message: "Image url is not provided",
        },
        {
          status: 404,
        },
      );
    }

    const restarantImage = await ImageRestaurant.create({
      publicId: public_id,
      restaurantId,
      url,
      height,
      width,
    });

    if (!restarantImage) {
      return NextResponse.json(
        {
          message: "Error while adding the image in the db",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Image added to the db",
        data: restarantImage,
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
