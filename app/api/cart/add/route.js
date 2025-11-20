import { connectDB } from "../../../../lib/db";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  cart: [
    {
      productId: String,
      quantity: Number,
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request) {
  await connectDB();

  const { username, productId } = await request.json();

  if (!username || !productId) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const existing = user.cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    user.cart.push({ productId, quantity: 1 });
  }

  await user.save();

  return Response.json({
    message: "Added to cart",
    cart: user.cart,
  });
}
