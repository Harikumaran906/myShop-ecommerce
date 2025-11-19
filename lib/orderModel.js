import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  customer: Object,
  status: String,
});

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
