import { NextRequest, NextResponse } from "next/server";
import { MenuProps } from "@/lib/definition";
import Menu from "@/lib/models/menu.model";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; menuId: string } },
): Promise<Response> {
  try {
    const { menuId } = params;
    const { name, description, price } = await req.json();

    if (!name || !description || !price) {
      return NextResponse.json(
        {
          message: "Invalid req body or Some fields are missing",
        },
        {
          status: 400,
        },
      );
    }

    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { name, description, price },
      { new: true },
    );
    if (!updatedMenu) {
      return NextResponse.json(
        {
          message: "DB Error while updating menu",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Menu Updated successfully",
        date: updatedMenu,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Internal server error while updating menu",
      },
      {
        status: 500,
      },
    );
  }
}
