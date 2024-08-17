import { NextRequest, NextResponse } from "next/server";
import OrderItem from "@/lib/models/orderItem.model";
// to do =>  validate the req:

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const { quantity, orderItemId, basePrice } = await req.json();

    const updatedPrice = parseFloat((quantity * basePrice).toFixed(2));

    const data = {
      quantity,
      price: updatedPrice,
    };

    const updateOrderItem = await OrderItem.findByIdAndUpdate(
      orderItemId,
      data,
      { new: true },
    );
    if (!updateOrderItem) {
      return NextResponse.json(
        {
          message: "Error while updating user response",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Order Updated Successfully",
        data: updateOrderItem,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        messsage: "Internal server error while updating the order",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const { orderItemId } = await req.json();

    const deleteOrderItem = await OrderItem.findByIdAndDelete(orderItemId);

    if (!deleteOrderItem) {
      return NextResponse.json({
        message: "Error while deleting orderItem",
      });
    }

    return NextResponse.json(
      {
        message: "OrderItem Deleted Successfully",
        data: deleteOrderItem,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Internal server error while deleting the order",
    });
  }
}
