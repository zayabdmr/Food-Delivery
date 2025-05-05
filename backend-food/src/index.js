import express, { json } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { foodRouter } from "./routes/food.js";
import { foodOrderRouter } from "./routes/food-order.js";
import { authRouter } from "./routes/auth.js";
import { foodCategoryRouter } from "./routes/food-category.js";

import { PORT } from "./utils/env.js";
import connectDB from "./utils/connectDB.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/user", userRouter);
app.use("/foodCategory", foodCategoryRouter);
app.use("/food", foodRouter);
app.use("/foodOrder", foodOrderRouter);
app.use("/login", authRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
