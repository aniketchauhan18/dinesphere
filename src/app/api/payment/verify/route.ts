import { NextRequest, NextResponse } from "next/server";
import {
  finalizePayment,
  verifyCheckoutSignature,
} from "@/lib/payment-finalization";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        {
          message: "Invalid payment verification payload",
        },
        { status: 400 },
      );
    }

    const isValid = verifyCheckoutSignature({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        {
          message: "Invalid payment signature",
        },
        { status: 400 },
      );
    }

    const result = await finalizePayment({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      source: "client",
      rawPayload: { razorpay_payment_id, razorpay_order_id },
    });

    return NextResponse.json({
      message: result.alreadyFinalized
        ? "Payment already finalized"
        : "Payment verified and finalized successfully",
      payment: result.payment,
      order: result.order,
      alreadyFinalized: result.alreadyFinalized,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error verifying and finalizing payment",
      },
      {
        status: 500,
      },
    );
  }
}
