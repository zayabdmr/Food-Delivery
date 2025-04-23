import express from "express";
import {
  createFood,
  getFoods,
  getFoodById,
  getFoodByCategoryId,
  deleteFoodById,
  updateFoodById,
} from "../controller/food.js";

export const foodRouter = express.Router();

foodRouter
  .post("/", createFood)
  .get("/", getFoods)
  .get("/:id", getFoodById)
  .get("/:id", getFoodByCategoryId)
  .delete("/:id", deleteFoodById)
  .put("/:id", updateFoodById);
