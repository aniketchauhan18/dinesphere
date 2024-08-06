import { Schema, models, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "delivered"],
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Order = models?.Order || model("Order", orderSchema);
export default Order;
