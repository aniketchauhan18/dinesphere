import { Schema, model, models } from "mongoose";

const paymentAttemptSchema = new Schema(
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
      enum: ["pending", "processing", "verified", "failed"],
      default: "pending",
      required: true,
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    razorpayOrderId: {
      type: String,
      unique: true,
      sparse: true,
    },
    receipt: {
      type: String,
      unique: true,
      sparse: true,
    },
    paymentId: {
      type: String,
      sparse: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    verificationSource: {
      type: String,
      enum: ["client", "webhook", "reconcile"],
    },
    rawPayload: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

const PaymentAttempt =
  models?.PaymentAttempt || model("PaymentAttempt", paymentAttemptSchema);
export default PaymentAttempt;
