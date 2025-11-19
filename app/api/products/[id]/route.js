import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";

export async function GET(request, context) {
  await connectDB();

  const { id } = await context.params;

  const product = await Product.findById(id);

  return Response.json(product);
}

export async function PUT(request, context) {
  await connectDB();

  const { id } = await context.params;
  const body = await request.json();

  const updated = await Product.findByIdAndUpdate(id, body, { new: true });

  return Response.json(updated);
}

export async function DELETE(request, context) {
  await connectDB();

  const { id } = await context.params;

  await Product.findByIdAndDelete(id);

  return Response.json({ message: "Product deleted" });
}
