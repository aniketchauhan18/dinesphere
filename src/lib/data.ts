import User from "./models/user.model";
import { connect } from "./db";

export async function fetchUserById(clerkId: string) {
  await connect();
  console.log(clerkId);
  const user = await User.findOne({ clerkId });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
