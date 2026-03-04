import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

const dbConnect = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
};

export default dbConnect;
