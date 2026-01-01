import { fetchOrderOlderThan, updateOrderStatus } from "@/lib/data";
import { connect } from "@/lib/db";
import { OrderProps } from "@/lib/definition";
import { NextRequest, NextResponse } from "next/server";

// Function to get next status in the order flow
function getNextStatus(currentStatus: string): string {
  const statusFlow: Record<string, string> = {
    pending: "accepted",
    accepted: "processing",
    processing: "delivered",
  };
  return statusFlow[currentStatus] || "delivered";
}

// Shared function to update orders
async function updatePendingOrders() {
  await connect();

  // Fetch orders that are not delivered or rejected, older than 5 minutes
  const orders: OrderProps[] = await fetchOrderOlderThan(5);

  if (orders.length === 0) {
    return {
      message: "No orders to update",
      updatedCount: 0,
      totalOrders: 0,
      success: 0,
      failed: 0,
      errors: [],
    };
  }

  const updateResults = {
    success: 0,
    failed: 0,
    errors: [] as string[],
    statusChanges: {} as Record<string, number>,
  };

  // Update each order to the next status in the flow
  for (const order of orders) {
    try {
      const currentStatus = order.status || "pending";
      const nextStatus = getNextStatus(currentStatus);
      
      const updatedOrder = await updateOrderStatus(
        order._id.toString(),
        nextStatus,
      );
      if (updatedOrder) {
        updateResults.success++;
        // Track status changes
        const changeKey = `${currentStatus} → ${nextStatus}`;
        updateResults.statusChanges[changeKey] = 
          (updateResults.statusChanges[changeKey] || 0) + 1;
        console.log(
          `Order ${order._id} updated from ${currentStatus} to ${nextStatus}`,
        );
      } else {
        updateResults.failed++;
        updateResults.errors.push(
          `Failed to update order ${order._id} from ${currentStatus}`,
        );
      }
    } catch (err) {
      updateResults.failed++;
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      updateResults.errors.push(
        `Error updating order ${order._id}: ${errorMessage}`,
      );
      console.error(`Error updating order ${order._id}:`, err);
    }
  }

  return {
    message: "Order status update completed",
    totalOrders: orders.length,
    success: updateResults.success,
    failed: updateResults.failed,
    statusChanges: updateResults.statusChanges,
    errors: updateResults.errors.length > 0 ? updateResults.errors : undefined,
  };
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const result = await updatePendingOrders();
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Cron job error:", err);
    return NextResponse.json(
      {
        message:
          "Internal server error while updating order status using cron job",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const result = await updatePendingOrders();
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Cron job error:", err);
    return NextResponse.json(
      {
        message:
          "Internal server error while updating order status using cron job",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
