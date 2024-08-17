import Menu from "@/lib/models/menu.model";
import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<Response> {
  try {
    await connect();
    const { id } = params;
    const { name, description, price } = await req.json();

    if (!name || !description || !price) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        {
          status: 400,
        },
      );
    }

    const createMenu = await Menu.create({
      name: name,
      description: description,
      price: price,
      restaurantId: id,
    });

    // if (!createMenu) {
    //   return NextResponse.json(
    //     {
    //       message: "DB error while creating menu",
    //     },
    //     {
    //       status: 400,
    //     },
    //   );
    // }

    return NextResponse.json(
      {
        message: "Menu created successfully",
        data: createMenu,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Internal server error while creating menu",
        error: err,
      },
      {
        status: 500,
      },
    );
  }
}
