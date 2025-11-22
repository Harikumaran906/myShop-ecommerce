import { connectDB } from "../../../lib/db";
import { Product } from "../../../lib/productModel";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const products = await Product.find();
    return res.json(products);
  }

  if (req.method === "POST") {
    const body = req.body;
    const newProduct = new Product(body);
    await newProduct.save();
    return res.json(newProduct);
  }

  res.status(405).json({ error: "Method not allowed" });
}
