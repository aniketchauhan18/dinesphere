import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../lib/db";
import User from "@/lib/models/user.model";

const userValidationSchema = z.object({
  clerkId: z.string({ required_error: "Clerk ID is required" }),
  imageUrl: z.string({ required_error: "Image URL is required" }),
  username: z.string().optional(),
  firstName: z.string({ required_error: "FirstName is required" }),
  lastName: z.string({ required_error: "LastName is required" }),
  email: z.string().email("Invalid email address"),
});

export async function POST(req: NextRequest) {
  try {
    // connect to the database

    // destructure data from the userbody

    await connect();
    const { clerkId, imageUrl, username, firstName, lastName, email } =
      await req.json();

    // first approach
    // const existingUserWithClerkId = await User.findOne({clerkId: clerkId});
    // const existingUserWithEmail = await User.findOne({email: email});

    // check for existing email and clerkId better approach
    const existingUser = await User.findOne({
      $or: [{ clerkId }, { email }],
    });

    // existing user return
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", user: existingUser },
        { status: 200 },
      );
    }

    // if user doen't exist

    console.log("User not exist, Creating new user");

    const newUser = {
      clerkId,
      imageUrl,
      username,
      firstName,
      lastName,
      email,
    };
    console.log(newUser);

    const userToReturn = await User.create(newUser);
    return NextResponse.json(
      { message: "User created successfully", user: userToReturn },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
  }
}
