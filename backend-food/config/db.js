import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB-д амжилттай холбогдлоо!");
  } catch (error) {
    console.error("MongoDB холболтын алдаа:", error);
    process.exit(1);
  }
};

export default connectDB;
