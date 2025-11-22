import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connectDB();

  const { pid } = req.query;

  let id;
  try {
    id = new mongoose.Types.ObjectId(pid);
  } catch {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  if (req.method === "GET") {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  }

  if (req.method === "PUT") {
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
