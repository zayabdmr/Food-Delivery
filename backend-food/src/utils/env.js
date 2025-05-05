import { configDotenv } from "dotenv";

configDotenv();

export const MONGO_URL = process.env.MONGO_URL;

export const PORT = process.env.PORT;
