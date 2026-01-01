import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

// Create Razorpay instance lazily to allow for missing env vars during build
let instance: Razorpay | null = null;

function getRazorpayInstance(): Razorpay {
  if (!instance) {
    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error(
        "Please define NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables"
      );
    }
    instance = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });
  }
  return instance;
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // Validate environment variables
    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("Razorpay credentials not configured");
      return NextResponse.json(
        {
          message: "Payment gateway not configured. Please contact support.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await req.json();
    const { totalPrice } = body;

    // Validate totalPrice
    if (!totalPrice || isNaN(Number(totalPrice)) || Number(totalPrice) <= 0) {
      return NextResponse.json(
        {
          message: "Invalid order amount",
        },
        {
          status: 400,
        }
      );
    }

    const amount = Math.round(Number(totalPrice) * 100); // Convert to paise and ensure integer

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    console.log("Creating Razorpay order with options:", options);

    const razorpay = getRazorpayInstance();
    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder || !razorpayOrder.id) {
      console.error("Failed to create Razorpay order:", razorpayOrder);
      return NextResponse.json(
        {
          message: "Failed to create payment order",
        },
        {
          status: 500,
        }
      );
    }

    console.log("Razorpay order created:", razorpayOrder.id);

    return NextResponse.json({
      order: razorpayOrder,
      apikey: razorpayKeyId,
    });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    
    // Check for specific Razorpay errors
    const error = err as { error?: { description?: string } };
    const errorMessage = error?.error?.description || "Failed to create payment order";
    
    return NextResponse.json(
      {
        message: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}
