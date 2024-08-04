import { Schema, model, models } from "mongoose";

const menuSchema = new Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Menu = models?.Menu || model("Menu", menuSchema);
export default Menu;
