import express from "express";
import {
  createFood,
  getFoodById,
  getFoods,
  getFoodsByCategoryId,
} from "../controller/food.js";

export const foodRouter = express.Router();

foodRouter
  .post("/", createFood)
  .get("/", getFoods)
  .get("/category/:id", getFoodsByCategoryId)
  .get("/:id", getFoodById);
