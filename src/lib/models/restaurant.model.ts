import { Schema, model, models } from "mongoose";

// make some fields required in future
const restaurantSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    websiteURL: {
      type: String,
    },
    cuisine: {
      type: [String],
    },
  },
  { timestamps: true },
);

const Restaurant = models?.Restaurant || model("Restaurant", restaurantSchema);
export default Restaurant;
