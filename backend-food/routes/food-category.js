import express from "express";
import {
  createFoodCategory,
  deleteFoodCategoryById,
  getFoodCategories,
  getFoodCategoryById,
  updateFoodCategoryById,
} from "../controller/food-category.js";

export const foodCategoryRouter = express.Router();

foodCategoryRouter
  .post("/", createFoodCategory)
  .get("/", getFoodCategories)
  .get("/:id", getFoodCategoryById)
  .delete("/:id", deleteFoodCategoryById)
  .put("/:id", updateFoodCategoryById);
