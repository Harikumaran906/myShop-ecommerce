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

  const { username } = await request.json();

  if (!username) {
    return Response.json({ error: "Missing username" }, { status: 400 });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  user.cart = [];
  await user.save();

  return Response.json({ cart: [] });
}
