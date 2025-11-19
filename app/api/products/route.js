import { connectDB } from "../../../lib/db";
import { Product } from "../../../lib/productModel";

export async function POST(request) {
  await connectDB();

  const body = await request.json();

  const newProduct = new Product(body);
  await newProduct.save();

  return Response.json({ message: "Product added", product: newProduct });
}

export async function GET() {
  await connectDB();

  const products = await Product.find();

  return Response.json(products);
}
