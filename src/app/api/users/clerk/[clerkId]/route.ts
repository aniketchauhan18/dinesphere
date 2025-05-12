import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/lib/models/user.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ clerkId: string }> },
): Promise<Response> {
  try {
    await connect();
    const clerkId = (await params).clerkId;
    console.log(clerkId);
    if (!clerkId) {
      return NextResponse.json(
        {
          message: "Clerk Id is not present",
        },
        {
          status: 400,
        },
      );
    }

    const user = await User.find({ clerkId });
    if (!user) {
      return NextResponse.json(
        {
          message: "User is not available",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json({
      data: user[0],
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Internal server error while quering user data",
      },
      {
        status: 500,
      },
    );
  }
}
