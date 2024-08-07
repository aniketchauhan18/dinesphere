import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

if (!razorpayKeyId || !razorpayKeySecret) {
  throw new Error(
    "please define razorpay-key id and status in environment variables",
  );
}

// initialising instance
const instance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { totalPrice } = await req.json();
    const options = {
      amount: parseInt(totalPrice) * 100,
      currency: "INR",
    };
    const razorpayOrder = await instance.orders.create(options);

    if (!razorpayOrder) {
      return NextResponse.json(
        {
          message: "Error creating razorpay order",
        },
        {
          status: 401,
        },
      );
    }
    return NextResponse.json({
      order: razorpayOrder,
      apikey: razorpayKeyId,
    });
  } catch (err) {
    console.log("Error in creating razorpay order", err);
    return NextResponse.json(
      {
        message: "Error in creating razorpay order",
      },
      {
        status: 401,
      },
    );
  }
}
