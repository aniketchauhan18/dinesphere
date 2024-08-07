import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import Order from "@/lib/models/order.model";
import OrderItem from "@/lib/models/orderItem.model";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connect();
    const {
      userId,
      restaurantId,
      totalPrice,
      status,
      orderItems,
      paymentId,
    }: {
      userId: string;
      restaurantId: string;
      totalPrice: string;
      status: string;
      orderItems: string[];
      paymentId: string;
    } = await req.json();

    const order = Order.create({
      userId,
      restaurantId,
      totalPrice: parseInt(totalPrice),
      status,
      orderItems,
    });

    if (!order) {
      return NextResponse.json(
        {
          message: "Error adding order to the order Item",
        },
        {
          status: 401,
        },
      );
    }
    const updatePaymentInOrderItems = await OrderItem.updateMany(
      { _id: { $in: orderItems } },
      { $set: { status: "paid" } },
    );
    if (!updatePaymentInOrderItems) {
      return NextResponse.json(
        {
          message: "Error updating status in order items",
        },
        {
          status: 400, // bad request
        },
      );
    }

    // revalidating the cache

    revalidatePath(`/user/${userId}/orders`);
    return NextResponse.json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.log("Inside checkout api call");
    NextResponse.json(
      {
        message: "Error adding order item",
      },
      {
        status: 500,
      },
    );
  }
}
