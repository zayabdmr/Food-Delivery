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
  .get("/category/", getFoodByCategoryId)
  .get("/:id", getFoodById)
  .delete("/:id", deleteFoodById)
  .put("/:id", updateFoodById);
