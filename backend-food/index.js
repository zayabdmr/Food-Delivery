import express, { json } from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import { userRouter } from "./src/routes/user.js";
import { foodCategoryRouter } from "./src/routes/food-category.js";
import { authRouter } from "./src/routes/auth.js";
import { foodOrderRouter } from "./src/routes/food-order.js";
import { foodRouter } from "./src/routes/food.js";

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
