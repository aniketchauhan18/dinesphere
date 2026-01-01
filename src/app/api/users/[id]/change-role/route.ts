import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import User from "@/lib/models/user.model";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    await connect();

    const { id } = await params;

    let { role, clerkId } = await req.json();
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

    const client = await clerkClient();
    await client.users.updateUserMetadata(clerkId, {
      publicMetadata: {
        role,
      },
    });

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
