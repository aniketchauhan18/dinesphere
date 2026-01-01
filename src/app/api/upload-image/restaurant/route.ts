import { ImageRestaurant } from "@/lib/models/image.model";
import { UploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";
import { CloudinaryResponse } from "@/lib/definition";
import { connect } from "@/lib/db";
import Restaurant from "@/lib/models/restaurant.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { DeleteImageFromCloudinary } from "@/lib/delete-image";


export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connect();
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;
    // console.log(image)
    const restaurantId = formData.get("placeholderId") as string;
    // const imageBuffer = await image.arrayBuffer();
    // console.log(restaurantId);

    if (!image || !restaurantId) {
      return NextResponse.json(
        {
          message: "Please provide image and restaurant id",
        },
        {
          status: 404,
        },
      );
    }

    const data: CloudinaryResponse = await UploadImage(
      image,
      "DineSphere-Restaurants",
    );
    console.log(data);

    if (!data) {
      return NextResponse.json(
        {
          message: "Error while uploading image to cloudinary",
        },
        {
          status: 400,
        },
      );
    }

    const { public_id, secure_url, width, height } = data;

    const storeImage = await ImageRestaurant.create({
      publicId: public_id,
      url: secure_url,
      width,
      height,
      restaurantId,
    });

    if (!storeImage) {
      return NextResponse.json(
        {
          message: "Error while adding image to db",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        message: "Restaurant Image uploaded successfully",
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

// TODO: add a functionality to delete this from the cloudinary also
export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    await connect();
    const { publicId, restaurantId, userId } = await req.json();

    if (!publicId) {
      return NextResponse.json({ message: "Please provide a public ID" }, { status: 400 });
    }

    const session = await mongoose.startSession();
    let deletedImage = null;

    try {
      await session.withTransaction(async () => {
        const restaurant = await Restaurant.findOne({ id: restaurantId }).session(session);
        if (!restaurant) {
          throw new Error("Restaurant not found");
        }

        const user = await User.findOne({ id: userId }).session(session);
        if (!user) {
          throw new Error("User not found");
        }

        // Delete from Cloudinary
        const cloudinaryResponse = await DeleteImageFromCloudinary(publicId);
        if (!cloudinaryResponse || (cloudinaryResponse.result !== "ok" && cloudinaryResponse.result !== "not found")) {
          throw new Error("Error while deleting image from Cloudinary");
        }

        // Delete from DB
        deletedImage = await ImageRestaurant.deleteOne({ publicId, restaurantId }).session(session);
        if (!deletedImage.deletedCount || deletedImage.deletedCount === 0) {
          throw new Error("Image not found in database");
        }
      });
    } finally {
      session.endSession();
    }

    return NextResponse.json({
      message: "Image deleted successfully",
      data: deletedImage,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error while deleting restaurant image in db" },
      { status: 500 }
    );
  }
}

