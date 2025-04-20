import express from "express";
import {
  createFoodOrder,
  getFoodOrderById,
  getFoodOrders,
  getOrderByUser,
} from "../controller/food-order.js";

export const foodOrderRouter = express.Router();

foodOrderRouter.post("/", createFoodOrder).get("/:userId", getOrderByUser);
