import { Schema, models, model } from "mongoose";

const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentId: {
      type: String,
    },
    paymentOrderId: {
      type: String,
    },
    paymentSignature: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = models?.Payment || model("Payment", paymentSchema);
export default Payment;
