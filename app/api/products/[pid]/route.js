import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";
import mongoose from "mongoose";

console.log("===== [PID API] MODULE LOADED =====");

export async function GET(req, { params }) {
  await connectDB();

  console.log("===== [PID API] PARAMS =====");
  console.log(params);

  let id = params.pid;

  console.log("===== [PID API] ID RECEIVED =====");
  console.log(id);

  try {
    id = new mongoose.Types.ObjectId(id);
  } catch (e) {
    console.log("Invalid ObjectId format:", e);
    return Response.json(null);
  }

  try {
    const product = await Product.findById(id);

    console.log("===== [PID API] RESULT =====");
    console.log(product);

    return Response.json(product);
  } catch (e) {
    console.log("===== [PID API] ERROR =====");
    console.log(e);
    return Response.json(null);
  }
}

export async function PUT(req, { params }) {
  await connectDB();

  let id = params.pid;

  try {
    id = new mongoose.Types.ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(id, body, { new: true });

  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();

  let id = params.pid;

  try {
    id = new mongoose.Types.ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  await Product.findByIdAndDelete(id);

  return Response.json({ message: "Product deleted" });
}
