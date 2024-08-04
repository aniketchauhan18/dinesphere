import { Schema, models, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
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
  },
  {
    timestamps: true,
  },
);

const OrderItem = models?.OrderItem || model("OrderItem", orderItemSchema);
export default OrderItem;
