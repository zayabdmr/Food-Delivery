import express from "express";
import {
  createFoodCategory,
  getFoodCategoryById,
  getFoodsCategory,
} from "../controller/food-category.js";

export const foodCategoryRouter = express.Router();

foodCategoryRouter
  .post("/", createFoodCategory)
  .get("/:id", getFoodCategoryById)
  .get("/", getFoodsCategory);
