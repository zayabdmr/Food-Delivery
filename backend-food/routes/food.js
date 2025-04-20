import express from "express";
import {
  createFood,
  getFoods,
  getFoodById,
  getFoodsByCategoryId,
} from "../controller/food.js";

export const foodRouter = express.Router();

foodRouter
  .post("/", createFood)
  .get("/", getFoods)
  .get("/:id", getFoodById)
  .get("/category/:id", getFoodsByCategoryId);
