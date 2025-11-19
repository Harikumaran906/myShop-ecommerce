import { connectDB } from "../../../lib/db";
import { Order } from "../../../lib/orderModel";

export async function POST(request) {
  await connectDB();

  const body = await request.json();

  const newOrder = new Order({
    items: body.items,
    total: body.total,
    customer: body.customer,
    status: "pending",
  });

  await newOrder.save();

  return Response.json({ message: "Order saved", order: newOrder });
}

export async function GET() {
  await connectDB();

  const orders = await Order.find();

  return Response.json(orders);
}
