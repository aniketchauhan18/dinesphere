import { Schema, model, models } from "mongoose";

const restaurantImageSchema = new Schema(
  {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const menuImageSchema = new Schema(
  {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    menuId: {
      type: Schema.Types.ObjectId,
      ref: "menu",
      required: true,
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const ImageRestaurant =
  models.ImageRestaurant || model("ImageRestaurant", restaurantImageSchema);
const ImageMenu = models.ImageMenu || model("ImageMenu", menuImageSchema);
export { ImageMenu, ImageRestaurant };
