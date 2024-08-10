import { ImageMenu } from "@/lib/models/image.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextRequest) {
  try {
    const { public_id, menuId, url, height, width } = await req.json();

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

    const restarantImage = await ImageMenu.create({
      publicId: public_id,
      menuId,
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
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Internal server error while adding menu image in db",
    });
  }
}
