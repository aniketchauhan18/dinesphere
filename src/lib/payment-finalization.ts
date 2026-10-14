import crypto from "crypto";
import Payment from "@/lib/models/payment.model";
import Order from "@/lib/models/order.model";
import OrderItem from "@/lib/models/orderItem.model";
import PaymentAttempt from "@/lib/models/paymentAttempt.model";
import { connect } from "@/lib/db";

export interface FinalizePaymentPayload {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  rawPayload?: unknown;
  source: "client" | "webhook" | "reconcile";
}

function buildClientSignature(orderId: string, paymentId: string) {
  return `${orderId}|${paymentId}`;
}

export function verifyCheckoutSignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    throw new Error("RAZORPAY_KEY_SECRET is not configured");
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(buildClientSignature(razorpayOrderId, razorpayPaymentId))
    .digest("hex");

  return expectedSignature === razorpaySignature;
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured");
  }

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  return expectedSignature === signature;
}

export async function finalizePayment({
  razorpayPaymentId,
  razorpayOrderId,
  rawPayload,
  source,
}: FinalizePaymentPayload) {
  await connect();

  const attempt = await PaymentAttempt.findOne({
    razorpayOrderId,
  });

  if (!attempt) {
    throw new Error("Payment attempt not found for this Razorpay order");
  }

  if (attempt.status === "verified" && attempt.orderId) {
    const [existingPayment, existingOrder] = await Promise.all([
      Payment.findOne({ paymentOrderId: razorpayOrderId }),
      Order.findById(attempt.orderId),
    ]);

    return {
      payment: existingPayment,
      order: existingOrder,
      alreadyFinalized: true,
    };
  }

  await PaymentAttempt.findByIdAndUpdate(attempt._id, {
    status: "processing",
    paymentId: razorpayPaymentId,
    verificationSource: source,
    rawPayload,
  });

  const payment = await Payment.findOneAndUpdate(
    { paymentId: razorpayPaymentId },
    {
      $setOnInsert: {
        userId: attempt.userId,
        paymentId: razorpayPaymentId,
        paymentOrderId: razorpayOrderId,
      },
      $set: {
        paymentSignature:
          source === "client"
            ? "verified-via-client-signature"
            : "verified-via-webhook-signature",
      },
    },
    { upsert: true, new: true },
  );

  let order = await Order.findOne({ paymentId: payment._id });
  if (!order) {
    order = await Order.create({
      userId: attempt.userId,
      restaurantId: attempt.restaurantId,
      totalPrice: attempt.totalPrice,
      status: "pending",
      orderItems: attempt.orderItems,
      paymentId: payment._id,
    });
  }

  await OrderItem.updateMany(
    { _id: { $in: attempt.orderItems } },
    { $set: { status: "paid" } },
  );

  await PaymentAttempt.findByIdAndUpdate(attempt._id, {
    status: "verified",
    orderId: order._id,
    paymentId: razorpayPaymentId,
    verificationSource: source,
    rawPayload,
  });

  return {
    payment,
    order,
    alreadyFinalized: false,
  };
}
