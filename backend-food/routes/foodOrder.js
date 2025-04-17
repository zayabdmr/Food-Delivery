import express from "express";
import {
  createFoodOrder,
  getFoodOrderById,
  getFoodOrders,
} from "../controller/foodOrder";

export const foodOrderRouter = express.Router();

foodRouter
  .post("/", createFoodOrder)
  .get("/", getFoodOrders)
  .get("/:id", getFoodOrderById);

// .get("/foodOrder/:id", getFoodsByCategoryId)
