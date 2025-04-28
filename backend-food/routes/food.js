import express from "express";
import {
  createFood,
  getFoods,
  getFoodById,
  getFoodByCategoryId,
  deleteFoodById,
  updateFoodById,
} from "../controller/food.js";
import { verifyToken } from "../middleware/auth.js";

export const foodRouter = express.Router();

foodRouter
  .post("/", createFood)
  .get("/", getFoods)
  .get("/:id", getFoodById)
  .get("/category/:categoryId", getFoodByCategoryId)
  .delete("/:id", deleteFoodById)
  .put("/:id", updateFoodById);
