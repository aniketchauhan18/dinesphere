import { NextRequest, NextResponse } from "next/server";
import { UploadImage } from "@/lib/upload-image";
import { CloudinaryResponse } from "@/lib/definition";
import { connect } from "@/lib/db";
import User from "@/lib/models/user.model";

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    await connect();
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;

    const userId = formData.get("placeholderId") as string;

    // console.log(userId);

    if (!image || !userId) {
      return NextResponse.json(
        {
          message: "Please provide image and user id",
        },
        {
          status: 400,
        },
      );
    }

    const data: CloudinaryResponse = await UploadImage(
      image,
      "DineSphere-Users",
    );

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

    const { secure_url } = data;

    const addUserImage = await User.findByIdAndUpdate(
      userId,
      {
        imageUrl: secure_url,
      },
      { new: true },
    );

    return NextResponse.json(
      {
        message: "User Image uplaoded successfully",
        data: addUserImage,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Internal server error while adding user image in db",
    });
  }
}
