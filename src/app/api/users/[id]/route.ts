import User from "../../../../lib/models/user.model";
import { connect } from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connect();
    const { id } = await params;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }
    return NextResponse.json({
      user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error fetching user details" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    await connect();
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        {
          message: "Ivalid req body",
        },
        {
          status: 400,
        },
      );
    }

    const user = await User.findByIdAndUpdate((await params).id, body, {
      new: true,
    });
    if (!user) {
      return NextResponse.json(
        {
          message:
            "Invalid user or user is not registered | not found in database",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Error updating user information",
      },
      {
        status: 500,
      },
    );
  }
}
