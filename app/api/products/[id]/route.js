import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";

export async function GET(request, { params }) {
  await connectDB();

  console.log("===== [ID API] PARAMS =====");
  console.log(params);

  const id = params.id;

  console.log("===== [ID API] ID RECEIVED =====");
  console.log(id);

  // Attempt 1: findById
  try {
    const found1 = await Product.findById(id);
    console.log("===== [ID API] findById result =====");
    console.log(found1);
  } catch (e) {
    console.log("===== [ID API] findById ERROR =====");
    console.log(e);
  }

  // Attempt 2: findOne
  const product = await Product.findOne({ _id: id });
  console.log("===== [ID API] findOne result =====");
  console.log(product);

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
  });
}
