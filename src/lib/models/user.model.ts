import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String || null,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String || null,
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = models?.User || model("User", UserSchema);
export default User;

// validating request body with zod

// const { success, data, error } = userValidationSchema.safeParse(await req.json());
// console.log(success)
// console.log(data, "this is the data")
// if (!success) {
//   const errorMessages = error.issues.map(issue => ({
//     message: issue.message, // The error message
//   }));

//   // this response is not tested yet
//   return NextResponse.json({ errors: errorMessages}, { status: 400 } )
// }

// // destructure data from the zod validated data

// const { clerkId , imageUrl, username, firstName, lastName,  email } = data;

// console.log(data);
