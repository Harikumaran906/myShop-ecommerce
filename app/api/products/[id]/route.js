import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";

export async function GET(request, { params }) {
  await connectDB();

  const product = await Product.findById(params.id);

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request, { params }) {
  await connectDB();

  const body = await request.json();

  const updated = await Product.findByIdAndUpdate(params.id, body, {
    new: true,
  });

  return new Response(JSON.stringify(updated), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request, { params }) {
  await connectDB();

  await Product.findByIdAndDelete(params.id);

  return new Response(JSON.stringify({ message: "Product deleted" }), {
    headers: { "Content-Type": "application/json" },
  });
}
