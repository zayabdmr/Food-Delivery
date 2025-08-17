import express from "express";
import {
  createFoodOrder,
  deleteFoodOrderById,
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
  .delete("/:id", deleteFoodOrderById)
  .put("/:id", updateFoodOrderById);
