import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import OrderItem from "../../../../lib/models/orderItem.model";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // connect to database
    await connect();
    const { menuId, quantity, price, userId } = await req.json();

    // check if same menu exists if so then add one to the quantity
    const sameMenuExists = await OrderItem.find({
      $and: [
        {
          menuId: menuId,
        },
        {
          userId: userId,
        },
        {
          status: "pending",
        },
      ],
    });

    // adding one to the quantity by default set to the quantity
    if (sameMenuExists.length > 0) {
      // increse the quantity by one
      const newQuantity = sameMenuExists[0].quantity + 1;
      const newPrice = newQuantity * price; // set the price accordingly

      // only increase item whose status is pending because the paid one is previous order same menu order Item can exist there
      const newOrderItem = await OrderItem.findByIdAndUpdate(
        sameMenuExists[0]._id,
        {
          quantity: newQuantity,
          price: newPrice,
        },
        {
          new: true,
        },
      );
      return NextResponse.json(
        {
          message: "Order quantity incremented successfully",
          orderItem: newOrderItem,
        },
        {
          status: 201,
        },
      );
    }

    const newOrderItem = await OrderItem.create({
      userId,
      price,
      quantity,
      menuId,
      status: "pending",
    });

    if (!newOrderItem) {
      return NextResponse.json(
        {
          message: "Error adding order to the order Item",
        },
        {
          status: 401,
        },
      );
    }
    return NextResponse.json(
      {
        message: "Order added successfully",
        orderItem: newOrderItem,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.log("Inside add-order api call");
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
