import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { updateOrderStatus } from "@/lib/data";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { orderId, status } = await req.json();

    await connect();

    if (!orderId || !status) {
      return NextResponse.json(
        {
          message: "Invalid req body please provide orderId or status",
        },
        {
          status: 400,
        },
      );
    }

    // updating userId
    const updatedOrder = await updateOrderStatus(orderId, status);
    if (!updatedOrder) {
      return NextResponse.json(
        {
          message: "Error while updating order status",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Order status updated",
        data: updatedOrder,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Interal server error while updating order status",
      },
      {
        status: 500,
      },
    );
  }
}
