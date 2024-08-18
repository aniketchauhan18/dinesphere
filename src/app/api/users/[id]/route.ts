import User from "../../../../lib/models/user.model";
import { connect } from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connect();
    const { id } = params;
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
