import { ImageRestaurant } from "@/lib/models/image.model";
import { UploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";
import { CloudinaryResponse } from "@/lib/definition";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;
    // console.log(image)
    const restaurantId = formData.get("placeholderId") as string;
    // const imageBuffer = await image.arrayBuffer();
    console.log(restaurantId);

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
    console.log(storeImage);

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

// try {
//   const { public_id, restaurantId, url, height, width } = await req.json();

//   if (!url) {
//     return NextResponse.json(
//       {
//         message: "Image url is not provided",
//       },
//       {
//         status: 404,
//       },
//     );
//   }

//   const restarantImage = await ImageRestaurant.create({
//     publicId: public_id,
//     restaurantId,
//     url,
//     height,
//     width,
//   });

//   if (!restarantImage) {
//     return NextResponse.json(
//       {
//         message: "Error while adding the image in the db",
//       },
//       {
//         status: 400,
//       },
//     );
//   }

//   return NextResponse.json(
//     {
//       message: "Image added to the db",
//       data: restarantImage,
//     },
//     {
//       status: 200,
//     },
//   );
// }
