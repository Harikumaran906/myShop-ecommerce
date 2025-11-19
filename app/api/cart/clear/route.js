import { connectDB } from "../../../../lib/db";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  cart: Array,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request) {
  await connectDB();

  const { username } = await request.json();

  const user = await User.findOne({ username });

  if (!user) {
    return Response.json({ error: "User not found" });
  }

  user.cart = [];
  await user.save();

  return Response.json({ cart: [] });
}
