import express, { json } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { foodRouter } from "./routes/food.js";
import { foodOrderRouter } from "./routes/food-order.js";
import { authRouter } from "./routes/auth.js";
import { foodCategoryRouter } from "./routes/food-category.js";

import connectDB from "./config/db.js";

const port = 8000;
const app = express();

connectDB();

app.use(cors());
app.use(json());

app.use("/user", userRouter);
app.use("/foodCategory", foodCategoryRouter);
app.use("/food", foodRouter);
app.use("/foodOrder", foodOrderRouter);
app.use("/login", authRouter);

console.log();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
