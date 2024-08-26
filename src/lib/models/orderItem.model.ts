import { Schema, models, model } from "mongoose";

// removed orderId from this because orderId contains links to orderItemId will get orderItem by populating it
const orderItemSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menuId: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const OrderItem = models?.OrderItem || model("OrderItem", orderItemSchema);
export default OrderItem;
