import Payment from "@/lib/models/payment.model";
import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connect();

    const { userId, paymentId, paymentOrderId, paymentSignature } =
      await req.json();

    // creating payment document in the databasee

    const payment = await Payment.create({
      userId,
      paymentId,
      paymentOrderId,
      paymentSignature,
    });

    return NextResponse.json({
      message: "Payment created successfully",
      payment,
    });
  } catch (err) {
    console.log("Inside checkout api call");
    return NextResponse.json(
      {
        message: "Error adding order item",
      },
      {
        status: 500,
      },
    );
  }
}
