import { connectDB } from "../../../../lib/db";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  await connectDB();

  const rawId = params?.pid;
  let converted = null;
  let conversionError = null;
  let isValidObjectId = false;

  try {
    isValidObjectId = mongoose.Types.ObjectId.isValid(rawId);
  } catch {}

  try {
    converted = new mongoose.Types.ObjectId(rawId);
  } catch (e) {
    conversionError = String(e);
  }

  return Response.json({
    debug: true,
    rawParams: params,
    rawId,
    typeofRawId: typeof rawId,
    isValidObjectId,
    convertedId: String(converted),
    conversionError
  });
}
