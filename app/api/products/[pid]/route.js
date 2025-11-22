import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";

console.log("PID LOADED...");

export async function GET(request, { params }) {
  await connectDB();

  const id = params.pid;

  const allProducts = await Product.find();

  const product = allProducts.find((p) => {
    return p._id && p._id.toString() === id;
  });

  return new Response(JSON.stringify(product || null), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request, { params }) {
  await connectDB();

  const id = params.pid;
  const body = await request.json();

  const updated = await Product.findByIdAndUpdate(id, body, { new: true });

  return Response.json(updated);
}

export async function DELETE(request, { params }) {
  await connectDB();

  const id = params.pid;

  await Product.findByIdAndDelete(id);

  return Response.json({ message: "Product deleted" });
}
