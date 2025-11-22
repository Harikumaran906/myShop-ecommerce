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

  const data = await request.json();

  let user = await User.findOne({
    username: data.username,
    password: data.password,
  });

  if (!user) {
    return Response.json({ user: null });
  }

  if (!user.cart) {
    user.cart = [];
    await user.save();
  }

  return Response.json({ user });
}
