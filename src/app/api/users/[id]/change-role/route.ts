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
    if (!id) {
      return NextResponse.json(
        {
          message: "User id is required",
        },
        {
          status: 400,
        },
      );
    }

    const { role, clerkId } = await req.json();
    if (!role || !["admin", "user"].includes(role)) {
      return NextResponse.json(
        {
          message: "Valid role is required in request body",
        },
        {
          status: 400,
        },
      );
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true },
    );
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    const metadataClerkId = clerkId || user.clerkId;
    if (!metadataClerkId) {
      return NextResponse.json(
        {
          message: "User role updated in database, but missing clerkId for metadata sync",
          data: user,
        },
        {
          status: 207,
        },
      );
    }

    const client = await clerkClient();
    await client.users.updateUserMetadata(metadataClerkId, {
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
