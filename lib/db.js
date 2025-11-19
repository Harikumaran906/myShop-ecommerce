import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myshop");
    console.log("MongoDB connected");
  } catch (err) {
    console.log("DB error:", err);
  }
}
