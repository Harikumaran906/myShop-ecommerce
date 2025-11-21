import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  await connectDB();

  const id = params.id;

  let product;

  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id);
  }

  if (!product) {
    product = await Product.findOne({ _id: id });
  }

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request, { params }) {
  await connectDB();
  const id = params.id;
  const body = await request.json();

  let updated;

  if (mongoose.Types.ObjectId.isValid(id)) {
    updated = await Product.findByIdAndUpdate(id, body, { new: true });
  }

  if (!updated) {
    updated = await Product.findOneAndUpdate({ _id: id }, body, { new: true });
  }

  return new Response(JSON.stringify(updated), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request, { params }) {
  await connectDB();
  const id = params.id;

  let deleted;

  if (mongoose.Types.ObjectId.isValid(id)) {
    deleted = await Product.findByIdAndDelete(id);
  }

  if (!deleted) {
    deleted = await Product.findOneAndDelete({ _id: id });
  }

  return new Response(JSON.stringify({ message: "Product deleted" }), {
    headers: { "Content-Type": "application/json" },
  });
}
