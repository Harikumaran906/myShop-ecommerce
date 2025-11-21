import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";

export async function GET(request, { params }) {
  await connectDB();

  const id = params.id;

  const product = await Product.findOne({ _id: id });

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request, { params }) {
  await connectDB();
  const id = params.id;
  const body = await request.json();

  const updated = await Product.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });

  return new Response(JSON.stringify(updated), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request, { params }) {
  await connectDB();
  const id = params.id;

  await Product.findOneAndDelete({ _id: id });

  return new Response(JSON.stringify({ message: "Product deleted" }), {
    headers: { "Content-Type": "application/json" },
  });
}
