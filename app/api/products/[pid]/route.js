import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";
import mongoose from "mongoose";

console.log("PID LOADED");

export async function GET(request, { params }) {
  await connectDB();

  const id = params.pid;

  let objectId;
  try {
    objectId = new mongoose.Types.ObjectId(id);
  } catch (e) {
    console.log("Invalid ObjectId:", id);
    return Response.json(null);
  }

  try {
    const product = await Product.findById(objectId);
    console.log("GET PRODUCT:", product);
    return Response.json(product);
  } catch (e) {
    console.log("DB ERROR:", e);
    return Response.json(null);
  }
}

export async function PUT(request, { params }) {
  await connectDB();

  const id = params.pid;
  let objectId;

  try {
    objectId = new mongoose.Types.ObjectId(id);
  } catch (e) {
    console.log("Invalid ObjectId:", id);
    return Response.json(null);
  }

  const body = await request.json();

  try {
    const updated = await Product.findByIdAndUpdate(objectId, body, {
      new: true,
    });

    return Response.json(updated);
  } catch (e) {
    console.log("UPDATE ERROR:", e);
    return Response.json(null);
  }
}

export async function DELETE(request, { params }) {
  await connectDB();

  const id = params.pid;
  let objectId;

  try {
    objectId = new mongoose.Types.ObjectId(id);
  } catch (e) {
    console.log("Invalid ObjectId:", id);
    return Response.json(null);
  }

  try {
    await Product.findByIdAndDelete(objectId);
    return Response.json({ message: "Product deleted" });
  } catch (e) {
    console.log("DELETE ERROR:", e);
    return Response.json(null);
  }
}
