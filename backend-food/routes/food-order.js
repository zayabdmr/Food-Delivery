import express from "express";
import {
  createFoodOrder,
  getFoodOrderById,
  getFoodOrders,
  getOrderByUser,
  updateFoodOrderById,
} from "../controller/food-order.js";

export const foodOrderRouter = express.Router();

foodOrderRouter
  .post("/", createFoodOrder)
  .get("/", getFoodOrders)
  .get("/:id", getFoodOrderById)
  .get("/user/:userId", getOrderByUser)
  .put("/:id", updateFoodOrderById);
