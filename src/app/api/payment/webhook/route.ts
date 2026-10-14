import { NextRequest, NextResponse } from "next/server";
import {
  finalizePayment,
  verifyWebhookSignature,
} from "@/lib/payment-finalization";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json(
        { message: "Missing webhook signature" },
        { status: 400 },
      );
    }

    const rawBody = await req.text();
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid webhook signature" },
        { status: 400 },
      );
    }

    const eventPayload = JSON.parse(rawBody);
    const eventType = eventPayload?.event;

    if (eventType !== "payment.captured") {
      return NextResponse.json(
        { message: `Webhook ignored for event: ${eventType}` },
        { status: 200 },
      );
    }

    const razorpayPaymentId = eventPayload?.payload?.payment?.entity?.id;
    const razorpayOrderId = eventPayload?.payload?.payment?.entity?.order_id;
    if (!razorpayPaymentId || !razorpayOrderId) {
      return NextResponse.json(
        {
          message: "Missing payment identifiers in webhook payload",
        },
        { status: 400 },
      );
    }

    const result = await finalizePayment({
      razorpayPaymentId,
      razorpayOrderId,
      source: "webhook",
      rawPayload: eventPayload,
    });

    return NextResponse.json(
      {
        message: result.alreadyFinalized
          ? "Payment already finalized"
          : "Webhook processed and payment finalized",
        alreadyFinalized: result.alreadyFinalized,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error processing Razorpay webhook",
      },
      {
        status: 500,
      },
    );
  }
}
