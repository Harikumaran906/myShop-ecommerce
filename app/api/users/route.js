import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  cart: [
    {
      productId: String,
      quantity: Number
    }
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request) {
  await connectDB();

  const data = await request.json();

  const user = new User({
    username: data.username,
    password: data.password,
    isAdmin: data.isAdmin,
    cart: [],
  });

  await user.save();

  return Response.json({ message: "User registered", user });
}
