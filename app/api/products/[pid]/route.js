import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/productModel";

export async function GET(request, { params }) {
  await connectDB();

  console.log("===== [ID API] PARAMS =====");
  console.log(params);

  const id = params.pid;

  console.log("===== [ID API] ID RECEIVED =====");
  console.log(id);

  try {
    const found1 = await Product.findById(id);
    console.log("===== [ID API] findById result =====");
    console.log(found1);
  } catch (e) {
    console.log("===== [ID API] findById ERROR =====");
    console.log(e);
  }

  const product = await Product.findOne({ _id: id });
  console.log("===== [ID API] findOne result =====");
  console.log(product);

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request, { params }) {
  await connectDB();

  const id = params.pid;
  const body = await request.json();

  const updated = await Product.findByIdAndUpdate(id, body, { new: true });

  return Response.json(updated);
}

export async function DELETE(request, { params }) {
  await connectDB();

  const id = params.pid;

  await Product.findByIdAndDelete(id);

  return Response.json({ message: "Product deleted" });
}
