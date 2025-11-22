import { connectDB } from "../../../lib/db";
import { Product } from "../../../lib/productModel";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const products = await Product.find();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const product = new Product(req.body);
    await product.save();
    return res.status(200).json({ message: "Product added", product });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
