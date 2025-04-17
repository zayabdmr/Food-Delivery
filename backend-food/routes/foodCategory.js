import express from "express";
import {
  createFoodCategory,
  getFoodCategoryById,
  getFoodsCategory,
} from "../controller/foodCategory.js";

export const foodCategoryRouter = express.Router();

foodCategoryRouter
  .post("/", createFoodCategory)
  .get("/:id", getFoodCategoryById)
  .get("/", getFoodsCategory);
