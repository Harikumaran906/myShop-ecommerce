export const dynamic = "force-dynamic";

import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";

export async function GET(_, { params }) {
  await connectDB();
  const product = await Product.findById(params.id);
  return Response.json(product);
}

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });

  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return Response.json({ message: "Product deleted" });
}
