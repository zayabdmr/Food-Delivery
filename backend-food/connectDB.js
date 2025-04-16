import { configDotenv } from "dotenv";
import { connect } from "mongoose";

configDotenv();

const uri = process.env.MONGO_URL;

export const connectMongoDB = async () => {
  try {
    await connect(uri);
    console.log("connect to db");
  } catch (error) {
    console.error(error, "err");
  }
};
