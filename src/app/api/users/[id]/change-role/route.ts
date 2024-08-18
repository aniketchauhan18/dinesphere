import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/user.model";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<Response> {
  try {
    await connect();

    const { id } = params;

    let { role } = await req.json();
    if (!role) {
      return NextResponse.json(
        {
          message: "Role is not present in the req body",
        },
        {
          status: 400,
        },
      );
    }
    const user = await User.findByIdAndUpdate(
      id,
      { role: role },
      { new: true },
    );
    return NextResponse.json({
      message: "User role changed successfully",
      data: user,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching updating user details" },
      { status: 500 },
    );
  }
}
