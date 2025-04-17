import express, { json } from "express";
import { connectMongoDB } from "./connectDB.js";
import { userRouter } from "./routes/user.js";
import { foodCategoryRouter } from "./routes/foodCategory.js";
import { foodRouter } from "./routes/food.js";
import cors from "cors";

const port = 8000;
const app = express();

connectMongoDB();

app.use(cors());
app.use(json());

app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/foodCategory", foodCategoryRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/food", foodRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`server running at http://localhost:8000`);
});
