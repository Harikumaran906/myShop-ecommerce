import { connectDB } from "../../../lib/db";
import { Product } from "../../../lib/productModel";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connectDB();

  const { pid } = req.query;
  const id = pid;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const product = await Product.findById(id);
  return res.json(product);
}
