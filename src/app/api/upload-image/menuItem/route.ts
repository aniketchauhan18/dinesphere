import { ImageMenu } from "@/lib/models/image.model";
import { NextRequest, NextResponse } from "next/server";
import { UploadImage } from "@/lib/upload-image";
import { CloudinaryResponse } from "@/lib/definition";

export async function POST(req: NextRequest, res: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;

    const menuId = formData.get("placeholderId") as string;

    console.log(menuId);

    if (!image || !menuId) {
      return NextResponse.json(
        {
          message: "Please provide image and menu id",
        },
        {
          status: 400,
        },
      );
    }

    const data: CloudinaryResponse = await UploadImage(
      image,
      "DineSphere-Menus",
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

    const { public_id, secure_url, width, height } = data;

    const storeMenuImage = await ImageMenu.create({
      publicId: public_id,
      url: secure_url,
      width,
      height,
      menuId,
    });

    if (!storeMenuImage) {
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
        message: "Restaurant Image uplaoded successfully",
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
