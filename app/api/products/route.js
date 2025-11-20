import { connectDB } from "../../../lib/db";
import { Product } from "../../../lib/productModel";

export async function GET(request) {
  await connectDB();
  const products = await Product.find();
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const newProduct = new Product(body);
  await newProduct.save();

  return new Response(
    JSON.stringify({ message: "Product added", product: newProduct }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
