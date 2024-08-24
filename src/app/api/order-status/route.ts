import { fetchOrderOlderThan } from "@/lib/data";
import { connect } from "@/lib/db";
import { OrderProps } from "@/lib/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  res: NextResponse,
): Promise<Response> {
  try {
    await connect();

    const orders: OrderProps[] = await fetchOrderOlderThan(5);

    for (const order of orders) {
      // adding full deployed url here beccause cron jobs
      await fetch("https://dinesphere.vercel.app/api/order-status/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order._id,
          status: "delivered",
        }),
      });
    }

    return NextResponse.json(
      {
        message: "Order status updated",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message:
          "Internal server error while updating order status using cron job",
      },
      {
        status: 400,
      },
    );
  }
}
